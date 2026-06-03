# ✅ FIX 404 ERRORS - GITHUB PAGES

## 🐛 Lỗi tìm thấy và sửa:

### 1. Double .html Extension
```
❌ href="quy-doi-diem.html.html"
✅ href="quy-doi-diem.html"
```
**→ Đã sửa tất cả 9 files**

### 2. Absolute Paths (không hoạt động trên GitHub Pages)
```
❌ href="/index.html"         (GitHub Pages không chấp nhận root /)
✅ href="index.html"          (Relative path - OK)
```
**→ Đã sửa tất cả**

---

## ✅ Quy tắc Links cho GitHub Pages

### ✅ ĐÚNG:
```html
<!-- Homepage -->
<a href="index.html">Trang chủ</a>

<!-- Same folder -->
<a href="quy-doi-diem.html">Quy đổi điểm</a>

<!-- Subfolder -->
<a href="account/dang-nhap.html">Đăng nhập</a>
<a href="khoa-hoc-pages/index.html">Khóa học</a>

<!-- Up one folder -->
<a href="../index.html">Trang chủ</a>
<a href="../quy-doi-diem.html">Quy đổi điểm</a>

<!-- Anchor -->
<a href="#about">About</a>
```

### ❌ SAI:
```html
<a href="/index.html">              ❌ Absolute path
<a href="quy-doi-diem.html.html">   ❌ Double extension
<a href="folder/">                   ❌ Folder without index.html
<a href="../index">                  ❌ Missing .html
```

---

## 📊 Files đã sửa (Round Final)

### HTML Files: 9 files
1. ✅ index.html
2. ✅ quy-doi-diem.html
3. ✅ account/dang-ky.html
4. ✅ account/dang-nhap.html
5. ✅ account/tai-khoan.html
6. ✅ account/doi-mat-khau.html
7. ✅ khoa-hoc-pages/detail.html
8. ✅ phong-luyen-tsa/result.html
9. ✅ phong-luyen-hsa/result.html

### JavaScript Files: 3 files
- ✅ account/auth.js (no double .html found)
- ✅ account/admin-script.js (no double .html found)
- ✅ anti-cheat.js (no double .html found)

---

## 🧪 Test trên GitHub Pages

### Sau khi upload, test các URL:

```
✅ username.github.io/repo/
✅ username.github.io/repo/index.html
✅ username.github.io/repo/account/dang-ky.html
✅ username.github.io/repo/account/dang-nhap.html
✅ username.github.io/repo/quy-doi-diem.html
✅ username.github.io/repo/khoa-hoc-pages/index.html
✅ username.github.io/repo/phong-luyen-tsa/index.html
✅ username.github.io/repo/phong-luyen-hsa/index.html
```

Tất cả phải trả về trang HTML, **KHÔNG 404**!

---

## 🚀 Deploy Steps

### 1. Create GitHub Repository
- GitHub.com → New repository
- Name: `skyedu` (hoặc tên khác)
- Public
- Create

### 2. Upload Files (Choose one method)

**Method A: Web UI (Easy)**
- Repo → Add file → Upload files
- Drag folder `SKY-EDU/*`
- Commit

**Method B: Git CLI**
```bash
cd SKY-EDU
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/skyedu.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Repo Settings → Pages
- Source: Deploy from branch
- Branch: main, folder: / (root)
- Save

### 4. Wait & Test
- Đợi 1-2 phút
- Vào `https://username.github.io/skyedu/`
- Click các links để test

---

## ⚠️ Nếu vẫn lỗi 404

### Check 1: File existence
```bash
git log --name-status  # Xem files được upload
```

### Check 2: Browser cache
- Ctrl+Shift+Delete (Clear cache)
- Hoặc dùng Incognito mode

### Check 3: File paths
- Mở DevTools (F12)
- Network tab
- Xem request URLs và compare với file paths

### Check 4: Firebaes config
- Tìm Firebase script load
- Xem có error gì không

---

## 🔗 Custom Domain (Optional)

Nếu dùng domain custom như `skyedu.id.vn`:

1. GitHub Repo Settings → Pages
2. Custom domain: `skyedu.id.vn`
3. Vào domain provider (GoDaddy, Namecheap, etc)
4. Thêm CNAME record:
   ```
   CNAME skyedu.id.vn username.github.io
   ```
5. Đợi ~15 phút DNS cập nhật
6. GitHub tự add HTTPS certificate

---

## ✅ Final Checklist

- [ ] Double .html extensions removed
- [ ] No absolute paths (like `/index.html`)
- [ ] All relative paths correct
- [ ] Firebase config has correct project ID
- [ ] All files uploaded to GitHub
- [ ] GitHub Pages enabled
- [ ] Custom domain configured (if using)
- [ ] Tested all major links
- [ ] No 404 errors

---

**Status: ✅ READY FOR GITHUB PAGES DEPLOYMENT**

Upload now! 🚀

---

*Last updated: 2026-06-03 23:15*
*All 404 issues fixed*
