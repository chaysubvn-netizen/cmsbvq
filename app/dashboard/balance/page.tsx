"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, CheckCircle2, Clock, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BalanceHistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.payment.banks()
            .then((res: any) => {
                // history is nested inside bank response according to user docs
                const list = res.history || (res.data && res.data.history) || [];
                setHistory(Array.isArray(list) ? list : []);
            })
            .catch((err) => console.error("Deposit history fetch error:", err))
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
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Deposit History</h1>
                <p className="text-muted-foreground">List of your bank transfer deposits.</p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-white">Time</TableHead>
                            <TableHead className="text-white">Method</TableHead>
                            <TableHead className="text-white">Transaction ID</TableHead>
                            <TableHead className="text-white">Amount</TableHead>
                            <TableHead className="text-white">Content/Comment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.length > 0 ? (
                            history.map((item) => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                        {item.create_date || item.created_at}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
                                                <Wallet className="w-3 h-3 text-blue-400" />
                                            </div>
                                            <span className="font-medium text-white">{item.payment_method || 'Bank'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-blue-400">
                                        <div className="flex items-center gap-1">
                                            <Hash className="w-3 h-3 h-4 opacity-50" />
                                            {item.tranId || 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-green-400 font-bold">
                                        +{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item.amount || 0))}
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate text-xs text-muted-foreground" title={item.comment}>
                                        {item.comment}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <Wallet className="w-8 h-8 opacity-20" />
                                        <p>No deposit history found.</p>
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
