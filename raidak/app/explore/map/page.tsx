"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  MapPin, 
  Leaf, 
  Sparkles, 
  Layers, 
  LocateFixed,
  Info,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import marketData from "@/data/market_data.json";

// Type definitions for market data
interface District {
  id: string;
  name_ar: string;
  base_price_sqm: number;
  demand_index: number;
  roi_annual_percent: number;
  sustainability_baseline: number;
}

interface FutureZone {
  id: string;
  name_ar: string;
  type: string;
  coordinates: { lat: number; lng: number }[];
  expected_completion: string;
  impact_metric_multiplier: number;
}

interface MarketData {
  cities: {
    id: string;
    name_ar: string;
    districts: District[];
  }[];
  future_dev_zones: FutureZone[];
}

// Extract Qunfudhah data
const qunfudhah = (marketData as unknown as MarketData).cities.find(c => c.id === 'qunfudhah');
const districts = qunfudhah?.districts || [];

export default function MapPage() {
  const [isSustainabilityFilterActive, setIsSustainabilityFilterActive] = useState<boolean>(false);
  const [isFutureVisionActive, setIsFutureVisionActive] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  // Filter Logic from implementation plan
  const visibleMarkers = districts.filter((point) => 
    isSustainabilityFilterActive ? point.sustainability_baseline >= 40 : true
  );

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-50">
      {/* Simulation Background (Red Sea / Qunfudhah Coast Pattern) */}
      <div className="absolute inset-0 -z-10 bg-slate-100 opacity-50">
          <div className="absolute top-0 start-0 w-full h-full bg-[radial-gradient(#0055ff0a_2px,transparent_2px)] [background-size:32px_32px]" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border-[100px] border-white/40 rounded-full blur-3xl" />
      </div>
      
      {/* Map Header / Breadcrumbs */}
      <div className="absolute top-6 start-6 z-20 flex items-center gap-3">
        <Link href="/explore">
          <Button variant="secondary" size="sm" className="rounded-full bg-white/80 backdrop-blur-md border-slate-200 shadow-sm font-bold">
            <ArrowRight className="me-2 size-4" />
            العودة للاستكشاف
          </Button>
        </Link>
        <Badge variant="outline" className="bg-white/80 backdrop-blur-md py-1.5 px-3 border-primary/20 text-primary font-bold">
          خريطة القنفذة التفاعلية (Pure Simulation)
        </Badge>
      </div>

      {/* Floating Filter Panel - Top End */}
      <div className="absolute top-6 end-6 z-20 w-72 space-y-4 text-right">
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
          <div className="flex items-center justify-end gap-2 mb-2">
            <h3 className="font-black text-lg">مخططات القنفذة</h3>
            <Layers className="size-5 text-primary" />
          </div>
          
          <div className="flex items-center justify-between group">
            <Switch 
              checked={isSustainabilityFilterActive} 
              onCheckedChange={setIsSustainabilityFilterActive}
            />
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">فرز الاستدامة</span>
              <div className={`p-2 rounded-xl transition-colors ${isSustainabilityFilterActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                <Leaf className="size-4" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between group">
            <Switch 
              checked={isFutureVisionActive} 
              onCheckedChange={setIsFutureVisionActive}
            />
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">رؤية 2030 التطويرية</span>
              <div className={`p-2 rounded-xl transition-colors ${isFutureVisionActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                <Sparkles className="size-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-lg">
          <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3 text-right">دليل الخريطة</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2 text-xs font-medium">
              <span>أحياء نشطة</span>
              <div className="size-3 rounded-full bg-primary" />
            </div>
            {isFutureVisionActive && (
              <div className="flex items-center justify-end gap-2 text-xs font-medium">
                <span>مشاريع مستقبلية</span>
                <div className="size-3 rounded-full bg-blue-500" />
              </div>
            )}
            <div className="flex items-center justify-end gap-2 text-xs font-medium">
              <span>عقارات مستدامة</span>
              <div className="size-3 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Interactive Content */}
      <div className="relative w-full h-full flex items-center justify-center p-20">
        <div className="relative w-full h-full bg-slate-200/30 rounded-[3rem] border-4 border-white/50 shadow-inner overflow-hidden">
          
          {/* Vision Polygons Logic */}
          {isFutureVisionActive && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[20%] start-[30%] w-[40%] h-[20%] bg-blue-500/20 border-2 border-blue-500/50 rounded-[4rem] flex items-center justify-center animate-pulse">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                   واجهة القنفذة البحرية
                </span>
              </div>
            </div>
          )}

          {/* District Markers */}
          <TooltipProvider>
            {visibleMarkers.map((district, idx) => (
              <div 
                key={district.id}
                className="absolute transition-all duration-500 hover:z-50"
                style={{ 
                  top: `${25 + (idx * 8)}%`, 
                  insetInlineStart: `${20 + (idx * 12)}%` 
                }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className={`group relative flex items-center justify-center size-10 rounded-full shadow-lg transition-transform hover:scale-125 bg-white border-2 ${
                        district.sustainability_baseline >= 40 ? 'border-green-500 text-green-600' : 'border-primary text-primary'
                      }`}
                      onClick={() => setSelectedDistrict(district)}
                    >
                      <MapPin className="size-5 fill-current opacity-20" />
                      <div className={`absolute -top-1 -end-1 size-3 rounded-full border-2 border-white ${
                        district.sustainability_baseline >= 40 ? 'bg-green-500' : 'bg-primary'
                      }`} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-900 text-white border-none rounded-xl p-3 shadow-2xl">
                    <div className="space-y-1 text-right">
                      <p className="font-bold">{district.name_ar}</p>
                      <p className="text-[10px] opacity-70">متوسط السعر: {district.base_price_sqm} ر.س/م²</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>

          {/* District Details Overlay */}
          {selectedDistrict && (
            <div className="absolute bottom-10 start-1/2 -translate-x-1/2 z-30 w-[400px] bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-bottom-4 text-right">
              <button 
                className="absolute top-4 start-4 size-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                onClick={() => setSelectedDistrict(null)}
              >
                <ChevronRight className="size-4 rotate-180" />
              </button>
              
              <div className="flex items-start justify-end gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black">{selectedDistrict.name_ar}</h3>
                  <div className="flex items-center justify-end gap-2">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-bold">
                      مؤشر الطلب: {selectedDistrict.demand_index}
                    </Badge>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${selectedDistrict.sustainability_baseline >= 40 ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary'}`}>
                  <MapPin className="size-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-muted-foreground font-black uppercase mb-1">الاستدامة</p>
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-lg font-black text-slate-800">%{selectedDistrict.sustainability_baseline}</p>
                    <Leaf className={`size-4 ${selectedDistrict.sustainability_baseline >= 40 ? 'text-green-500' : 'text-slate-300'}`} />
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-muted-foreground font-black uppercase mb-1">متوسط المتر</p>
                  <p className="text-lg font-black text-slate-800">{selectedDistrict.base_price_sqm} ر.س</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" size="icon" className="size-12 rounded-2xl border-slate-200">
                  <LocateFixed className="size-5" />
                </Button>
                <Button className="flex-1 rounded-2xl h-12 font-bold premium-gradient">
                  تحليل الحي الكامل
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Info Button */}
      <div className="absolute bottom-6 end-6">
        <Button variant="ghost" size="icon" className="size-10 rounded-full bg-white/50 backdrop-blur-sm border border-white/50 text-slate-400">
          <Info className="size-5" />
        </Button>
      </div>
    </div>
  );
}
