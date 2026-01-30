"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        api.general.settings()
            .then((res: any) => {
                const sData = res.data || res;
                setSettings(sData);
            })
            .catch((err) => console.error('Failed to load settings:', err));
    }, []);

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo and Description */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            {settings?.logo ? (
                                <img
                                    src={settings.logo}
                                    alt={settings.title || "Logo"}
                                    className="h-8 w-auto object-contain"
                                />
                            ) : (
                                <>
                                    <div className="relative w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                        <span className="text-primary font-bold text-lg">C</span>
                                    </div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                        {settings?.title || 'CMSBVQ.COM'}
                                    </span>
                                </>
                            )}
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {settings?.description || settings?.mota || 'Siêu Thị Code Chuyên cung cấp code website, hosting, VPS, tên miền giá rẻ - tiếc da cào, bảo mật tốt. Hỗ trợ thuê 24/7, Kinh hoạt nhanh, uy tín hàng đầu.'}
                        </p>
                    </div>

                    {/* CHỦ ỨNG DỤNG */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Chủ ứng dụng
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/products?type=code"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Source Code PHP
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?type=react"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Công cụ React
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?type=mobile"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Ứng dụng Mobile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?type=saas"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Mẫu SaaS
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CÔNG TY */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Công ty
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/chinh-sach-bao-mat"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dieu-khoan-dich-vu"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Điều khoản dịch vụ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* DỊCH VỤ */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Dịch vụ
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/services/vps"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Thuê VPS
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-8 border-t border-border/40">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Software by {settings?.author || 'SIEUTHI.CODE.VN'}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/chinh-sach-bao-mat"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Chính sách bảo mật
                            </Link>
                            <Link
                                href="/dieu-khoan-dich-vu"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Điều khoản sử dụng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
