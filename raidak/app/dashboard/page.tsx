import { LayoutDashboard, TrendingUp, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary">لوحة البيانات</h1>
          <p className="text-muted-foreground">نظرة عامة على نشاطك العقاري وتقييماتك.</p>
        </div>
        <Link href="/valuation">
          <Button className="rounded-xl bg-primary px-6">تقييم عقار جديد</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">التقييمات السابقة</CardTitle>
            <ShieldCheck className="size-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-primary">0</div>
            <p className="text-xs text-muted-foreground mt-1">ابدأ بأول تقييم لك اليوم.</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">متوسط نمو المحفظة</CardTitle>
            <TrendingUp className="size-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-primary">--</div>
            <p className="text-xs text-muted-foreground mt-1">بناءً على التقييمات المسجلة.</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">تنبيهات السوق</CardTitle>
            <LayoutDashboard className="size-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-primary">2</div>
            <p className="text-xs text-muted-foreground mt-1">فرص استثمارية جديدة في الرياض.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-xl bg-white">
        <div className="p-12 text-center space-y-4">
          <div className="size-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="size-8 text-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-primary">لا توجد سجلات حالياً</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">قم بإجراء أول عملية تقييم لتظهر لك البيانات والتحليلات التفصيلية هنا.</p>
          <Link href="/valuation">
            <Button variant="outline" className="mt-4 rounded-xl border-primary text-primary hover:bg-primary/5">
              ابدأ التقييم الآن
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
