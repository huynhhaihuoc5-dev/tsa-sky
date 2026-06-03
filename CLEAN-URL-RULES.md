# 📐 QUY TẮC CLEAN URLs - GITHUB PAGES

## ✅ QUY TẮC ĐÚNG

### 1. Homepage (Trang chủ)
```html
❌ href="index.html"
❌ href="../index.html"  
❌ href="index"
❌ href="../index"

✅ href="/"              <!-- Từ mọi nơi về root -->
✅ href="./"             <!-- Relative từ folder hiện tại -->
```

### 2. Folder với index.html
```html
❌ href="khoa-hoc-pages/index.html"
❌ href="khoa-hoc-pages/index"
❌ href="phong-luyen-tsa/index"

✅ href="khoa-hoc-pages/"        <!-- Trailing slash! -->
✅ href="phong-luyen-tsa/"
✅ href="../phong-luyen-hsa/"
```

**Lý do:** GitHub Pages tự động tìm `index.html` trong folder khi có trailing slash.

### 3. HTML files không phải index
```html
❌ href="account/admin.html"
❌ href="quy-doi-diem.html"

✅ href="account/admin"          <!-- Không có .html -->
✅ href="quy-doi-diem"
✅ href="../account/dang-nhap"
```

### 4. Anchor links (trong cùng page)
```html
✅ href="#about"
✅ href="#contact"
```

---

## 🌐 URL MAPPING GITHUB PAGES

| Request URL | GitHub Pages Tìm | Kết quả |
|-------------|------------------|---------|
| `/` | `index.html` | ✅ OK |
| `/account/admin` | `account/admin.html` | ✅ OK |
| `/quy-doi-diem` | `quy-doi-diem.html` | ✅ OK |
| `/khoa-hoc-pages/` | `khoa-hoc-pages/index.html` | ✅ OK |
| `/phong-luyen-tsa/` | `phong-luyen-tsa/index.html` | ✅ OK |
| `/account/admin.html` | `account/admin.html` | ✅ OK (backward) |

---

## ❌ SAI LẦM THƯỜNG GẶP

### 1. Folder không có trailing slash
```html
❌ href="khoa-hoc-pages"
→ GitHub tìm file "khoa-hoc-pages.html" → 404!

✅ href="khoa-hoc-pages/"
→ GitHub tìm folder "khoa-hoc-pages/index.html" → OK!
```

### 2. Dùng "index" thay vì "/"
```html
❌ href="../index"
→ GitHub tìm "../index.html" → có thể lỗi relative path

✅ href="/"
→ Luôn về root, không phụ thuộc vị trí hiện tại
```

### 3. Quên đổi JavaScript redirects
```javascript
❌ window.location.href = "../index.html"
❌ location.href = "dang-nhap.html"

✅ window.location.href = "/"
✅ location.href = "dang-nhap"
```

---

## 📝 CHECKLIST SỬA LỖI

### HTML Files:
- [ ] `href="/"` cho homepage (không dùng `index`)
- [ ] `href="folder/"` cho folder có index.html (CÓ trailing slash)
- [ ] `href="page"` cho file HTML thông thường (KHÔNG có .html)
- [ ] `href="#anchor"` cho anchor links (giữ nguyên)

### JavaScript Files:
- [ ] `window.location.href = "/"` về homepage
- [ ] `location.href = "page"` chuyển page (không có .html)

---

## ✅ CÁC LINK ĐÚNG TRONG PROJECT

### Navigation Menu:
```html
<a href="/">Trang chủ</a>
<a href="khoa-hoc-pages/">Khóa học</a>
<a href="quy-doi-diem">Quy đổi điểm</a>
<a href="phong-luyen-tsa/">Phòng luyện TSA</a>
<a href="phong-luyen-hsa/">Phòng luyện HSA</a>
<a href="account/dang-nhap">Đăng nhập</a>
<a href="account/dang-ky">Đăng ký</a>
```

### Dropdown Menu:
```html
<a href="account/tai-khoan">Hồ sơ cá nhân</a>
<a href="account/admin">Admin Panel</a>
<a href="account/doi-mat-khau">Đổi mật khẩu</a>
```

### Footer:
```html
<a href="phong-luyen-tsa/">Luyện thi TSA</a>
<a href="phong-luyen-hsa/">Luyện thi HSA</a>
<a href="khoa-hoc-pages/">Khóa học</a>
<a href="quy-doi-diem">Quy đổi điểm</a>
```

### From subfolders (account/, khoa-hoc-pages/, etc):
```html
<a href="/">Trang chủ</a>                    <!-- About root -->
<a href="../quy-doi-diem">Quy đổi điểm</a>   <!-- Relative -->
<a href="../khoa-hoc-pages/">Khóa học</a>    <!-- Folder với slash -->
```

---

## 🚀 ĐÃ SỬA TRONG PROJECT

### Files Updated (lần 2):
1. ✅ Tất cả `href="../index"` → `href="/"`
2. ✅ Tất cả `href="index"` → `href="/"`
3. ✅ Tất cả `href="folder/index"` → `href="folder/"`
4. ✅ JavaScript: `location.href = "../index"` → `location.href = "/"`

### Kết quả:
- Homepage links: `/` ✅
- Folder links: `khoa-hoc-pages/`, `phong-luyen-tsa/` ✅
- Page links: `account/admin`, `quy-doi-diem` ✅

---

**Cập nhật:** 2026-06-03 22:30  
**Status:** ✅ FIXED CORRECTLY
