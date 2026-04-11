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
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin,
  InfoWindow,
  useMap
} from "@vis.gl/react-google-maps";
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
const futureZones = (marketData as unknown as MarketData).future_dev_zones || [];

// Qunfudhah Center Coordinates
const QUNFUDHAH_CENTER = { lat: 19.1258, lng: 41.0772 };

export default function MapPage() {
  const [isSustainabilityFilterActive, setIsSustainabilityFilterActive] = useState<boolean>(false);
  const [isFutureVisionActive, setIsFutureVisionActive] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  // Filter Logic
  const visibleMarkers = districts.filter((point) => 
    isSustainabilityFilterActive ? point.sustainability_baseline >= 40 : true
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-50">
        
        {/* Real Google Map */}
        <div className="absolute inset-0 z-0">
          <Map
            defaultCenter={QUNFUDHAH_CENTER}
            defaultZoom={13}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || 'DEMO_MAP_ID'}
            disableDefaultUI={true}
          >
            {visibleMarkers.map((district, idx) => (
              <AdvancedMarker
                key={district.id}
                position={{ 
                  lat: QUNFUDHAH_CENTER.lat + (idx * 0.005) - 0.01, 
                  lng: QUNFUDHAH_CENTER.lng + (idx * 0.008) - 0.01 
                }}
                onClick={() => setSelectedDistrict(district)}
              >
                <Pin 
                  background={district.sustainability_baseline >= 40 ? '#10b981' : '#0055ff'} 
                  borderColor={'#ffffff'} 
                  glyphColor={'#ffffff'}
                />
              </AdvancedMarker>
            ))}

            {selectedDistrict && (
              <InfoWindow
                position={{ 
                    lat: QUNFUDHAH_CENTER.lat + (districts.findIndex(d => d.id === selectedDistrict.id) * 0.005) - 0.01, 
                    lng: QUNFUDHAH_CENTER.lng + (districts.findIndex(d => d.id === selectedDistrict.id) * 0.008) - 0.01 
                }}
                onCloseClick={() => setSelectedDistrict(null)}
              >
                <div className="p-2 min-w-[150px] text-right">
                  <p className="font-bold text-slate-900">{selectedDistrict.name_ar}</p>
                  <p className="text-xs text-slate-500">متوسط السعر: {selectedDistrict.base_price_sqm} ر.س</p>
                </div>
              </InfoWindow>
            )}
          </Map>
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
            خريطة القنفذة التفاعلية (Google Maps SDK)
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
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">دليل الخريطة</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-end gap-2 text-xs font-medium">
                <span>أحياء نشطة</span>
                <div className="size-3 rounded-full bg-[#0055ff]" />
              </div>
              {isFutureVisionActive && (
                <div className="flex items-center justify-end gap-2 text-xs font-medium">
                  <span>مشاريع مستقبلية</span>
                  <div className="size-3 rounded-full bg-blue-500" />
                </div>
              )}
              <div className="flex items-center justify-end gap-2 text-xs font-medium">
                <span>عقارات مستدامة</span>
                <div className="size-3 rounded-full bg-[#10b981]" />
              </div>
            </div>
          </div>
        </div>

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

        {/* API Warning if no key */}
        {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <div className="absolute bottom-6 start-6 z-50">
             <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl shadow-lg flex items-center gap-3">
                <Info className="size-5 text-orange-600" />
                <p className="text-xs text-orange-800 font-bold">
                  تنبيه: مفتاح Google Maps API غير متوفر. الخريطة تعمل في وضع التطوير.
                </p>
             </div>
          </div>
        )}

        {/* Floating Info Button */}
        <div className="absolute bottom-6 end-6">
          <Button variant="ghost" size="icon" className="size-10 rounded-full bg-white/50 backdrop-blur-sm border border-white/50 text-slate-400">
            <Info className="size-5" />
          </Button>
        </div>
      </div>
    </APIProvider>
  );
}
