# Contributing to SKY EDU

Cảm ơn bạn đã quan tâm đến việc đóng góp cho SKY EDU! 🎉

## 📋 Quy trình đóng góp

### 1. Fork repository
Click nút "Fork" ở góc trên bên phải

### 2. Clone fork về máy
```bash
git clone https://github.com/YOUR_USERNAME/sky-edu.git
cd sky-edu
```

### 3. Tạo branch mới
```bash
git checkout -b feature/ten-tinh-nang
```

Quy tắc đặt tên branch:
- `feature/` - Tính năng mới
- `fix/` - Sửa lỗi
- `docs/` - Cập nhật tài liệu
- `style/` - Thay đổi giao diện
- `refactor/` - Tái cấu trúc code

### 4. Code và test
- Viết code clean, dễ đọc
- Comment đầy đủ
- Test kỹ trước khi commit

### 5. Commit changes
```bash
git add .
git commit -m "feat: thêm tính năng XYZ"
```

Quy tắc commit message:
- `feat:` - Tính năng mới
- `fix:` - Sửa lỗi
- `docs:` - Cập nhật docs
- `style:` - Format code
- `refactor:` - Refactor code
- `test:` - Thêm test
- `chore:` - Update dependencies

### 6. Push lên GitHub
```bash
git push origin feature/ten-tinh-nang
```

### 7. Tạo Pull Request
1. Vào repository gốc
2. Click "New Pull Request"
3. Chọn branch của bạn
4. Điền mô tả chi tiết
5. Submit

## 🐛 Báo cáo lỗi

### Trước khi báo cáo
- Kiểm tra xem lỗi đã được báo cáo chưa
- Thử với phiên bản mới nhất
- Thu thập thông tin chi tiết

### Template báo cáo lỗi
```markdown
**Mô tả lỗi**
Mô tả ngắn gọn về lỗi

**Các bước tái hiện**
1. Vào trang '...'
2. Click vào '...'
3. Cuộn xuống '...'
4. Thấy lỗi

**Kết quả mong đợi**
Mô tả những gì bạn mong đợi

**Screenshots**
Nếu có, thêm screenshots

**Environment:**
- Trình duyệt: [Chrome, Firefox, Safari]
- Phiên bản: [v1.0.0]
- OS: [Windows, macOS, Linux]
```

## 💡 Đề xuất tính năng

### Template đề xuất
```markdown
**Mô tả tính năng**
Mô tả rõ ràng về tính năng mới

**Lý do**
Tại sao tính năng này hữu ích?

**Giải pháp đề xuất**
Bạn muốn tính năng hoạt động như thế nào?

**Giải pháp thay thế**
Có giải pháp nào khác không?

**Thông tin thêm**
Screenshots, mockups, v.v.
```

## 📝 Coding Standards

### HTML
- Sử dụng HTML5 semantic tags
- Indent: 4 spaces
- Lowercase cho tags và attributes

### CSS
- BEM naming convention
- Mobile-first approach
- Use CSS variables
- Indent: 4 spaces

### JavaScript
- ES6+ syntax
- camelCase cho variables
- PascalCase cho Classes
- Indent: 4 spaces
- Use semicolons

### Ví dụ code style
```javascript
// ✅ Good
function calculateScore(answers) {
    const totalQuestions = answers.length;
    let correctCount = 0;
    
    answers.forEach((answer, index) => {
        if (answer.isCorrect) {
            correctCount++;
        }
    });
    
    return (correctCount / totalQuestions) * 100;
}

// ❌ Bad
function calc(a){
const t=a.length
let c=0
a.forEach((x,i)=>{if(x.isCorrect)c++})
return c/t*100
}
```

## 🧪 Testing

### Trước khi submit PR
- [ ] Test trên Chrome
- [ ] Test trên Firefox
- [ ] Test trên Safari (nếu có)
- [ ] Test trên mobile
- [ ] Kiểm tra responsive
- [ ] Kiểm tra console không có lỗi
- [ ] Test các tính năng liên quan

## 📚 Documentation

Khi thêm tính năng mới:
- Update README.md
- Thêm comment trong code
- Update CHANGELOG.md
- Tạo hướng dẫn nếu cần

## ❓ Câu hỏi

Nếu có thắc mắc:
- Mở issue với label "question"
- Email: contact@skyedu.vn

## 🙏 Cảm ơn

Cảm ơn bạn đã đóng góp vào SKY EDU!

Mọi đóng góp, dù lớn hay nhỏ, đều được trân trọng. ❤️
