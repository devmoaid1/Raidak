"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Leaf,
  Zap,
  ThermometerSnowflake,
  Info,
  Clock,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DashboardPage() {
  // State from implementation plan
  const [sustainabilityFeatures, setSustainabilityFeatures] = useState({
    solar_panels: false,
    thermal_insulation: false,
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-heading font-black text-primary">
            لوحة التحكم
          </h1>
          <p className="text-muted-foreground text-lg italic">
            إدارة الأصول والتحليلات البيئية للعقارات.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/valuation">
            <Button className="rounded-2xl h-12 px-6 font-bold shadow-lg premium-gradient active:scale-95 transition-all">
              <Plus className="me-2 size-5" />
              تقييم عقار جديد
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden group hover:shadow-primary/10 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              التقييمات المنجزة
            </CardTitle>
            <div className="size-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <ShieldCheck className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-800">12</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Clock className="size-3" />
              آخر تقييم قبل يومين
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden group hover:shadow-primary/10 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              معدل النمو السنوي
            </CardTitle>
            <div className="size-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <TrendingUp className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-800">8.4%</div>
            <p className="text-xs text-green-600 mt-2 font-bold">
              +1.2% من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden group hover:shadow-primary/10 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              نقاط الاستدامة
            </CardTitle>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Leaf className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-800">
              74<span className="text-xl">/100</span>
            </div>
            <p className="text-xs text-primary mt-2 font-bold">
              تصنيف: عقار أخضر نشط
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-black">
                  أحدث العقارات المضافة
                </CardTitle>
                <Button variant="ghost" className="text-primary font-bold">
                  عرض الكل
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {[
                  {
                    name: "فيلا حي النرجس",
                    price: "3.2M ر.س",
                    status: "مكتمل",
                    date: "منذ ساعة",
                  },
                  {
                    name: "أرض تجارية - الملقا",
                    price: "5.1M ر.س",
                    status: "قيد المراجعة",
                    date: "منذ 5 ساعات",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <LayoutDashboard className="size-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-black text-slate-900">{item.price}</p>
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-500 border-none text-[10px] font-bold"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Sustainability Audit from implementation plan */}
        <aside className="space-y-8">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden group">
            {/* Background Decorative Sparkle */}
            <Sparkles className="absolute top-[-10px] end-[-10px] size-24 text-green-500/5 group-hover:rotate-12 transition-transform duration-700" />

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 shadow-sm border border-green-100">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="font-black text-xl italic">تدقيق الاستدامة</h3>
              </div>

              {/* Toggles mapping here from implementation plan */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white transition-all hover:shadow-md group">
                  <div className="flex items-center gap-3">
                    <Zap
                      className={`size-5 transition-colors ${sustainabilityFeatures.solar_panels ? "text-orange-500" : "text-slate-300"}`}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      ألواح شمسية
                    </span>
                  </div>
                  <Switch
                    checked={sustainabilityFeatures.solar_panels}
                    onCheckedChange={(val) =>
                      setSustainabilityFeatures((prev) => ({
                        ...prev,
                        solar_panels: val,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white transition-all hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <ThermometerSnowflake
                      className={`size-5 transition-colors ${sustainabilityFeatures.thermal_insulation ? "text-blue-500" : "text-slate-300"}`}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      عزل حراري مطور
                    </span>
                  </div>
                  <Switch
                    checked={sustainabilityFeatures.thermal_insulation}
                    onCheckedChange={(val) =>
                      setSustainabilityFeatures((prev) => ({
                        ...prev,
                        thermal_insulation: val,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Incentivization text from implementation plan */}
              <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 flex gap-3 shadow-inner">
                <Info className="size-5 text-green-600 shrink-0" />
                <p className="text-[13px] text-green-800 leading-relaxed font-bold">
                  استكمال هذه التفاصيل يمنح عقارك{" "}
                  <span className="text-green-600 underline underline-offset-4 decoration-2">
                    &quot;شارة الاستدامة&quot;
                  </span>{" "}
                  ويرفع تصنيفه في نتائج البحث بنسبة تصل إلى 25%.
                </p>
              </div>

              <Button className="w-full h-12 rounded-xl h-14 font-black shadow-lg bg-slate-900 hover:bg-slate-800 transition-all">
                حفظ التغييرات
              </Button>
            </div>
          </div>

          <Card className="border-none shadow-xl bg-primary/5 rounded-[2rem] p-6 text-center space-y-4">
            <div className="size-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="size-6 text-primary" />
            </div>
            <p className="text-sm font-bold text-primary">
              حسابك موثق بـ الهوية الوطنية
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
