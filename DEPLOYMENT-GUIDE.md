# 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB PAGES

## ⚠️ Vấn đề hiện tại

**Test local không hoạt động vì:**
- ❌ Firebase yêu cầu HTTPS
- ❌ Test file:// không có HTTPS
- ❌ CORS policy chặn requests

**Giải pháp:** Upload lên GitHub Pages (hỗ trợ HTTPS)

---

## 📋 Các bước deploy

### 1. Chuẩn bị GitHub

```bash
# Tạo repo mới hoặc dùng repo cũ
# Repo name: skyedu (hoặc tên khác)
# Settings → Pages → Branch: main → Folder: / (root)
```

### 2. Upload Files

**Cách 1: GitHub Web UI (Easiest)**
- Vào repo
- Click "Add file" → "Upload files"
- Drag all files from `SKY-EDU` folder
- Commit changes

**Cách 2: Git CLI**
```bash
git add .
git commit -m "Deploy SKY EDU website"
git push origin main
```

### 3. Verify Deployment

1. Vào repo → Settings → Pages
2. Copy URL (ví dụ: `https://username.github.io/skyedu/`)
3. Truy cập URL và test

---

## ✅ Checklist trước khi upload

- [ ] Tất cả HTML files có `.html` extension trong links
- [ ] Firebase config có project ID đúng (`sky-edu-8be67`)
- [ ] Tất cả files trong folder `SKY-EDU/` được upload
- [ ] Cấu trúc thư mục giữ nguyên
- [ ] Không có file `.git` trong folder

---

## 🧪 Test URLs sau khi deploy

```
✅ skyedu.id.vn/                              (Homepage)
✅ skyedu.id.vn/account/dang-ky.html          (Đăng ký)
✅ skyedu.id.vn/account/dang-nhap.html        (Đăng nhập)
✅ skyedu.id.vn/account/admin.html            (Admin)
✅ skyedu.id.vn/quy-doi-diem.html             (Quy đổi điểm)
✅ skyedu.id.vn/phong-luyen-tsa/index.html    (Phòng luyện TSA)
✅ skyedu.id.vn/phong-luyen-hsa/index.html    (Phòng luyện HSA)
```

---

## 🐛 Nếu còn lỗi

### Lỗi "Page not found"
→ Kiểm tra tất cả links có `.html` không

### Lỗi "Firebase not initialized"
→ Kiểm tra `firebase-config.js` load đúng chưa

### Lỗi "Cannot POST"
→ Thường gặp nếu dùng GET/POST sai

### Lỗi CORS
→ Chỉ xảy ra ở local, GitHub Pages tự fix

---

## 📝 Files đã sửa (Ready to deploy)

### Account Pages ✅
- `account/dang-ky.html` - Đăng ký
- `account/dang-nhap.html` - Đăng nhập
- `account/admin.html` - Admin panel
- `account/tai-khoan.html` - Hồ sơ
- `account/doi-mat-khau.html` - Đổi mật khẩu
- `account/admin-script.js` - Admin script
- `account/auth.js` - Auth logic

### Core Pages ✅
- `index.html` - Trang chủ
- `quy-doi-diem.html` - Quy đổi điểm
- `firebase-config.js` - Firebase config

### Training Pages ✅
- `phong-luyen-tsa/index.html`
- `phong-luyen-hsa/index.html`
- `khoa-hoc-pages/index.html`

### Plus 10+ other files with fixed links

---

## 🔗 Domain Custom

Nếu dùng domain custom (skyedu.id.vn):
1. Vào GitHub repo Settings → Pages
2. Thêm custom domain
3. Update DNS records tại domain provider
4. GitHub tự tạo HTTPS certificate

---

**Status: ✅ READY FOR DEPLOYMENT**

Upload ngay bây giờ! 🚀
