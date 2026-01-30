import { api } from "@/lib/api";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { use } from "react";

// Required for static export
export async function generateStaticParams() {
  try {
    const res = await api.products.list({ limit: 100 });
    const products = Array.isArray(res) ? res : (res as any).data || [];

    return products.map((product: any) => ({
      slug: product.slug || String(product.id),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await api.products.get(slug);
    const product = (res as any).data || res;
    const image =
      product.images?.[0] ||
      product.image ||
      product.list_images?.[0];

    return {
      title: `${product.name} - CMSBVQ.COM`,
      description: product.description || product.content,
      openGraph: {
        title: product.name,
        description: product.description || product.content,
        images: image ? [image] : [],

      },

      twitter: {
        card: "summary_large_image",
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found - CMSBVQ.COM",
    };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // We can pre-fetch data here if we want to avoid loading states completely
  // For now, we'll let the client component handle the fetch or pass initial data
  let initialProduct = null;
  try {
    const res = await api.products.get(slug);
    initialProduct = (res as any).data || res;
  } catch (e) {
    // Error handled in client component
  }

  return <ProductDetailClient slug={slug} initialProduct={initialProduct} />;
}

