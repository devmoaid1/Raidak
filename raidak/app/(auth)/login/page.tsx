"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/dashboard");
    } catch {
      toast.error("فشل تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <Card className="w-full max-w-md border-none glass-card animate-in fade-in zoom-in duration-500">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto relative size-20 group transition-all duration-300">
            <Image
              src="/logo.png"
              alt="رائدك - Raidak"
              fill
              className="object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-heading font-black text-primary">
            تسجيل الدخول
          </CardTitle>
          <p className="text-muted-foreground">أهلاً بك مجدداً في منصة رائدك</p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-start"
          >
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`ps-10 h-12 bg-white/50 focus:bg-white transition-all ${errors.email ? "border-destructive" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`ps-10 h-12 bg-white/50 focus:bg-white transition-all ${errors.password ? "border-destructive" : ""}`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-destructive text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold premium-gradient text-white rounded-xl mt-4 shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link
              href="/signup"
              className="text-secondary font-bold hover:underline"
            >
              أنشئ حساباً الآن
            </Link>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-3" />
            العودة للرئيسية
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
