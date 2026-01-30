"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Bank, User } from "@/lib/api-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Copied from other files, ensure it exists or remove if not needed
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, CreditCard, Info } from "lucide-react";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/image-helper";

export default function DepositPage() {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [notice, setNotice] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [bankRes, userRes] = await Promise.all([
                    api.payment.banks(),
                    api.auth.me()
                ]);

                if ((bankRes as any).status === 'success' || Array.isArray((bankRes as any).banks)) {
                    const list = (bankRes as any).banks || [];
                    console.log("Bank List Raw:", list); // Debug log
                    setBanks(list);
                    if ((bankRes as any).notice) {
                        setNotice((bankRes as any).notice);
                    }
                }

                if ((userRes as any).user || (userRes as any).data?.user) {
                    setUser((userRes as any).user || (userRes as any).data?.user);
                }
            } catch (error) {
                console.error("Failed to load deposit data", error);
                toast.error("Failed to load bank information");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${label} to clipboard`);
    };

    if (loading) {
        return <div className="space-y-4">
            <Skeleton className="h-12 w-1/3 bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-48 bg-white/10 rounded-xl" />
                <Skeleton className="h-48 bg-white/10 rounded-xl" />
            </div>
        </div>
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Deposit Money</h1>
                <p className="text-muted-foreground">Top up your balance instantly via Bank Transfer / Momo.</p>
            </div>

            {notice && (
                <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-400">
                    <Info className="h-4 w-4" />
                    <AlertTitle>System Notice</AlertTitle>
                    <AlertDescription dangerouslySetInnerHTML={{ __html: notice }} />
                </Alert>
            )}

            <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-400">
                <Info className="h-4 w-4" />
                <AlertTitle>Important Syntax</AlertTitle>
                <AlertDescription>
                    Transfer Content MUST correspond to the syntax below for auto-topup.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banks.map((bank: any) => {
                    // Flexible Mapping based on common Vietnamese API patterns
                    let bankCode = bank.bank_name || bank.short_name || bank.code || bank.bank_code;
                    let accountName = bank.account_name || bank.ctk || bank.owner || bank.name_account || bank.name;
                    const accountNumber = bank.account_number || bank.stk || bank.number || bank.account_num;

                    // SMART SWAP: Some APIs invert 'bank_name' (owner name) and 'account_name' (bank code)
                    // If bankCode has spaces and accountName is short/uppercase, swap them.
                    if (bankCode && bankCode.includes(' ') && accountName && !accountName.includes(' ') && accountName.length <= 10) {
                        const temp = bankCode;
                        bankCode = accountName;
                        accountName = temp;
                    }

                    // Generate Transfer Syntax
                   const transferSyntax = `${bank.transfer_content || ''}`;

                    // User provided template: https://img.vietqr.io/image/ACB-18710021-qronly2.jpg?amount=0&addInfo=coin3&accountName=Nguyen%20th%E1%BB%8B%20ph%C6%B0%C6%A1ng
                    const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-qronly2.jpg?amount=0&addInfo=${encodeURIComponent(transferSyntax)}&accountName=${encodeURIComponent(accountName)}`;

                    return (
                        <Card key={bank.id} className="bg-black/40 border-white/10 overflow-hidden relative group">
                            <CardHeader className="pb-2 border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={getImageUrl(bank.logo)}
                                            alt={bankCode}
                                            className="w-full h-full object-contain"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                        <CreditCard className="w-6 h-6 text-black hidden first:block" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{bankCode || "Bank"}</CardTitle>
                                        <p className="text-xs text-muted-foreground uppercase">{accountName}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {/* Account Number */}
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account Number</span>
                                    <div className="flex items-center gap-2 bg-black/50 p-3 rounded-lg border border-white/5 group-hover:border-blue-500/30 transition-colors">
                                        <code className="text-lg font-mono font-bold text-white flex-1">{accountNumber}</code>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white" onClick={() => copyToClipboard(accountNumber, "Account Number")}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Content Syntax */}
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Transfer Content (Memo)</span>
                                    <div className="flex items-center gap-2 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                        <code className="text-lg font-mono font-bold text-blue-400 flex-1">{transferSyntax}</code>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300" onClick={() => copyToClipboard(transferSyntax, "Transfer Content")}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* QR Code */}
                                <div className="pt-4 flex justify-center">
                                    <div className="bg-white p-2 rounded-xl">
                                        <img src={qrUrl} alt="QR Code" className="w-48 h-48 object-contain" />
                                    </div>
                                </div>
                                <p className="text-center text-xs text-muted-foreground mt-2">Scan to pay instantly</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {banks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No payment methods available at the moment. Please contact support.
                </div>
            )}
        </div>
    );
}
