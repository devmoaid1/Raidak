'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Leaf, Shield, Globe, Map as MapIcon, Info } from 'lucide-react';
import VectorMap from '@/components/map/VectorMap';
import { Badge } from '@/components/ui/badge';

type FilterType = 'all' | 'high' | 'medium' | 'future';

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters = [
    { id: 'all', label: 'الكل', icon: MapIcon, color: 'border-slate-500' },
    { id: 'high', label: 'استدامة عالية', icon: Leaf, color: 'border-emerald-500' },
    { id: 'medium', label: 'استدامة متوسطة', icon: Shield, color: 'border-orange-500' },
    { id: 'future', label: 'مناطق مستقبلية', icon: Globe, color: 'border-blue-500' },
  ] as const;

  return (
    <div className="relative w-full h-[calc(100dvh-64px)] bg-[#080C12] overflow-hidden" dir="rtl">
      
      {/* Background Layer: Vector Map */}
      <VectorMap activeFilter={activeFilter} />

      {/* Top Bar: Breadcrumb & Title */}
      <header className="absolute top-6 start-6 z-20 flex items-center gap-4 pointer-events-none">
        <Link 
          href="/explore" 
          className="p-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-slate-800 transition-all pointer-events-auto"
        >
          <ChevronRight size={24} />
        </Link>
        <div className="flex flex-col">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-1 self-start">
            مستكشف ريـدك
          </Badge>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            خريطة القنفذة التفاعلية
          </h1>
        </div>
      </header>

      {/* Filter Aside: Desktop Top-End */}
      <aside className="absolute top-6 end-6 z-20 w-72 flex flex-col gap-4">
        <div className="bg-[rgba(15,23,42,0.85)] backdrop-blur-xl rounded-3xl border border-white/5 p-5 shadow-2xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-[0.2em]">
            <Info size={14} />
            <span>فلتر المعايير</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {filters.map((f) => {
              const Icon = f.icon;
              const isActive = activeFilter === f.id;
              
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${
                    isActive 
                    ? `bg-white/10 text-white ${f.color} border-s-4` 
                    : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">مفتاح الخريطة</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span>أداء بيئي متميز (70%+)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                <span>نمو مستدام (40-70%)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <span>قيد التطوير (أقل من 40%)</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Bottom Status: Desktop Start */}
      <footer className="absolute bottom-6 start-6 z-20 flex items-center gap-3 px-4 py-2 bg-slate-900/60 backdrop-blur-md rounded-full border border-white/5 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span>عدد الأحياء الموثقة: 20</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div>
          تحديث المسح العقاري: أبريل 2026
        </div>
      </footer>
    </div>
  );
}
