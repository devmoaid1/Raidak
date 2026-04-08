import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ر
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                ريدك <span className="text-secondary">Raidak</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              المنصة العقارية الأكثر ذكاءً في المملكة العربية السعودية. نوفر لك تحليلات دقيقة وتقييمات معتمدة على البيانات السوقية الحية لدعم قراراتك الاستثمارية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link href="/valuation" className="text-sm text-muted-foreground hover:text-primary transition-colors">ابدأ التقييم</Link></li>
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">لوحة البيانات</Link></li>
              <li><Link href="/market-analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors">تحليلات السوق</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">الأسعار</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">الشركة</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">عن ريدك</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">اتصل بنا</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ريدك (Raidak). جميع الحقوق محفوظة. برؤية 2030.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">Twitter</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">LinkedIn</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
