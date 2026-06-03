# 🚀 SKY EDU - Hệ thống luyện thi TSA/HSA

> **Fly higher - Think better**

Nền tảng luyện thi đánh giá tư duy toàn diện cho kỳ thi TSA (Bách Khoa HN) và HSA (ĐHQGHN)

![SKY EDU Banner](assets/images/hero-bg.jpg)

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Demo](#-demo)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Công nghệ](#-công-nghệ)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

## ✨ Tính năng

### 🎯 Phòng luyện thi
- **TSA**: Đánh giá tư duy - ĐH Bách khoa Hà Nội
- **HSA**: Đánh giá năng lực - ĐHQG Hà Nội
- Đề thi phân loại: Cơ bản, Nâng cao, Full đề
- Giao diện làm bài chuyên nghiệp với matrix 5 cột
- Nút điều chỉnh cỡ chữ A+/A-
- Anti-cheat system: Fullscreen, chống tab switch, chống screenshot

### 📊 Quy đổi điểm
- Hỗ trợ **13 trường ĐH hàng đầu**
- 2 phương pháp: Nội suy tuyến tính + Tra bảng chính xác
- ĐHQGHN: 4 nhóm với 56 mốc điểm

### 👥 Quản lý tài khoản
- Đăng ký/Đăng nhập an toàn
- 3 phân quyền: User, Moderator, Admin
- Theo dõi lịch sử làm bài
- Kiểm tra IP và giới hạn đổi IP (7 ngày/lần)

### ⚙️ Admin Panel
- Tạo đề thi dễ dàng
- Upload file TXT/PDF
- Hỗ trợ LaTeX/MathJax
- Paste ảnh trực tiếp
- Sửa/xóa đề đã xuất bản

## 🎬 Demo

### Trang chủ
![Homepage](https://via.placeholder.com/800x400/1677FF/FFFFFF?text=SKY+EDU+Homepage)

### Phòng luyện thi
![Exam Room](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Exam+Room)

### Admin Panel
![Admin Panel](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Admin+Panel)

## 🔧 Cài đặt

### Yêu cầu
- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)
- Không cần cài đặt server

### Cài đặt cơ bản

1. **Clone repository**
```bash
git clone https://github.com/yourusername/sky-edu.git
cd sky-edu
```

2. **Mở bằng trình duyệt**
```bash
# Mở file index.html
# Hoặc dùng Live Server nếu có
```

3. **Đăng nhập**
```
Username: admin
Password: Bh25052k8@
```

## 🚀 Sử dụng

### Bước 1: Đăng nhập
- Mở `account/dang-nhap.html`
- Đăng nhập bằng tài khoản admin hoặc đăng ký tài khoản mới

### Bước 2: Import đề thi mẫu
Hệ thống tự động import đề thi mẫu khi bạn vào phòng luyện lần đầu:
- **TSA**: "Đề thi thử TSA lần 1" (40 câu)
- **HSA**: "Đề thi thử HSA lần 1" (40 câu)

### Bước 3: Làm bài thi
1. Vào `phong-luyen-tsa.html` hoặc `phong-luyen-hsa.html`
2. Chọn đề thi trong mục "Full đề"
3. Đọc quy định → Checkbox → "Bắt đầu làm bài"
4. Làm bài → Click "NỘP BÀI"

### Bước 4: Xem kết quả
- Điểm số chi tiết
- Danh sách câu sai
- Đáp án đúng và giải thích

## 📁 Cấu trúc dự án

```
SKY-EDU/
├── index.html                      # Trang chủ
├── account/                        # Quản lý tài khoản
│   ├── dang-nhap.html             # Đăng nhập
│   ├── dang-ky.html               # Đăng ký
│   ├── admin.html                 # Admin panel
│   ├── tai-khoan.html             # Trang cá nhân
│   ├── doi-mat-khau.html          # Đổi mật khẩu
│   ├── auth.js                    # Authentication logic
│   └── admin-script.js            # Admin panel logic
├── phong-luyen-tsa.html           # Phòng luyện TSA
├── phong-luyen-tsa-exam.html      # Trang làm bài TSA
├── phong-luyen-tsa-result.html    # Kết quả TSA
├── phong-luyen-hsa.html           # Phòng luyện HSA
├── phong-luyen-hsa-exam.html      # Trang làm bài HSA
├── phong-luyen-hsa-result.html    # Kết quả HSA
├── quy-doi-diem.html              # Quy đổi điểm
├── assets/
│   ├── css/style.css              # CSS chính
│   ├── js/main.js                 # JavaScript chính
│   └── images/                    # Hình ảnh
├── data/
│   ├── de3.js                     # Đề thi mẫu 323
│   └── de3A/                      # Ảnh đề 323
├── quy-doi-diem/
│   └── quy-doi-script.js          # Logic quy đổi điểm
├── anti-cheat.js                  # Anti-cheat system
├── firebase-config.js             # Firebase config (optional)
├── debug-console.html             # Debug tool
├── import-de323.html              # Import tool
├── QUICK_FIX.html                 # Quick test tool
├── START_HERE.md                  # Quick start guide
├── FIREBASE_SETUP_CHI_TIET.md    # Firebase setup guide
└── README.md                      # This file
```

## 🛠️ Công nghệ

### Frontend
- **HTML5** - Cấu trúc trang web
- **CSS3** - Styling với Flexbox & Grid
- **Vanilla JavaScript** - Logic ứng dụng
- **MathJax** - Render công thức toán học
- **Iconify** - Icons

### Storage
- **localStorage** - Lưu trữ dữ liệu local
- **Firebase** (optional) - Lưu trữ cloud

### Libraries
- **Be Vietnam Pro** - Font chữ
- **MathJax 3** - LaTeX rendering

## 🎨 Giao diện

### Màu sắc chính
- **Primary Blue**: `#1677FF` - TSA
- **Green**: `#10B981` - HSA
- **Dark Navy**: `#051A39` - Header
- **Red**: `#DC2626` - Submit button

### Typography
- Font: **Be Vietnam Pro**
- Weights: 400, 500, 600, 700, 800

## � Bảo mật

- ✅ Kiểm tra IP khi đăng nhập
- ✅ Giới hạn đổi IP (7 ngày/lần)
- ✅ Mật khẩu mạnh (8 ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt)
- ✅ Anti-cheat system:
  - Fullscreen bắt buộc
  - Chống tab switch
  - Chống screenshot
  - Chống DevTools
  - 3 lần vi phạm → Hủy bài

## 👥 Phân quyền

### User (Thành viên)
- ✅ Làm bài thi
- ✅ Xem kết quả
- ✅ Quy đổi điểm

### Moderator (Quản trị viên)
- ✅ Quản lý đề thi (tạo/sửa/xóa)
- ✅ Quản lý tài khoản (khóa/mở khóa)
- ❌ KHÔNG xóa user
- ❌ KHÔNG quản lý khóa học

### Admin
- ✅ Toàn quyền hệ thống
- ✅ Gán/hủy role Moderator
- ✅ Xóa user
- ✅ Quản lý mọi thứ

## 📊 Quy đổi điểm - 13 trường

1. ĐH Kinh tế Quốc dân (NEU)
2. ĐH Thương mại (TMU)
3. HV Bưu chính Viễn thông (PTIT)
4. ĐH Giao thông Vận tải (UTC)
5. ĐH Công nghệ GTVT (UTC2)
6. HV Ngân hàng (HVNH)
7. ĐH Phenikaa
8. ĐH Mở Hà Nội (HOU)
9. ĐH Tài nguyên Môi trường (HUNRE)
10. ĐH Thăng Long Nhóm 1 (TLU1)
11. ĐH Thăng Long Nhóm 2 (TLU2)
12. ĐH Bách khoa Hà Nội (HUST)
13. ĐHQGHN (4 nhóm: UET, USSH, UEB/ULIS, UMP/UED)

## 🐛 Troubleshooting

### Không thấy đề thi?
→ Hệ thống tự động import khi vào phòng luyện lần đầu

### Admin Panel lỗi?
→ Xóa cache và F5, hoặc xem Console (F12)

### Matrix không hiện đủ ô?
→ Kiểm tra đề có đủ 40 câu không

### Muốn xóa data?
→ Mở `debug-console.html` → Click "Clear All"

## 🤝 Đóng góp

Contributions, issues và feature requests đều được chào đón!

1. Fork dự án
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 Changelog

### Version 2.0.0 (2026-06-03)
- ✅ Redesign giao diện exam với toolbar A+/A-
- ✅ Matrix 5 cột với khung background
- ✅ Giao diện đăng nhập/đăng ký mới
- ✅ Auto-import đề thi mẫu
- ✅ Tối ưu UX/UI

### Version 1.0.0 (2026-06-01)
- ✅ Release đầu tiên
- ✅ Phòng luyện TSA/HSA
- ✅ Admin Panel
- ✅ Quy đổi điểm
- ✅ Anti-cheat system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**SKY EDU Team**
- Website: [skyedu.vn](https://skyedu.vn)
- Email: contact@skyedu.vn

## 🙏 Acknowledgments

- Font: [Google Fonts - Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro)
- Icons: [Iconify](https://iconify.design/)
- Math Rendering: [MathJax](https://www.mathjax.org/)

---

<div align="center">

**© 2026 SKY EDU. Độc lập tư duy - Nâng tầm tri thức.**

Made with ❤️ in Vietnam

[⬆ Back to top](#-sky-edu---hệ-thống-luyện-thi-tsahsa)

</div>
