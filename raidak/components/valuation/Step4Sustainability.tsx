"use client";

import { useValuation } from "@/store/valuationStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Leaf } from "lucide-react";
import marketData from "@/data/market_data.json";

export const Step4Sustainability = () => {
  const { request, updateRequest } = useValuation();

  const toggleFeature = (featureId: string) => {
    const current = request.sustainabilityFeatures || [];
    const updated = current.includes(featureId)
      ? current.filter((id) => id !== featureId)
      : [...current, featureId];
    updateRequest({ sustainabilityFeatures: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
          <Leaf className="size-5" />
        </div>
        <h3 className="text-xl font-heading font-bold">خصائص الاستدامة</h3>
      </div>

      <div className="space-y-4">
        {marketData.sustainability_features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white dark:bg-zinc-900 shadow-sm"
          >
            <div className="space-y-0.5">
              <Label className="text-base font-bold">{feature.name_ar}</Label>
              <p className="text-xs text-muted-foreground">
                يزيد من مؤشر الاستدامة بمقدار {feature.score_boost} نقاط.
              </p>
            </div>
            <Switch
              checked={request.sustainabilityFeatures?.includes(feature.id)}
              onCheckedChange={() => toggleFeature(feature.id)}
              className="data-checked:bg-secondary"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
