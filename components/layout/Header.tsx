"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/lib/api-types";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu, Search, Bell, ShoppingCart,
  LogOut, User as UserIcon, Wallet,
  ChevronDown,
  LayoutDashboard,
  Key
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { usePathname, useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?keyword=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        setSearchQuery(""); // Clear search on navigation
        setLoading(true);
        Promise.all([
            api.auth.me(),
            api.general.settings()
        ])
            .then(([authRes, settingsRes]: [any, any]) => {
                // Handle User
                const userData = authRes.user || (authRes.data && authRes.data.user);
                if (userData) {
                    if (userData.coin && !userData.balance) {
                        userData.balance = Number(userData.coin);
                    }
                    setUser(userData);
                } else {
                    setUser(null);
                }

                // Handle Settings
                const sData = settingsRes.data || settingsRes;
                setSettings(sData);
            })
            .catch((err) => {
                console.error(err);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, [pathname]); // Re-run when path changes (e.g. Login -> Home)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            {/* Top Bar */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black border-white/10">
                            <div className="flex flex-col gap-8 mt-8">
                                <nav className="flex flex-col gap-4">
                                    <NavLinks isMobile />
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center gap-2">
                        {settings?.logo ? (
                            <img src={settings.logo} alt={settings.title} className="h-8 md:h-10 w-auto object-contain" />
                        ) : (
                            <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/50">
                                <span className="text-xl font-black text-primary tracking-tighter">CMSBVQ.COM</span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
                        <NavLinks />
                    </nav>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-4 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search for source code..."
                        className="pl-9 bg-secondary/50 border-white/5 focus-visible:ring-primary/50 rounded-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hidden sm:flex">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>

                    <div className="h-6 w-[1px] bg-white/10 mx-2 hidden sm:block" />

                    {loading ? (
                        <div className="h-8 w-8 rounded-full bg-secondary animate-pulse" />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            {/* <div className="hidden sm:flex flex-col items-end">
                                <span className="text-xs font-medium text-muted-foreground">Balance</span>
                                <span className="text-sm font-bold text-green-400">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(user.balance || 0))}
                                </span>
                            </div> */}
                           <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="relative h-9 w-9 rounded-full p-0 overflow-hidden"
    >
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.avatar || "https://sieuthicode.net/avatars/01.png"} />
        <AvatarFallback>
          {user.username?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-64 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
  >
    {/* Header */}
    <div className="px-3 py-2">
      <p className="text-sm font-medium">{user.username}</p>
      <p className="text-xs text-zinc-400">{user.email}</p>
    </div>

    <DropdownMenuSeparator className="bg-zinc-800" />

    {/* Balance */}
    <div className="px-3 py-2 flex items-center justify-between">
<div className="flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-wallet h-3.5 w-3.5 text-zinc-400"
    aria-hidden="true"
  >
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>

  <span className="text-xs text-zinc-500 dark:text-zinc-400">
    Số dư
  </span>
</div>
      <span className="text-sm font-semibold text-blue-400">
        {user.balance?.toLocaleString()} đ
      </span>
    </div>

    <DropdownMenuSeparator className="bg-zinc-800" />

    {/* Menu */}
    <DropdownMenuItem asChild>
      <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
        <LayoutDashboard className="h-4 w-4" />
        Bảng điều khiển
      </Link>
    </DropdownMenuItem>

   

    <DropdownMenuItem asChild>
      <Link href="/dashboard/deposit" className="flex items-center gap-2 cursor-pointer">
        <Wallet className="h-4 w-4" />
        Nạp tiền
      </Link>
    </DropdownMenuItem>


    <DropdownMenuSeparator className="bg-zinc-800" />

    {/* Logout */}
    <DropdownMenuItem
      onClick={() => {
        api.auth.logout()
        window.location.reload()
      }}
      className="text-red-500 cursor-pointer"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Đăng xuất
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                           <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_-3px_var(--color-primary)] transition-all" asChild>
                                <Link href="/auth/login">Đăng Nhập</Link>
                            </Button>
                           
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
    const baseClass = "transition-all hover:text-primary flex items-center gap-2";
    const mobileClass = isMobile ? "py-2 px-4 rounded-md hover:bg-white/5 w-full text-lg" : "text-muted-foreground";

    return (
        <>
            <Link href="/" className={`${baseClass} ${mobileClass} ${!isMobile && 'text-foreground'}`}>
                Home
            </Link>
            <Link href="/products" className={`${baseClass} ${mobileClass}`}>
                Products
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className={`${baseClass} ${mobileClass}`}>
                    Services <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-white/10">
                    <DropdownMenuItem asChild>
                        <Link href="/services/cronjob" className="cursor-pointer">
                            Cronjob VIP
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/services/vps" className="cursor-pointer font-medium text-blue-400">
                            Cloud VPS
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/dashboard/deposit" className={`${baseClass} ${mobileClass}`}>
                Deposit
            </Link>
        </>
    );
}
