# Hướng dẫn Deploy Next.js lên Hosting

## 🎯 Hosting Khuyến Nghị

### Option 1: Railway.app (FREE - Khuyến nghị)
1. Tạo tài khoản tại https://railway.app
2. Connect GitHub repository
3. Railway tự động detect Next.js và deploy
4. **Hoàn toàn miễn phí** (500 hours/tháng)

### Option 2: Render.com (FREE)
1. Tạo tài khoản tại https://render.com
2. New → Web Service
3. Connect repository
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`

### Option 3: Vercel (FREE - Tốt nhất cho Next.js)
```bash
npm install -g vercel
vercel login
vercel
```

---

## 📦 Deploy lên VPS/Hosting có Node.js

### Bước 1: Upload code lên server

**Via FTP/SFTP:**
- Upload toàn bộ project (trừ `node_modules`, `.next`)

**Via Git (Khuyến nghị):**
```bash
# Trên server
git clone https://github.com/your-repo/cmsbvq.com.git
cd cmsbvq.com
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Build production

```bash
npm run build
```

### Bước 4: Start server

**Cách 1: Dùng npm (Tạm thời)**
```bash
npm start
```

**Cách 2: Dùng PM2 (Khuyến nghị - Tự động restart)**
```bash
# Cài PM2
npm install -g pm2

# Start app
pm2 start npm --name "cmsbvq" -- start

# Lưu config để tự động start khi reboot
pm2 save
pm2 startup
```

### Bước 5: Cấu hình Nginx (Nếu dùng VPS)

Tạo file `/etc/nginx/sites-available/cmsbvq.com`:

```nginx
server {
    listen 80;
    server_name cmsbvq.com www.cmsbvq.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/cmsbvq.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔧 Biến môi trường (Nếu cần)

Tạo file `.env.production`:
```env
NODE_ENV=production
PORT=3000
```

---

## ✅ Kiểm tra

1. Truy cập: `http://your-domain.com`
2. Kiểm tra API: `http://your-domain.com/api/...`
3. Test các tính năng

---

## 🐛 Troubleshooting

### Port đã được sử dụng
```bash
# Tìm process đang dùng port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### App bị crash
```bash
# Xem logs
pm2 logs cmsbvq
```

### Rebuild
```bash
pm2 stop cmsbvq
npm run build
pm2 restart cmsbvq
```

---

## 📝 Checklist Deploy

- [ ] Upload code lên server
- [ ] `npm install`
- [ ] `npm run build`
- [ ] Start với PM2
- [ ] Cấu hình Nginx (nếu VPS)
- [ ] Test website
- [ ] Setup SSL (Let's Encrypt)
