"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Leaf, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ThermometerSnowflake,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import propertiesData from "@/data/properties.json";
import marketData from "@/data/market_data.json";

// AI Price Gauge Algorithm from implementation plan
function simulateAIPriceGauge(
  inputPrice: number, 
  area: number, 
  basePriceSqm: number, 
  typeMultiplier: number, 
  sustainabilityScore: number
): { status: string; color: string; bgColor: string } {
  const sustainabilityBonus = 1 + (sustainabilityScore / 100);
  const calculatedFairValue = area * basePriceSqm * typeMultiplier * sustainabilityBonus;
  
  const tolerance = 0.05; // 5% buffer
  
  if (inputPrice < calculatedFairValue * (1 - tolerance)) {
    return { status: "أقل من سعر السوق", color: "text-blue-600", bgColor: "bg-blue-50" };
  } else if (inputPrice > calculatedFairValue * (1 + tolerance)) {
    return { status: "أعلى من سعر السوق", color: "text-orange-600", bgColor: "bg-orange-50" };
  } else {
    return { status: "سعر عادل ✅", color: "text-green-600", bgColor: "bg-green-50" };
  }
}

// Exact Logic for Savings calculations from implementation plan
const calcSavings = (features: string[]) => features.includes('solar_panels') ? '35%' : '15%';

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = propertiesData.find(p => p.id === id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">العقار غير موجود</h1>
        <Link href="/explore">
          <Button variant="link">العودة للاستكشاف</Button>
        </Link>
      </div>
    );
  }

  // Get market data for calculations
  const cityData = marketData.cities.find(c => c.id === property.city);
  const districtData = cityData?.districts.find(d => d.id === property.district);
  const typeData = marketData.property_types.find(t => t.id === property.type);

  const basePriceSqm = districtData?.base_price_sqm || 2000;
  const typeMultiplier = typeData?.multiplier || 1.0;

  const gauge = simulateAIPriceGauge(
    property.price,
    property.area,
    basePriceSqm,
    typeMultiplier,
    property.sustainability_baseline
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/explore" className="hover:text-primary transition-colors">استكشف</Link>
        <ChevronRight className="size-4 rotate-180" />
        <span className="text-foreground font-medium">{property.name_ar}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Visuals & Info */}
        <div className="lg:col-span-2 space-y-12">
          {/* Main Visual */}
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image 
              src={property.image} 
              alt={property.name_ar}
              fill
              className="object-cover"
              priority
            />
            {property.sustainability_baseline >= 70 && (
              <div className="absolute top-8 start-8 flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-black shadow-xl animate-bounce">
                <Leaf className="size-5" />
                <span>عقار أخضر معتمد</span>
              </div>
            )}
          </div>

          {/* Property Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
               <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 rounded-full text-sm font-bold">
                {typeData?.name_ar || 'عقار'}
              </Badge>
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <MapPin className="size-4" />
                {districtData?.name_ar}، {cityData?.name_ar}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 leading-tight">
              {property.name_ar}
            </h1>
          </div>

          {/* AI Price Gauge Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 text-primary" />
              <h2 className="text-2xl font-black">تحليل السعر الذكي (رائدك AI)</h2>
            </div>
            
            <Card className="border-none shadow-xl bg-slate-50 overflow-hidden rounded-[2rem]">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-2 text-center md:text-start">
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">السعر المطلوب</p>
                    <p className="text-5xl font-black text-slate-900">{property.price.toLocaleString('ar-SA')} <span className="text-2xl font-bold">ر.س</span></p>
                  </div>

                  <div className={`px-8 py-6 rounded-[2rem] border-2 flex items-center justify-center gap-4 transition-all hover:scale-105 ${gauge.bgColor} ${gauge.color} border-current/10`}>
                    {gauge.status.includes('أقل') ? <TrendingDown className="size-8" /> : <TrendingUp className="size-8" />}
                    <div className="text-center md:text-start">
                      <p className="font-black text-lg leading-none mb-1">{gauge.status}</p>
                      <p className="text-sm opacity-80 font-medium whitespace-nowrap">بناءً على تحليل 24 متغيراً حياً</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-100 flex items-start gap-3">
                  <Info className="size-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    يعتمد التقييم الذكي على دمج متوسط سعر المتر في <span className="font-bold text-slate-800">{districtData?.name_ar}</span> ({basePriceSqm} ر.س) مع معامل النوع ({typeMultiplier}x) وإضافة علاوة الاستدامة البالغة <span className="font-bold text-slate-800">%{property.sustainability_baseline}</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Raidak Green Report - Bento Grid from implementation plan */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Leaf className="size-6 text-green-500" />
              <h2 className="text-2xl font-black">تقرير رائدك الأخضر 🌿</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Bill Savings */}
              <div className="p-8 bg-green-50 rounded-[2.5rem] border border-green-100 flex flex-col justify-between h-64 group hover:bg-green-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-green-600 shadow-sm border border-green-100">
                    <Zap className="size-7" />
                  </div>
                  <Badge className="bg-green-200 text-green-800 border-none font-black">مقترح</Badge>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-green-900 mb-2">توفير الفواتير</h4>
                  <p className="text-green-700 font-medium leading-relaxed">تخفيض مقدر بـ <span className="text-3xl font-black mx-1">{calcSavings(property.features)}</span> في فواتير الكهرباء الشهرية.</p>
                </div>
              </div>

              {/* Box 2: Heat Insulation */}
              <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex flex-col justify-between h-64 group hover:bg-blue-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <ThermometerSnowflake className="size-7" />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="size-8 rounded-full bg-white flex items-center justify-center text-blue-300 pointer-cursor">
                          <Info className="size-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>بناءً على الكود السعودي الجديد</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-blue-900 mb-2">جودة العزل</h4>
                  <p className="text-blue-700 font-medium leading-relaxed">كفاءة العزل الحراري: <span className="text-3xl font-black mx-1">90%</span> نتيجة استخدام مواد متقدمة.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Interaction & Features */}
        <div className="space-y-8">
          {/* Action Card */}
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden sticky top-24">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-800">هل تهتم بهذا العقار؟</h3>
                <p className="text-muted-foreground font-medium">احصل على تحليل استثماري مفصل أو تواصل مع المالك مباشرة.</p>
              </div>

              <div className="space-y-4">
                <Button className="w-full h-14 rounded-2xl text-lg font-black premium-gradient shadow-xl hover:shadow-primary/30 active:scale-95 transition-all">
                  طلب تحليل استثماري
                </Button>
                <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-slate-200">
                  تواصل مع المالك
                </Button>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest text-center">خدمات رائدك المضمونة</p>
                <div className="grid grid-cols-3 gap-4">
                   <div className="flex flex-col items-center gap-1">
                      <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <CheckCircle2 className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">توثيق</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <ShieldCheck className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">حماية</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <TrendingUp className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">عوائد</span>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
