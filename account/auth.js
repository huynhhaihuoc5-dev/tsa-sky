// =====================================
// FIREBASE AUTH INTEGRATION
// =====================================

// Biến global lưu thông tin đăng nhập tạm
let pendingIPUpdate = null;

// =====================================
// ĐĂNG KÝ
// =====================================

async function register() {
    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!fullname || !username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if (username.length < 6) {
        alert("Tên đăng nhập phải từ 6 ký tự trở lên");
        return;
    }

    // Kiểm tra username chỉ chứa a-z, 0-9, _
    const usernameRegex = /^[a-z0-9_]{6,}$/;
    if (!usernameRegex.test(username)) {
        alert("Tên đăng nhập chỉ được chứa:\n\n• Chữ cái không dấu (a-z)\n• Số (0-9)\n• Dấu gạch dưới (_)\n\nVà phải từ 6 ký tự trở lên");
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (!passwordRegex.test(password)) {
        alert(`Mật khẩu phải có:

• Ít nhất 8 ký tự
• 1 chữ hoa
• 1 chữ thường
• 1 số
• 1 ký tự đặc biệt`);
        return;
    }

    // Tạo email từ username
    const email = username + "@skyedu.local";

    // Loading
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Đang xử lý...";
    btn.disabled = true;

    try {
        // Kiểm tra username đã tồn tại chưa
        const existingUser = await FirebaseAPI.getUserByUsername(username);
        if (existingUser) {
            alert("Tên đăng nhập đã tồn tại!");
            btn.textContent = originalText;
            btn.disabled = false;
            return;
        }

        // Tạo user với Firebase
        const result = await FirebaseAPI.createUser(email, password, fullname, username);

        if (result.success) {
            alert("Đăng ký thành công!");
            window.location.href = "dang-nhap.html";
        } else {
            alert("Lỗi: " + result.error);
        }
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert("Có lỗi xảy ra: " + error.message);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// =====================================
// ĐĂNG NHẬP
// =====================================

async function login() {
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    // Tạo email từ username
    const email = username + "@skyedu.local";

    // Loading
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Đang đăng nhập...";
    btn.disabled = true;

    try {
        const result = await FirebaseAPI.loginUser(email, password);

        if (result.success) {
            // Lưu thông tin user vào localStorage
            localStorage.setItem("currentUser", JSON.stringify(result.userData));
            
            alert("Đăng nhập thành công!");

            // Chuyển hướng theo role
            if (result.userData.role === "admin" || result.userData.role === "moderator") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "../index.html";
            }
        } else if (result.needIPConfirm) {
            // Cần xác nhận đổi IP
            pendingIPUpdate = result;
            
            if (confirm(`Phát hiện IP mới!\n\nBạn có muốn cập nhật IP đăng nhập không?\n\n⚠️ Sau khi cập nhật, bạn phải chờ 7 ngày để đổi IP lần tiếp theo.`)) {
                await confirmIPChange();
            } else {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        } else {
            alert("Lỗi: " + result.error);
            btn.textContent = originalText;
            btn.disabled = false;
        }
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Có lỗi xảy ra: " + error.message);
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// Xác nhận đổi IP
async function confirmIPChange() {
    if (!pendingIPUpdate) return;

    try {
        const result = await FirebaseAPI.confirmIPUpdate(
            pendingIPUpdate.userData.uid,
            pendingIPUpdate.newIP
        );

        if (result.success) {
            // Cập nhật localStorage
            pendingIPUpdate.userData.ip = pendingIPUpdate.newIP;
            localStorage.setItem("currentUser", JSON.stringify(pendingIPUpdate.userData));
            
            alert("Đã cập nhật IP thành công!");
            
            // Chuyển hướng
            if (pendingIPUpdate.userData.role === "admin" || pendingIPUpdate.userData.role === "moderator") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "../index.html";
            }
        } else {
            alert("Lỗi cập nhật IP: " + result.error);
        }
    } catch (error) {
        console.error("Lỗi xác nhận đổi IP:", error);
        alert("Có lỗi xảy ra: " + error.message);
    }
}

// =====================================
// ĐĂNG XUẤT
// =====================================

function logout() {
    // Đăng xuất Firebase
    if (typeof firebase !== 'undefined' && firebase.auth()) {
        firebase.auth().signOut();
    }
    
    // Xóa localStorage
    localStorage.removeItem("currentUser");

    window.location.href = "../index.html";
}