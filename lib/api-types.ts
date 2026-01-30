export interface ProductComment {
    id: number | string;
    product_id: number | string;
    user_id: number | string;
    username: string; // From API joining with users
    content: string;
    parent_id?: number | string;
    create_date: string;
    replies?: ProductComment[];
}

export type ApiResponse<T> = {
    status: string;
    msg?: string;
    data?: T;
}

export interface User {
    id: number | string;
    username: string;
    email: string;
    balance?: number | string;
    coin?: number | string;
    total_coin?: number | string;
    role: string;
    created_at?: string;
    create_date?: string; // Backend might use this
    ip?: string;
    banned?: string;
    avatar?: string; // User avatar URL
}

export interface Product {
    id: number | string;
    name: string;
    slug: string;
    description: string;
    content?: string; // Optional as intro might be used
    intro?: string; // Backend has intro
    price: number | string;
    old_price?: number | string; // Backend might not send this
    views: number | string; // Normalized
    view?: number | string; // Backend field
    sold: number | string;
    category_id?: number | string;
    user_id?: number | string;
    image: string; // We will map 'images' to this or use 'images'
    images: string | string[]; // Backend 'images' can be string path or list? Backend sent 'images': 'path'
    list_images?: string; // Backend specific
    created_at?: string;
    updated_at?: string;
    update_date?: string; // Backend field
    username?: string; // seller name
    category_name?: string;
    sale?: number | string; // Backend 'sale'
    type?: string;
    link_download?: string;
    link_demo?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface SiteSettings {
    title: string;
    description: string;
    keywords: string;
    logo: string;
    favicon: string;
    author?: string;
    hotline?: string;
    email: string;
    facebook: string;
    youtube?: string;
    telegram: string;
    link_facebook?: string;
    link_youtube?: string;
    link_telegram?: string;
    link_zalo?: string;
    copyright: string;
    mota?: string;
    tukhoa?: string;
    thongbao?: string;
    anhbia?: string;
}

export interface BalanceHistory {
    id: number;
    user_id: number;
    before: number;
    change: number;
    after: number;
    note: string;
    created_at: string;
}

export interface Order {
    id: number;
    trans_id: string;
    user_id: number;
    product_id: number;
    amount: number;
    price: number;
    total_price: number;
    status: string;
    created_at: string;
    product_name: string;
    link_download?: string;
}

export interface Bank {
    id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    logo: string;
    min_deposit: number;
    transfer_content?: string;
    note: string;
}

export interface BankResponse {
    status: string;
    banks: Bank[];
    history: any[]; // Deposit history
    transfer_content?: string;
    notice: string;
}

// Params interfaces
export interface ProductListParams {
    action: 'list' | 'detail';
    page?: number;
    limit?: number;
    filter?: 'all' | 'hot' | 'cheap' | 'free' | 'newest';
    sort?: 'newest' | 'price_asc' | 'price_desc';
    category?: string;
    keyword?: string;
    id?: string;
    slug?: string;
}

export interface CronJob {
    id: number | string;
    user_id: number | string;
    name: string;
    url: string;
    method: 'GET' | 'POST';
    expression: string;
    headers: string;
    body: string;
    status: 'enabled' | 'disabled';
    last_run: string | null;
    next_run: string | null;
    created_at: string;
    updated_at: string;
    server_id: number;
    expired_at: string;
}

export interface CronServer {
    id: number | string;
    name: string;
    ip_address?: string;
    status?: 'online' | 'offline';
    price: number | string;
    description?: string;
}

export interface CronLog {
    id: number;
    cron_id: number;
    response_code: number;
    response_time: number;
    response_body: string;
    created_at: string;
}

export interface CronResponse {
    status: 'success' | 'error';
    message?: string;
    data?: any;
}

// VPS Service Types
export interface VpsSpecs {
    cpu: string;
    ram: string;
    ssd: string;
    bandwidth: string;
    package_tag?: string;
}

export interface VpsProduct {
    id: number | string;
    name: string;
    price: number | string;
    sale: number | string;
    final_price: number | string;
    image: string;
    specs: VpsSpecs;
    category_id?: number | string;
}

export interface VpsCategory {
    id: number | string;
    name: string;
    slug: string;
    stt: number | string;
}

export interface VpsConfig {
    os: { name: string; image: string }[];
    locations: string[];
}
