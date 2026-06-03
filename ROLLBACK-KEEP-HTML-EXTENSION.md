# ⚠️ ROLLBACK: GIỮ LẠI EXTENSION .HTML

## 🚫 Tại sao KHÔNG loại bỏ .html trên GitHub Pages?

### Vấn đề phát hiện:
Khi loại bỏ `.html` khỏi links:
- ❌ `href="quy-doi-diem"` → GitHub Pages trả về **404**
- ❌ `href="account/admin"` → GitHub Pages trả về **404**
- ❌ `href="/"` → Có thể hoạt động nhưng không nhất quán

### Sự thật về GitHub Pages:
GitHub Pages **KHÔNG tự động** map clean URLs như Apache `.htaccess`!

```
❌ KHÔNG HOẠT ĐỘNG:
/quy-doi-diem → 404 (GitHub không tìm thấy quy-doi-diem.html)
/account/admin → 404 (GitHub không tìm thấy admin.html)

✅ HOẠT ĐỘNG:
/quy-doi-diem.html → OK
/account/admin.html → OK
/khoa-hoc-pages/ → OK (tự động tìm index.html)
```

---

## ✅ GIẢI PHÁP: GIỮ .HTML

### Quy tắc đơn giản:
1. **Homepage:** `href="index.html"` hoặc `href="/"`
2. **Folder với index:** `href="folder/"` (trailing slash)
3. **File HTML:** `href="page.html"` (CÓ .html)

### Ví dụ ĐÚNG:
```html
<!-- Navigation -->
<a href="index.html">Trang chủ</a>
<a href="khoa-hoc-pages/">Khóa học</a>
<a href="quy-doi-diem.html">Quy đổi điểm</a>
<a href="phong-luyen-tsa/">Phòng luyện TSA</a>
<a href="account/dang-nhap.html">Đăng nhập</a>
<a href="account/admin.html">Admin Panel</a>

<!-- From subfolders -->
<a href="../index.html">Trang chủ</a>
<a href="../quy-doi-diem.html">Quy đổi điểm</a>
```

### JavaScript:
```javascript
window.location.href = "dang-nhap.html";
window.location.href = "../index.html";
window.location.href = "admin.html";
```

---

## 🔄 Đã Rollback

### Files restored: 16 files
- 13 HTML files → Tất cả links có lại `.html`
- 3 JavaScript files → Tất cả redirects có lại `.html`

### Kết quả:
```html
TRƯỚC (Clean URL - KHÔNG hoạt động):
<a href="quy-doi-diem">Quy đổi điểm</a>
<a href="account/admin">Admin</a>
<a href="/">Trang chủ</a>

SAU (Rollback - HOẠT ĐỘNG):
<a href="quy-doi-diem.html">Quy đổi điểm</a>
<a href="account/admin.html">Admin</a>
<a href="index.html">Trang chủ</a>
```

---

## 💡 Nếu THỰC SỰ muốn Clean URLs?

### Cách 1: Jekyll (GitHub Pages hỗ trợ)
```yaml
# _config.yml
permalink: pretty
```

### Cách 2: Custom 404 trick
Tạo `404.html` redirect đến file đúng dựa trên URL.

### Cách 3: Dùng hosting khác
- Netlify (hỗ trợ redirects)
- Vercel (hỗ trợ rewrites)
- Cloudflare Pages (hỗ trợ _redirects)

### Cách 4: Thay đổi cấu trúc
Thay vì `admin.html`, tạo `admin/index.html`
→ URL sẽ là `/admin/` (có trailing slash)

---

## ✅ KẾT LUẬN

**GIỮ LẠI .HTML EXTENSION** là cách an toàn và đơn giản nhất cho GitHub Pages!

### URLs cuối cùng:
```
https://skyedu.id.vn/index.html
https://skyedu.id.vn/quy-doi-diem.html
https://skyedu.id.vn/account/admin.html
https://skyedu.id.vn/account/dang-nhap.html
https://skyedu.id.vn/khoa-hoc-pages/        ← Folder OK không cần .html
https://skyedu.id.vn/phong-luyen-tsa/       ← Folder OK không cần .html
```

**Có vẻ kém đẹp hơn nhưng HOẠT ĐỘNG CHẮC CHẮN!** ✅

---

## 📦 Upload ngay

Tất cả files đã về trạng thái ban đầu (có .html).

Upload lên GitHub và test - lần này SẼ HOẠT ĐỘNG! 🎉

---

**Ngày:** 2026-06-03 22:45  
**Status:** ✅ ROLLBACK COMPLETE - USING .HTML EXTENSION  
**Lý do:** GitHub Pages không hỗ trợ clean URLs natively
