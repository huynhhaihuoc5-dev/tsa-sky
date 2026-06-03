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

    // Tạo email từ username (dùng domain .vn vì Firebase không chấp nhận .local)
    const email = username + "@skyedu.id.vn";

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
    const email = username + "@skyedu.id.vn";

    // Loading
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Đang đăng nhập...";
    btn.disabled = true;

    try {
        const result = await FirebaseAPI.loginUser(email, password);

        if (result.success) {
            // Lưu thông tin user + session token vào localStorage
            const userData = {
                ...result.userData,
                sessionToken: result.sessionToken
            };
            localStorage.setItem("currentUser", JSON.stringify(userData));
            
            alert("Đăng nhập thành công!");

            // Chuyển hướng theo role
            if (result.userData.role === "admin" || result.userData.role === "moderator") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "../index.html";
            }
        } else if (result.needIPConfirm) {
            // IP khác với IP đã đăng ký
            pendingIPUpdate = result;
            
            const confirmMsg = `⚠️ PHÁT HIỆN IP MỚI!\n\n` +
                `IP đăng ký: ${result.oldIP}\n` +
                `IP hiện tại: ${result.newIP}\n\n` +
                `Bạn có muốn CẬP NHẬT IP đăng nhập không?\n\n` +
                `✅ Đồng ý = Cho phép đăng nhập từ IP mới\n` +
                `❌ Từ chối = Chỉ đăng nhập được từ IP cũ`;
            
            if (confirm(confirmMsg)) {
                await confirmIPChange();
            } else {
                alert("❌ Đã từ chối đổi IP.\n\nBạn chỉ có thể đăng nhập từ IP đã đăng ký.");
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
            // Cập nhật IP mới và đăng nhập lại
            alert("✅ Đã cập nhật IP thành công!\n\nĐang đăng nhập...");
            
            // Gọi lại login để lấy session token
            const email = pendingIPUpdate.userData.email;
            const password = document.getElementById("password").value.trim();
            
            const loginResult = await FirebaseAPI.loginUser(email, password);
            
            if (loginResult.success) {
                const userData = {
                    ...loginResult.userData,
                    sessionToken: loginResult.sessionToken
                };
                localStorage.setItem("currentUser", JSON.stringify(userData));
                
                // Chuyển hướng
                if (loginResult.userData.role === "admin" || loginResult.userData.role === "moderator") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "../index.html";
                }
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

async function logout() {
    try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        if (currentUser && currentUser.uid) {
            // Gọi API logout để xóa session token từ Firebase
            await FirebaseAPI.logoutUser(currentUser.uid);
        }
    } catch (error) {
        console.error("Lỗi đăng xuất:", error);
    }
    
    // Đăng xuất Firebase
    if (typeof firebase !== 'undefined' && firebase.auth()) {
        firebase.auth().signOut();
    }
    
    // Xóa localStorage
    localStorage.removeItem("currentUser");

    window.location.href = "../index.html";
}
