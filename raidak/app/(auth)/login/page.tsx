"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      setError("فشل تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-none bg-white animate-in fade-in zoom-in duration-500">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto size-16 bg-accent rounded-2xl flex items-center justify-center text-primary">
            <LogIn className="size-8" />
          </div>
          <CardTitle className="text-3xl font-heading font-black text-primary">تسجيل الدخول</CardTitle>
          <p className="text-muted-foreground">أهلاً بك مجدداً في منصة ريدك</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="ps-10 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="ps-10 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl mt-4"
              disabled={loading}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="text-secondary font-bold hover:underline">
              أنشئ حساباً الآن
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="size-3" />
            العودة للرئيسية
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
