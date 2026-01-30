"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ProductComment } from "@/lib/api-types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, MessageSquare, Send, Reply } from "lucide-react";

interface CommentSectionProps {
    productId: number | string;
}

export default function CommentSection({ productId }: CommentSectionProps) {
    const [comments, setComments] = useState<ProductComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<number | string | null>(null);

    const fetchComments = async () => {
        try {
            const res = await api.comments.list(productId);
            const allComments = res.data || [];

            // Simple nesting logic if it's a flat list
            const rootComments = allComments.filter(c => !c.parent_id || c.parent_id === "0" || c.parent_id === 0);
            const replies = allComments.filter(c => c.parent_id && c.parent_id !== "0" && c.parent_id !== 0);

            const nested = rootComments.map(root => ({
                ...root,
                replies: replies.filter(r => String(r.parent_id) === String(root.id))
            }));

            setComments(nested);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSubmitting(true);
        try {
            await api.comments.create({
                product_id: productId,
                content: content,
                parent_id: replyTo || 0
            });
            toast.success("Bình luận đã được gửi!");
            setContent("");
            setReplyTo(null);
            fetchComments();
        } catch (error) {
            toast.error("Vui lòng đăng nhập để bình luận.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 mt-12 border-t border-white/5 pt-12">
            <div className="flex items-center gap-2 text-xl font-bold">
                <MessageSquare className="w-6 h-6 text-primary" />
                Comments ({comments.length})
            </div>

            {/* Post Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-[#0f1115] p-6 rounded-2xl border border-white/5">
                {replyTo && (
                    <div className="flex items-center justify-between text-sm bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <span className="flex items-center gap-2">
                            <Reply className="w-4 h-4" /> Đang trả lời bình luận...
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>Hủy</Button>
                    </div>
                )}
                <Textarea
                    placeholder="Viết cảm nghĩ của bạn về mã nguồn này..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-black/40 border-white/10 min-h-[120px] focus:ring-primary focus:border-primary text-white"
                />
                <div className="flex justify-end">
                    <Button disabled={submitting || !content.trim()} className="bg-primary hover:bg-primary/90 font-bold px-8">
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                        Gửi bình luận
                    </Button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-12 bg-[#0f1115] rounded-2xl border border-dashed border-white/10 text-muted-foreground">
                        Chưa có bình luận nào. Hãy là người đầu tiên!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="space-y-4">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border border-white/10">
                                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                                        {comment.username ? comment.username[0].toUpperCase() : "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="bg-[#0f1115] p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-white">{comment.username}</span>
                                            <span className="text-xs text-muted-foreground">{comment.create_date}</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {comment.content}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs h-auto py-1 px-2 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                                        onClick={() => {
                                            setReplyTo(comment.id);
                                            const form = document.querySelector('form');
                                            if (form) {
                                                window.scrollTo({ top: form.offsetTop - 200, behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        Reply
                                    </Button>

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="pl-6 space-y-4 mt-4 border-l-2 border-white/5">
                                            {comment.replies.map((reply: ProductComment) => (
                                                <div key={reply.id} className="flex gap-3">
                                                    <Avatar className="w-8 h-8 border border-white/10">
                                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                            {reply.username ? reply.username[0].toUpperCase() : "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 bg-[#0f1115]/50 p-3 rounded-xl border border-white/5">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-bold text-sm text-white">{reply.username}</span>
                                                            <span className="text-[10px] text-muted-foreground">{reply.create_date}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {reply.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
