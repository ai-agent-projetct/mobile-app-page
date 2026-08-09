import React from 'react'

export default function Logo({ className = '', height = 48, width = 'auto' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 240"
      className={className}
      style={{ height, width }}
    >
      <defs>
        <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A2F5C" />
          <stop offset="50%" stopColor="#E58324" />
          <stop offset="100%" stopColor="#E58324" />
        </linearGradient>
      </defs>

      {/* 1. Bridge Suspension Arch (Blue main arch) */}
      <path
        d="M 40 120 C 120 70, 380 70, 460 120"
        fill="none"
        stroke="#1A2F5C"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* 2. Orange accent arch */}
      <path
        d="M 40 120 C 120 75, 380 75, 460 120"
        fill="none"
        stroke="#E58324"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 3. Bridge Towers */}
      <g stroke="#1A2F5C" strokeWidth="4">
        {/* Left Tower */}
        <line x1="180" y1="78" x2="180" y2="120" />
        {/* Right Tower */}
        <line x1="310" y1="78" x2="310" y2="120" />
        {/* Top Cross Connector */}
        <line x1="180" y1="92" x2="310" y2="92" strokeWidth="2.5" />
      </g>

      {/* 4. Suspension Cables */}
      <path
        d="M 180 92 C 220 110, 270 110, 310 92"
        fill="none"
        stroke="#1A2F5C"
        strokeWidth="1.5"
      />
      {/* Verticals for suspension */}
      <g stroke="#1A2F5C" strokeWidth="1" opacity="0.6">
        <line x1="210" y1="102" x2="210" y2="120" />
        <line x1="240" y1="106" x2="240" y2="120" />
        <line x1="270" y1="106" x2="270" y2="120" />
        <line x1="290" y1="102" x2="290" y2="120" />
      </g>

      {/* Road Base Line */}
      <line x1="40" y1="120" x2="460" y2="120" stroke="#1A2F5C" strokeWidth="3" />

      {/* 5. Silhouettes under the bridge */}
      
      {/* TRUCK Silhouette (Left) */}
      <g fill="#1A2F5C" transform="translate(90, 102)">
        {/* Wheels */}
        <circle cx="9" cy="15" r="2.5" />
        <circle cx="21" cy="15" r="2.5" />
        <circle cx="41" cy="15" r="2.5" />
        {/* Trailer */}
        <rect x="0" y="3" width="31" height="10" rx="1" />
        {/* Cab */}
        <path d="M 31 5 L 37 5 Q 40 5, 41 8 L 44 8 L 44 13 L 31 13 Z" />
      </g>

      {/* CONTAINER SHIP Silhouette (Center) */}
      <g fill="#1A2F5C" transform="translate(205, 103)">
        {/* Hull */}
        <path d="M 5 12 L 80 12 L 85 5 L 12 5 Z" />
        {/* Cabin */}
        <rect x="18" y="1" width="8" height="4" />
        <rect x="22" y="-1" width="3" height="2" />
        {/* Containers */}
        <rect x="30" y="-1" width="9" height="6" fill="#E58324" />
        <rect x="40" y="1" width="8" height="4" fill="#1A2F5C" />
        <rect x="49" y="-2" width="10" height="7" fill="#E58324" />
        <rect x="60" y="1" width="8" height="4" fill="#1A2F5C" />
      </g>

      {/* TRAIN Silhouette (Right) */}
      <g fill="#1A2F5C" transform="translate(355, 103)">
        {/* Engine */}
        <path d="M 0 12 L 15 12 L 15 5 L 5 5 L 3 9 L 0 9 Z" />
        {/* Cabin Window Cut */}
        <rect x="6" y="6" width="3" height="3" fill="#FFFFFF" opacity="0.1" />
        {/* Wheels */}
        <circle cx="3" cy="14" r="1.5" />
        <circle cx="7" cy="14" r="1.5" />
        <circle cx="11" cy="14" r="1.5" />
        {/* Cargo car 1 */}
        <rect x="17" y="5" width="14" height="7" />
        <circle cx="20" cy="14" r="1.5" />
        <circle cx="28" cy="14" r="1.5" />
        {/* Cargo car 2 */}
        <rect x="33" y="5" width="14" height="7" />
        <circle cx="36" cy="14" r="1.5" />
        <circle cx="44" cy="14" r="1.5" />
        {/* Connectors */}
        <rect x="15" y="9" width="2" height="1" />
        <rect x="31" y="9" width="2" height="1" />
      </g>

      {/* 6. LOGISETU Branding Text */}
      <g fontFamily="var(--font-display)" fontWeight="800" fontSize="38" letterSpacing="6">
        <text x="75" y="180" fill="#1A2F5C">LOGI</text>
        <text x="212" y="180" fill="#E58324">SETU</text>
      </g>

      {/* 7. Tagline */}
      <g fontFamily="var(--font-body)" fontWeight="600" fontSize="10.5" letterSpacing="3.5" fill="#8F9EB3">
        <line x1="30" y1="210" x2="65" y2="210" stroke="#8F9EB3" strokeWidth="0.8" />
        <text x="80" y="213" textAnchor="start">BRIDGING DISTANCES, DELIVERING POSSIBILITIES</text>
        <line x1="435" y1="210" x2="470" y2="210" stroke="#8F9EB3" strokeWidth="0.8" />
      </g>
    </svg>
  )
}
