"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Leaf, 
  MapPin, 
  Maximize2, 
  Tag,
  Filter,
  Home as HomeIcon,
  Building2,
  Map as MapIcon,
  Map as MapViewIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import propertiesData from "@/data/properties.json";

// Categories definition from implementation plan
const categories = [
  { id: 'residential', text: 'سكني', emoji: '🏠', icon: HomeIcon },
  { id: 'commercial', text: 'تجاري', emoji: '🏢', icon: Building2 },
  { id: 'land', text: 'أراضٍ', emoji: '🗺️', icon: MapIcon }
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter Logic from implementation plan
  const filteredProperties = propertiesData.filter((prop) => {
    const matchesSearch = prop.name_ar.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? prop.type === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8 min-h-screen">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-heading font-black text-primary">عقارات محافظة القنفذة</h1>
          <p className="text-muted-foreground text-lg">استكشف الفرص العقارية في &quot;غادة الجنوب&quot; - القنفذة، من الكورنيش إلى الأحياء الواعدة.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <Link href="/explore/map">
            <Button variant="outline" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5 text-primary">
              <MapViewIcon className="size-4" />
              عرض الخريطة
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="sticky top-4 z-30 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg space-y-4">
        <div className="relative group">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="ابحث بالحي، المدينة، أو اسم العقار..." 
            className="ps-12 h-14 rounded-xl border-slate-200 focus-visible:ring-primary text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant={activeCategory === null ? "default" : "outline"}
            className="rounded-full px-6 h-11 text-base font-semibold transition-all"
            onClick={() => setActiveCategory(null)}
          >
            الكل
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              className={`rounded-full px-6 h-11 text-base font-semibold gap-2 border-slate-200 transition-all ${
                activeCategory === cat.id ? "" : "hover:border-primary/50 hover:bg-primary/5"
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <cat.icon className="size-4" />
              {cat.text}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground font-medium">
          تم العثور على <span className="text-foreground font-bold">{filteredProperties.length}</span> عقار
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Filter className="size-4" />
            فرز حسب: الأحدث
          </span>
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="group">
              <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col group-hover:-translate-y-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={property.image} 
                    alt={property.name_ar}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Green Badge Logic from implementation plan */}
                  {property.sustainability_baseline >= 70 && (
                    <div className="absolute top-4 start-4 flex items-center gap-1.5 bg-green-100/95 backdrop-blur-sm text-green-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-green-200/50">
                      <Leaf className="size-3.5 fill-green-800/20" />
                      <span>عقار أخضر</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 end-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-primary font-black text-lg shadow-lg">
                    {property.price.toLocaleString('ar-SA')} ر.س
                  </div>

                  <div className="absolute top-4 end-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge className="bg-primary/80 backdrop-blur-sm hover:bg-primary">
                      {categories.find(c => c.id === property.type)?.text}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{property.name_ar}</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="size-4 text-primary/60" />
                      <span className="text-sm font-medium">{property.district}، {property.city}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        <Maximize2 className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">المساحة</span>
                        <span className="text-sm font-bold text-slate-700">{property.area} م²</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                        <Tag className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">النوع</span>
                        <span className="text-sm font-bold text-slate-700">{categories.find(c => c.id === property.type)?.text}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">درجة الاستدامة</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              property.sustainability_baseline >= 70 ? 'bg-green-500' :
                              property.sustainability_baseline >= 50 ? 'bg-orange-400' : 'bg-slate-300'
                            }`}
                            style={{ width: `${property.sustainability_baseline}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-slate-600">%{property.sustainability_baseline}</span>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="rounded-full text-primary font-bold hover:bg-primary/5 hover:text-primary">
                      التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
            <Search className="size-10" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800">لا توجد نتائج مطابقة</h3>
            <p className="text-muted-foreground">جرب البحث بكلمات أخرى أو تغيير الفلاتر المختارة.</p>
          </div>
          <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory(null); }}>
            إعادة تعيين البحث
          </Button>
        </div>
      )}
    </div>
  );
}
