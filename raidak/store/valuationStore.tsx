"use client";

import React, { createContext, useContext, useState } from "react";
import { ValuationRequest, ValuationResult, calculateValuation } from "@/lib/valuationEngine";

interface ValuationContextType {
  request: Partial<ValuationRequest>;
  result: ValuationResult | null;
  step: number;
  loading: boolean;
  updateRequest: (data: Partial<ValuationRequest>) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitValuation: () => Promise<void>;
  reset: () => void;
}

const ValuationContext = createContext<ValuationContextType | undefined>(undefined);

export const ValuationProvider = ({ children }: { children: React.ReactNode }) => {
  const [request, setRequest] = useState<Partial<ValuationRequest>>({
    propertyType: "",
    area: 0,
    cityId: "",
    districtId: "",
    age: 0,
    sustainabilityFeatures: [],
  });
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const updateRequest = (data: Partial<ValuationRequest>) => {
    setRequest((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submitValuation = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2500));
    
    try {
      const valuationResult = calculateValuation(request as ValuationRequest);
      setResult(valuationResult);
      setStep(5);
    } catch (error) {
      console.error("Valuation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRequest({
      propertyType: "",
      area: 0,
      cityId: "",
      districtId: "",
      age: 0,
      sustainabilityFeatures: [],
    });
    setResult(null);
    setStep(1);
  };

  const value = {
    request,
    result,
    step,
    loading,
    updateRequest,
    nextStep,
    prevStep,
    submitValuation,
    reset,
  };

  return (
    <ValuationContext value={value}>
      {children}
    </ValuationContext>
  );
};

export const useValuation = () => {
  const context = useContext(ValuationContext);
  if (!context) {
    throw new Error("useValuation must be used within a ValuationProvider");
  }
  return context;
};
