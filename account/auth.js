// =====================================
// TẠO ADMIN MẶC ĐỊNH
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
        banned: false
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

// =====================================
// ĐĂNG KÝ
// =====================================

function register() {

    const fullname =
        document.getElementById("fullname").value.trim();
/* KIỂM TRA USERNAME */

if(username.length < 6){

    alert(
        "Tên đăng nhập phải từ 6 ký tự trở lên"
    );

    return;
}

/* KIỂM TRA PASSWORD */

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

if(!passwordRegex.test(password)){

    alert(
`Mật khẩu phải có:

• Ít nhất 8 ký tự
• 1 chữ hoa
• 1 chữ thường
• 1 số
• 1 ký tự đặc biệt`
    );

    return;
}

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!fullname || !username || !password) {

        alert("Vui lòng nhập đầy đủ thông tin");
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

    users.push({

        fullname: fullname,
        username: username,
        password: password,

        role: "user",

        banned: false

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

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user =
        users.find(
            u =>
            u.username === username &&
            u.password === password
        );

    if (!user) {

        alert("Sai tài khoản hoặc mật khẩu!");
        return;
    }

    if (user.banned) {

        alert("Tài khoản đã bị khóa!");
        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    alert("Đăng nhập thành công!");

    if (user.role === "admin") {

        window.location.href =
            "admin.html";

    } else {

        window.location.href =
            "../index.html";

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
