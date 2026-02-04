export function getImageUrl(path: string | string[] | null | undefined) {
    if (!path) return 'https://cmsbvq.com/og-image.png'; // Fallback to site OG image

    // If it's an array, take the first element. If it's a string, it might be a comma-separated list.
    let imagePath = Array.isArray(path) ? path[0] : path;

    if (typeof imagePath === 'string' && imagePath.includes(',')) {
        imagePath = imagePath.split(',')[0].trim();
    }

    if (!imagePath || typeof imagePath !== 'string') return 'https://cmsbvq.com/og-image.png';

    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) return imagePath;

    // Ensure it starts with a single slash
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    // Backend is on cmsbvq.top
    // If the path already contains a directory structure (like /upload/ or /assets/), use it as is
    if (normalizedPath.toLowerCase().includes('/upload/') || normalizedPath.split('/').length > 2) {
        return `https://cmsbvq.top${normalizedPath}`;
    }

    // Otherwise, assume it's a product image and prefix with the requested directory
    return `https://cmsbvq.top/upload/product${normalizedPath}`;
}

export function formatPrice(price: number) {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
