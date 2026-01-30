# 🚀 Hướng dẫn Push Code lên GitHub

## ⚠️ Git chưa được nhận diện trong PowerShell

Bạn cần **RESTART PowerShell** sau khi cài Git để Windows nhận diện lệnh `git`.

## 📝 Các bước thực hiện:

### Bước 1: Đóng và mở lại PowerShell/Terminal

1. **Đóng** terminal hiện tại
2. **Mở lại** PowerShell hoặc Windows Terminal
3. Kiểm tra Git đã hoạt động:
```bash
git --version
```

### Bước 2: Chạy các lệnh Git

```bash
cd d:\cmsbvq.com

# Khởi tạo Git repository
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit - CMSBVQ.COM"

# Thêm remote repository
git remote add origin https://github.com/chaysubvn-netizen/nextjs.git

# Đổi tên branch thành main
git branch -M main

# Push code lên GitHub
git push -u origin main
```

---

## 🎯 Hoặc dùng GitHub Desktop (Dễ hơn)

Nếu Git vẫn không hoạt động:

1. **Download GitHub Desktop**: https://desktop.github.com
2. **Cài đặt** và đăng nhập
3. **Add existing repository**: Chọn folder `d:\cmsbvq.com`
4. **Publish repository**: Chọn `chaysubvn-netizen/nextjs`
5. **Push** code lên GitHub

---

## ✅ Sau khi code đã lên GitHub

### Deploy lên Vercel:

1. **Vào**: https://vercel.com
2. **Import Project** từ GitHub
3. **Chọn repository**: `chaysubvn-netizen/nextjs`
4. **Deploy** (Vercel tự động detect Next.js)
5. **Xong!** Website sẽ live tại `https://nextjs-xxx.vercel.app`

---

## 🔄 Hoặc dùng Vercel CLI (Nếu đã login)

Nếu bạn đã login Vercel CLI:

```bash
cd d:\cmsbvq.com
vercel
```

Vercel sẽ deploy trực tiếp mà không cần GitHub!

---

## 📌 Tóm tắt

**Option 1**: Restart terminal → Chạy git commands  
**Option 2**: Dùng GitHub Desktop → Push → Deploy trên Vercel  
**Option 3**: Dùng `vercel` CLI trực tiếp (không cần Git)

Bạn muốn dùng cách nào?
