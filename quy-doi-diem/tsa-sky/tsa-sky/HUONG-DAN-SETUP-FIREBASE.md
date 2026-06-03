# 🔥 HƯỚNG DẪN SETUP FIREBASE CHO SKY EDU

## 📋 TÓM TẮT

Firebase sẽ giúp:
- ✅ Quản lý tài khoản **TẬP TRUNG** (không còn localStorage)
- ✅ Tracking IP **THẬT SỰ** từ server
- ✅ Ban IP hiệu quả (user không thể bypass bằng cách xóa localStorage)
- ✅ Admin quản lý được **TẤT CẢ** user từ xa
- ✅ Dữ liệu đồng bộ **REAL-TIME**

---

## 🚀 BƯỚC 1: TẠO FIREBASE PROJECT

### 1.1. Truy cập Firebase Console
```
https://console.firebase.google.com/
```

### 1.2. Tạo project mới
1. Click **"Add project"** (hoặc "Thêm dự án")
2. Đặt tên: `sky-edu` (hoặc tên bạn thích)
3. **BỎ TICK** Google Analytics (không cần thiết)
4. Click **"Create project"** → Đợi 30 giây

---

## 🗄️ BƯỚC 2: BẬT REALTIME DATABASE

### 2.1. Tạo Database
1. Sidebar bên trái → Click **"Realtime Database"**
2. Click **"Create Database"** (Tạo cơ sở dữ liệu)
3. Chọn **location**: `asia-southeast1` (Singapore - gần Việt Nam nhất)
4. Chọn mode: **"Start in test mode"** (Bắt đầu ở chế độ thử nghiệm)
5. Click **"Enable"**

### 2.2. Cấu hình Security Rules ⚠️ QUAN TRỌNG!
1. Sau khi tạo xong → Vào tab **"Rules"** (Quy tắc)
2. **XÓA HẾT** code cũ
3. **PASTE** code này vào:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "exams": {
      ".read": "auth != null",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'moderator'"
    },
    "courses": {
      ".read": "auth != null",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },
    "enrollments": {
      ".read": "auth != null",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },
    "ipRecords": {
      ".read": "root.child('users').child(auth.uid).child('role').val() === 'admin'",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    }
  }
}
```

4. Click **"Publish"** (Xuất bản)

**Giải thích Rules:**
- `users`: Mỗi user chỉ đọc/ghi được data của mình, Admin đọc/ghi được tất cả
- `exams`: Ai đăng nhập cũng đọc được, nhưng chỉ Admin/Moderator mới tạo/sửa/xóa
- `courses`: Chỉ Admin mới quản lý khóa học
- `ipRecords`: Chỉ Admin mới xem được danh sách IP

---

## 🔐 BƯỚC 3: BẬT AUTHENTICATION (Xác thực)

### 3.1. Kích hoạt Email/Password
1. Sidebar → Click **"Authentication"** (Xác thực)
2. Click **"Get started"** (Bắt đầu)
3. Tab **"Sign-in method"** (Phương thức đăng nhập)
4. Click vào **"Email/Password"**
5. Bật **Enable** (Bật) cho cả 2 option
6. Click **"Save"** (Lưu)

---

## 🔑 BƯỚC 4: LẤY CONFIG KEYS

### 4.1. Mở Project Settings
1. Sidebar → Click biểu tượng ⚙️ **Project settings** (Cài đặt dự án)
2. Scroll xuống phần **"Your apps"** (Ứng dụng của bạn)

### 4.2. Đăng ký Web App
1. Click biểu tượng **Web** (`</>`)
2. Đặt nickname: `sky-edu-web`
3. **BỎ TICK** "Also set up Firebase Hosting"
4. Click **"Register app"** (Đăng ký ứng dụng)

### 4.3. Copy Config
Bạn sẽ thấy 1 đoạn code như này:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",
  authDomain: "sky-edu-12345.firebaseapp.com",
  databaseURL: "https://sky-edu-12345-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sky-edu-12345",
  storageBucket: "sky-edu-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**📋 COPY TOÀN BỘ đoạn này!**

---

## 💻 BƯỚC 5: CẬP NHẬT CODE

### 5.1. Mở file `firebase-config.js`
Đường dẫn: `SKY-EDU/firebase-config.js`

### 5.2. Tìm dòng này:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    ...
```

### 5.3. THAY THẾ bằng config bạn vừa copy
**Ví dụ:**

**TRƯỚC:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

**SAU:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBc1234567890abcdefghijk",
    authDomain: "sky-edu-12345.firebaseapp.com",
    databaseURL: "https://sky-edu-12345-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sky-edu-12345",
    storageBucket: "sky-edu-12345.appspot.com",
    messagingSenderId: "987654321098",
    appId: "1:987654321098:web:abcdef123456"
};
```

### 5.4. Lưu file (Ctrl + S)

---

## ✅ BƯỚC 6: KIỂM TRA

### 6.1. Mở file `index.html` trong trình duyệt

### 6.2. Mở Console (F12)
Bạn sẽ thấy:
```
✅ Firebase initialized successfully
✅ Firebase API ready
```

### 6.3. Thử đăng ký tài khoản mới
1. Vào trang **Đăng ký**
2. Nhập thông tin
3. Click **Đăng ký**

### 6.4. Kiểm tra Firebase Console
1. Vào **Authentication** → Tab **Users**
2. Bạn sẽ thấy user vừa đăng ký!

3. Vào **Realtime Database** → Tab **Data**
4. Bạn sẽ thấy cấu trúc:
```
sky-edu-12345/
├── users/
│   └── abc123uid/
│       ├── fullname: "Nguyễn Văn A"
│       ├── username: "nguyenvana"
│       ├── role: "user"
│       ├── banned: false
│       ├── ip: "123.456.789.012"
│       └── createdAt: 1234567890
├── ipRecords/
│   └── 123_456_789_012/
│       ├── uid: "abc123uid"
│       └── username: "nguyenvana"
```

---

## 🎯 BƯỚC 7: TẠO ADMIN MẶC ĐỊNH

### Cách 1: Tự động (Đã được code sẵn)
Khi bạn mở website lần đầu, admin sẽ tự động được tạo với:
- **Email:** `admin@skyedu.com`
- **Password:** `Bh25052k8@`

### Cách 2: Thủ công từ Firebase Console
1. Vào **Authentication** → **Users**
2. Click **"Add user"**
3. Nhập:
   - Email: `admin@skyedu.com`
   - Password: `Bh25052k8@`
4. Click **"Add user"**
5. Copy **UID** của user vừa tạo
6. Vào **Realtime Database** → Tab **Data**
7. Dưới node `users` → Click **+** → Paste UID
8. Thêm các field:
```json
{
  "fullname": "Administrator",
  "username": "admin",
  "email": "admin@skyedu.com",
  "role": "admin",
  "banned": false,
  "ip": null,
  "enrollments": []
}
```

---

## 🔒 BẢO MẬT

### ⚠️ LƯU Ý QUAN TRỌNG:

1. **KHÔNG PUBLIC `firebase-config.js` lên GitHub nếu chứa API key thật!**
   
   **Cách bảo vệ:**
   ```bash
   # Thêm vào .gitignore
   echo "firebase-config.js" >> .gitignore
   ```

2. **Tạo file `firebase-config.example.js` để hướng dẫn:**
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY_HERE",
       authDomain: "your-project.firebaseapp.com",
       databaseURL: "https://your-project-default-rtdb.firebaseio.com",
       projectId: "your-project",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef"
   };
   ```

3. **Hoặc dùng Environment Variables (Nâng cao):**
   ```javascript
   const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY,
       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
       // ...
   };
   ```

---

## 🚀 DEPLOY LÊN GITHUB PAGES

### Bước 1: Chuẩn bị
```bash
cd SKY-EDU
git init
git add .
git commit -m "Initial commit with Firebase"
```

### Bước 2: Tạo repository trên GitHub
1. Vào https://github.com/new
2. Đặt tên: `sky-edu`
3. **KHÔNG** tick "Initialize with README"
4. Click **Create repository**

### Bước 3: Push code
```bash
git remote add origin https://github.com/USERNAME/sky-edu.git
git branch -M main
git push -u origin main
```

### Bước 4: Bật GitHub Pages
1. Vào **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → Folder: **/ (root)**
4. Click **Save**
5. Đợi 1-2 phút → Truy cập: `https://USERNAME.github.io/sky-edu/`

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: "Firebase: Error (auth/invalid-api-key)"
**Nguyên nhân:** API key sai hoặc chưa cập nhật
**Giải pháp:** Kiểm tra lại `firebase-config.js`

### Lỗi 2: "Permission denied"
**Nguyên nhân:** Security Rules chưa đúng
**Giải pháp:** Copy lại Rules ở Bước 2.2

### Lỗi 3: "CORS error"
**Nguyên nhân:** Chạy file HTML trực tiếp (file://)
**Giải pháp:** 
- Dùng Live Server (VSCode extension)
- Hoặc Python: `python -m http.server 8000`
- Hoặc deploy lên GitHub Pages

### Lỗi 4: "IP này đã được sử dụng"
**Nguyên nhân:** Đúng như thiết kế - 1 IP chỉ đăng ký được 1 tài khoản
**Giải pháp:** 
- Đổi mạng/IP khác
- Hoặc admin xóa IP record cũ trong database

---

## 📊 CẤU TRÚC DATABASE

```
sky-edu/
│
├── users/
│   ├── {uid1}/
│   │   ├── fullname: "Nguyễn Văn A"
│   │   ├── username: "nguyenvana"
│   │   ├── email: "nguyenvana@skyedu.local"
│   │   ├── role: "user"
│   │   ├── banned: false
│   │   ├── ip: "123.456.789.012"
│   │   ├── lastIPChange: 1234567890
│   │   ├── createdAt: 1234567890
│   │   └── enrollments: []
│   │
│   └── {uid2}/
│       └── ...
│
├── ipRecords/
│   ├── 123_456_789_012/
│   │   ├── uid: "uid1"
│   │   ├── username: "nguyenvana"
│   │   └── registeredAt: 1234567890
│   │
│   └── 111_222_333_444/
│       └── ...
│
├── exams/
│   ├── {examId1}/
│   │   ├── name: "Đề thi TSA 01"
│   │   ├── code: "TSA-01"
│   │   ├── type: "tsa"
│   │   ├── time: 150
│   │   ├── questions: [...]
│   │   └── createdAt: 1234567890
│   │
│   └── {examId2}/
│       └── ...
│
├── courses/
│   └── {courseId}/
│       ├── name: "Khóa học TSA"
│       ├── description: "Khóa học luyện thi TSA"
│       └── createdAt: 1234567890
│
└── enrollments/
    └── {userId}_{courseId}/
        ├── userId: "uid1"
        ├── courseId: "course1"
        └── enrolledAt: 1234567890
```

---

## 💡 TÍNH NĂNG ĐÃ CÓ

✅ Đăng ký tài khoản với kiểm tra IP
✅ Đăng nhập với xác thực Firebase
✅ Tracking IP thật từ api.ipify.org
✅ Hạn chế đổi IP (7 ngày/lần)
✅ Ban/Unban user từ Admin panel
✅ Phân quyền Admin/Moderator/User
✅ Lưu trữ đề thi & khóa học
✅ Real-time sync dữ liệu

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, check theo thứ tự:
1. Console browser (F12) → Xem lỗi gì
2. Firebase Console → **Authentication** → Có user không?
3. Firebase Console → **Database** → Có dữ liệu không?
4. Firebase Console → **Rules** → Đúng như hướng dẫn chưa?
5. File `firebase-config.js` → API key đúng chưa?

---

**Chúc bạn setup thành công! 🎉**
