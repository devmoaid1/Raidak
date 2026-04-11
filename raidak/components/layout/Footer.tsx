import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative h-20 w-40 group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="رائدك - Raidak"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              المنصة العقارية الأكثر ذكاءً في المملكة العربية السعودية. نوفر لك تحليلات دقيقة وتقييمات معتمدة على البيانات السوقية الحية لدعم قراراتك الاستثمارية بما يتماشى مع رؤية 2030.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-primary mb-6">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><Link href="/valuation" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">ابدأ التقييم</Link></li>
              <li><Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">لوحة البيانات</Link></li>
              <li><Link href="/market-analysis" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">تحليلات السوق</Link></li>
              <li><Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">الأسعار</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-primary mb-6">الشركة</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">عن رائدك</Link></li>
              <li><Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">اتصل بنا</Link></li>
              <li><Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            © {new Date().getFullYear()} RAIDAK SMART REAL ESTATE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider">Twitter</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider">LinkedIn</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
