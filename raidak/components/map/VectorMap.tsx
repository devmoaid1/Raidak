'use client';

import React, { useState, useMemo } from 'react';
import { DistrictPolygon, districts as geoDistricts, coastline } from '@/data/qunfudhah_geo';
import marketData from '@/data/market_data.json';
import { District, ActiveFilter } from '@/lib/map/types';
import { getEstedamaTier } from '@/lib/map/projection';
import MapShaders from './MapShaders';
import EstedamaNode from './EstedamaNode';
import DistrictPanel from './DistrictPanel';

type MergedDistrict = DistrictPolygon & District;

interface MapPolygonProps {
  district: MergedDistrict;
  onClick: (d: MergedDistrict) => void;
}

const MapPolygon = React.memo(({ district, onClick }: MapPolygonProps) => {
  const pointsStr = district.points.map(p => p.join(',')).join(' ');
  return (
    <polygon
      points={pointsStr}
      fill={district.isCoastal ? 'url(#coastal-premium)' : 'url(#land-gradient)'}
      className="stroke-white/5 stroke-[0.5] transition-all duration-300 hover:brightness-125 cursor-pointer"
      onClick={() => onClick(district)}
    />
  );
});

MapPolygon.displayName = 'MapPolygon';

interface VectorMapProps {
  activeFilter: ActiveFilter;
}

export default function VectorMap({ activeFilter }: VectorMapProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Merge spatial data with market metrics
  const districtsWithData = useMemo(() => {
    // Navigate through city and district structure in market_data.json
    const qunfudhahDistricts = marketData.cities.find(c => c.id === 'qunfudhah')?.districts || [];
    
    return geoDistricts.map(geo => {
      const data = qunfudhahDistricts.find(d => d.id === geo.id);
      return {
        ...geo,
        ...(data || {
          base_price_sqm: 0,
          demand_index: 0,
          roi_annual_percent: 0,
          sustainability_baseline: 0,
        })
      } as MergedDistrict;
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - transform.x, y: touch.clientY - transform.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setTransform(prev => ({
      ...prev,
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    }));
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale * delta, 0.5), 3)
    }));
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onWheel={handleWheel}
    >
      <div 
        className="w-full h-full transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: 'center center'
        }}
      >
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <MapShaders />

          {/* Layer 0: Sea Background */}
          <rect width="800" height="600" fill="url(#sea-gradient)" />
          
          {/* Layer 1: Coastline Shimmer */}
          <path 
            d={coastline.d} 
            fill="url(#sea-gradient)" 
            filter="url(#coastline-glow)" 
          />

          {/* Layer 2: District Polygons */}
          <g filter="url(#map-depth)">
            {districtsWithData.map((d) => (
              <MapPolygon 
                key={d.id} 
                district={d} 
                onClick={(dist) => setSelectedDistrict(dist as District)} 
              />
            ))}
          </g>

          {/* Layer 3: Estedama Nodes */}
          {districtsWithData.map((d) => {
            const tier = getEstedamaTier(d.sustainability_baseline);
            
            // Logic for filter state
            const isActive = activeFilter !== 'all';
            let isFiltered = false;

            if (activeFilter === 'high') {
              isFiltered = tier === 'high';
            } else if (activeFilter === 'medium') {
              isFiltered = tier === 'medium' || tier === 'high';
            } else if (activeFilter === 'future') {
              isFiltered = d.isCoastal;
            }

            return (
              <EstedamaNode
                key={`node-${d.id}`}
                district={d as District}
                tier={tier}
                centroid={d.centroid}
                isSelected={selectedDistrict?.id === d.id}
                isFiltered={isFiltered}
                isActive={isActive}
                onClick={(dist) => setSelectedDistrict(dist)}
              />
            );
          })}
        </svg>
      </div>

      {/* Overlay: Detail Panel */}
      <DistrictPanel 
        district={selectedDistrict} 
        onClose={() => setSelectedDistrict(null)} 
      />
    </div>
  );
}
