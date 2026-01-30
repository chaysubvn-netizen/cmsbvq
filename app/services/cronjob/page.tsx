"use client";

import { CronForm } from "@/components/cron/CronForm";
import { AlertCircle, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CronjobServicePage() {
    return (
        <div className="min-h-screen bg-[#020202] py-12 px-4 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Dịch vụ Cronjob</h1>
                    <p className="text-slate-400">Thiết lập tiến trình chạy nhiều URL tự động theo chu kỳ.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-7">
                        <div className="p-8 rounded-2xl bg-card border border-white/10 shadow-xl">
                            <CronForm />
                        </div>
                    </div>

                    {/* Right Side: Info & Help */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Important Notes */}
                        <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/20">
                            <div className="flex items-center gap-3 mb-4 text-blue-400">
                                <Info className="w-5 h-5" />
                                <h2 className="font-bold">Lưu ý quan trọng</h2>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex gap-2">
                                    <span className="text-blue-500">•</span>
                                    Hỗ trợ thêm tối đa 10 URL cho mỗi lượt thiết lập.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-blue-500">•</span>
                                    Mỗi URL sẽ được tính phí thuê theo giá niêm yết của máy chủ.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-blue-500">•</span>
                                    Tần suất (chu kỳ) sẽ được áp dụng chung cho tất cả URL trong danh sách.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-blue-500">•</span>
                                    Dữ liệu log sẽ được quản lý riêng biệt cho từng URL sau khi khởi tạo.
                                </li>
                            </ul>
                        </div>

                        {/* Help Box */}
                        <div className="p-6 rounded-2xl bg-card border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-16 h-16 text-primary" />
                            </div>
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                <MessageCircle className="w-5 h-5" />
                                <h2 className="font-bold">Bạn cần hỗ trợ?</h2>
                            </div>
                            <p className="text-sm text-slate-400 mb-6 relative z-10">
                                Đội ngũ kỹ thuật của chúng tôi sẵn sàng hỗ trợ bạn cấu hình hàng loạt tiến trình phức tạp hoàn toàn miễn phí qua Telegram.
                            </p>
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                                Nhắn tin cho hỗ trợ viên
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
            </div>
        </div>
    );
}
