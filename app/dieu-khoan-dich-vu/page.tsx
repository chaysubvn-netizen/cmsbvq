import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Package, CreditCard, Shield, Headphones, Users, Ban, AlertTriangle, Copyright, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Điều khoản và Điều kiện - CMSBVQ.COM",
    description: "Điều khoản và điều kiện sử dụng dịch vụ của CMSBVQ.COM. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.",
};

export default function TermsPage() {
    const currentDate = new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative border-b border-border/40 bg-gradient-to-b from-blue-500/5 to-transparent">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <FileText className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Điều khoản và Điều kiện
                        </h1>
                        <p className="text-lg text-muted-foreground mb-2">
                            Vui lòng đọc kỹ các điều khoản và điều kiện sau đây trước khi sử dụng dịch vụ của CMSBVQ.COM.
                            Việc sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận các điều khoản này.
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
                    <div className="space-y-8">

                        {/* 1. Điều khoản chung */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">1. Điều khoản chung</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Bằng việc truy cập và sử dụng dịch vụ của CMSBVQ.COM, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện sau đây.
                                    Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
                                </p>
                                <p>
                                    Chúng tôi có quyền cập nhật các điều khoản này bất kỳ lúc nào mà không cần thông báo trước.
                                </p>
                            </div>
                        </section>

                        {/* 2. Sản phẩm và dịch vụ */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <Package className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">2. Sản phẩm và dịch vụ</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Các sản phẩm được bán trên nền tảng bao gồm <strong className="text-foreground">mã nguồn, phần mềm, dịch vụ VPS, Hosting và tên miền</strong>.
                                    Mỗi sản phẩm đi kèm với giấy phép sử dụng cụ thể.
                                </p>
                                <p>
                                    Bạn chỉ được phép sử dụng sản phẩm theo đúng điều khoản giấy phép đã mua.
                                    Việc <strong className="text-red-400">phân phối lại, bán lại hoặc chia sẻ sản phẩm</strong> mà không có sự cho phép bằng văn bản là nghiêm cấm.
                                </p>
                            </div>
                        </section>

                        {/* 3. Thanh toán */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">3. Thanh toán</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Tất cả giao dịch thanh toán phải được thực hiện qua các phương thức thanh toán chính thức trên website.
                                    Giá sản phẩm đã bao gồm thuế (nếu có) và được hiển thị bằng <strong className="text-foreground">Việt Nam Đồng (VNĐ)</strong>.
                                </p>
                                <p>
                                    Chúng tôi không chịu trách nhiệm cho các giao dịch thực hiện ngoài hệ thống thanh toán chính thức của chúng tôi.
                                </p>
                            </div>
                        </section>

                        {/* 4. Chính sách bảo hành */}
                        <section className="premium-card p-8 border-primary/20">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">4. Chính sách bảo hành</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <ul className="space-y-3 ml-6 list-disc marker:text-primary">
                                    <li>
                                        Chúng tôi <strong className="text-foreground">từ chối bảo hành</strong> trường hợp quý khách tự gây ra lỗi ví dụ như:
                                        code thêm một số chức năng xảy ra lỗi, edit giao diện xảy ra lỗi v.v.
                                    </li>
                                    <li>
                                        Mã nguồn sẽ được <strong className="text-foreground">Update vá lỗi miễn phí</strong> đến khi hết vòng đời sản phẩm (đến khi ngừng bán sản phẩm đó).
                                    </li>
                                    <li>
                                        <strong className="text-red-400">Không hỗ trợ và bảo hành</strong> đối với trường hợp mua mã nguồn từ bên thứ 3 hoặc sử dụng mã nguồn được share.
                                    </li>
                                    <li>
                                        <strong className="text-red-400">Không hỗ trợ</strong> trường hợp quý khách hàng sử dụng mã nguồn để chiếm đoạt tài sản, lừa đảo, vi phạm pháp luật Việt Nam.
                                    </li>
                                    <li>
                                        <strong className="text-red-400">Không hỗ trợ</strong> trường hợp quý khách chia sẻ mã nguồn, bán lại mã nguồn cho người khác.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 5. Chính sách hỗ trợ */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Headphones className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">5. Chính sách hỗ trợ</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <ul className="space-y-3 ml-6 list-disc marker:text-blue-400">
                                    <li>
                                        Chúng tôi sẽ <strong className="text-foreground">setup cho bạn lần đầu miễn phí</strong> khi bạn mua mã nguồn của chúng tôi,
                                        chúng tôi sẽ đưa code bạn lên Hosting và cài đặt mọi thứ, bạn chỉ cần đưa vào sử dụng.
                                    </li>
                                    <li>
                                        Nếu bạn cần chúng tôi setup lại lần 2 để đưa lên Hosting khác chúng tôi sẽ lấy phí <strong className="text-foreground">500.000đ/lần</strong> để tránh SPAM.
                                    </li>
                                    <li>
                                        Nếu lỗi do code gây ra chúng tôi sẽ <strong className="text-foreground">bảo hành miễn phí</strong>,
                                        nếu do tác nhân khác gây ra sẽ tính phí hỗ trợ.
                                    </li>
                                    <li>
                                        Chỉ hỗ trợ duy nhất <strong className="text-foreground">1 người mua</strong>,
                                        nếu người mua share, bán lại giấy phép cho người khác, người đó sẽ không được hỗ trợ từ chúng tôi.
                                    </li>
                                    <li>
                                        Chúng tôi có quyền <strong className="text-red-400">khóa giấy phép kích hoạt website</strong> khi có bằng chứng bạn sử dụng website để lừa đảo.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 6. Chính sách cộng tác viên */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">6. Chính sách cộng tác viên</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <ul className="space-y-3 ml-6 list-disc marker:text-orange-400">
                                    <li>
                                        Các CTV khi giới thiệu thành công khách hàng sử dụng dịch vụ của chúng tôi sẽ được nhận <strong className="text-foreground">20% giá trị</strong> của giao dịch đó.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Ví dụ:</strong> Nếu Sale A giới thiệu được 1 khách B mua mã nguồn với giá 1.000.000đ,
                                        Sale A sẽ nhận được 20% tức 200.000đ khi khách B hoàn thành thanh toán.
                                    </li>
                                    <li>
                                        Sau khi tìm kiếm thành công khách hàng, CTV vui lòng tạo nhóm liên hệ bao gồm <strong className="text-foreground">Khách Hàng - CTV - CMSBVQ.COM</strong> để cùng thực hiện trao đổi giao dịch sao cho minh bạch nhất.
                                    </li>
                                    <li>
                                        Thanh toán sẽ được về tay CTV sau khi khách hàng đó thanh toán đủ giá trị đơn hàng.
                                    </li>
                                    <li>
                                        CTV chỉ áp dụng cho khách hàng <strong className="text-foreground">chưa từng</strong> sử dụng dịch vụ của chúng tôi.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 7. Hành vi bị cấm */}
                        <section className="premium-card p-8 border-red-500/20">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <Ban className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">7. Hành vi bị cấm</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>Bạn không được sử dụng dịch vụ để:</p>
                                <ul className="space-y-2 ml-6 list-disc marker:text-red-400">
                                    <li>Phát tán mã độc, spam hoặc nội dung bất hợp pháp</li>
                                    <li>Xâm phạm quyền sở hữu trí tuệ</li>
                                    <li>Thực hiện các hành vi gian lận hoặc lừa đảo</li>
                                    <li>Cố gắng truy cập trái phép vào hệ thống</li>
                                    <li>Bất kỳ hoạt động nào vi phạm pháp luật Việt Nam</li>
                                </ul>
                            </div>
                        </section>

                        {/* 8. Giới hạn trách nhiệm */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">8. Giới hạn trách nhiệm</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    CMSBVQ.COM cung cấp dịch vụ trên cơ sở <strong className="text-foreground">"nguyên trạng"</strong> và không đảm bảo rằng dịch vụ sẽ không bị gián đoạn hoặc không có lỗi.
                                </p>
                                <p>
                                    Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
                                </p>
                            </div>
                        </section>

                        {/* 9. Quyền sở hữu trí tuệ */}
                        <section className="premium-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <Copyright className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">9. Quyền sở hữu trí tuệ</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    Tất cả nội dung, thiết kế, logo và tài liệu trên website là tài sản của CMSBVQ.COM hoặc các bên cấp phép.
                                </p>
                                <p>
                                    Bạn không được sao chép, sửa đổi, phân phối hoặc sử dụng bất kỳ phần nào của website mà không có sự cho phép bằng văn bản.
                                    Việc vi phạm có thể dẫn đến <strong className="text-red-400">hành động pháp lý</strong>.
                                </p>
                            </div>
                        </section>

                        {/* 10. Liên hệ */}
                        <section className="premium-card p-8 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">10. Liên hệ</h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua email hoặc các kênh hỗ trợ chính thức trên website.
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
