
// =====================================
// TẠO ADMIN MẶC ĐỊNH & IP TRACKING
// =====================================

let users = JSON.parse(localStorage.getItem("users")) || [];

const adminExist = users.find(
    user => user.role === "admin"
);

if (!adminExist) {

    users.push({
        fullname: "Administrator",
        username: "admin",
        password: "Bh25052k8@",
        role: "admin",
        banned: false,
        ip: null,
        lastIPChange: null,
        enrollments: [] // Danh sách ID khóa học được ghi danh
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

// Hàm lấy IP giả lập (trong thực tế dùng API)
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        // Fallback: tạo fingerprint từ browser
        return `local_${navigator.userAgent.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '')}`;
    }
}

// =====================================
// ĐĂNG KÝ
// =====================================

async function register() {

    const fullname =
        document.getElementById("fullname").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!fullname || !username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if (username.length < 6) {
        alert("Tên đăng nhập phải từ 6 ký tự trở lên");
        return;
    }

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (!passwordRegex.test(password)) {

        alert(`Mật khẩu phải có:

• Ít nhất 8 ký tự
• 1 chữ hoa
• 1 chữ thường
• 1 số
• 1 ký tự đặc biệt`);

        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const existed =
        users.find(
            user => user.username === username
        );

    if (existed) {
        alert("Tên đăng nhập đã tồn tại");
        return;
    }

    // Lấy IP và kiểm tra
    const userIP = await getUserIP();
    
    const ipExists = users.find(u => u.ip === userIP && u.ip !== null);
    if (ipExists) {
        alert("IP này đã được sử dụng để đăng ký tài khoản khác!");
        return;
    }

    users.push({
        fullname: fullname,
        username: username,
        password: password,
        role: "user",
        banned: false,
        ip: userIP,
        lastIPChange: Date.now(),
        enrollments: []
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Đăng ký thành công!");

    window.location.href =
        "dang-nhap.html";
}

// =====================================
// ĐĂNG NHẬP
// =====================================

async function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
        u =>
        u.username === username &&
        u.password === password
    );

    if (userIndex === -1) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
    }

    const user = users[userIndex];

    if (user.banned) {
        alert("Tài khoản đã bị khóa!");
        return;
    }

    // Kiểm tra IP
    const currentIP = await getUserIP();
    
    if (user.ip && user.ip !== currentIP) {
        // IP khác, kiểm tra thời gian
        const daysSinceLastChange = (Date.now() - user.lastIPChange) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastChange < 7) {
            const daysLeft = Math.ceil(7 - daysSinceLastChange);
            alert(`IP đăng nhập khác với IP đã đăng ký!\n\nBạn chỉ có thể đổi IP sau ${daysLeft} ngày nữa.\n\n(Lần đổi IP gần nhất: ${new Date(user.lastIPChange).toLocaleDateString('vi-VN')})`);
            return;
        }
        
        // Đã đủ 7 ngày, cho phép đổi IP
        if (confirm(`Phát hiện IP mới!\n\nBạn có muốn cập nhật IP đăng nhập không?\n\n⚠️ Sau khi cập nhật, bạn phải chờ 7 ngày để đổi IP lần tiếp theo.`)) {
            user.ip = currentIP;
            user.lastIPChange = Date.now();
            users[userIndex] = user;
            localStorage.setItem("users", JSON.stringify(users));
        } else {
            return;
        }
    } else if (!user.ip) {
        // Lần đầu đăng nhập, lưu IP
        user.ip = currentIP;
        user.lastIPChange = Date.now();
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    alert("Đăng nhập thành công!");

    if (user.role === "admin" || user.role === "moderator") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "../index.html";
    }
}

// =====================================
// ĐĂNG XUẤT
// =====================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "../index.html";
}