"use client";

import { ValuationProvider, useValuation } from "@/store/valuationStore";
import { Step1Basics } from "@/components/valuation/Step1Basics";
import { Step2Location } from "@/components/valuation/Step2Location";
import { Step3Investment } from "@/components/valuation/Step3Investment";
import { Step4Sustainability } from "@/components/valuation/Step4Sustainability";
import { ProcessingSimulation } from "@/components/valuation/ProcessingSimulation";
import { ValuationResults } from "@/components/valuation/ValuationResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const ValuationWizard = () => {
  const { step, loading, nextStep, prevStep, submitValuation, request } = useValuation();

  const isStepValid = () => {
    if (step === 1) return request.propertyType && request.area && request.age;
    if (step === 2) return request.cityId && request.districtId;
    // Step 3 & 4 are optional/always valid in this mock
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Basics />;
      case 2: return <Step2Location />;
      case 3: return <Step3Investment />;
      case 4: return <Step4Sustainability />;
      default: return <Step1Basics />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-20">
        <Card className="border-none shadow-2xl bg-white group glass-card overflow-hidden">
          <ProcessingSimulation />
        </Card>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <ValuationResults />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-extrabold text-foreground">بدء عملية التقييم</h1>
        <p className="text-muted-foreground">أكمل الخطوات التالية للحصول على أدق تقييم لعقارك</p>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-between px-2 relative">
        <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-border -z-10 -translate-y-1/2" />
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`size-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              s < step
                ? "bg-secondary text-white"
                : s === step
                ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground border border-border"
            }`}
          >
            {s < step ? <CheckCircle2 className="size-6" /> : s}
          </div>
        ))}
      </div>

      {/* Main Form Card */}
      <Card className="border-none shadow-2xl bg-white group glass-card overflow-hidden">
        <CardContent className="p-8">
          {renderStep()}

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-xl px-6"
            >
              <ArrowRight className="me-2 size-5" />
              السابق
            </Button>

            {step < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="rounded-xl px-8 bg-primary hover:bg-primary/90"
              >
                التالي
                <ArrowLeft className="ms-2 size-5" />
              </Button>
            ) : (
              <Button
                onClick={submitValuation}
                className="rounded-xl px-8 bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20"
              >
                عرض النتائج
                <ArrowLeft className="ms-2 size-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        بياناتك محمية ومشفرة وفقاً لأعلى معايير الأمان العقاري في المملكة.
      </p>
    </div>
  );
};

export default function ValuationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ValuationProvider>
        <ValuationWizard />
      </ValuationProvider>
    </div>
  );
}
