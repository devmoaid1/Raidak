"use client";

import { useValuation } from "@/store/valuationStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  MapPin, 
  Leaf, 
  ShieldCheck, 
  ArrowUpRight, 
  Building2,
  Table as TableIcon
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

export const ValuationResults = () => {
  const { result, request, reset } = useValuation();

  if (!result) return null;

  const chartData = result.appreciation10Years.map((value, index) => ({
    year: new Date().getFullYear() + index + 1,
    value: value,
  }));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
            <ShieldCheck className="size-3" />
            تقرير تقييم معتمد
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-foreground">نتائج التقييم العقاري</h2>
          <p className="text-muted-foreground flex items-center gap-1.5">
            <MapPin className="size-4" />
            {request.cityId}، {request.districtId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border">تحميل التقرير (PDF)</Button>
          <Button onClick={reset} className="rounded-xl bg-primary">تقييم جديد</Button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {/* Primary Valuation Widget - Spans 4 columns on large */}
        <Card className="md:col-span-4 overflow-hidden border-none shadow-2xl bg-gradient-to-br from-primary to-primary/80 text-white relative group">
          <div className="absolute top-0 end-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Building2 className="size-32" />
          </div>
          <CardContent className="p-10 relative z-10 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <span className="text-primary-foreground/70 font-medium">القيمة التقديرية للعقار</span>
              <h3 className="text-5xl md:text-6xl font-heading font-black tabular-nums">
                {formatCurrency(result.estimatedValue)}
              </h3>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div className="space-y-1">
                <span className="text-xs text-primary-foreground/60">سعر المتر في الحي</span>
                <p className="text-lg font-bold">{formatCurrency(result.districtAverage)}</p>
              </div>
              <div className="size-px h-10 bg-white/20" />
              <div className="space-y-1">
                <span className="text-xs text-primary-foreground/60">مؤشر الطلب</span>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">مرتفع</p>
                  <ArrowUpRight className="size-5 text-secondary" />
                </div>
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 start-0 w-full h-1 bg-secondary/30" />
        </Card>

        {/* Sustainability Score Widget */}
        <Card className="md:col-span-2 overflow-hidden border-none shadow-xl bg-white flex flex-col items-center justify-center p-8">
          <CardHeader className="p-0 mb-6 text-center">
            <CardTitle className="text-lg font-heading font-bold flex items-center gap-2">
              <Leaf className="size-5 text-secondary" />
              مؤشر الاستدامة
            </CardTitle>
          </CardHeader>
          <div className="relative size-40">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted/30"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * result.sustainabilityScore) / 100}
                className="text-secondary transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-foreground">{result.sustainabilityScore}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">نقطة</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-center text-muted-foreground leading-relaxed">
            يتوافق عقارك بنسبة <span className="text-secondary font-bold">{result.sustainabilityScore}%</span> مع معايير كود البناء السعودي الأخضر.
          </p>
        </Card>

        {/* ROI Matrix Widget - Spans 4 columns */}
        <Card className="md:col-span-4 overflow-hidden border-none shadow-xl bg-white">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-heading font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                توقعات النمو المالي (10 سنوات)
              </div>
              <div className="text-sm font-normal text-muted-foreground">
                العائد السنوي المتوقع: <span className="text-secondary font-bold">%{result.roiAnnual}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="ps-0 pe-8 pb-8 pt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#888'}} 
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 100000', 'dataMax + 100000']} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value: number | string | readonly (number | string)[] | undefined) => [formatCurrency(Number(Array.isArray(value) ? value[0] : (value ?? 0))), 'القيمة المتوقعة']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparative Analysis Widget */}
        <Card className="md:col-span-2 overflow-hidden border-none shadow-xl bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-lg font-heading font-bold flex items-center gap-2">
              <TableIcon className="size-5 text-orange-500" />
              مقارنة الحي
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">متوسط المنطقة</span>
              <span className="text-sm font-bold">{formatCurrency(result.districtAverage * request.area!)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">عقارك</span>
              <span className="text-sm font-bold text-primary">{formatCurrency(result.estimatedValue)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">الفارق</span>
              <span className="text-sm font-bold text-secondary">
                +{Math.round(((result.estimatedValue - (result.districtAverage * request.area!)) / (result.districtAverage * request.area!)) * 100)}%
              </span>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-zinc-50 text-[10px] text-muted-foreground leading-relaxed italic">
              * تم حساب الفارق بناءً على مواصفات عقارك الفردية وإضافات الاستدامة مقارنة بالعقار التقليدي في نفس الحي.
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
