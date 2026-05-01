export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
      role="img"
      aria-label="Ilustrasi koi di kolam"
    >
      <defs>
        <linearGradient id="hero-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E7C86" />
          <stop offset="55%" stopColor="#075963" />
          <stop offset="100%" stopColor="#062E33" />
        </linearGradient>
        <radialGradient id="hero-light" cx="0.3" cy="0.18" r="0.7">
          <stop offset="0%" stopColor="#B8E0DD" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#B8E0DD" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#B8E0DD" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="koi-orange" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FBA45A" />
          <stop offset="80%" stopColor="#E8783F" />
          <stop offset="100%" stopColor="#C04E1F" />
        </radialGradient>
        <radialGradient id="koi-white" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FAF8F3" />
          <stop offset="100%" stopColor="#D8D2C2" />
        </radialGradient>
      </defs>

      {/* water bg */}
      <rect width="400" height="500" fill="url(#hero-water)" />
      <rect width="400" height="500" fill="url(#hero-light)" />

      {/* concentric ripples */}
      <g fill="none" stroke="#B8E0DD" strokeWidth="1.6">
        <circle cx="120" cy="100" r="40" className="animate-ripple" style={{ animationDelay: "0s" }} />
        <circle cx="120" cy="100" r="80" className="animate-ripple" style={{ animationDelay: "0.6s" }} />
        <circle cx="120" cy="100" r="120" className="animate-ripple" style={{ animationDelay: "1.2s" }} />
        <circle cx="120" cy="100" r="160" className="animate-ripple" style={{ animationDelay: "1.8s" }} />
      </g>

      {/* surface waves */}
      <g fill="none" stroke="#B8E0DD" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
        <path d="M -10 60 Q 80 30 160 60 T 410 60" />
        <path d="M -10 90 Q 90 60 180 90 T 410 90" strokeOpacity="0.22" />
        <path d="M -10 470 Q 80 440 160 470 T 410 470" strokeOpacity="0.25" />
      </g>

      {/* lily pad */}
      <g transform="translate(280, 380)">
        <ellipse cx="0" cy="0" rx="58" ry="14" fill="#0F4A4F" opacity="0.55" />
        <ellipse cx="0" cy="-3" rx="55" ry="12" fill="#1A6F60" />
        <path
          d="M -55 -3 L -25 -3 L -10 -16 L 5 -3 L 30 -3 L 45 -16"
          stroke="#0F4A4F"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* koi 1 - large kohaku */}
      <g transform="translate(200, 250)">
        <g className="animate-koi-1">
          <ellipse cx="6" cy="32" rx="120" ry="18" fill="#062E33" opacity="0.35" />
          <path
            d="M -110 0 C -110 -32, -60 -42, 0 -38 C 60 -34, 100 -28, 120 0 C 100 28, 60 34, 0 38 C -60 42, -110 32, -110 0 Z"
            fill="url(#koi-white)"
          />
          <path d="M -110 0 L -160 -34 L -148 0 L -160 34 Z" fill="url(#koi-white)" />
          <ellipse cx="-30" cy="-15" rx="38" ry="14" fill="#E8783F" opacity="0.92" />
          <ellipse cx="40" cy="10" rx="46" ry="16" fill="#C04E1F" opacity="0.92" />
          <ellipse cx="80" cy="-8" rx="22" ry="9" fill="#E8783F" opacity="0.85" />
          <ellipse cx="-50" cy="14" rx="14" ry="6" fill="#1F2A2E" opacity="0.55" />
          <ellipse cx="20" cy="-22" rx="10" ry="5" fill="#1F2A2E" opacity="0.5" />
          <circle cx="100" cy="-10" r="4.5" fill="#1F2A2E" />
          <circle cx="101" cy="-11" r="1.5" fill="#FAF8F3" />
          <path d="M -10 35 Q -20 60 -45 55 Q -25 40 -10 35 Z" fill="url(#koi-white)" opacity="0.85" />
          <path d="M 30 -34 Q 50 -55 70 -50 Q 50 -38 30 -34 Z" fill="url(#koi-white)" opacity="0.85" />
        </g>
      </g>

      {/* koi 2 - smaller orange koi */}
      <g transform="translate(110, 380)">
        <g className="animate-koi-2">
          <ellipse cx="4" cy="22" rx="80" ry="12" fill="#062E33" opacity="0.3" />
          <path
            d="M -75 0 C -75 -22, -40 -28, 0 -26 C 40 -24, 65 -18, 80 0 C 65 18, 40 24, 0 26 C -40 28, -75 22, -75 0 Z"
            fill="url(#koi-orange)"
          />
          <path d="M -75 0 L -110 -22 L -100 0 L -110 22 Z" fill="url(#koi-orange)" />
          <ellipse cx="-15" cy="-10" rx="22" ry="7" fill="#FAF8F3" opacity="0.85" />
          <ellipse cx="35" cy="6" rx="18" ry="6" fill="#FAF8F3" opacity="0.7" />
          <circle cx="65" cy="-7" r="3.5" fill="#1F2A2E" />
          <circle cx="66" cy="-8" r="1" fill="#FAF8F3" />
        </g>
      </g>

      {/* small koi top right */}
      <g transform="translate(320, 130)">
        <g className="animate-koi-3">
          <path
            d="M -75 0 C -75 -22, -40 -28, 0 -26 C 40 -24, 65 -18, 80 0 C 65 18, 40 24, 0 26 C -40 28, -75 22, -75 0 Z"
            fill="url(#koi-white)"
          />
          <path d="M -75 0 L -110 -22 L -100 0 L -110 22 Z" fill="url(#koi-white)" />
          <ellipse cx="-10" cy="-10" rx="28" ry="9" fill="#E8783F" opacity="0.9" />
          <circle cx="65" cy="-7" r="3.5" fill="#1F2A2E" />
        </g>
      </g>

      {/* rising bubbles */}
      <g fill="#FAF8F3" opacity="0.7">
        <circle cx="80" cy="450" r="3" className="animate-bubble" style={{ animationDelay: "0s" }} />
        <circle cx="95" cy="450" r="2" className="animate-bubble" style={{ animationDelay: "1.2s" }} />
        <circle cx="70" cy="450" r="2.5" className="animate-bubble" style={{ animationDelay: "2.4s" }} />
        <circle cx="350" cy="450" r="3" className="animate-bubble" style={{ animationDelay: "0.6s" }} />
        <circle cx="335" cy="450" r="2" className="animate-bubble" style={{ animationDelay: "1.8s" }} />
        <circle cx="180" cy="450" r="2.4" className="animate-bubble" style={{ animationDelay: "3s" }} />
      </g>
    </svg>
  );
}
