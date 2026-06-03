# 📁 Cấu trúc thư mục SKY EDU

## ✅ Đã tổ chức lại cấu trúc dự án

### 🎯 Cấu trúc mới (Clean URLs)

```
SKY-EDU/
├── index.html                          # Trang chủ
├── quy-doi-diem.html                   # Trang quy đổi điểm
│
├── phong-luyen-tsa/                    # 📂 Phòng luyện TSA
│   ├── index.html                      # Danh sách đề TSA
│   ├── exam.html                       # Trang làm bài
│   └── result.html                     # Trang kết quả
│
├── phong-luyen-hsa/                    # 📂 Phòng luyện HSA
│   ├── index.html                      # Danh sách đề HSA
│   ├── exam.html                       # Trang làm bài
│   └── result.html                     # Trang kết quả
│
├── khoa-hoc-pages/                     # 📂 Khóa học
│   ├── index.html                      # Danh sách khóa học
│   └── detail.html                     # Chi tiết khóa học
│
├── account/                            # 📂 Tài khoản
│   ├── dang-nhap.html
│   ├── dang-ky.html
│   ├── tai-khoan.html
│   ├── doi-mat-khau.html
│   ├── admin.html
│   ├── admin-script.js
│   └── auth.js
│
├── assets/                             # 📂 Tài nguyên chung
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
├── data/                               # 📂 Dữ liệu đề thi
│   ├── de3.js
│   └── de3A/
│
├── quy-doi-diem/                       # 📂 Quy đổi điểm
│
├── anti-cheat.js                       # Script chống gian lận
├── firebase-config.js                  # Cấu hình Firebase
├── .htaccess                           # Clean URLs config
├── .gitignore
├── LICENSE
├── README.md
├── CONTRIBUTING.md
└── STRUCTURE.md                        # File này
```

## 🌐 URLs mới (Clean URLs)

### Trang chính
- Trang chủ: `/` hoặc `/index.html`
- Quy đổi điểm: `/quy-doi-diem.html`

### Phòng luyện
- **TSA**: `/phong-luyen-tsa/` → Danh sách đề
- **TSA Exam**: `/phong-luyen-tsa/exam.html?examId=xxx`
- **TSA Result**: `/phong-luyen-tsa/result.html`

- **HSA**: `/phong-luyen-hsa/` → Danh sách đề  
- **HSA Exam**: `/phong-luyen-hsa/exam.html?examId=xxx`
- **HSA Result**: `/phong-luyen-hsa/result.html`

### Khóa học
- **Danh sách**: `/khoa-hoc-pages/` → Tất cả khóa học
- **Chi tiết**: `/khoa-hoc-pages/detail.html?id=xxx`

### Tài khoản
- Đăng nhập: `/account/dang-nhap.html`
- Đăng ký: `/account/dang-ky.html`
- Hồ sơ: `/account/tai-khoan.html`
- Đổi mật khẩu: `/account/doi-mat-khau.html`
- Admin: `/account/admin.html`

## 🔧 Cấu hình .htaccess (Clean URLs)

File `.htaccess` đã được tạo để:
- Loại bỏ đuôi `.html` trong URL
- Tự động thêm trailing slash cho thư mục
- Redirect 301 từ URL cũ sang URL mới

**Ví dụ:**
- `/quy-doi-diem` → hiển thị `/quy-doi-diem.html`
- `/phong-luyen-tsa` → hiển thị `/phong-luyen-tsa/index.html`

## ✨ Lợi ích của cấu trúc mới

1. **URLs sạch đẹp hơn**
   - Trước: `phong-luyen-tsa.html`
   - Sau: `phong-luyen-tsa/`

2. **Dễ quản lý**
   - Các file liên quan được nhóm trong cùng 1 folder
   - Dễ tìm và chỉnh sửa

3. **Dễ mở rộng**
   - Thêm tính năng mới vào từng module dễ dàng
   - Không làm lộn xộn thư mục gốc

4. **SEO tốt hơn**
   - URLs thân thiện với công cụ tìm kiếm
   - Cấu trúc rõ ràng, logic

## 📝 Những gì đã thay đổi

### ✅ Di chuyển files
- `phong-luyen-tsa.html` → `phong-luyen-tsa/index.html`
- `phong-luyen-tsa-exam.html` → `phong-luyen-tsa/exam.html`
- `phong-luyen-tsa-result.html` → `phong-luyen-tsa/result.html`
- `phong-luyen-hsa.html` → `phong-luyen-hsa/index.html`
- `phong-luyen-hsa-exam.html` → `phong-luyen-hsa/exam.html`
- `phong-luyen-hsa-result.html` → `phong-luyen-hsa/result.html`
- `khoa-hoc.html` → `khoa-hoc-pages/index.html`
- `khoa-hoc-detail.html` → `khoa-hoc-pages/detail.html`

### ✅ Cập nhật paths
- Asset paths: `assets/` → `../assets/` (trong subfolder)
- Script paths: `anti-cheat.js` → `../anti-cheat.js`
- Navigation links: Tất cả đã cập nhật sang cấu trúc mới
- Redirect URLs: Tất cả đã chỉ đúng folder mới

### ✅ Tạo .htaccess
- Hỗ trợ Clean URLs
- Tự động redirect

## 🚀 Cách sử dụng

1. **Local development**: Mở `index.html` trực tiếp
2. **Production**: Upload lên web server hỗ trợ Apache/.htaccess

## ⚠️ Lưu ý

- Server cần hỗ trợ Apache với mod_rewrite để Clean URLs hoạt động
- Nếu không dùng Apache, cần cấu hình tương tự cho Nginx/IIS
- Đảm bảo quyền đọc file `.htaccess` trên server

---

**Cập nhật lần cuối**: 03/06/2026
