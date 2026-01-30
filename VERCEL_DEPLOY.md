# Vercel Deployment Guide

## ✅ Vercel CLI đã được cài đặt!

## 🚀 Các bước deploy:

### Bước 1: Login vào Vercel
```bash
vercel login
```
Chọn email hoặc GitHub để đăng nhập.

### Bước 2: Deploy project
```bash
cd d:\cmsbvq.com
vercel
```

### Bước 3: Trả lời các câu hỏi:
- **Set up and deploy?** → Yes
- **Which scope?** → Chọn account của bạn
- **Link to existing project?** → No
- **What's your project's name?** → cmsbvq (hoặc tên bạn muốn)
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

### Bước 4: Chờ deploy
Vercel sẽ tự động:
- Detect Next.js
- Install dependencies
- Build project
- Deploy lên production

### Bước 5: Nhận URL
Sau khi deploy xong, bạn sẽ nhận được URL:
```
https://cmsbvq.vercel.app
```

---

## 🔄 Deploy lại (sau khi sửa code)

```bash
vercel --prod
```

---

## 🌐 Cấu hình Custom Domain (Tùy chọn)

1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project `cmsbvq`
3. Settings → Domains
4. Add domain: `cmsbvq.com`
5. Cấu hình DNS theo hướng dẫn

---

## ⚙️ Biến môi trường (Nếu cần)

Vào Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SITE_URL = https://cmsbvq.com
```

---

## 📝 Lưu ý

- ✅ Vercel tự động detect Next.js
- ✅ Miễn phí cho personal projects
- ✅ SSL tự động
- ✅ CDN toàn cầu
- ✅ Auto deploy khi push code (nếu connect GitHub)
