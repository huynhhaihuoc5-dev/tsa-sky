# ⚠️ Firebase Setup Required

## Vấn đề: "Firebase chưa được khởi tạo!"

Nếu bạn thấy lỗi này khi truy cập website trên GitHub Pages:

```
❌ Firebase chưa được khởi tạo!
```

### Nguyên nhân:
Firebase config đã được cấu hình trong code, nhưng **Security Rules** chưa được setup đúng.

---

## ✅ Giải pháp (2 phút)

### Bước 1: Vào Firebase Console
```
https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/rules
```

### Bước 2: Paste Rules này
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

### Bước 3: Click "Publish"

### Bước 4: Kiểm tra Authentication
```
https://console.firebase.google.com/project/sky-edu-8be67/authentication/providers
```
→ Đảm bảo **"Email/Password"** đã **ENABLED**

---

## 🔄 Sau khi setup

1. **Reload website**
2. **Đăng ký tài khoản test** để kiểm tra
3. **Đăng nhập admin:** admin@skyedu.com / Bh25052k8@

---

## 📞 Firebase Console Links

- **Project:** https://console.firebase.google.com/project/sky-edu-8be67
- **Authentication:** https://console.firebase.google.com/project/sky-edu-8be67/authentication/users
- **Database:** https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/data
- **Rules:** https://console.firebase.google.com/project/sky-edu-8be67/database/sky-edu-8be67-default-rtdb/rules

---

## 🐛 Vẫn lỗi?

### Kiểm tra Console (F12):
```javascript
// Xem có lỗi gì không?
// Thông báo sẽ hiện:
✅ Firebase initialized successfully
📦 Project: sky-edu-8be67
```

### Nếu thấy:
```
❌ Firebase SDK chưa được load!
```
→ Có thể do CDN bị chặn. Thử:
1. Tắt Ad blocker
2. Dùng trình duyệt khác
3. Dùng VPN

---

**Xem hướng dẫn đầy đủ:** [KIEM-TRA-NGAY.md](./KIEM-TRA-NGAY.md)
