"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Product } from "@/lib/api-types";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Analytics } from "@vercel/analytics/next"
import {
  ArrowRight, Star, ShoppingCart, Code, Smartphone,
  Gamepad2, Wrench, Search, Zap, LayoutGrid, User,
  History, ArrowDownWideNarrow, ArrowUpWideNarrow,
  Grid, List, ShieldCheck, Headset, Cpu, Globe
} from "lucide-react";
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    api.general.categories().then((res: any) => {
      if (res.status === 'success') setCategories(res.data || []);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: any = { limit: 12, filter: sort };

    if (activeTab !== "all") {
      // If it's a numeric ID, use category_id param, otherwise use keyword
      if (!isNaN(Number(activeTab))) {
        params.category_id = activeTab;
      } else {
        params.keyword = activeTab;
      }
    }

    api.products.list(params)
      .then((res) => {
        const list = Array.isArray(res) ? res : (res as any).data || [];
        let normalizedList = list.map((item: any) => ({
          ...item,
          image: item.images || item.image,
          views: item.view || item.views || 0,
          price: Number(item.price),
          old_price: Number(item.old_price || 0)
        }));

        // Frontend Sorting Fallback
        if (sort === 'price_asc') {
          normalizedList.sort((a: any, b: any) => a.price - b.price);
        } else if (sort === 'price_desc') {
          normalizedList.sort((a: any, b: any) => b.price - a.price);
        } else if (sort === 'hot') {
          normalizedList.sort((a: any, b: any) => (b.views || 0) - (a.views || 0));
        } else if (sort === 'newest') {
          normalizedList.sort((a: any, b: any) => Number(b.id) - Number(a.id));
        }

        setProducts(normalizedList);
      })
      .finally(() => setLoading(false));
  }, [activeTab, sort]);

  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* Hero Section */}
      <section className="relative pt-16 pb-8 px-4 md:px-8 overflow-hidden grid-bg">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
              Giải pháp công nghệ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Đột phá & Toàn diện.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Chúng tôi cung cấp kho mã nguồn chất lượng cao, hạ tầng Cloud ổn định và các công cụ tối ưu giúp dự án của bạn vận hành mạnh mẽ nhất.
            </p>
            <div className="flex flex-wrap gap-4">
          <Button
  asChild
  size="lg"
  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-14 text-lg font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
>
  <Link href="/products">
    <Search className="w-5 h-5 mr-2" />
    Khám phá ngay
  </Link>
</Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-xl px-8 h-14 text-lg font-bold transition-all">
                Tư vấn miễn phí
              </Button>
            </div>

            {/* Feature Highlights Row */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Bảo mật tuyệt đối</p>
                  <p className="text-slate-500 text-xs text-nowrap">An toàn dữ liệu</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Headset className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Hỗ trợ 24/7</p>
                  <p className="text-slate-500 text-xs text-nowrap">Kỹ thuật tận tâm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Tự động hóa</p>
                  <p className="text-slate-500 text-xs text-nowrap">Kích hoạt tức thì</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in slide-in-from-right duration-1000">
            <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="relative z-10 premium-card">
              <img
                src="/images/robot.png"
                alt="Robot Illustration"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">CMSBVQ.COM</p>
                      <p className="text-slate-400 text-xs">Giải pháp số hàng đầu</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">Hệ sinh thái</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Ecosystem */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Hệ sinh thái dịch vụ</h2>
          <p className="text-slate-400 max-w-md">Nền tảng hạ tầng công nghệ toàn diện cho doanh nghiệp của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Cloud VPS', desc: 'Máy chủ ảo hiệu năng cao, SSD...', bg: 'bg-blue-600/10', icon: Cpu, iconColor: 'text-blue-500', border: 'border-blue-500/20' },
            { title: 'Web Hosting', desc: 'Tối ưu cho WordPress và Ứng dụng...', bg: 'bg-emerald-600/10', icon: Globe, iconColor: 'text-emerald-500', border: 'border-emerald-500/20' },
            { title: 'Thuê Api Bank', desc: 'Thích Hợp Api Bank Auto...', bg: 'bg-purple-600/10', icon: Smartphone, iconColor: 'text-purple-500', border: 'border-purple-500/20', href: 'https://spay5s.com/'},
            { title: 'Cronjob VIP', desc: 'Tiến trình tự động sub-minute chất...', bg: 'bg-orange-600/10', icon: Zap, iconColor: 'text-orange-500', border: 'border-orange-500/20', href: '/services/cronjob' },
          ].map((service, i) => (
            <Link key={i} href={service.href || "#"} className={`group p-6 premium-card flex items-center justify-between relative`}>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 z-10">
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center border ${service.border} group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{service.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-all group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Product Discovery Section */}
      <section className="container mx-auto px-4 pb-32 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white">Khám phá kho sản phẩm</h2>
            <p className="text-slate-400">Nhiều sản phẩm chất lượng từ chúng tôi phát triển.</p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setViewMode('grid')}
              className={`h-10 w-10 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setViewMode('list')}
              className={`h-10 w-10 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList className="bg-white/5 p-1 rounded-2xl gap-1 h-auto flex-wrap border border-white/5">
                <TabsTrigger
                  value="all"
                  className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2.5 text-sm font-bold transition-all"
                >
                  Tất cả sản phẩm
                </TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id.toString()}
                    className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2.5 text-sm font-bold transition-all"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/5 flex-wrap">
              {[
                { label: 'Mới nhất', icon: History, value: 'newest' },
                { label: 'Thịnh hành', icon: Zap, value: 'hot' },
                { label: 'Giá thấp nhất', icon: ArrowDownWideNarrow, value: 'price_asc' },
                { label: 'Giá cao nhất', icon: ArrowUpWideNarrow, value: 'price_desc' },
              ].map((s) => (
                <Button
                  key={s.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSort(s.value)}
                  className={`rounded-xl gap-2 px-4 py-2.5 h-auto transition-all font-medium ${sort === s.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4 max-w-4xl mx-auto"
          }>
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <Card key={i} className="bg-card border-none overflow-hidden">
                  <Skeleton className="h-48 w-full bg-white/5" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 bg-white/5" />
                    <Skeleton className="h-4 w-1/2 bg-white/5" />
                  </CardHeader>
                </Card>
              ))
            ) : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
