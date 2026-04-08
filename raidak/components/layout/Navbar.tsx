"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  LayoutDashboard,
  Calculator,
  Menu,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/");
    } catch {
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 start-0 end-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/70 backdrop-blur-lg border-b border-white/20 py-3 shadow-sm"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative">
          <div className="size-11 premium-gradient rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            ر
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-heading font-black tracking-tight text-primary leading-none">
              رائدك
            </span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
              Raidak Smart
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 bg-white/40 backdrop-blur-md border border-white/40 px-8 py-2.5 rounded-full shadow-inner">
          <Link
            href="/valuation"
            className="text-sm font-bold text-foreground/80 hover:text-primary transition-all flex items-center gap-2 group"
          >
            <Calculator className="size-4 text-secondary group-hover:scale-110 transition-transform" />
            التقييم العقاري
          </Link>
          <Link
            href="/market-analysis"
            className="text-sm font-bold text-foreground/80 hover:text-primary transition-all flex items-center gap-2 group"
          >
            <Sparkles className="size-4 text-secondary group-hover:rotate-12 transition-transform" />
            تحليل السوق
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-bold text-foreground/80 hover:text-primary transition-all flex items-center gap-2 group"
          >
            <LayoutDashboard className="size-4 text-secondary group-hover:scale-110 transition-transform" />
            لوحة البيانات
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-bold text-foreground/80 hidden md:inline-block hover:text-primary transition-colors"
              >
                {user.email}
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-2xl h-11 px-6 font-bold border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive transition-all active:scale-95"
              >
                <LogOut className="size-4 me-2" />
                خروج
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="rounded-2xl h-11 px-8 font-bold premium-gradient text-white shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                <LogIn className="size-4 me-2" />
                دخول
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/50 rounded-xl"
          >
            <Menu className="size-6 text-primary" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
