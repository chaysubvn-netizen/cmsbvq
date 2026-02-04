import {
    User, Product, ProductListParams, ApiResponse,
    SiteSettings, BalanceHistory, Order, Bank, BankResponse, ProductComment,
    CronJob, CronServer, CronLog, CronResponse,
    VpsCategory, VpsProduct, VpsConfig
} from "./api-types";

// Base URL handling
// Always use cmsbvq.top for API calls (backend is on separate server)
const API_URL = 'https://cmsbvq.top/api';

type RequestOptions = RequestInit & {
    params?: Record<string, string | number | undefined>;
};

async function fetcher<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...init } = options;

    // Build URL with query params
    const urlString = endpoint.startsWith('https') ? endpoint : `${API_URL}${endpoint}`;
    // If urlString is relative (starts with /), new URL() requires a base.
    // On client, use window.location.origin. On server, API_URL is absolute so it's fine.
    const base = typeof window !== 'undefined' ? window.location.origin : undefined;
    const url = new URL(urlString, base);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    // Default headers
    const headers = new Headers(init.headers);
    if (!headers.has('Content-Type') && !(init.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    // Make request (include credentials for cookies/session)
    const res = await fetch(url.toString(), {
        ...init,
        headers,
        credentials: 'include', // Important for PHP sessions
    });

    if (!res.ok) {
        let errorMsg = `Lỗi hệ thống: ${res.status} ${res.statusText}`;
        try {
            const errorData = await res.json();
            errorMsg = errorData.msg || errorData.message || errorMsg;
        } catch (e) {
            // If it's not JSON, just use the status text
        }
        throw new Error(errorMsg);
    }

    // Handle different response types (some might be void or text)
    const contentType = res.headers.get('content-type');
    const textBlob = await res.text();

    if (contentType && contentType.includes('application/json')) {
        try {
            if (!textBlob || textBlob.trim() === '') {
                return {} as T;
            }

            // SANITIZATION: Backend might echo extra characters after JSON
            // Find the first '{' or '[' and the last '}' or ']'
            let sanitized = textBlob.trim();
            const firstBrace = sanitized.indexOf('{');
            const firstBracket = sanitized.indexOf('[');
            const lastBrace = sanitized.lastIndexOf('}');
            const lastBracket = sanitized.lastIndexOf(']');

            let start = -1;
            let end = -1;

            if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
                start = firstBrace;
                end = lastBrace;
            } else if (firstBracket !== -1) {
                start = firstBracket;
                end = lastBracket;
            }

            if (start !== -1 && end !== -1 && end > start) {
                sanitized = sanitized.substring(start, end + 1);
            }

            return JSON.parse(sanitized);
        } catch (e) {
            console.error('Không thể phân tích phản hồi JSON:', textBlob);
            // Fallback: try to return default structured data if it's a known endpoint
            return textBlob as unknown as T;
        }
    }

    return textBlob as unknown as T;
}

export const api = {
    auth: {
        login: (data: any) => fetcher<ApiResponse<{ user: User }>>('/auth/login.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        register: (data: any) => fetcher<ApiResponse<void>>('/auth/register.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        me: () => fetcher<ApiResponse<{ user: User }>>('/auth/me.php'),
        logout: () => fetcher<ApiResponse<void>>('/auth/logout.php'),
    },
    products: {
        list: (params: Partial<ProductListParams>) => fetcher<ApiResponse<Product[]> | Product[]>('/products.php', {
            params: { action: 'list', ...params } as any
        }),
        get: (slugOrId: string | number) => {
            const isId = !isNaN(Number(slugOrId));
            return fetcher<ApiResponse<Product> | Product>('/products.php', {
                params: {
                    action: 'detail',
                    [isId ? 'id' : 'slug']: slugOrId.toString()
                }
            });
        },
        getRelated: (id: string | number) => fetcher<ApiResponse<Product[]> | Product[]>('/products.php', {
            params: { action: 'list', filter: 'all', limit: 4 } // Fallback logic for related
        }),
    },
    general: {
        settings: () => fetcher<ApiResponse<SiteSettings>>('/settings.php'),
        categories: () => fetcher<ApiResponse<unknown>>('/categories.php'),
    },
    user: {
        buy: (id: number) => fetcher<ApiResponse<void>>('/buy.php', {
            method: 'POST',
            body: JSON.stringify({ id }),
        }),
        history: () => fetcher<ApiResponse<Order[]>>('/history.php'),
        balanceHistory: () => fetcher<ApiResponse<BalanceHistory[]>>('/balance-history.php'),
    },
    payment: {
        banks: () => fetcher<BankResponse>('/bank.php'),
        getFees: (type_card: string) => {
            const body = new URLSearchParams();
            body.append('type_card', type_card);
            return fetcher<string>('/amount.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        }
    },
    comments: {
        list: (product_id: number | string) => fetcher<ApiResponse<ProductComment[]>>('/comments.php', {
            params: { action: 'list', product_id: product_id.toString() }
        }),
        create: (data: { product_id: number | string; content: string; parent_id?: number | string }) => {
            const body = new URLSearchParams();
            body.append('product_id', data.product_id.toString());
            body.append('content', data.content);
            body.append('parent_id', (data.parent_id || 0).toString());

            return fetcher<ApiResponse<void>>('/comments.php', {
                method: 'POST',
                params: { action: 'create' },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        }
    },
    cron: {
        list: () => fetcher<ApiResponse<CronJob[]>>('/cron/index.php'),
        add: (data: any) => {
            const body = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => body.append(key, String(value)));
            return fetcher<ApiResponse<void>>('/cron/add.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        },
        edit: (data: any) => {
            const body = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => body.append(key, String(value)));
            return fetcher<ApiResponse<void>>('/cron/edit.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        },
        delete: (id: number) => {
            const body = new URLSearchParams();
            body.append('id', id.toString());
            return fetcher<ApiResponse<void>>('/cron/delete.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        },
        toggle: (id: number) => {
            const body = new URLSearchParams();
            body.append('id', id.toString());
            return fetcher<ApiResponse<void>>('/cron/toggle.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        },
        renew: (id: number, months: number) => {
            const body = new URLSearchParams();
            body.append('id', id.toString());
            body.append('months', months.toString());
            return fetcher<ApiResponse<void>>('/cron/renew.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        },
        run: (id: number) => {
            const body = new URLSearchParams();
            body.append('id', id.toString());
            return fetcher<ApiResponse<void>>('/cron/run.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });
        },
        logs: (id: number) => fetcher<ApiResponse<CronLog[]>>('/cron/logs.php', {
            params: { id: id.toString() }
        }),
        servers: () => fetcher<ApiResponse<CronServer[]>>('/cron/servers.php'),
    },
    vps: {
        categories: () => fetcher<ApiResponse<VpsCategory[]>>('/vps/categories.php'),
        products: (category_id?: number, id?: number) => fetcher<ApiResponse<VpsProduct[]>>('/vps/products.php', {
            params: { category_id, id }
        }),
        config: () => fetcher<ApiResponse<VpsConfig>>('/vps/config.php'),
        buy: (data: { id: number; os: string; location: string; note?: string }) => fetcher<ApiResponse<void>>('/vps/buy.php', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    }
};
