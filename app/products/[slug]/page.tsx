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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cmsbvq.com";

  try {
    const res = await api.products.get(slug);
    const product = (res as any).data || res;

    // Get product image
    let productImage = product.images?.[0] || product.image || product.list_images?.[0];

    // Convert to full URL if needed
    if (productImage && !productImage.startsWith('http')) {
      productImage = `https://cmsbvq.top${productImage}`;
    }

    // Fallback to default OG image
    const ogImage = productImage || `${siteUrl}/og-image.png`;

    const title = `${product.name} - CMSBVQ.COM`;
    const description = product.description || product.content || `Mua ${product.name} chất lượng cao tại CMSBVQ.COM`;

    return {
      title,
      description,

      keywords: `${product.name}, mua source code, ${product.category_name || 'code marketplace'}`,

      openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: `${siteUrl}/products/${slug}`,
        siteName: 'CMSBVQ.COM',
        title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
        creator: '@cmsbvq',
      },

      alternates: {
        canonical: `${siteUrl}/products/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found - CMSBVQ.COM",
      description: "Sản phẩm không tồn tại hoặc đã bị xóa",
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

