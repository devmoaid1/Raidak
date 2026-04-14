import React from 'react';

/**
 * MapShaders - Renders SVG filters and gradients for the vector map.
 * This is a Server Component.
 */
export default function MapShaders() {
  return (
    <defs>
      {/* Intense green glow for high sustainability nodes */}
      <filter id="glow-high" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Moderate orange glow for medium sustainability nodes */}
      <filter id="glow-medium" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Polygon elevation shadow */}
      <filter id="map-depth">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.5" />
      </filter>

      {/* Noise overlay for land texture */}
      <filter id="map-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" result="destaturatedNoise" />
        <feBlend in="SourceGraphic" in2="destaturatedNoise" mode="multiply" />
      </filter>

      {/* Coastline shimmer */}
      <filter id="coastline-glow">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feFlood floodColor="#3B82F6" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" />
      </filter>

      {/* Gradients */}
      <linearGradient id="sea-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0C1B33" />
        <stop offset="100%" stopColor="#0A2448" />
      </linearGradient>

      <radialGradient id="land-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#111827" />
        <stop offset="100%" stopColor="#0D1117" />
      </radialGradient>

      <linearGradient id="coastal-premium" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#101D2E" />
        <stop offset="100%" stopColor="#0D1B2A" />
      </linearGradient>
    </defs>
  );
}
