# ✅ KIỂM TRA NGAY - Firebase đã setup!

## 🎉 CONFIG ĐÃ CÓ!

Firebase config đã được paste vào `firebase-config.js` thành công!

---

## ⚠️ QUAN TRỌNG - PHẢI LÀM NGAY!

### Bước 1: Kiểm tra Security Rules

1. Vào: https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/rules
2. Kiểm tra xem có đúng như dưới đây không:

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

3. **NẾUU CHƯA ĐÚNG:**
   - Click tab **"Rules"**
   - **XÓA HẾT** code cũ
   - **PASTE** code trên vào
   - Click **"Publish"**

### Bước 2: Kiểm tra Authentication

1. Vào: https://console.firebase.google.com/project/sky-edu-8be67/authentication/providers
2. Kiểm tra **"Email/Password"** đã **Enable** chưa?
3. **NẾUU CHƯA:**
   - Click vào **"Email/Password"**
   - Bật **Enable**
   - Click **"Save"**

---

## 🚀 TEST NGAY!

### Cách 1: Python Server
```bash
cd C:\Users\ACER\Downloads\SKY-EDU
python -m http.server 8000
```
→ Mở: http://localhost:8000

### Cách 2: Live Server (VSCode)
- Cài extension "Live Server"
- Right-click `index.html` → **"Open with Live Server"**

### Cách 3: Node.js
```bash
cd C:\Users\ACER\Downloads\SKY-EDU
npx http-server -p 8000
```
→ Mở: http://localhost:8000

---

## ✅ KIỂM TRA

### 1. Mở Console (F12)
Bạn PHẢI thấy:
```
✅ Firebase initialized successfully
✅ Firebase API ready
```

**NẾUU KHÔNG thấy:**
- Có lỗi đỏ gì trong Console?
- Kiểm tra file `firebase-config.js` đã save chưa?

### 2. Test Đăng Ký
1. Click **"Đăng ký"**
2. Nhập:
   - Họ tên: `Test User`
   - Tên đăng nhập: `testuser`
   - Mật khẩu: `Test1234@`
3. Tick **"Đồng ý điều khoản"**
4. Click **"Đăng ký"**
5. PHẢI thấy: **"Đăng ký thành công!"**

**NẾUU LỖI:**
- Xem Console (F12) → Có lỗi gì?
- Kiểm tra Security Rules đã paste chưa?
- Kiểm tra Authentication đã bật chưa?

### 3. Kiểm tra Firebase Console

**Authentication:**
1. Vào: https://console.firebase.google.com/project/sky-edu-8be67/authentication/users
2. PHẢI thấy user: `testuser@skyedu.local`

**Database:**
1. Vào: https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/data
2. PHẢI thấy:
```
users/
  └── abc123uid/
      ├── fullname: "Test User"
      ├── username: "testuser"
      ├── role: "user"
      ├── ip: "..."
      └── ...

ipRecords/
  └── xxx_xxx_xxx_xxx/
      ├── uid: "abc123uid"
      └── username: "testuser"
```

### 4. Test Đăng Nhập
1. Đăng xuất
2. Đăng nhập lại với:
   - Tên đăng nhập: `testuser`
   - Mật khẩu: `Test1234@`
3. PHẢI thấy: **"Đăng nhập thành công!"**

### 5. Test Admin
1. Đăng xuất
2. Đăng nhập với:
   - Tên đăng nhập: `admin`
   - Mật khẩu: `Bh25052k8@`
3. PHẢI redirect về trang Admin Panel

**NẾUU KHÔNG TỒN TẠI admin:**
- Đợi 1-2 giây sau khi load trang chủ lần đầu
- Admin sẽ tự động được tạo
- Hoặc tạo thủ công theo hướng dẫn

---

## 🐛 GẶP LỖI?

### Lỗi 1: Console báo "Firebase is not defined"
**Nguyên nhân:** Chưa load Firebase scripts

**Fix:**
- Kiểm tra file `dang-ky.html` và `dang-nhap.html`
- PHẢI có đoạn này TRƯỚC tag `</body>`:
```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
<script src="../firebase-config.js"></script>
<script src="auth.js"></script>
```

### Lỗi 2: "CORS error"
**Nguyên nhân:** Mở file HTML trực tiếp (file://)

**Fix:** Phải dùng local server!
```bash
python -m http.server 8000
```

### Lỗi 3: "Permission denied" (Firebase)
**Nguyên nhân:** Security Rules chưa đúng

**Fix:**
1. Vào Firebase Console → Realtime Database → Tab "Rules"
2. Paste Rules từ phần trên
3. Click "Publish"

### Lỗi 4: "auth/invalid-email"
**Nguyên nhân:** Email format không đúng

**Fix:** Đảm bảo code trong `auth.js` tạo email dạng: `username@skyedu.local`

### Lỗi 5: "IP này đã được sử dụng"
**Nguyên nhân:** Đúng như thiết kế

**Fix:**
- Đổi mạng/IP khác
- Hoặc vào Firebase Console → Database → Xóa IP record cũ

---

## 🚀 SAU KHI TEST OK

### Deploy lên GitHub Pages:

```bash
cd C:\Users\ACER\Downloads\SKY-EDU

# 1. Init git
git init
git add .
git commit -m "Add Firebase integration"

# 2. Tạo repo trên GitHub
# https://github.com/new
# Tên: sky-edu

# 3. Push
git remote add origin https://github.com/USERNAME/sky-edu.git
git branch -M main
git push -u origin main

# 4. Bật GitHub Pages
# Settings > Pages > Source: main branch > Save
```

**Website sẽ có tại:**
```
https://USERNAME.github.io/sky-edu/
```

---

## 📊 FIREBASE CONSOLE LINKS

**Project Overview:**
https://console.firebase.google.com/project/sky-edu-8be67

**Authentication:**
https://console.firebase.google.com/project/sky-edu-8be67/authentication/users

**Realtime Database:**
https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/data

**Database Rules:**
https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/rules

---

## 🎯 ADMIN ACCOUNT

**Tự động tạo khi load trang lần đầu:**
```
Email: admin@skyedu.com
Password: Bh25052k8@
```

**Nếu không tự tạo, tạo thủ công:**
1. Firebase Console → Authentication → Add user
2. Email: `admin@skyedu.com`, Password: `Bh25052k8@`
3. Copy UID
4. Vào Database → Add node `users/{UID}`:
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

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Config đã paste vào firebase-config.js ✅ (DONE!)
- [ ] Security Rules đã paste vào Firebase Console
- [ ] Authentication đã bật Email/Password
- [ ] Đã chạy local server
- [ ] Console thấy "✅ Firebase initialized"
- [ ] Test đăng ký → Thành công
- [ ] Firebase Console → Authentication có user
- [ ] Firebase Console → Database có data
- [ ] Test đăng nhập → Thành công
- [ ] Test tracking IP → Thành công
- [ ] Admin account được tạo
- [ ] Deploy lên GitHub Pages

---

**BẮT ĐẦU NGAY!** 🚀

1. Kiểm tra Security Rules
2. Kiểm tra Authentication
3. Chạy local server
4. Test đăng ký/đăng nhập
5. Deploy!
