"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Order } from "@/lib/api-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, ShoppingBag, Search, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.user.history()
            .then((res: any) => {
                const list = res.data || res || [];
                setOrders(Array.isArray(list) ? list : []);
            })
            .catch((err) => console.error("History fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-48 bg-white/10" />
            <Skeleton className="h-64 w-full bg-white/10 rounded-xl" />
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Order History</h1>
                    <p className="text-muted-foreground">Manage and download your purchased source code.</p>
                </div>
                <div className="relative group max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-white">Order ID</TableHead>
                            <TableHead className="text-white">Product</TableHead>
                            <TableHead className="text-white">Price</TableHead>
                            <TableHead className="text-white">Date</TableHead>

                            <TableHead className="text-right text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        #{order.trans_id || order.id}
                                    </TableCell>
                                    <TableCell className="font-medium text-white">
                                        <div className="flex flex-col">
                                            <span>{order.product_name}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Digital product</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-green-400 font-bold">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(order.price || 0))}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {order.created_at}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40" asChild>
                                                {order.link_download ? (
                                                    <a href={order.link_download} target="_blank" rel="noopener noreferrer">
                                                        <Download className="w-3.5 h-3.5 mr-1" /> Download
                                                    </a>
                                                ) : (
                                                    <button disabled className="opacity-50 cursor-not-allowed">
                                                        <Download className="w-3.5 h-3.5 mr-1" /> Download
                                                    </button>
                                                )}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-48 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <ShoppingBag className="w-8 h-8 opacity-20" />
                                        <p>You haven't purchased any code yet.</p>
                                        <Link href="/products" className="text-primary hover:underline text-sm font-medium">Browse products now</Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// Utility function (duplicate from layout if needed, or import if global)
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
