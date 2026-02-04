"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/lib/api-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Wallet, Mail, Calendar, Shield } from "lucide-react";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.auth.me()
            .then((res: any) => {
                const userData = res.user || (res.data && res.data.user);
                // Fix map coin
                if (userData && userData.coin && !userData.balance) {
                    userData.balance = Number(userData.coin);
                }
                setUser(userData);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="space-y-4">
        <Skeleton className="h-32 w-full bg-white/10 rounded-2xl" />
        <Skeleton className="h-64 w-full bg-white/10 rounded-2xl" />
    </div>;

    if (!user) return <div>Vui lòng đăng nhập để xem bảng điều khiển.</div>;

    return (
        <div className="space-y-6">
            {/* Header Profile */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10">
                <Avatar className="w-24 h-24 border-4 border-black shadow-xl">
                    <AvatarImage src="https://sieuthicode.net/avatars/01.png" />
                    <AvatarFallback className="text-3xl font-bold bg-blue-600 text-white">{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Tham gia: {user.created_at || user.create_date || 'Gần đây'}
                        </div>
                    </div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 min-w-[200px] text-center">
                    <span className="text-sm text-muted-foreground block mb-1">Số dư hiện tại</span>
                    <span className="text-2xl font-bold text-green-400">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(user.balance || 0))}
                    </span>
                </div>
            </div>

            {/* Account Status / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/20 border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tổng chi tiêu</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 ₫</div>
                        <p className="text-xs text-muted-foreground">Giá trị giao dịch trọn đời</p>
                    </CardContent>
                </Card>
                <Card className="bg-black/20 border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Trạng thái tài khoản</CardTitle>
                        <Shield className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">Đang hoạt động</div>
                        <p className="text-xs text-muted-foreground">Không có hạn chế</p>
                    </CardContent>
                </Card>
                {/* Add more cards as needed */}
            </div>
        </div>
    );
}
