"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CronJob } from "@/lib/api-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Play, Pause, Trash2, Clock, Globe,
    RefreshCcw, Terminal, ExternalLink, MoreVertical,
    CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MyCronjobsPage() {
    const [jobs, setJobs] = useState<CronJob[]>([]);
    const [servers, setServers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Renewal Modal State
    const [renewModalOpen, setRenewModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<CronJob | null>(null);
    const [renewMonths, setRenewMonths] = useState(1);
    const [renewLoading, setRenewLoading] = useState(false);

    const fetchJobs = () => {
        setLoading(true);
        api.cron.list().then((res: any) => {
            if (res.status === 'success') setJobs(res.data || []);
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchJobs();
        api.cron.servers().then((res: any) => {
            if (res.status === 'success') setServers(res.data || []);
        });
    }, []);

    const handleToggle = async (id: number | string) => {
        try {
            const res = await api.cron.toggle(Number(id));
            if (res.status === 'success') {
                toast.success("Đã cập nhật trạng thái!");
                fetchJobs();
            }
        } catch (error) {
            toast.error("Lỗi khi thay đổi trạng thái");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa cronjob này?")) return;
        try {
            const res = await api.cron.delete(id);
            if (res.status === 'success') {
                toast.success("Đã xóa thành công!");
                fetchJobs();
            }
        } catch (error) {
            toast.error("Lỗi khi xóa cronjob");
        }
    };

    const handleRun = async (id: number) => {
        toast.promise(api.cron.run(id), {
            loading: 'Đang thực thi...',
            success: 'Thực thi thành công!',
            error: 'Thực thi thất bại'
        });
    };

    const handleRenew = async () => {
        if (!selectedJob) return;
        setRenewLoading(true);
        try {
            const res = await api.cron.renew(Number(selectedJob.id), renewMonths);
            if (res.status === 'success') {
                toast.success("Gia hạn thành công!");
                setRenewModalOpen(false);
                fetchJobs();
            } else {
                toast.error((res as any).message || "Gia hạn thất bại");
            }
        } catch (error) {
            toast.error("Lỗi khi gia hạn");
        } finally {
            setRenewLoading(false);
        }
    };

    const getEstimatedPrice = () => {
        if (!selectedJob || !servers.length) return 0;
        const server = servers.find(s => s.id.toString() === selectedJob.server_id.toString());
        const price = server ? Number(server.price || 0) : 0;
        // Check if URL contains commas (multi-url)
        const urlCount = selectedJob.url.split(',').filter(u => u.trim()).length || 1;
        return price * renewMonths * urlCount;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Terminal className="w-6 h-6 text-primary" /> Quản lý Cronjob
                    </h1>
                    <p className="text-slate-400 text-sm">Xem và quản lý các tác vụ tự động của bạn.</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchJobs} disabled={loading} className="border-white/10 gap-2">
                    <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Làm mới
                </Button>
            </div>

            <Card className="bg-card border-white/10 overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/5">
                    <CardTitle className="text-lg">Danh sách tiến trình</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-slate-400">Tiến trình</TableHead>
                                <TableHead className="text-slate-400">Chu kỳ</TableHead>
                                <TableHead className="text-slate-400">Lần chạy cuối</TableHead>
                                <TableHead className="text-slate-400">Thời gian</TableHead>
                                <TableHead className="text-slate-400">Hết hạn</TableHead>
                                <TableHead className="text-slate-400 text-center">Trạng thái</TableHead>
                                <TableHead className="text-slate-400 text-right">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <TableRow key={i} className="border-white/5">
                                        <TableCell colSpan={6} className="h-16 animate-pulse bg-white/5" />
                                    </TableRow>
                                ))
                            ) : jobs.length > 0 ? jobs.map((job) => (
                                <TableRow key={job.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium flex items-center gap-2">
                                                <Globe className="w-3 h-3 text-slate-500" /> {job.url}
                                            </span>
                                            <span className="text-xs text-slate-500">ID: #{job.id} • Phương thức: {job.method}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 gap-1">
                                            <Clock className="w-3 h-3" /> {job.expression}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-xs">
                                        {job.last_run ? format(new Date(job.last_run), 'HH:mm dd/MM') : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-xs">
                                        {format(new Date(job.created_at), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-xs">
                                        {format(new Date(job.expired_at), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(job.id)}
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${['enabled', '1', 1].includes(job.status)
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                }`}
                                        >
                                            {['enabled', '1', 1].includes(job.status) ? (
                                                <><CheckCircle2 className="w-3 h-3" /> Đang chạy</>
                                            ) : (
                                                <><Pause className="w-3 h-3" /> Đã dừng</>
                                            )}
                                        </button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-slate-400 hover:text-white"
                                                onClick={() => handleRun(Number(job.id))}
                                                title="Chạy thủ công"
                                            >
                                                <Play className="w-4 h-4" />
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-card border-white/10">
                                                    <DropdownMenuItem
                                                        className="text-slate-300 gap-2 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedJob(job);
                                                            setRenewMonths(1);
                                                            setRenewModalOpen(true);
                                                        }}
                                                    >
                                                        <RefreshCcw className="w-4 h-4" /> Gia hạn
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-400 focus:text-red-400 gap-2"
                                                        onClick={() => handleDelete(Number(job.id))}
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Xóa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertCircle className="w-8 h-8 opacity-20" />
                                            Bạn chưa có cronjob nào.
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Renewal Modal */}
            <Dialog open={renewModalOpen} onOpenChange={setRenewModalOpen}>
                <DialogContent className="bg-slate-900 border-white/10 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" /> Gia hạn tiến trình
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Tiến trình</label>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-200 truncate">
                                {selectedJob?.url}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Thời gian gia hạn</label>
                            <Select value={renewMonths.toString()} onValueChange={(val) => setRenewMonths(parseInt(val))}>
                                <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    <SelectItem value="1">1 tháng</SelectItem>
                                    <SelectItem value="3">3 tháng</SelectItem>
                                    <SelectItem value="6">6 tháng</SelectItem>
                                    <SelectItem value="12">1 năm</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                            <span className="text-slate-300 text-sm">Thành tiền</span>
                            <span className="text-xl font-bold text-white">{getEstimatedPrice().toLocaleString()}đ</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-white font-bold"
                            onClick={handleRenew}
                            disabled={renewLoading}
                        >
                            {renewLoading ? "Đang xử lý..." : "Xác nhận gia hạn"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
