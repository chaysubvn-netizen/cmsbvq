"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.auth.register(formData);
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            router.push("/auth/login");
        } catch (error) {
            toast.error("Đăng ký thất bại. Tên đăng nhập hoặc Email có thể đã tồn tại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Tạo tài khoản</CardTitle>
                    <CardDescription>
                        Nhập thông tin bên dưới để tạo tài khoản của bạn
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-6 pb-6">

                        <div className="space-y-2">
                            <Label htmlFor="username">Tên đăng nhập</Label>
                            <Input
                                id="username"
                                placeholder="Nhập tên đăng nhập"
                                minLength={6}
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input
                                id="password"
                                type="password"
                                minLength={6}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Đăng ký tài khoản
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Đã có tài khoản?{" "}
                            <Link href="/auth/login" className="text-primary hover:underline font-medium">
                                Đăng nhập
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
