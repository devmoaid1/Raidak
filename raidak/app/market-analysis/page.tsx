import { ShieldCheck, BarChart3, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketAnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-primary">تحليل السوق العقاري</h1>
        <p className="text-xl text-muted-foreground">استكشف الاتجاهات السوقية والبيانات الضخمة للعقارات في كافة مناطق المملكة العربية السعودية.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardHeader>
            <BarChart3 className="size-10 mb-2 opacity-80" />
            <CardTitle className="text-2xl font-heading">مؤشرات الرياض</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-foreground/80 mb-6">نمو مستمر في القطاع السكني والتجاري بمتوسط 12% سنوياً.</p>
            <div className="flex items-center justify-between text-sm">
              <span>نسبة النمو</span>
              <span className="font-bold flex items-center gap-1">
                <TrendingUp className="size-4" />
                +12%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white">
          <CardHeader>
            <Globe className="size-10 text-secondary mb-2" />
            <CardTitle className="text-2xl font-heading text-primary">التغطية الجغرافية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">تغطية ذكية لأكثر من 100 حي في المدن الكبرى (جدة، الدمام، مكة).</p>
            <div className="p-4 rounded-xl bg-accent text-primary text-xs font-bold text-center">
              بيانات حية محدثة لحظياً
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white">
          <CardHeader>
            <ShieldCheck className="size-10 text-secondary mb-2" />
            <CardTitle className="text-2xl font-heading text-primary">بيانات معتمد</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">نعتمد في تحليلاتنا على البيانات الرسمية من إيجار والبورصة العقارية السعودية.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl bg-white overflow-hidden">
        <div className="p-12 text-center space-y-6">
          <div className="size-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="size-10 text-primary" />
          </div>
          <h2 className="text-3xl font-heading font-black text-primary">قريباً: لوحات بيانات تفاعلية</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">نحن نعمل على تطوير خرائط حرارية وتحليلات متقدمة لتمكينك من اتخاذ قرارات استثمارية مبنية على البيانات.</p>
        </div>
      </Card>
    </div>
  );
}
