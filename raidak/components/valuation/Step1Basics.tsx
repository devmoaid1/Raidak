"use client";

import { useValuation } from "@/store/valuationStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import marketData from "@/data/market_data.json";

export const Step1Basics = () => {
  const { request, updateRequest } = useValuation();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label htmlFor="propertyType">نوع العقار</Label>
        <Select
          value={request.propertyType}
          onValueChange={(val) => updateRequest({ propertyType: val })}
        >
          <SelectTrigger id="propertyType" className="w-full h-12 bg-white border-border">
            <SelectValue placeholder="اختر نوع العقار" />
          </SelectTrigger>
          <SelectContent>
            {marketData.property_types.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name_ar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">المساحة الإجمالية (م²)</Label>
        <Input
          id="area"
          type="number"
          placeholder="مثلاً: 400"
          value={request.area || ""}
          onChange={(e) => updateRequest({ area: Number(e.target.value) })}
          className="h-12 bg-white border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">عمر العقار (بالسنوات)</Label>
        <Input
          id="age"
          type="number"
          placeholder="مثلاً: 5"
          value={request.age || ""}
          onChange={(e) => updateRequest({ age: Number(e.target.value) })}
          className="h-12 bg-white border-border"
        />
      </div>
    </div>
  );
};
