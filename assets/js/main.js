

document.addEventListener("DOMContentLoaded", async () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // ✅ KIỂM TRA SESSION - Nếu đăng nhập từ chỗ khác sẽ logout tự động
    if (currentUser && currentUser.uid && currentUser.sessionToken) {
        const isValidSession = await FirebaseAPI.validateSessionToken(currentUser.uid, currentUser.sessionToken);
        if (!isValidSession) {
            // Session không hợp lệ = đăng nhập ở chỗ khác rồi
            localStorage.removeItem("currentUser");
            alert("⚠️ Phiên đăng nhập đã hết hạn!\n\nBạn vừa đăng nhập từ một thiết bị khác.\n\nVui lòng đăng nhập lại.");
            window.location.href = "/account/dang-nhap.html";
            return;
        }
    }

    const guestMenu = document.getElementById("guestMenu");
    const guestRegister = document.getElementById("guestRegister");
    const userMenu = document.getElementById("userMenu");
    const userBtn = document.getElementById("userBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const navUsername = document.getElementById("navUsername");
    const navAvatar = document.getElementById("navAvatar");
    const dropdownAvatar = document.getElementById("dropdownAvatar");
    const dropdownName = document.getElementById("dropdownName");
    const adminLink = document.getElementById("adminLink");

    if(currentUser){

        guestMenu.style.display="none";
        guestRegister.style.display="none";
        userMenu.style.display="block";

        navUsername.innerText =
        currentUser.fullname;

        // Hiển thị avatar - ưu tiên ảnh đã upload
        if (currentUser.avatar) {
            // Nếu có avatar, hiển thị ảnh
            navAvatar.style.backgroundImage = `url(${currentUser.avatar})`;
            navAvatar.style.backgroundSize = 'cover';
            navAvatar.style.backgroundPosition = 'center';
            navAvatar.innerText = '';
            
            dropdownAvatar.innerHTML = `<img src="${currentUser.avatar}" alt="Avatar">`;
        } else {
            // Nếu chưa có avatar, hiển thị chữ cái đầu
            navAvatar.innerText =
            currentUser.fullname.charAt(0).toUpperCase();

            dropdownAvatar.innerText =
            currentUser.fullname.charAt(0).toUpperCase();
        }

        dropdownName.innerText =
        currentUser.fullname;

        if(
            (currentUser.role==="admin" || currentUser.role==="moderator")
            &&
            adminLink
        ){
            adminLink.style.display="flex";
            
            // Hiển thị role name
            if (currentUser.role === "moderator") {
                adminLink.innerHTML = '⚙️ Quản trị viên';
            }
        }

    }else{

        userMenu.style.display="none";

    }

    if(userBtn){

        userBtn.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                dropdownMenu.classList.toggle(
                    "show"
                );

            }
        );

    }

    document.addEventListener(
        "click",
        function(e){

            if(
                !e.target.closest("#userMenu")
            ){

                dropdownMenu.classList.remove(
                    "show"
                );

            }

        }
    );

});

function logoutNavbar(){

    localStorage.removeItem(
        "currentUser"
    );

    location.reload();

}



// Countdown Timer
const examDate = new Date("December 15, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = examDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}

// Update countdown immediately and then every second
if (document.getElementById("days")) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
