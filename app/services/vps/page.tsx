"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { VpsCategory, VpsProduct } from "@/lib/api-types";
import { VpsCard } from "@/components/vps/VpsCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function VpsPage() {
    const [categories, setCategories] = useState<VpsCategory[]>([]);
    const [products, setProducts] = useState<VpsProduct[]>([]);
    const [activeTab, setActiveTab] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const catRes = await api.vps.categories();
            if (catRes.status === 'success' && catRes.data) {
                setCategories(catRes.data);
                if (catRes.data.length > 0) {
                    const firstCatId = catRes.data[0].id.toString();
                    setActiveTab(firstCatId);
                    fetchProducts(Number(catRes.data[0].id));
                }
            }
        } catch (error) {
            console.error("Failed to fetch VPS categories:", error);
            toast.error("Không thể tải danh sách dịch vụ VPS");
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (categoryId: number) => {
        setProductsLoading(true);
        try {
            const prodRes = await api.vps.products(categoryId);
            if (prodRes.status === 'success' && prodRes.data) {
                setProducts(prodRes.data);
            }
        } catch (error) {
            console.error("Failed to fetch VPS products:", error);
            toast.error("Không thể tải danh sách gói VPS");
        } finally {
            setProductsLoading(false);
        }
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        fetchProducts(Number(value));
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 space-y-12">
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-10 w-64 bg-white/5" />
                    <Skeleton className="h-4 w-96 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-96 rounded-3xl bg-white/5" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-40 relative overflow-hidden bg-black">
            {/* Background Gradients & Grid */}
            <div className="absolute inset-0 bg-[url('/images/grid.png')] bg-repeat bg-[length:120px_auto] opacity-20 -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-blue-600/10 blur-[130px] -z-10 rounded-full opacity-60" />
            <div className="absolute top-[15%] left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] -z-10 rounded-full" />
            <div className="absolute top-[15%] right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />

            <div className="container mx-auto px-4 relative">
                {/* Header Section */}
                <div className="text-center space-y-6 mb-24 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                        Dịch vụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">Cloud VPS</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Hệ thống máy chủ ảo hiệu năng cao, uptime 99.9%, hỗ trợ kỹ thuật 24/7.
                    </p>
                </div>

                {/* Categories Tabs */}
                {categories.length > 0 && (
                    <div className="flex justify-center mb-20">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
                            <TabsList className="bg-white/[0.03] p-1.5 rounded-full border border-white/5 h-auto flex-wrap backdrop-blur-md">
                                {categories.map((cat) => (
                                    <TabsTrigger
                                        key={cat.id}
                                        value={cat.id.toString()}
                                        className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(37,99,235,0.4)] px-10 py-3 text-sm font-black transition-all uppercase tracking-wider"
                                    >
                                        {cat.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                )}

                {/* Products Grid */}
                {productsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-96 rounded-3xl bg-white/5" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <VpsCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 premium-card">
                        <p className="text-slate-400 text-lg"><span className="text-xl font-bold text-blue-500">{/* formatPrice(Number(vps.price)) */}</span> Hiện chưa có gói VPS nào trong danh mục này.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
