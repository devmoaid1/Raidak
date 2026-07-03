'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronLeft, MapPin, TrendingUp, DollarSign, Leaf } from 'lucide-react';
import { District } from '@/lib/map/types';
import { getEstedamaTier } from '@/lib/map/projection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DistrictPanelProps {
  district: District | null;
  onClose: () => void;
}

export default function DistrictPanel({ district, onClose }: DistrictPanelProps) {
  if (!district) return null;

  const tier = getEstedamaTier(district.sustainability_baseline);
  
  const tierLabels = {
    high: { text: "استدامة عالية", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    medium: { text: "استدامة متوسطة", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    blank: { text: "تحت التطوير", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" }
  };

  const currentTier = tierLabels[tier];

  return (
    <aside 
      className={`fixed inset-y-0 start-0 z-50 w-80 md:w-96 bg-[rgba(15,23,42,0.95)] backdrop-blur-xl border-e border-white/5 transition-transform duration-300 transform ${district ? 'translate-x-0' : '-translate-x-full'}`}
      dir="rtl"
    >
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <Badge variant="outline" className={`${currentTier.color} px-3 py-1`}>
            {currentTier.text}
          </Badge>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <MapPin size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">حي سكني</span>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight">
            {district.name_ar}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <DollarSign size={14} />
              <span>سعر المتر</span>
            </div>
            <div className="text-lg font-bold text-white">
              {district.base_price_sqm.toLocaleString()} <span className="text-xs font-normal text-slate-500">ر.س</span>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <TrendingUp size={14} />
              <span>العائد السنوي</span>
            </div>
            <div className="text-lg font-bold text-white">
              {district.roi_annual_percent}%
            </div>
          </div>

          <div className="col-span-2 bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Leaf size={14} />
                <span>درجة الاستدامة</span>
              </div>
              <span className="text-sm font-bold text-white">{district.sustainability_baseline}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  tier === 'high' ? 'bg-emerald-500' : tier === 'medium' ? 'bg-orange-500' : 'bg-slate-500'
                }`}
                style={{ width: `${district.sustainability_baseline}%` }}
              />
            </div>
          </div>

          <div className="col-span-2 bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">مؤشر الطلب</span>
              <span className="text-sm font-bold text-white">
                {(district.demand_index * 100).toFixed(0)}/100
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Link href="/explore" className="block w-full">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-14 rounded-2xl text-lg font-bold gap-2 group"
            >
              <span>تحليل الحي الكامل</span>
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-center text-slate-500 text-[10px] mt-4">
            تخضع هذه البيانات للتحديث المستمر بناءً على مؤشرات السوق العقاري في القنفذة
          </p>
        </div>
      </div>
    </aside>
  );
}
