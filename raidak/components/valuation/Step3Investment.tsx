"use client";

import { useValuation } from "@/store/valuationStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";

export const Step3Investment = () => {
  const { request, updateRequest } = useValuation();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border flex items-center gap-4 mb-2">
        <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
          <TrendingUp className="size-6" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-foreground">تحليل العوائد</h4>
          <p className="text-xs text-muted-foreground">يساعدنا هذا القسم في تقدير العائد الاستثماري المتوقع.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rentalIncome">الدخل الإيجاري السنوي الحالي (ريال)</Label>
        <Input
          id="rentalIncome"
          type="number"
          placeholder="اتركه فارغاً إذا لم يكن مؤجراً"
          value={request.rentalIncome || ""}
          onChange={(e) => updateRequest({ rentalIncome: Number(e.target.value) })}
          className="h-12 bg-white border-border"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-border bg-white hover:border-primary/50 transition-colors cursor-pointer group">
          <h5 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">السكن الشخصي</h5>
          <p className="text-xs text-muted-foreground">شراء بغرض السكن المباشر.</p>
        </div>
        <div className="p-4 rounded-xl border border-primary bg-primary/5 cursor-pointer">
          <h5 className="text-sm font-bold mb-1 text-primary">الاستثمار العقاري</h5>
          <p className="text-xs text-muted-foreground">شراء بغرض الإيجار أو إعادة البيع.</p>
        </div>
      </div>
    </div>
  );
};
