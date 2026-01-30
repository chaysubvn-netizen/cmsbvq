"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/lib/api-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShoppingCart, ExternalLink, ShieldCheck, Loader2, Check, Zap, Server, Star } from "lucide-react";
import { getImageUrl, formatPrice } from "@/lib/image-helper";
import CommentSection from "@/components/product/CommentSection";

interface ProductDetailClientProps {
    slug: string;
    initialProduct?: Product | null;
}

const normalizeProduct = (data: any) => {
    if (!data) return null;
    return {
        ...data,
        image: data.images || data.image || data.list_images,
        views: data.view || data.views,
        price: Number(data.price),
        old_price: Number(data.old_price || 0)
    };
};

export default function ProductDetailClient({ slug, initialProduct }: ProductDetailClientProps) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(normalizeProduct(initialProduct));
    const [loading, setLoading] = useState(!initialProduct);
    const [buying, setBuying] = useState(false);

    useEffect(() => {
        if (!initialProduct) {
            api.products.get(slug)
                .then((res) => {
                    const data = (res as any).data || res;
                    setProduct(normalizeProduct(data));
                })
                .catch(() => {
                    toast.error("Product not found");
                    router.push("/products");
                })
                .finally(() => setLoading(false));
        }
    }, [slug, initialProduct, router]);

    const handleBuy = async () => {
        if (!product) return;
        setBuying(true);
        try {
            await api.user.buy(product.id as number);
            toast.success("Purchase successful!");
            router.push("/dashboard/history");
        } catch (error) {
            toast.error("Purchase failed. Please check your balance.");
            if ((error as any).message?.includes("Unauthorized")) {
                router.push("/auth/login");
            }
        } finally {
            setBuying(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (!product) return null;

    return (
        <div className="min-h-screen bg-black pb-20">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gradient Image Presentation */}
                        <div className="rounded-3xl p-8 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-4 left-4">
                                <div className="bg-red-500 text-white rounded-full p-2 shadow-lg">
                                    <Zap className="w-5 h-5 fill-white" />
                                </div>
                            </div>

                            {/* Laptop Frame Effect */}
                            <div className="relative mx-auto bg-black rounded-t-xl border-4 border-black border-b-0 shadow-2xl transform translate-y-4 max-w-2xl">
                                <div className="bg-black rounded-t-lg overflow-hidden aspect-video">
                                    <img
                                        src={getImageUrl(product.image as string)}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                                <Server className="w-5 h-5" /> Mô tả sản phẩm
                            </div>
                            <div className="bg-[#0f1115] border border-white/5 rounded-xl p-6 text-slate-300 leading-relaxed">
                                <div dangerouslySetInnerHTML={{
                                    __html: (product.description || product.content || product.intro || (product as any).noidung || (product as any).detail || (product as any).mota || "") as string
                                }} />
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-orange-400 font-bold text-lg">
                                <Zap className="w-5 h-5" /> Tính năng nổi bật
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#0f1115] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Mã nguồn sạch không keylog</span>
                                </div>
                                <div className="bg-[#0f1115] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Hỗ trợ setup</span>
                                </div>
                                <div className="bg-[#0f1115] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Sản phẩm không giao mà nguồn</span>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <CommentSection productId={product.id} />
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-1 sticky top-24 space-y-6">
                        <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 space-y-6">

                            <div>
                                <h1 className="text-2xl font-bold leading-tight mb-2">{product.name}</h1>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <UserIcon className="w-4 h-4" />
                                    <span>Bởi {product.username || 'Quyetcoder2k3'}</span>
                                    <div className="flex text-yellow-500 ml-auto">
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <div className="text-sm text-muted-foreground">GIÁ NIÊM YẾT</div>
                                    <div className="text-3xl font-black text-blue-500">
                                        {formatPrice(Number(product.price))}
                                    </div>
                                </div>

                                {/* Coupon */}
                                <div className="space-y-2 mb-6">
                                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">MÃ GIẢM GIÁ (COUPON)</div>
                                    <div className="flex gap-2">
                                        <Input placeholder="Nhập mã của bạn..." className="bg-black/20 border-white/10" />
                                        <Button variant="outline" className="border-white/10 hover:bg-white/5">ÁP DỤNG</Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-12" onClick={handleBuy} disabled={buying}>
                                        {buying ? <Loader2 className="mr-2 w-5 h-5 animate-spin" /> : <ShoppingCart className="mr-2 w-5 h-5" />}
                                        Mua ngay
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full border-white/10 hover:bg-white/5 h-12"
                                        asChild
                                        disabled={!product.link_demo}
                                    >
                                        {product.link_demo ? (
                                            <a href={product.link_demo as string} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 w-4 h-4" /> Xem Demo trực tiếp
                                            </a>
                                        ) : (
                                            <span className="opacity-50">
                                                <ExternalLink className="mr-2 w-4 h-4" /> Không có Demo
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Trust Box */}
                        <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <div className="font-bold">Bảo mật</div>
                                    <div className="text-muted-foreground">Thanh toán an toàn</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <div className="font-bold">Tải ngay</div>
                                    <div className="text-muted-foreground">Sau khi thanh toán</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <div className="font-bold">Hỗ trợ 24/7</div>
                                    <div className="text-muted-foreground">Liên hệ kỳ lúc nào</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <Star className="w-4 h-4" />
                                </div>
                                <div className="text-xs">
                                    <div className="font-bold">Chất lượng</div>
                                    <div className="text-muted-foreground">Đảm bảo code sạch</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    )
}
