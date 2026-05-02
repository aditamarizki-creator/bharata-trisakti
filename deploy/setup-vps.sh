#!/usr/bin/env bash
# Bharata Trisakti — VPS bootstrap script (AlmaLinux 9)
# Jalankan sebagai root: bash setup-vps.sh
set -euo pipefail

DOMAIN="${DOMAIN:-bharatatrisakti.id}"
APP_DIR="/var/www/bharata"
APP_USER="bharata"
NODE_VERSION="20"

echo "==> [1/9] Update system & install base packages"
dnf -y update
dnf -y install epel-release
dnf -y install curl tar git nginx firewalld policycoreutils-python-utils \
  || dnf -y install curl tar git nginx firewalld

systemctl enable --now firewalld nginx

echo "==> [2/9] Open firewall ports 80, 443, 22"
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-service=ssh
firewall-cmd --reload

echo "==> [3/9] Install Node.js ${NODE_VERSION}"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d. -f1 | tr -d 'v')" -lt 20 ]; then
  curl -fsSL "https://rpm.nodesource.com/setup_${NODE_VERSION}.x" | bash -
  dnf -y install nodejs
fi
node -v && npm -v

echo "==> [4/9] Install PM2"
npm install -g pm2

echo "==> [5/9] Create app user & dirs"
id -u "${APP_USER}" >/dev/null 2>&1 || useradd -r -s /bin/bash -d "${APP_DIR}" "${APP_USER}"
mkdir -p "${APP_DIR}" "${APP_DIR}/data" "${APP_DIR}/uploads" "${APP_DIR}/app"
chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"

echo "==> [6/9] Install certbot (Let's Encrypt)"
dnf -y install certbot python3-certbot-nginx || true

echo "==> [7/9] Nginx reverse proxy config"
cat > /etc/nginx/conf.d/bharata.conf <<NGINX
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    client_max_body_size 8m;

    # Static uploads served directly oleh Nginx (lebih cepat dari Node)
    location /uploads/ {
        alias ${APP_DIR}/uploads/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
}
NGINX

# SELinux (AlmaLinux): allow Nginx connect to localhost:3000
if command -v setsebool >/dev/null 2>&1; then
  setsebool -P httpd_can_network_connect 1 || true
fi

nginx -t
systemctl reload nginx

echo "==> [8/9] Setup PM2 ecosystem"
cat > "${APP_DIR}/ecosystem.config.cjs" <<'PM2'
module.exports = {
  apps: [{
    name: "bharata",
    script: "node_modules/next/dist/bin/next",
    args: "start -p 3000",
    cwd: "/var/www/bharata/app",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "800M",
    env: {
      NODE_ENV: "production",
      PORT: "3000",
    },
    env_file: "/var/www/bharata/app/.env.production",
  }]
};
PM2
chown "${APP_USER}:${APP_USER}" "${APP_DIR}/ecosystem.config.cjs"

echo "==> [9/9] Done. Next steps:"
echo "  1. Upload kode app ke ${APP_DIR}/app  (contoh: rsync atau git clone)"
echo "  2. Buat ${APP_DIR}/app/.env.production isi JWT_SECRET, ADMIN_PASSWORD_HASH, dll"
echo "  3. cd ${APP_DIR}/app && npm ci && npm run build"
echo "  4. su - ${APP_USER} -c 'pm2 start ${APP_DIR}/ecosystem.config.cjs && pm2 save'"
echo "  5. pm2 startup systemd -u ${APP_USER} --hp ${APP_DIR}   (jalankan output-nya)"
echo "  6. Setelah DNS propagasi: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --redirect -m admin@${DOMAIN} --agree-tos -n"
