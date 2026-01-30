"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Wallet, History, LogOut, ShoppingBag, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const sidebarItems = [
        {
            title: "Profile Information",
            href: "/dashboard",
            icon: User,
        },
        {
            title: "Deposit Money",
            href: "/dashboard/deposit",
            icon: Wallet,
        },
        {
            title: "Deposit History",
            href: "/dashboard/balance",
            icon: History,
        },
        {
            title: "Order History",
            href: "/dashboard/history",
            icon: ShoppingBag,
        },
        {
            title: "My Cronjobs",
            href: "/dashboard/cron",
            icon: Terminal,
        },
    ];

    const handleLogout = async () => {
        try {
            await api.auth.logout();
            router.push('/auth/login');
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden sticky top-24">
                        <div className="p-4 bg-white/5 border-b border-white/5">
                            <h2 className="font-bold text-lg text-white">My Dashboard</h2>
                        </div>
                        <nav className="p-2 space-y-1">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                        pathname === item.href
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.title}
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 min-h-[500px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
