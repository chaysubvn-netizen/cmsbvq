import { api } from "@/lib/api";
import VpsDetailClient from "./VpsDetailClient";

// Required for static export
export async function generateStaticParams() {
    try {
        const res = await api.vps.products();
        const products = res.data || [];

        return products.map((product: any) => ({
            id: String(product.id),
        }));
    } catch (error) {
        console.error("Failed to generate VPS static params:", error);
        return [];
    }
}

export default async function VpsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <VpsDetailClient id={id} />;
}
