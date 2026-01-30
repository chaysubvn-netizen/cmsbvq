"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { CronServer } from "@/lib/api-types";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Globe, Server, Clock, Calendar, Zap, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CronForm() {
    const router = useRouter();
    const [servers, setServers] = useState<CronServer[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingServers, setFetchingServers] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        urls: [""] as string[],
        method: "GET",
        expression: "*/1 * * * *", // Default 1 minute
        months: 1,
        server_id: "",
        headers: "{}",
        body: "{}",
        coupon: ""
    });

    // Helper for interval (seconds/minutes to cron)
    const [intervalType, setIntervalType] = useState("minutes");
    const [intervalValue, setIntervalValue] = useState(1);

    useEffect(() => {
        api.cron.servers().then((res: any) => {
            if (res.status === 'success') {
                setServers(res.data || []);
                if (res.data?.length > 0) {
                    setFormData(prev => ({ ...prev, server_id: res.data[0].id.toString() }));
                }
            }
        }).finally(() => setFetchingServers(false));
    }, []);

    // Update expression based on interval
    useEffect(() => {
        let exp = "*/1 * * * *";
        if (intervalType === "minutes") {
            exp = `*/${intervalValue} * * * *`;
        } else if (intervalType === "hours") {
            exp = `0 */${intervalValue} * * *`;
        }
        setFormData(prev => ({ ...prev, expression: exp }));
    }, [intervalType, intervalValue]);

    const handleAddUrl = () => {
        if (formData.urls.length < 10) {
            setFormData(prev => ({ ...prev, urls: [...prev.urls, ""] }));
        } else {
            toast.error("Tối đa 10 URL cho mỗi lượt thiết lập");
        }
    };

    const handleRemoveUrl = (index: number) => {
        if (formData.urls.length > 1) {
            setFormData(prev => ({ ...prev, urls: prev.urls.filter((_, i) => i !== index) }));
        }
    };

    const handleUrlChange = (index: number, val: string) => {
        const newUrls = [...formData.urls];
        newUrls[index] = val;
        setFormData(prev => ({ ...prev, urls: newUrls }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.cron.add({
                ...formData,
                url: formData.urls.filter(u => u.trim()).join(',')
            });
            if (res.status === 'success') {
                toast.success("Đã tạo cronjob thành công!");
                router.push("/dashboard/cron");
            } else {
                toast.error((res as any).message || "Không thể tạo cronjob");
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    const selectedServer = servers.find(s => s.id.toString() === formData.server_id);
    const urlCount = formData.urls.filter(u => u.trim() !== "").length || 1;
    const serverPrice = selectedServer ? Number(selectedServer.price) : 0;
    const estimatedPrice = serverPrice * formData.months * urlCount;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="text-slate-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                        Tên tiến trình
                    </Label>
                    <Input
                        placeholder="Ví dụ: Sync dữ liệu hệ thống"
                        className="bg-secondary/30 border-white/5 h-12 focus:ring-primary/20 focus:border-primary/50 transition-all rounded-xl"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-3">
                    <Label className="text-slate-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                        Danh sách URL mục tiêu
                    </Label>
                    <div className="space-y-3">
                        {formData.urls.map((url, index) => (
                            <div key={index} className="flex gap-2 group">
                                <div className="relative flex-1">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        placeholder={`https://domain.com/cron-${index + 1}`}
                                        className="bg-secondary/30 border-white/5 pl-11 h-12 focus:ring-primary/20 focus:border-primary/50 transition-all rounded-xl"
                                        value={url}
                                        onChange={e => handleUrlChange(index, e.target.value)}
                                        required
                                    />
                                </div>
                                {formData.urls.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                        onClick={() => handleRemoveUrl(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-500 hover:text-primary gap-2 h-10 px-4 rounded-xl hover:bg-white/5 border border-dashed border-white/5"
                        onClick={handleAddUrl}
                    >
                        <Plus className="w-3 h-3" /> Thêm đường dẫn khác
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <Label className="text-slate-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            Máy chủ
                        </Label>
                        <Select value={formData.server_id} onValueChange={val => setFormData({ ...formData, server_id: val })}>
                            <SelectTrigger className="bg-secondary/30 border-white/5 h-12 rounded-xl focus:ring-primary/20">
                                <SelectValue placeholder="Chọn máy chủ" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10">
                                {servers.map(server => (
                                    <SelectItem key={server.id} value={server.id.toString()}>
                                        {server.name} ({Number(server.price || 0).toLocaleString()}đ/tháng)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-slate-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            Chu kỳ (giây)
                        </Label>
                        <Input
                            type="number"
                            min="1"
                            className="bg-secondary/30 border-white/5 h-12 rounded-xl focus:ring-primary/20"
                            value={intervalValue}
                            onChange={e => setIntervalValue(parseInt(e.target.value) || 1)}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-slate-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                        Thời hạn thuê
                    </Label>
                    <Select value={formData.months.toString()} onValueChange={val => setFormData({ ...formData, months: parseInt(val) })}>
                        <SelectTrigger className="bg-secondary/30 border-white/5 h-12 rounded-xl focus:ring-primary/20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10">
                            <SelectItem value="1">1 tháng</SelectItem>
                            <SelectItem value="3">3 tháng</SelectItem>
                            <SelectItem value="6">6 tháng</SelectItem>
                            <SelectItem value="12">1 năm</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label className="text-slate-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                        Mã giảm giá (Coupon)
                    </Label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                placeholder="Nhập mã của bạn..."
                                className="bg-secondary/30 border-white/5 pl-11 h-12 rounded-xl focus:ring-primary/20"
                                value={formData.coupon}
                                onChange={e => setFormData({ ...formData, coupon: e.target.value })}
                            />
                        </div>
                        <Button type="button" variant="secondary" className="h-12 px-6 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10">
                            ÁP DỤNG
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-400 font-medium">Thanh toán dự kiến</span>
                    <span className="text-3xl font-black text-white">{estimatedPrice.toLocaleString()}đ</span>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-3 h-14 text-lg font-bold rounded-2xl shadow-[0_0_20px_-5px_var(--color-blue-600)] transition-all"
                    disabled={loading || fetchingServers}
                >
                    <Plus className="w-5 h-5" /> {loading ? "Đang xử lý..." : "Tiếp tục thanh toán"}
                </Button>
            </div>
        </form>
    );
}
