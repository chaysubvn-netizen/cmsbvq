"use client";

import { useEffect, useState, useRef } from "react";
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
      <section className="hero relative pt-32 pb-24 overflow-hidden min-h-[92vh] flex items-center">
        {/* Main Background Video */}
        <div className="hero-bg-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="opacity-70 scale-105"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="https://demo.awaikenthemes.com/assets/videos/nextmind-v1-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
            <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
             Tự động hóa quy trình kiếm tiền online của bạn
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.2] text-white">
              Giải pháp công nghệ <br />
              <span className="text-gradient-animated uppercase inline-block mt-2">Đột phá & Toàn diện.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Chúng tôi cung cấp kho mã nguồn chất lượng cao, hạ tầng Cloud ổn định và các công cụ tối ưu giúp dự án của bạn vận hành mạnh mẽ nhất.


            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-16 text-lg font-black shadow-2xl shadow-blue-600/40 transition-all hover:scale-105"
              >
                <Link href="/products">
                  Khám Phá Ngay
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white rounded-full px-10 h-16 text-lg font-black backdrop-blur-md transition-all"
              >
                Tư vấn miễn phí
              </Button>
            </div>

            {/* Feature Highlights Row */}
            <div className="flex flex-wrap gap-12 pt-16 border-t border-white/10 justify-center">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Bảo mật tuyệt đối</p>
                  <p className="text-slate-500 text-xs text-nowrap">An toàn dữ liệu</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Headset className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Hỗ trợ 24/7</p>
                  <p className="text-slate-500 text-xs text-nowrap">Kỹ thuật tận tâm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Tự động hóa</p>
                  <p className="text-slate-500 text-xs text-nowrap">Kích hoạt tức thì</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Ecosystem Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -z-10" />
        <div className="mb-20 text-center lg:text-left">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-6 px-6 py-2 rounded-full uppercase tracking-tighter text-xs font-black">
            Hệ sinh thái dịch vụ
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Dịch vụ đột phá</h2>
          <p className="text-slate-400 max-w-2xl mx-auto lg:mx-0 text-xl leading-relaxed">
            Nâng tầm doanh nghiệp với hạ tầng Cloud và các giải pháp AI tiên tiến.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { title: 'Cloud VPS', desc: 'Máy chủ ảo hiệu năng cao với SSD NVMe.', icon: Cpu, color: 'text-blue-500' },
            { title: 'Elite Hosting', desc: 'Tối ưu cho WordPress và các ứng dụng doanh nghiệp.', icon: Globe, color: 'text-emerald-500' },
            { title: 'Auto API Bank', desc: 'Tự động hóa ngân hàng cho quy mô lớn.', icon: Smartphone, color: 'text-purple-500', href: 'https://spay5s.com/' },
            { title: 'VIP Cronjob', desc: 'Tiến trình tự động sub-minute độ tin cậy tuyệt đối.', icon: Zap, color: 'text-orange-500', href: '/services/cronjob' },
          ].map((service, i) => (
            <Link key={i} href={service.href || "#"} className="group bg-black border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col items-center text-center transition-all hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)]">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all duration-500">
                <service.icon className={`w-10 h-10 ${service.color}`} />
              </div>
              <h3 className="font-extrabold text-white text-2xl mb-4 group-hover:text-blue-400">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{service.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest">
                Khám phá <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="container mx-auto px-4 pb-48 relative">
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full -z-10" />
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="space-y-6">
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 px-6 py-2 rounded-full uppercase tracking-tighter text-xs font-black">
              Marketplace
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white">Kho sản phẩm</h2>
            <p className="text-slate-400 text-xl max-w-xl">Tổng hợp mã nguồn và sản phẩm kỹ thuật số chất lượng cao.</p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-3xl">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setViewMode('grid')}
              className={`h-14 w-14 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              <Grid className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setViewMode('list')}
              className={`h-14 w-14 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              <List className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="bg-black border border-white/10 rounded-[2.5rem] p-10 md:p-16 space-y-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList className="bg-white/5 p-2 rounded-2xl gap-2 h-auto flex-wrap border border-white/10">
                <TabsTrigger
                  value="all"
                  className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white px-10 py-4 text-sm font-black transition-all"
                >
                  Tất cả sản phẩm
                </TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id.toString()}
                    className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white px-10 py-4 text-sm font-black transition-all"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 flex-wrap">
              {[
                { label: 'Mới nhất', icon: History, value: 'newest' },
                { label: 'Hot', icon: Zap, value: 'hot' },
                { label: 'Giá thấp nhất', icon: ArrowDownWideNarrow, value: 'price_asc' },
              ].map((s) => (
                <Button
                  key={s.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSort(s.value)}
                  className={`rounded-xl gap-2 px-8 py-4 h-auto transition-all font-black uppercase text-xs tracking-tighter ${sort === s.value
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span>{s.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
              : "flex flex-col gap-8 max-w-5xl mx-auto"
          }>
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <Card key={i} className="bg-white/5 border-none overflow-hidden animate-pulse">
                  <Skeleton className="h-72 w-full bg-white/10" />
                  <CardHeader className="p-8 space-y-4">
                    <Skeleton className="h-10 w-3/4 bg-white/10" />
                    <Skeleton className="h-6 w-1/2 bg-white/10" />
                  </CardHeader>
                </Card>
              ))
            ) : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Process/Workflow Section */}
      <section className="container mx-auto px-4 pb-48 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-blue-600/5 blur-[200px] rounded-full -z-10" />

        <div className="text-center mb-24">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-6 px-6 py-2 rounded-full uppercase tracking-tighter text-xs font-black">
            Quy trình
          </Badge>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">Quy trình làm việc</h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-xl leading-relaxed">
            Từ chiến lược đến tối ưu hóa toàn cầu, chúng tôi định nghĩa lại cách công nghệ trao quyền cho thương hiệu của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative">
          <div className="hidden lg:block absolute top-[70px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -z-10" />

          {[
            { step: '01', title: 'Chiến lược', desc: 'Phân tích tầm nhìn và đưa ra lộ trình kỹ thuật số.', icon: Search },
            { step: '02', title: 'Đánh giá', desc: 'Kiểm tra hạ tầng và tính toàn vẹn của dữ liệu.', icon: ShieldCheck },
            { step: '03', title: 'Kỹ thuật', desc: 'Xây dựng chính xác giải pháp sẵn sàng cho tương lai.', icon: Code },
            { step: '04', title: 'Tối ưu', desc: 'Mở rộng quy mô và hỗ trợ tận tâm 24/7.', icon: Headset },
          ].map((item, i) => (
            <div key={i} className="group text-center">
              <div className="w-28 h-28 rounded-full bg-blue-600/5 border border-white/5 flex items-center justify-center mb-10 mx-auto group-hover:bg-blue-600/20 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-700 relative">
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[10px] font-black w-10 h-10 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 border-4 border-black">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-blue-500 group-hover:text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Analytics />
    </div>
  );
}
