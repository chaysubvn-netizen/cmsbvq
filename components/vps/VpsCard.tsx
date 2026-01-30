"use client";

import { VpsProduct } from "@/lib/api-types";
import { formatPrice } from "@/lib/image-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Smartphone, Database, Globe, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function VpsCard({ product }: { product: VpsProduct }) {
    const specs = product.specs;

    return (
        <div className="premium-card p-8 flex flex-col h-full group hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all duration-500 bg-white/[0.02]">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {product.name}
                </h3>
                {specs.package_tag && (
                    <Badge className="bg-blue-600 text-white border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest rounded-md shadow-lg shadow-blue-600/20 pointer-events-none">
                        {specs.package_tag}
                    </Badge>
                )}
            </div>

            {/* Pricing */}
            <div className="mb-10 p-6 rounded-3xl bg-blue-600/5 border border-blue-500/10 group-hover:border-blue-500/30 transition-colors">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{formatPrice(Number(product.price))}</span>
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">/mo</span>
                </div>
            </div>

            {/* Specs List */}
            <div className="space-y-6 mb-12 flex-grow">
                <div className="flex items-center gap-5 text-slate-300">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-600/10 transition-all duration-500">
                        <Cpu className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Processor</span>
                        <span className="font-bold text-white">{specs.cpu} vCore CPU</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 text-slate-300">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-600/10 transition-all duration-500">
                        <Smartphone className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Memory</span>
                        <span className="font-bold text-white">{specs.ram} RAM</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 text-slate-300">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-600/10 transition-all duration-500">
                        <Database className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage</span>
                        <span className="font-bold text-white">{specs.ssd} SSD NVMe</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 text-slate-300">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-600/10 transition-all duration-500">
                        <Globe className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Internet</span>
                        <span className="font-bold text-white">{specs.bandwidth}</span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <Link href={`/services/vps/${product.id}`} className="block">
                <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 group-hover:scale-[1.02] transition-transform flex gap-3">
                    <ShoppingCart className="w-6 h-6" />
                    Mua ngay
                </Button>
            </Link>
        </div>
    );
}
