"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const ProcessingSimulation = () => {
  const [status, setStatus] = useState("جاري تحليل البيانات العقارية...");
  
  useEffect(() => {
    const sequence = [
      { text: "جاري تحليل البيانات العقارية...", delay: 800 },
      { text: "حساب مؤشرات الاستدامة...", delay: 1600 },
      { text: "تقدير القيمة السوقية العادلة...", delay: 2200 },
    ];
    
    sequence.forEach((step) => {
      setTimeout(() => {
        setStatus(step.text);
      }, step.delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <Loader2 className="size-16 text-primary animate-spin relative z-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-heading font-bold text-foreground transition-all duration-300">
          {status}
        </h3>
        <p className="text-sm text-muted-foreground">نحن نقوم بمعالجة آلاف من نقاط البيانات لضمان دقة التقييم.</p>
      </div>
    </div>
  );
};
