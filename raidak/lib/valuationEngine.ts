import marketData from "@/data/market_data.json";

export interface ValuationRequest {
  propertyType: string;
  area: number;
  cityId: string;
  districtId: string;
  age: number;
  sustainabilityFeatures: string[];
  rentalIncome?: number;
}

export interface ValuationResult {
  estimatedValue: number;
  roiAnnual: number;
  sustainabilityScore: number;
  appreciation10Years: number[];
  districtAverage: number;
}

export const calculateValuation = (request: ValuationRequest): ValuationResult => {
  const city = marketData.cities.find((c) => c.id === request.cityId);
  const district = city?.districts.find((d) => d.id === request.districtId);
  const propertyType = marketData.property_types.find((p) => p.id === request.propertyType);

  if (!district || !propertyType) {
    throw new Error("بيانات الموقع أو نوع العقار غير صحيحة");
  }

  // Base calculation
  let basePrice = district.base_price_sqm * request.area;
  
  // Apply property type multiplier
  basePrice *= propertyType.multiplier;
  
  // Apply demand index
  basePrice *= district.demand_index;
  
  // Age depreciation (simple linear 1% per year up to 30%)
  const ageDepreciation = Math.min(request.age * 0.01, 0.3);
  basePrice *= (1 - ageDepreciation);
  
  // Sustainability boost
  let sustainabilityScore = district.sustainability_baseline;
  let sustainabilityValueMultiplier = 1.0;
  
  request.sustainabilityFeatures.forEach(featureId => {
    const feature = marketData.sustainability_features.find(f => f.id === featureId);
    if (feature) {
      sustainabilityScore = Math.min(sustainabilityScore + feature.score_boost, 100);
      sustainabilityValueMultiplier *= feature.value_multiplier;
    }
  });
  
  const finalValue = Math.round(basePrice * sustainabilityValueMultiplier);
  
  // ROI Calculation
  const roiAnnual = district.roi_annual_percent;
  
  // 10-Year appreciation projection (mock logic)
  const appreciation10Years = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const growthRate = 0.04 + (district.demand_index - 1) * 0.1; // Base 4% + demand bonus
    return Math.round(finalValue * Math.pow(1 + growthRate, year));
  });

  return {
    estimatedValue: finalValue,
    roiAnnual: roiAnnual,
    sustainabilityScore: sustainabilityScore,
    appreciation10Years: appreciation10Years,
    districtAverage: district.base_price_sqm
  };
};
