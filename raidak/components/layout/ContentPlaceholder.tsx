import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GenericContentPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-primary">{title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="p-12 rounded-3xl bg-accent border border-primary/10 max-w-lg w-full">
        <p className="text-primary font-bold italic">نحن نعمل على تجهيز هذا القسم ليليق بتطلعاتكم.</p>
      </div>

      <Link href="/">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" />
          العودة للرئيسية
        </Button>
      </Link>
    </div>
  );
}
