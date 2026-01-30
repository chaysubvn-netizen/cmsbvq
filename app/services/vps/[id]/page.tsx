import { api } from "@/lib/api";
import { Metadata } from "next";
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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cmsbvq.com";

    try {
        const res = await api.vps.products();
        const products = res.data || [];
        const product = products.find((p: any) => String(p.id) === id);

        if (!product) {
            return {
                title: "VPS Not Found - CMSBVQ.COM",
            };
        }

        // Get product image
        let productImage = product.image;

        // Convert to full URL if needed
        if (productImage && !productImage.startsWith('http')) {
            productImage = `https://cmsbvq.top${productImage}`;
        }

        // Fallback to default OG image
        const ogImage = productImage || `${siteUrl}/og-image.png`;

        const title = `${product.name} - Cloud VPS - CMSBVQ.COM`;
        // Description is not on VpsProduct, construct from specs
        const description = `${product.name} - ${product.specs.cpu} CPU, ${product.specs.ram} RAM, ${product.specs.ssd} SSD, ${product.specs.bandwidth} Bandwidth`;

        return {
            title,
            description,

            keywords: `vps vietnam, cloud vps, ${product.name}, ${product.specs.cpu}, ${product.specs.ram}`,

            openGraph: {
                type: 'website',
                locale: 'vi_VN',
                url: `${siteUrl}/services/vps/${id}`,
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
                canonical: `${siteUrl}/services/vps/${id}`,
            },
        };
    } catch (error) {
        return {
            title: "VPS Service - CMSBVQ.COM",
            description: "Cloud VPS chất lượng cao tại CMSBVQ.COM",
        };
    }
}

export default async function VpsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let product = null;
    try {
        const res = await api.vps.products();
        const products = res.data || res || [];
        product = Array.isArray(products) ? products.find((p: any) => String(p.id) === id) : null;
    } catch (e) {
        // Fallback
    }

    const jsonLd = product ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: `${product.name} - ${product.specs?.cpu} CPU, ${product.specs?.ram} RAM`,
        offers: {
            '@type': 'Offer',
            price: product.price,
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
            <VpsDetailClient id={id} />
        </>
    );
}
