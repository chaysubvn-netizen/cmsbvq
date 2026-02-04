import { api } from "@/lib/api";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { use } from "react";
import { getImageUrl } from "@/lib/image-helper";

// Required for static export
export const revalidate = 60; // Revalidate at most every 60 seconds

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

    if (!product || !product.name) {
      throw new Error("Product data incomplete");
    }

    // Get product images (could be string, array, or CSV)
    const rawImage = product.image || product.images || product.list_images;
    const ogImage = getImageUrl(rawImage);

    const title = `${product.name} - CMSBVQ.COM`;
    const description = (product.description || product.mota_ngan || product.content || `Mua ${product.name} chất lượng cao, mã nguồn sạch, hỗ trợ cài đặt tại CMSBVQ.COM`).replace(/<[^>]*>/g, '').substring(0, 160);

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      keywords: `${product.name}, mua source code, ${product.category_name || 'code marketplace'}, cmsbvq`,

      openGraph: {
        type: 'article',
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
        site: '@cmsbvq',
        creator: '@cmsbvq',
      },

      alternates: {
        canonical: `${siteUrl}/products/${slug}`,
      },

      robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      }
    };
  } catch (error) {
    console.error("Metadata generation error for slug:", slug, error);
    return {
      metadataBase: new URL(siteUrl),
      title: "Sản phẩm không tồn tại - CMSBVQ.COM",
      description: "Xem các mã nguồn chất lượng cao khác tại CMSBVQ.COM",
      openGraph: {
        images: [`${siteUrl}/og-image.png`]
      }
    };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Pre-fetch data for JSON-LD and initial state
  let initialProduct = null;
  try {
    const res = await api.products.get(slug);
    initialProduct = (res as any).data || res;
  } catch (e) {
    // Error handled in client component
  }

  const jsonLd = initialProduct ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: initialProduct.name,
    image: initialProduct.image || initialProduct.images?.[0],
    description: initialProduct.description || initialProduct.content,
    offers: {
      '@type': 'Offer',
      price: initialProduct.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    }
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient slug={slug} initialProduct={initialProduct} />
    </>
  );
}

