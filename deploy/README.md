# Deploy Bharata Trisakti ke VPS Hostinger

## Target
- VPS Hostinger KVM 8 (AlmaLinux 9), IP `69.62.72.236`
- Domain `bharatatrisakti.id` (registered di Hostinger)

## Step ringkas

### 1. Bootstrap VPS (sekali, sebagai root)
```bash
curl -fsSL https://raw.githubusercontent.com/<owner>/<repo>/main/deploy/setup-vps.sh -o setup-vps.sh
DOMAIN=bharatatrisakti.id bash setup-vps.sh
```

(Atau upload `setup-vps.sh` lewat Browser Terminal hPanel → jalankan `bash setup-vps.sh`.)

### 2. Upload kode
```bash
# Dari laptop:
rsync -avz --exclude node_modules --exclude .next --exclude data --exclude public/uploads \
  ./ root@69.62.72.236:/var/www/bharata/app/
```

### 3. Buat .env.production
```bash
cat > /var/www/bharata/app/.env.production <<EOF
JWT_SECRET=$(openssl rand -hex 32)
ADMIN_PASSWORD_HASH=$(node -e "require('bcryptjs').hash('PASSWORD-ANDA', 10).then(console.log)")
DATA_DIR=/var/www/bharata/data
UPLOAD_DIR=/var/www/bharata/uploads
UPLOAD_PUBLIC_PREFIX=/uploads
EOF
chown bharata:bharata /var/www/bharata/app/.env.production
chmod 600 /var/www/bharata/app/.env.production
```

### 4. Build & jalankan
```bash
cd /var/www/bharata/app
npm ci
npm run build
chown -R bharata:bharata /var/www/bharata
su - bharata -c "pm2 start /var/www/bharata/ecosystem.config.cjs && pm2 save"
pm2 startup systemd -u bharata --hp /var/www/bharata
# jalankan output command-nya
```

### 5. Point DNS di hPanel
- `A @ → 69.62.72.236`
- `A www → 69.62.72.236`
- TTL 300

### 6. HTTPS
Setelah DNS propagasi (cek `dig bharatatrisakti.id`):
```bash
certbot --nginx -d bharatatrisakti.id -d www.bharatatrisakti.id \
  --redirect -m admin@bharatatrisakti.id --agree-tos -n
```

### 7. Update kode (untuk deploy berikutnya)
```bash
rsync -avz --exclude node_modules ... ./ root@69.62.72.236:/var/www/bharata/app/
ssh root@69.62.72.236 "cd /var/www/bharata/app && npm ci && npm run build && su - bharata -c 'pm2 reload bharata'"
```
