// Đặt ngày mục tiêu (16/05/2026)
const targetDate = new Date("May 16, 2026 00:00:00").getTime();

// Cập nhật đồng hồ mỗi giây
const updateCountdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Tính giờ, phút, giây
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Cập nhật các phần tử HTML
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Nếu quá ngày thi, dừng đếm
    if (
const adminLink =
document.getElementById("adminLink");

if(
    currentUser &&
    currentUser.role === "admin"
){

    adminLink.style.display = "flex";

}else{

    adminLink.style.display = "none";

}