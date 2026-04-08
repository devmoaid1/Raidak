import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Leaf,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 start-0 w-full h-full -z-10">
          <div className="absolute top-[-10%] start-[-10%] size-[500px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] end-[-10%] size-[400px] bg-secondary/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8 animate-fade-in">
            <ShieldCheck className="size-4 text-secondary" />
            <span className="text-sm font-medium">المنصة العقارية الأكثر موثوقية في المملكة</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground mb-6 leading-tight max-w-4xl mx-auto">
            مستقبل <span className="text-primary italic">التقييم العقاري</span> <br /> 
            بين يديك بدقة <span className="text-secondary">الذكاء الاصطناعي</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            ريدك هي منصتك المتكاملة لتحليل الأصول العقارية في المملكة العربية السعودية. 
            احصل على تقييمات دقيقة، توقعات استثمارية، ومؤشرات استدامة في ثوانٍ.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/valuation">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-xl bg-primary hover:bg-primary/90 group">
                ابدأ التقييم الآن
                <ArrowRight className="ms-2 size-5 group-hover:translate-x-[-4px] transition-transform" />
              </Button>
            </Link>
            <Link href="/market-analysis">
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold backdrop-blur-sm border-border">
                استكشف السوق
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">مميزات منصة ريدك</h2>
            <p className="text-muted-foreground text-lg">نجمع بين البيانات الضخمة والرؤية المستقبلية لتمكين قراراتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1 - Large */}
            <Card className="md:col-span-2 overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary/10 to-primary/5 group">
              <CardContent className="p-8 h-80 flex flex-col justify-between relative">
                <div>
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <Calculator className="size-6" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3">تقييم ذكي فوري</h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    محرك تقييم يعتمد على أكثر من 20 متغيرًا سوقيًا، بما في ذلك الموقع، نوع العقار، والطلب الحالي في أكثر من 20 مدينة سعودية.
                  </p>
                </div>
                <div className="absolute bottom-[-20px] end-[-20px] size-60 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-all" />
              </CardContent>
            </Card>

            {/* Bento Item 2 */}
            <Card className="overflow-hidden border-none shadow-xl bg-white dark:bg-zinc-900 group">
              <CardContent className="p-8 h-80 flex flex-col justify-between">
                <div className="size-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6">
                  <Leaf className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold mb-2">مؤشر الاستدامة</h3>
                  <p className="text-muted-foreground text-sm">
                    تقييم الأثر البيئي وكفاءة الطاقة للعقارات بما يتماشى مع معايير الأبنية الخضراء في رؤية 2030.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bento Item 3 */}
            <Card className="overflow-hidden border-none shadow-xl bg-white dark:bg-zinc-900 group">
              <CardContent className="p-8 h-80 flex flex-col justify-between">
                <div className="size-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 mb-6">
                  <TrendingUp className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold mb-2">توقعات استثمارية</h3>
                  <p className="text-muted-foreground text-sm">
                    تحليلات دقيقة لعوائد الإيجار المتوقعة ونسب النمو الرأسمالي للعقار على مدار 10 سنوات القادمة.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bento Item 4 - Large */}
            <Card className="md:col-span-2 overflow-hidden border-none shadow-xl bg-gradient-to-br from-secondary/10 to-secondary/5 group">
              <CardContent className="p-8 h-80 flex flex-col justify-between relative">
                <div>
                  <div className="size-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6">
                    <Globe className="size-6" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3">تغطية شاملة للمملكة</h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    بيانات محدثة لحظيًا تغطي كافة أحياء المدن الكبرى والمناطق الواعدة، لضمان أدق النتائج في أي مكان.
                  </p>
                </div>
                <div className="absolute bottom-[-20px] start-[-20px] size-60 bg-secondary/10 rounded-full blur-[40px] group-hover:bg-secondary/20 transition-all" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10" />
        <div className="absolute top-0 start-0 w-full h-full -z-10 opacity-30">
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-white rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">هل أنت جاهز لاتخاذ قرارك القادم؟</h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            انضم إلى آلاف المستثمرين والملاك الذين يثقون في تحليلات ريدك يوميًا.
          </p>
          <Link href="/valuation">
            <Button size="lg" className="rounded-full h-14 px-10 text-lg font-extrabold bg-white text-primary hover:bg-zinc-100 shadow-2xl">
              ابدأ تجربتك المجانية
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
