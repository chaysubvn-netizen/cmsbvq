"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { VpsConfig, VpsProduct } from "@/lib/api-types";
import { VpsConfigForm } from "@/components/vps/VpsConfigForm";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function VpsDetailClient({ id }: { id: string }) {
    const [product, setProduct] = useState<VpsProduct | null>(null);
    const [config, setConfig] = useState<VpsConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            // First, get config
            const configRes = await api.vps.config();
            if (configRes.status === 'success' && configRes.data) {
                setConfig(configRes.data);
            }

            // Then try to find the product
            const prodRes = await api.vps.products();

            if (prodRes.status === 'success' && prodRes.data) {
                const selected = prodRes.data.find((p: VpsProduct) => String(p.id) === String(id));
                if (selected) {
                    setProduct(selected);
                } else {
                    toast.error("Không tìm thấy thông tin gói VPS cụ thể");
                }
            } else {
                toast.error("Lỗi dữ liệu từ máy chủ VPS");
            }
        } catch (error) {
            console.error("Failed to fetch VPS detail data:", error);
            toast.error("Lỗi khi tải dữ liệu cấu hình");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <Skeleton className="lg:col-span-8 h-[600px] rounded-3xl bg-white/5" />
                    <Skeleton className="lg:col-span-4 h-[400px] rounded-3xl bg-white/5" />
                </div>
            </div>
        );
    }

    if (!product || !config) {
        return (
            <div className="container mx-auto px-4 py-40 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Dữ liệu không khả dụng</h2>
                <p className="text-slate-400">Vui lòng quay lại và chọn một gói dịch vụ khác.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-40">
            <div className="container mx-auto px-4">
                <VpsConfigForm product={product} config={config} />
            </div>
        </div>
    );
}
