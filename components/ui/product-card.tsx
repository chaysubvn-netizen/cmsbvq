"use client";

import Link from "next/link";
import { Product } from "@/lib/api-types";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { getImageUrl, formatPrice } from "@/lib/image-helper";

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="group bg-[#0f1115] border border-white/5 overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full rounded-2xl">
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/20 m-2 rounded-xl">
                <Link href={`/products/${product.slug || product.id}`}>
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>

                {/* Price Tag Overlay - Bottom Left of Image */}
                <div className="absolute bottom-2 left-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-3 py-1 font-bold rounded-lg shadow-lg">
                        {formatPrice(Number(product.price))}
                    </Badge>
                </div>
            </div>

            <CardHeader className="p-4 pt-2">
                {/* Tech Stack Badge */}
                <div className="mb-2">
                    <Badge variant="outline" className="text-[10px] text-blue-400 border-blue-500/30 bg-blue-500/10 uppercase tracking-wider">
                        {product.category_name || 'PHP'}
                    </Badge>
                </div>

                <h3 className="font-bold text-lg leading-snug line-clamp-2 text-white group-hover:text-blue-500 transition-colors">
                    <Link href={`/products/${product.slug || product.id}`}>
                        {product.name}
                    </Link>
                </h3>

                {/* Author */}
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>Bởi {product.username || 'Admin'}</span>
                </div>
            </CardHeader>

            <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between">
                <div className="text-xl font-bold text-blue-500">
                    {formatPrice(Number(product.price))}
                </div>
            </CardFooter>
        </Card>
    )
}
