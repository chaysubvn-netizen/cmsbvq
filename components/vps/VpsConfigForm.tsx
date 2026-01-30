"use client";

import { VpsConfig, VpsProduct } from "@/lib/api-types";
import { formatPrice } from "@/lib/image-helper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Cpu, Smartphone, Database, Globe, ShoppingCart, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Minus, Plus, Ticket } from "lucide-react";
import { Input } from "@/components/ui/input";

export function VpsConfigForm({ product, config }: { product: VpsProduct; config: VpsConfig }) {
    const router = useRouter();
    const [selectedOs, setSelectedOs] = useState<string>(config.os[0]?.name || "");
    const [extraCpu, setExtraCpu] = useState(0);
    const [extraRam, setExtraRam] = useState(0);
    const [extraSsd, setExtraSsd] = useState(0);
    const [billingCycle, setBillingCycle] = useState(1); // months
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);
    const [userBalance, setUserBalance] = useState(0);

    // Mock pricing for extras (usually comes from config API, but for now we use constants or derived values)
    const CPU_PRICE = 30000;
    const RAM_PRICE = 30000;
    const SSD_PRICE = 10000;

    const basePrice = Number(product.price);
    const extraPrice = (extraCpu * CPU_PRICE) + (extraRam * RAM_PRICE) + (extraSsd * SSD_PRICE);
    const totalPrice = (basePrice + extraPrice) * billingCycle;

    useEffect(() => {
        fetchUserBalance();
    }, []);

    const fetchUserBalance = async () => {
        try {
            const res = await api.auth.me() as any;
            const userData = res.user || (res.data && res.data.user);

            if (userData) {
                // Support both balance and coin, and strip formatting dots
                const rawBalance = userData.balance || userData.coin || "0";
                const cleanBalance = String(rawBalance).replace(/\./g, "");
                setUserBalance(Number(cleanBalance) || 0);
            }
        } catch (error) {
            console.error("Failed to fetch user balance:", error);
        }
    };

    const handleBuy = async () => {
        if (!selectedOs) {
            toast.error("Vui lòng chọn Hệ điều hành");
            return;
        }

        if (userBalance < totalPrice) {
            toast.error("Số dư không đủ, vui lòng nạp thêm tiền.");
            return;
        }

        setLoading(true);
        try {
            const res = await api.vps.buy({
                id: Number(product.id),
                os: selectedOs,
                location: config.locations[0] || "Default", // Simplified for reference match
                note: `CPU: +${extraCpu}, RAM: +${extraRam}, SSD: +${extraSsd}, Cycle: ${billingCycle} mo`
            });

            if (res.status === 'success') {
                toast.success("Đặt hàng thành công!");
                router.push("/dashboard/history");
            } else {
                toast.error(res.msg || "Đặt hàng thất bại");
            }
        } catch (error) {
            console.error("VPS Purchase Error:", error);
            toast.error("Đã xảy ra lỗi khi đặt hàng");
        } finally {
            setLoading(false);
        }
    };

    const billingOptions = [
        { label: "1 THÁNG", months: 1 },
        { label: "2 THÁNG", months: 2 },
        { label: "3 THÁNG", months: 3 },
        { label: "6 THÁNG", months: 6 },
        { label: "1 NĂM", months: 12 },
        { label: "2 NĂM", months: 24 },
        { label: "3 NĂM", months: 36 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Configuration Section */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="premium-card p-10 space-y-12">
                    {/* Header */}
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/5">
                            <Cpu className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Cấu hình VPS</h2>
                            <p className="text-slate-500 font-medium">Cài đặt máy chủ theo nhu cầu của bạn</p>
                        </div>
                    </div>

                    {/* Resource Scaling */}
                    <div className="space-y-6">
                        <Label className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            Mua thêm tài nguyên
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* CPU Card */}
                            <div className="premium-card p-6 bg-white/[0.02] border-white/5 group hover:border-blue-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                        <Cpu className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300 uppercase">CPU (vCore)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => setExtraCpu(Math.max(0, extraCpu - 1))}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-3xl font-black text-white">{extraCpu}</span>
                                    <button
                                        onClick={() => setExtraCpu(extraCpu + 1)}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="text-[11px] font-bold text-slate-500">+{formatPrice(CPU_PRICE)}/vCore</span>
                                </div>
                            </div>

                            {/* RAM Card */}
                            <div className="premium-card p-6 bg-white/[0.02] border-white/5 group hover:border-blue-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Smartphone className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300 uppercase">RAM (GB)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => setExtraRam(Math.max(0, extraRam - 1))}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-3xl font-black text-white">{extraRam}</span>
                                    <button
                                        onClick={() => setExtraRam(extraRam + 1)}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="text-[11px] font-bold text-slate-500">+{formatPrice(RAM_PRICE)}/GB</span>
                                </div>
                            </div>

                            {/* SSD Card */}
                            <div className="premium-card p-6 bg-white/[0.02] border-white/5 group hover:border-blue-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Database className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300 uppercase">SSD (GB)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => setExtraSsd(Math.max(0, extraSsd - 1))}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-3xl font-black text-white">{extraSsd}</span>
                                    <button
                                        onClick={() => setExtraSsd(extraSsd + 1)}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="text-[11px] font-bold text-slate-500">+{formatPrice(SSD_PRICE)}/10GB</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing Cycle */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-black text-white uppercase tracking-widest">
                                Chu kỳ thanh toán
                            </Label>
                            <span className="text-xs font-bold text-blue-500 cursor-pointer hover:underline">Gia hạn dài ngày để nhận ưu đãi</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {billingOptions.map((option) => (
                                <button
                                    key={option.months}
                                    onClick={() => setBillingCycle(option.months)}
                                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${billingCycle === option.months
                                        ? "border-blue-600 bg-blue-600/10"
                                        : "border-white/5 bg-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <span className={`text-sm font-bold uppercase ${billingCycle === option.months ? "text-blue-400" : "text-white"}`}>
                                        {option.label}
                                    </span>
                                    <span className="text-xs font-medium text-slate-500">
                                        {formatPrice((basePrice + extraPrice) * option.months)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* OS Selection */}
                    <div className="space-y-6">
                        <Label className="text-sm font-black text-white uppercase tracking-widest">
                            Hệ điều hành (OS)
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {config.os.map((os: any) => (
                                <button
                                    key={os.name}
                                    onClick={() => setSelectedOs(os.name)}
                                    className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-6 relative group ${selectedOs === os.name
                                        ? "border-blue-600 bg-blue-600/10 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        : "border-white/5 bg-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <img src={os.image} alt={os.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
                                    <span className={`text-[11px] font-black text-center uppercase tracking-wider ${selectedOs === os.name ? "text-blue-400" : "text-slate-500"}`}>
                                        {os.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="premium-card p-10 bg-white/[0.02] space-y-10 border-white/5">
                    <h3 className="text-xl font-black text-white tracking-tight">Tóm tắt đơn hàng</h3>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-2xl font-black text-white">{product.name}</h4>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-500 uppercase tracking-widest">Gói gốc</span>
                                <span className="text-white">{formatPrice(basePrice)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-500 uppercase tracking-widest">Thời hạn</span>
                                <span className="text-white">{billingCycle} Tháng</span>
                            </div>
                        </div>

                        {/* Coupon */}
                        <div className="space-y-4 pt-8 border-t border-white/5">
                            <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Mã giảm giá (Coupon)</Label>
                            <div className="flex gap-2">
                                <div className="relative flex-grow group">
                                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        placeholder="Nhập mã của bạn..."
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:ring-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <Button className="bg-white/10 hover:bg-white/20 text-white font-black px-6 h-12 rounded-xl text-xs uppercase tracking-widest transition-all">
                                    Áp dụng
                                </Button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Tổng thanh toán:</span>
                                <span className="text-3xl font-black text-blue-500 tracking-tight">{formatPrice(totalPrice)}</span>
                            </div>

                            {userBalance < totalPrice && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                        <span className="text-red-500 font-bold text-sm">!</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-red-500/80 leading-relaxed">
                                        Số dư không đủ! (Còn {formatPrice(userBalance)}). Vui lòng nạp thêm tiền.
                                    </p>
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleBuy}
                            disabled={loading}
                            className={`w-full h-16 rounded-2xl font-black text-lg shadow-xl transition-all duration-300 ${userBalance < totalPrice
                                ? "bg-white/5 text-slate-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:scale-[1.02]"}`}
                        >
                            {loading ? "Đang xử lý..." : "Thanh toán ngay"}
                        </Button>

                        <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest opacity-60">
                            Khởi tạo tự động ngay khi thanh toán thành công
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

