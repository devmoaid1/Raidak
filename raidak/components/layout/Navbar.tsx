"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogIn, User, LayoutDashboard, Calculator, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 start-0 end-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            ر
          </div>
          <span className="text-2xl font-heading font-extrabold tracking-tight text-foreground">
            ريدك <span className="text-secondary">Raidak</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/valuation" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <Calculator className="size-4" />
            التقييم العقاري
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <LayoutDashboard className="size-4" />
            لوحة البيانات
          </Link>
          <Link href="/market-analysis" className="text-sm font-medium hover:text-primary transition-colors">
            تحليل السوق
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <Button className="rounded-full shadow-md bg-primary hover:bg-primary/90">
                <User className="size-4 me-2" />
                حسابي
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="rounded-full shadow-md bg-primary hover:bg-primary/90">
                <LogIn className="size-4 me-2" />
                دخول
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
