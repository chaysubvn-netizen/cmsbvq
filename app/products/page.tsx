"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/lib/api-types";
import { ProductCard } from "@/components/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

function ProductsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState(searchParams.get("keyword") || "");
    const [category, setCategory] = useState(searchParams.get("category_id") || "");

    useEffect(() => {
        setSearch(searchParams.get("keyword") || "");
        setCategory(searchParams.get("category_id") || "");
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        const params: any = {
            limit: 20,
            sort: sort,
        };

        if (search) params.keyword = search;
        if (category) params.category_id = category;

        api.products.list(params)
            .then((res) => {
                const list = Array.isArray(res) ? res : (res as any).data || [];
                let normalizedList = list.map((item: any) => ({
                    ...item,
                    image: item.images || item.image,
                    views: item.view || item.views,
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
    }, [sort, search, category]);

    return (
        <div className="min-h-screen bg-black pb-20">
            {/* Header / Filter Bar */}
            <div className="sticky top-16 z-30 bg-black/80 backdrop-blur border-b border-white/5 py-4">
                <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">
                        {search ? `Results for "${search}"` : 'All Products'}
                    </h1>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 bg-secondary/20 border-white/10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-[180px] bg-secondary/20 border-white/10">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <SelectValue placeholder="Sort By" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest Arrivals</SelectItem>
                                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                <SelectItem value="hot">Best Selling</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array(8).fill(0).map((_, i) => (
                            <div key={i} className="bg-card/10 rounded-2xl h-[300px] animate-pulse" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No products found matching your criteria.</p>
                        <Button variant="link" onClick={() => { setSearch(""); setSort("newest"); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black pb-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array(8).fill(0).map((_, i) => (
                            <div key={i} className="bg-card/10 rounded-2xl h-[300px] animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
