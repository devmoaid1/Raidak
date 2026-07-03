'use client';

import React from 'react';
import { District, EstedamaTier } from '@/lib/map/types';

interface EstedamaNodeProps {
  district: District;
  tier: EstedamaTier;
  centroid: [number, number];
  isSelected: boolean;
  isFiltered: boolean;
  isActive: boolean;
  onClick: (district: District) => void;
}

export default function EstedamaNode({
  district,
  tier,
  centroid,
  isSelected,
  isFiltered,
  isActive,
  onClick,
}: EstedamaNodeProps) {
  const [x, y] = centroid;

  const tierColors = {
    high: { stroke: '#22C55E', fill: '#22C55E' },
    medium: { stroke: '#F97316', fill: '#F97316' },
    blank: { stroke: '#334155', fill: '#1E293B' },
  };

  const colors = tierColors[tier];
  
  // Animation logic
  const shouldAnimate = isFiltered && (tier === 'high' || tier === 'medium');
  const animationClass = shouldAnimate 
    ? tier === 'high' ? 'animate-pulse-high' : 'animate-pulse-medium'
    : '';

  // Opacity logic
  const dimmed = isActive && !isFiltered;
  const opacityClass = dimmed ? 'opacity-35' : 'opacity-100';

  return (
    <g 
      className={`cursor-pointer transition-all duration-300 ${opacityClass} ${animationClass}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(district);
      }}
      style={{
        filter: shouldAnimate 
          ? tier === 'high' ? 'url(#glow-high)' : 'url(#glow-medium)'
          : 'none'
      }}
    >
      {/* Outer Glow Ring */}
      <circle
        cx={x}
        cy={y}
        r={isSelected ? 16 : 14}
        fill="none"
        stroke={colors.stroke}
        strokeWidth={isSelected ? 3 : 2}
        className="transition-all duration-300"
      />

      {/* Inner Core Dot */}
      <circle
        cx={x}
        cy={y}
        r={6}
        fill={colors.fill}
      />

      {/* Label */}
      <text
        x={x}
        y={y + 30}
        textAnchor="middle"
        fontSize="11"
        className="fill-slate-200 font-medium pointer-events-none select-none"
      >
        {district.name_ar}
      </text>
    </g>
  );
}
