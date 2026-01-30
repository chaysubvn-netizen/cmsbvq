"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";

export function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Chat Options - Show when open */}
            {isOpen && (
                <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-300">
                    {/* Chat Zalo */}
                    <Link
                        href="https://zalo.me/0395046244"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-[#0068FF] hover:bg-[#0052CC] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.855 1.371 5.404 3.513 7.112v3.645l3.42-1.88c.91.252 1.876.386 2.867.386 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm.5 12.5h-1v-1h1v1zm0-2h-1v-5h1v5z" />
                            </svg>
                        </div>
                        <span className="font-medium pr-2">Chat Zalo</span>
                    </Link>

                    {/* Messenger */}
                    <Link
                        href="https://m.me/61556515961784"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-[#0084FF] hover:bg-[#006BD6] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.855 1.371 5.404 3.513 7.112v3.645l3.42-1.88c.91.252 1.876.386 2.867.386 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.252 12.434l-2.54-2.71-4.958 2.71 5.454-5.79 2.602 2.71 4.896-2.71-5.454 5.79z" />
                            </svg>
                        </div>
                        <span className="font-medium pr-2">Messenger</span>
                    </Link>

                    {/* Hotline */}
                    <Link
                        href="tel:0395046244"
                        className="group flex items-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                            <Phone className="w-5 h-5" />
                        </div>
                        <span className="font-medium pr-2">Hotline</span>
                    </Link>

                    {/* Telegram */}
                    <Link
                        href="https://t.me/hackliketop2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-[#0088CC] hover:bg-[#006BA3] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                            </svg>
                        </div>
                        <span className="font-medium pr-2">Telegram</span>
                    </Link>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Toggle chat options"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
            </button>
        </div>
    );
}
