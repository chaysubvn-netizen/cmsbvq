import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Database, Share2, HardDrive, UserCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Chính sách bảo mật - CMSBVQ.COM",
    description: "Chính sách bảo mật và quyền riêng tư của CMSBVQ.COM. Tìm hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
};

export default function PrivacyPolicyPage() {
    const currentDate = new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Chính sách bảo mật
                        </h1>
                        <p className="text-lg text-muted-foreground mb-2">
                            CMSBVQ.COM cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn.
                            Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                            Cập nhật lần cuối: {currentDate}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">

                        {/* Thu thập thông tin */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Database className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Thu thập thông tin</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Chúng tôi thu thập thông tin cá nhân mà bạn cung cấp trực tiếp khi đăng ký tài khoản, bao gồm:
                                    <strong className="text-foreground"> họ tên, địa chỉ email, số điện thoại và thông tin thanh toán</strong>.
                                </p>
                                <p>
                                    Ngoài ra, chúng tôi cũng tự động thu thập một số thông tin kỹ thuật như
                                    <strong className="text-foreground"> địa chỉ IP, loại trình duyệt và thiết bị</strong> bạn sử dụng để cải thiện trải nghiệm người dùng.
                                </p>
                            </div>
                        </section>

                        {/* Sử dụng thông tin */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Sử dụng thông tin</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>Thông tin của bạn được sử dụng để:</p>
                                <ul className="space-y-2 ml-6 list-disc marker:text-primary">
                                    <li>Xử lý đơn hàng và giao dịch</li>
                                    <li>Cung cấp hỗ trợ khách hàng</li>
                                    <li>Gửi thông báo về dịch vụ và cập nhật sản phẩm</li>
                                    <li>Cải thiện trải nghiệm người dùng</li>
                                    <li>Đảm bảo an toàn bảo mật cho tài khoản của bạn</li>
                                </ul>
                            </div>
                        </section>

                        {/* Bảo mật thông tin */}
                        <section className="premium-card p-8 border-primary/20">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Bảo mật thông tin</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Chúng tôi áp dụng các biện pháp bảo mật tiên tiến nhất để bảo vệ thông tin của bạn, bao gồm:
                                </p>
                                <ul className="space-y-2 ml-6 list-disc marker:text-green-400">
                                    <li><strong className="text-foreground">Mã hóa SSL/TLS</strong> cho tất cả dữ liệu truyền tải</li>
                                    <li><strong className="text-foreground">Xác thực hai yếu tố (2FA)</strong> để bảo vệ tài khoản</li>
                                    <li><strong className="text-foreground">Giám sát hệ thống 24/7</strong> để phát hiện và ngăn chặn xâm nhập</li>
                                    <li><strong className="text-foreground">Tuân thủ chuẩn PCI-DSS</strong> cho xử lý thanh toán</li>
                                </ul>
                                <p className="pt-2">
                                    Thông tin thanh toán được xử lý qua các cổng thanh toán uy tín và được mã hóa an toàn.
                                </p>
                            </div>
                        </section>

                        {/* Chia sẻ thông tin */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Share2 className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Chia sẻ thông tin</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Chúng tôi cam kết <strong className="text-foreground">không bán, trao đổi hoặc chia sẻ</strong> thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại.
                                </p>
                                <p>Thông tin chỉ được chia sẻ khi:</p>
                                <ul className="space-y-2 ml-6 list-disc marker:text-orange-400">
                                    <li>Có sự đồng ý của bạn</li>
                                    <li>Cần thiết để cung cấp dịch vụ (ví dụ: xử lý thanh toán)</li>
                                    <li>Có yêu cầu từ cơ quan pháp luật</li>
                                </ul>
                            </div>
                        </section>

                        {/* Lưu trữ dữ liệu */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <HardDrive className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Lưu trữ dữ liệu</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Thông tin của bạn được lưu trữ an toàn trên hệ thống máy chủ của chúng tôi trong suốt thời gian bạn sử dụng dịch vụ.
                                </p>
                                <p>
                                    Sau khi tài khoản bị xóa, dữ liệu sẽ được giữ lại tối đa <strong className="text-foreground">30 ngày</strong> trước khi xóa vĩnh viễn,
                                    trừ khi pháp luật yêu cầu lưu trữ lâu hơn.
                                </p>
                            </div>
                        </section>

                        {/* Quyền của bạn */}
                        <section className="premium-card p-8 border-primary/30">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Quyền của bạn</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
                                <ul className="space-y-2 ml-6 list-disc marker:text-primary">
                                    <li><strong className="text-foreground">Truy cập</strong> - Xem thông tin cá nhân của bạn</li>
                                    <li><strong className="text-foreground">Chỉnh sửa</strong> - Cập nhật hoặc sửa đổi thông tin</li>
                                    <li><strong className="text-foreground">Xóa</strong> - Yêu cầu xóa tài khoản và dữ liệu</li>
                                    <li><strong className="text-foreground">Xuất dữ liệu</strong> - Tải về bản sao thông tin của bạn</li>
                                    <li><strong className="text-foreground">Hạn chế xử lý</strong> - Yêu cầu giới hạn cách sử dụng dữ liệu</li>
                                </ul>
                                <p className="pt-2">
                                    Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email hỗ trợ.
                                </p>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="premium-card p-8 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Có câu hỏi về chính sách bảo mật?</h3>
                                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc nào về cách chúng tôi xử lý dữ liệu của bạn.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/dashboard/support"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
                                >
                                    <Mail className="w-4 h-4" />
                                    Liên hệ hỗ trợ
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-medium transition-all"
                                >
                                    Trang chủ
                                </Link>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
