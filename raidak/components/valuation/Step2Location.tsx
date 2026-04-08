"use client";

import { useValuation } from "@/store/valuationStore";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import marketData from "@/data/market_data.json";
import { useState } from "react";

export const Step2Location = () => {
  const { request, updateRequest } = useValuation();
  const [selectedCity, setSelectedCity] = useState(request.cityId || "");

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    updateRequest({ cityId, districtId: "" }); // Reset district when city changes
  };

  const currentCity = marketData.cities.find(c => c.id === selectedCity);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label htmlFor="city">المدينة</Label>
        <Select
          value={selectedCity}
          onValueChange={handleCityChange}
        >
          <SelectTrigger id="city" className="w-full h-12 bg-white dark:bg-zinc-900 border-border">
            <SelectValue placeholder="اختر المدينة" />
          </SelectTrigger>
          <SelectContent>
            {marketData.cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name_ar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">الحي</Label>
        <Select
          value={request.districtId}
          onValueChange={(val) => updateRequest({ districtId: val })}
          disabled={!selectedCity}
        >
          <SelectTrigger id="district" className="w-full h-12 bg-white dark:bg-zinc-900 border-border">
            <SelectValue placeholder={selectedCity ? "اختر الحي" : "يجب اختيار المدينة أولاً"} />
          </SelectTrigger>
          <SelectContent>
            {currentCity?.districts.map((district) => (
              <SelectItem key={district.id} value={district.id}>
                {district.name_ar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCity && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary flex items-start gap-3">
          <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            !
          </div>
          <p>
            تعتمد دقة التقييم على البيانات الحية المتوفرة لحي <span className="font-bold">{currentCity?.name_ar}</span> والمنطقة المحيطة.
          </p>
        </div>
      )}
    </div>
  );
};
