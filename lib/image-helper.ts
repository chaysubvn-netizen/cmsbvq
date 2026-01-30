export function getImageUrl(path: string | null | undefined) {
    if (!path) return '/placeholder.png'; // You might want to add a placeholder image to public/
    if (path.startsWith('https')) return path;
    if (path.startsWith('/')) return `http://cmsbvq.top${path}`; // Assuming backend is on localhost:80, but via proxy this might be tricky. 
    // Actually, if we proxy, we might want to use the proxy path if it serves static files, 
    // BUT usually PHP backends serve images directly. 
    // If the API returns '/uploads/img.jpg', and backend is localhost:80, we should point to http://localhost/uploads/img.jpg
    return `https://cmsbvq.top/${path}`;
}

export function formatPrice(price: number) {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
