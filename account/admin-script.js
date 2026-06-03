// ===================================
// KHỞI TẠO & KIỂM TRA QUYỀN
// ===================================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "moderator")) {
    alert("Bạn không có quyền truy cập!");
    window.location.href = "../index.html";
}

// Khởi tạo storage
if (!localStorage.getItem("exams")) {
    localStorage.setItem("exams", JSON.stringify([]));
}
if (!localStorage.getItem("courses")) {
    localStorage.setItem("courses", JSON.stringify([]));
}

let currentQuestions = [];
let editingQuestionIndex = -1;

// Real-time listener cho users
let usersListener = null;

function setupRealtimeUserListener() {
    try {
        if (typeof FirebaseAPI === 'undefined' || !FirebaseAPI.listenToUsers) {
            console.warn('Firebase API chưa sẵn sàng');
            return;
        }
        
        // Lắng nghe thay đổi users real-time từ Firebase
        FirebaseAPI.listenToUsers((users) => {
            console.log('📊 Cập nhật users từ Firebase:', users.length, 'accounts');
            
            // Nếu tab "Quản lý TK" đang mở, render lại ngay
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab && activeTab.id === 'tab-1') {
                renderUsers();
            }
            
            // Cập nhật stats luôn
            loadStats();
        });
    } catch (error) {
        console.error('Lỗi setup listener:', error);
    }
}

// Khởi động listener ngay khi load trang
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Panel loaded, khởi động listener...');
    setTimeout(() => {
        setupRealtimeUserListener();
        loadStats();
    }, 1000);
});

// ===================================
// QUẢN LÝ TABS
// ===================================

function switchTab(index) {
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.tab-content').forEach((content, i) => {
        content.classList.toggle('active', i === index);
    });
    
    // Load dữ liệu khi chuyển tab
    if (index === 0) loadStats();
    if (index === 1) {
        renderUsers();
        setupRealtimeUserListener(); // Bắt đầu lắng nghe khi vào tab
    }
    if (index === 3) renderExamList();
    if (index === 4) {
        // Kiểm tra quyền Admin
        if (currentUser.role !== 'admin') {
            alert('⚠️ Chỉ Admin mới có quyền quản lý khóa học!');
            switchTab(0); // Chuyển về tab thống kê
            return;
        }
        renderCourseList();
    }
}

// ===================================
// TAB 0: THỐNG KÊ
// ===================================

async function loadStats() {
    try {
        const users = await FirebaseAPI.getAllUsers();
        const exams = JSON.parse(localStorage.getItem("exams")) || [];
        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        
        const totalUsers = users ? users.length : 0;
        const activeUsers = users ? users.filter(u => !u.banned).length : 0;
        const bannedUsers = users ? users.filter(u => u.banned).length : 0;
        
        document.getElementById("totalUsers").textContent = totalUsers;
        document.getElementById("activeUsers").textContent = activeUsers;
        document.getElementById("bannedUsers").textContent = bannedUsers;
        document.getElementById("totalExams").textContent = exams.length;
        document.getElementById("totalCourses").textContent = courses.length;
    } catch (error) {
        console.error('Lỗi tải thống kê:', error);
        document.getElementById("totalUsers").textContent = "?";
        document.getElementById("activeUsers").textContent = "?";
        document.getElementById("bannedUsers").textContent = "?";
    }
}

// ===================================
// TAB 1: QUẢN LÝ TÀI KHOẢN
// ===================================

async function renderUsers() {
    const isAdmin = currentUser.role === 'admin';
    
    try {
        // Fetch users từ Firebase
        const users = await FirebaseAPI.getAllUsers();
        
        if (!users || users.length === 0) {
            document.getElementById("userTable").innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #64748B;">
                        <h3>📭 Không có tài khoản nào</h3>
                        <p>Các tài khoản mới sẽ hiển thị ở đây</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        const html = users.map((user, index) => `
            <tr>
                <td>${user.fullname}</td>
                <td>
                    <code style="font-size: 12px; background: #F0F9FF; padding: 4px 8px; border-radius: 4px;">
                        ${user.username}
                    </code>
                </td>
                <td>
                    <code style="font-size: 11px; color: #64748B;">
                        ${user.lastLoginIP ? user.lastLoginIP : 'Chưa đăng nhập'}
                    </code>
                </td>
                <td>
                    <span class="badge ${
                        user.role === 'admin' ? 'badge-admin' : 
                        user.role === 'moderator' ? 'badge-warning' : 
                        'badge-active'
                    }">
                        ${user.role === 'admin' ? '👑 Admin' : user.role === 'moderator' ? '👮 QTV' : 'User'}
                    </span>
                </td>
                <td>
                    <span class="badge ${user.banned ? 'badge-banned' : 'badge-active'}">
                        ${user.banned ? '🔒 Đã khóa' : '✅ Hoạt động'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-warning" onclick="toggleBanUser('${user.id}', ${user.banned})">
                        ${user.banned ? '🔓 Mở' : '🔒 Khóa'}
                    </button>
                    ${isAdmin && user.role !== 'admin' && user.role !== 'moderator' ? `
                        <button class="btn btn-primary" onclick="setModerator('${user.id}')">👮 QTV</button>
                    ` : ''}
                    ${isAdmin && user.role === 'moderator' ? `
                        <button class="btn btn-secondary" onclick="removeModerator('${user.id}')">✘ QTV</button>
                    ` : ''}
                    ${isAdmin && user.role !== 'admin' ? `
                        <button class="btn btn-danger" onclick="deleteUser('${user.id}')">🗑️ Xóa</button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
        
        document.getElementById("userTable").innerHTML = html;
        
        // Update stats
        loadStats();
        
    } catch (error) {
        console.error('Lỗi tải users:', error);
        document.getElementById("userTable").innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #EF4444;">
                    <h3>❌ Lỗi tải dữ liệu</h3>
                    <p>${error.message}</p>
                </td>
            </tr>
        `;
    }
}

async function setModerator(userId) {
    if (currentUser.role !== 'admin') {
        alert("Chỉ Admin mới có quyền gán Quản trị viên!");
        return;
    }
    if (!confirm("Gán quyền Quản trị viên cho user này?\n\nQuản trị viên có thể:\n• Quản lý đề thi\n• Quản lý tài khoản\n• KHÔNG thể xóa user\n• KHÔNG thể quản lý khóa học")) return;
    
    try {
        const result = await FirebaseAPI.updateUser(userId, { role: 'moderator' });
        if (result.success) {
            alert("✅ Đã gán quyền Quản trị viên!");
            renderUsers();
        } else {
            alert("❌ Lỗi: " + result.error);
        }
    } catch (error) {
        alert("❌ Có lỗi xảy ra: " + error.message);
    }
}

async function removeModerator(userId) {
    if (currentUser.role !== 'admin') {
        alert("Chỉ Admin mới có quyền hủy Quản trị viên!");
        return;
    }
    if (!confirm("Hủy quyền Quản trị viên?")) return;
    
    try {
        const result = await FirebaseAPI.updateUser(userId, { role: 'user' });
        if (result.success) {
            alert("✅ Đã hủy quyền Quản trị viên!");
            renderUsers();
        } else {
            alert("❌ Lỗi: " + result.error);
        }
    } catch (error) {
        alert("❌ Có lỗi xảy ra: " + error.message);
    }
}

async function toggleBanUser(userId, currentlyBanned) {
    try {
        const result = await FirebaseAPI.toggleBanUser(userId, !currentlyBanned);
        if (result.success) {
            alert(!currentlyBanned ? "✅ Đã khóa tài khoản!" : "✅ Đã mở khóa tài khoản!");
            renderUsers();
        } else {
            alert("❌ Lỗi: " + result.error);
        }
    } catch (error) {
        alert("❌ Có lỗi xảy ra: " + error.message);
    }
}

async function deleteUser(userId) {
    if (currentUser.role !== 'admin') {
        alert("Chỉ Admin mới có quyền xóa user!");
        return;
    }
    if (!confirm("Xóa tài khoản này?\n\n⚠️ Hành động này không thể khôi phục!")) return;
    
    try {
        const result = await FirebaseAPI.deleteUser(userId);
        if (result.success) {
            alert("✅ Đã xóa tài khoản!");
            renderUsers();
        } else {
            alert("❌ Lỗi: " + result.error);
        }
    } catch (error) {
        alert("❌ Có lỗi xảy ra: " + error.message);
    }
}

// ===================================
// XÓA HẾT DỮ LIỆU TÀI KHOẢN (FIREBASE)
// ===================================

async function deleteAllUsersData() {
    if (currentUser.role !== 'admin') {
        alert("⛔ Chỉ Admin mới có quyền xóa hết dữ liệu!");
        return;
    }

    const confirmed = confirm(
        "⚠️ CẢNH BÁO: XÓA HẾT DỮ LIỆU TÀI KHOẢN!\n\n" +
        "Hành động này sẽ:\n" +
        "• Xóa TẤT CẢ users từ Firebase (trừ admin)\n" +
        "• Xóa TẤT CẢ IP records\n" +
        "• Giải phóng tất cả IP để đăng ký lại\n" +
        "• KHÔNG THỂ KHÔI PHỤC!\n\n" +
        "Bạn có CHẮC CHẮN muốn tiếp tục?"
    );

    if (!confirmed) return;

    // Double confirm
    const doubleConfirm = prompt(
        'Nhập "XOA HET" (viết hoa, không dấu) để xác nhận:'
    );

    if (doubleConfirm !== "XOA HET") {
        alert("❌ Đã hủy hành động!");
        return;
    }

    try {
        // Check if Firebase is available
        if (typeof FirebaseAPI === 'undefined') {
            alert("❌ Firebase chưa được khởi tạo!\n\nKhông thể xóa dữ liệu.");
            return;
        }

        // Get all users from Firebase
        const allUsers = await FirebaseAPI.getAllUsers();
        
        if (!allUsers || allUsers.length === 0) {
            alert("ℹ️ Không có user nào để xóa!");
            return;
        }

        let deletedCount = 0;
        let errorCount = 0;
        let freedIPs = 0;

        // Show progress
        const progressDiv = document.createElement('div');
        progressDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 10000;';
        progressDiv.innerHTML = '<h3>🔄 Đang xóa...</h3><p id="deleteProgress">0/' + allUsers.length + '</p>';
        document.body.appendChild(progressDiv);

        // Delete each user (except admin)
        for (const user of allUsers) {
            if (user.role === 'admin') {
                console.log('Skipped admin:', user.username);
                continue;
            }

            try {
                // Delete from Firebase (sẽ xóa cả database + IP record)
                const result = await FirebaseAPI.deleteUser(user.id);
                
                if (result.success) {
                    deletedCount++;
                    if (user.registeredIP) freedIPs++;
                }
                
                document.getElementById('deleteProgress').textContent = 
                    `${deletedCount}/${allUsers.length - 1} (Đang xóa ${user.username})`;
                
            } catch (error) {
                console.error('Error deleting user:', user.username, error);
                errorCount++;
            }
        }

        // Remove progress div
        progressDiv.remove();

        // Show result
        alert(
            `✅ Hoàn thành!\n\n` +
            `✓ Đã xóa: ${deletedCount} users từ Firebase\n` +
            `✓ Đã giải phóng: ${freedIPs} IP addresses\n` +
            `${errorCount > 0 ? `❌ Lỗi: ${errorCount} users\n` : ''}` +
            `✓ Admin account được giữ lại\n\n` +
            `📊 Các IP đã giải phóng có thể đăng ký tài khoản mới.`
        );

        // Reload immediately
        renderUsers();
        loadStats();

    } catch (error) {
        console.error('Error deleting all users:', error);
        alert("❌ Có lỗi xảy ra: " + error.message);
    }
}

// ===================================
// SYNC USERS TỪ FIREBASE
// ===================================

async function syncUsersFromFirebase() {
    if (typeof FirebaseAPI === 'undefined') {
        alert("❌ Firebase chưa được khởi tạo!");
        return;
    }

    try {
        const users = await FirebaseAPI.getAllUsers();
        
        if (!users || users.length === 0) {
            alert("ℹ️ Không có user nào trong Firebase!");
            return;
        }

        alert(`✅ Sync thành công!\n\nTổng cộng: ${users.length} users\n• Admin: 1\n• Thường: ${users.length - 1}`);
        renderUsers();
        loadStats();

    } catch (error) {
        console.error('Error syncing users:', error);
        alert("❌ Có lỗi xảy ra: " + error.message);
    }
}

// ===================================
// TAB 2: TẠO ĐỀ THI - UPLOAD & PARSE
// ===================================

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

async function handleFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    
    try {
        if (ext === 'txt') {
            const text = await file.text();
            parseTxtFile(text);
        } else if (ext === 'pdf') {
            await parsePdfFile(file);
        } else {
            alert('Chỉ hỗ trợ file TXT và PDF!');
        }
    } catch (error) {
        console.error('Lỗi xử lý file:', error);
        alert('Lỗi khi xử lý file: ' + error.message + '\n\nVui lòng thử lại hoặc sử dụng chức năng thêm câu hỏi thủ công.');
    }
}

function parseTxtFile(text) {
    const lines = text.split('\n');
    const questions = [];
    let currentQuestion = null;
    
    lines.forEach(line => {
        line = line.trim();
        
        // Phát hiện câu hỏi mới: "Câu 1 :id1"
        const match = line.match(/^Câu\s+(\d+)\s*:id(\d+)/i);
        
        if (match) {
            if (currentQuestion) questions.push(currentQuestion);
            const qNum = match[1];
            const idNum = match[2];
            currentQuestion = {
                id: `id${idNum}`,
                type: getTypeFromId(idNum),
                content: '',
                options: [],
                correctAnswer: '',
                explanation: '',
                image: null  // Thêm field image
            };
        } else if (currentQuestion && line) {
            // Phát hiện đường dẫn ảnh: "Ảnh: path/to/image.jpg" hoặc "[IMG]path[/IMG]"
            if (line.match(/^(Ảnh|Image|Hình|IMG):\s*(.+)/i)) {
                const imgMatch = line.match(/^(Ảnh|Image|Hình|IMG):\s*(.+)/i);
                currentQuestion.imageUrl = imgMatch[2].trim();
            }
            // Phát hiện đáp án đúng: "Đáp án: A" hoặc "ĐA: A"
            else if (line.match(/^(Đáp án|ĐA):\s*(.+)/i)) {
                const answerMatch = line.match(/^(Đáp án|ĐA):\s*(.+)/i);
                currentQuestion.correctAnswer = answerMatch[2].trim();
            }
            // Phát hiện lời giải: "Giải thích:" hoặc "Lời giải:"
            else if (line.match(/^(Giải thích|Lời giải|Explanation):\s*(.+)/i)) {
                const explMatch = line.match(/^(Giải thích|Lời giải|Explanation):\s*(.+)/i);
                currentQuestion.explanation = explMatch[2].trim();
            }
            // Thêm vào lời giải nếu đã bắt đầu phần giải thích
            else if (currentQuestion.explanation && !line.startsWith('A.') && !line.startsWith('B.')) {
                currentQuestion.explanation += ' ' + line;
            }
            // Phát hiện các đáp án A, B, C, D
            else if (line.match(/^[A-D]\./)) {
                currentQuestion.options.push(line);
            } 
            // Nội dung câu hỏi
            else if (!currentQuestion.content || !line.match(/^(Đáp án|ĐA|Giải thích|Lời giải|Ảnh|Image)/i)) {
                currentQuestion.content += line + ' ';
            }
        }
    });
    
    if (currentQuestion) questions.push(currentQuestion);
    
    currentQuestions = questions;
    renderParsedQuestions();
    
    if (questions.length > 0) {
        alert(`✅ Đã nhận diện thành công ${questions.length} câu hỏi!\n\n${questions.filter(q => q.imageUrl).length > 0 ? '📸 Có ' + questions.filter(q => q.imageUrl).length + ' câu có ảnh.\n' : ''}Bạn có thể xem lại và chỉnh sửa trước khi lưu.`);
    } else {
        alert('⚠️ Không tìm thấy câu hỏi nào!\n\nĐảm bảo file có định dạng:\nCâu 1 :id1\nNội dung câu hỏi...\nẢnh: path/to/image.jpg (nếu có)\nA. Đáp án A\nB. Đáp án B\nC. Đáp án C\nD. Đáp án D\nĐáp án: A\nGiải thích: Lời giải...');
    }
}

async function parsePdfFile(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }
        
        parseTxtFile(fullText);
    } catch (error) {
        console.error('Lỗi đọc PDF:', error);
        alert('❌ Lỗi đọc file PDF: ' + error.message + '\n\n💡 Gợi ý:\n- Thử chuyển PDF sang TXT\n- Hoặc thêm câu hỏi thủ công');
    }
}

function getTypeFromId(idNum) {
    const types = {
        '1': 'mcq',
        '2': 'multiselect',
        '3': 'fill',
        '4': 'fillmulti',
        '5': 'essay',
        '6': 'dragdrop',
        '7': 'matrix',
        '8': 'truefalse'
    };
    return types[idNum] || 'mcq';
}

// ===================================
// RENDER DANH SÁCH CÂU HỎI ĐÃ PARSE
// ===================================

function renderParsedQuestions() {
    if (currentQuestions.length === 0) {
        document.getElementById('parsedQuestions').innerHTML = '';
        return;
    }
    
    const html = `
        <h3 style="margin: 30px 0 15px;">✅ Đã nhận diện ${currentQuestions.length} câu hỏi</h3>
        ${currentQuestions.map((q, i) => `
            <div class="question-preview">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <strong style="color: #1677FF;">Câu ${i+1} [${q.id}]</strong> - ${getTypeName(q.type)}
                        <p style="margin: 10px 0; line-height: 1.7;">${q.content}</p>
                        ${q.imageUrl ? `<div style="margin: 12px 0;"><img src="${q.imageUrl}" style="max-width: 400px; border-radius: 8px; border: 2px solid #E2E8F0;" onerror="this.style.display='none'; this.parentElement.innerHTML='<p style=color:#EF4444>❌ Không tải được ảnh: ${q.imageUrl}</p>'"></div>` : ''}
                        ${q.pastedImages && q.pastedImages.length > 0 ? `<div style="margin: 12px 0; display: flex; gap: 8px; flex-wrap: wrap;">${q.pastedImages.map((img, imgIdx) => `<div style="position: relative;"><img src="${img.data}" onclick="openImageZoomModal('${img.data.replace(/'/g, "\\'")}')" style="max-width: 300px; border-radius: 8px; border: 2px solid #E2E8F0; cursor: zoom-in; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 6px; font-size: 11px; pointer-events: none;">🔍 Click</div></div>`).join('')}</div>` : ''}
                        ${q.options.length > 0 ? `<ul>${q.options.map(o => `<li>${o}</li>`).join('')}</ul>` : ''}
                        ${q.correctAnswer ? `<p style="color: #10B981; font-weight: 700;">✓ Đáp án: ${q.correctAnswer}</p>` : ''}
                        ${q.explanation ? `<div style="background: #F0F9FF; padding: 12px; border-radius: 8px; margin-top: 12px; border-left: 4px solid #1677FF;"><strong style="color: #1677FF;">💡 Lời giải:</strong> ${q.explanation}</div>` : ''}
                    </div>
                    <div>
                        <button class="btn btn-primary" onclick="editQuestion(${i})">✏️ Sửa</button>
                        <button class="btn btn-danger" onclick="removeQuestion(${i})">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
    document.getElementById('parsedQuestions').innerHTML = html;
    
    // Render LaTeX trong preview
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('parsedQuestions')]).catch((err) => console.log('MathJax error:', err));
    }
}

function getTypeName(type) {
    const names = {
        'mcq': 'Trắc nghiệm',
        'multiselect': 'Chọn nhiều',
        'fill': 'Điền khuyết',
        'fillmulti': 'Điền nhiều ô',
        'essay': 'Tự luận',
        'dragdrop': 'Kéo thả',
        'matrix': 'Ma trận',
        'truefalse': 'Đúng/Sai'
    };
    return names[type] || type;
}

function removeQuestion(index) {
    if (confirm('Xóa câu hỏi này?')) {
        currentQuestions.splice(index, 1);
        renderParsedQuestions();
    }
}

// ===================================
// THÊM/SỬA CÂU HỎI THỦ CÔNG
// ===================================

function addQuestionManually() {
    editingQuestionIndex = -1;
    pastedImages = []; // Reset ảnh paste
    showQuestionEditor({
        id: 'id1',
        type: 'mcq',
        content: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        image: null
    });
}

function editQuestion(index) {
    editingQuestionIndex = index;
    const question = currentQuestions[index];
    
    // Load ảnh nếu có
    pastedImages = [];
    if (question.pastedImages && question.pastedImages.length > 0) {
        pastedImages = [...question.pastedImages];
    }
    
    showQuestionEditor(question);
}

function showQuestionEditor(question) {
    const modal = document.getElementById('questionModal');
    const form = document.getElementById('questionForm');
    
    form.innerHTML = `
        <div class="form-group">
            <label>ID câu hỏi</label>
            <select class="form-control" id="qId" onchange="updateQuestionType()">
                <option value="id1" ${question.id==='id1'?'selected':''}>id1 - Trắc nghiệm</option>
                <option value="id2" ${question.id==='id2'?'selected':''}>id2 - Chọn nhiều đáp án</option>
                <option value="id3" ${question.id==='id3'?'selected':''}>id3 - Điền khuyết</option>
                <option value="id4" ${question.id==='id4'?'selected':''}>id4 - Điền nhiều ô</option>
                <option value="id5" ${question.id==='id5'?'selected':''}>id5 - Tự luận</option>
                <option value="id6" ${question.id==='id6'?'selected':''}>id6 - Kéo thả</option>
                <option value="id7" ${question.id==='id7'?'selected':''}>id7 - Ma trận</option>
                <option value="id8" ${question.id==='id8'?'selected':''}>id8 - Đúng/Sai</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Nội dung câu hỏi</label>
            <textarea class="form-control" id="qContent" style="min-height: 120px;" oninput="updateLivePreview()" onpaste="handlePaste(event)">${question.content}</textarea>
            <div class="alert alert-info" style="margin-top: 12px;">
                <strong>💡 Hỗ trợ LaTeX tự động - chỉ cần gõ thẳng:</strong><br>
                • <strong>Ví dụ:</strong> <code>R \\setminus \\{ \\frac{\\pi}{4}+\\frac{k\\pi}{2} \\mid k \\in \\mathbb{Z} \\}</code><br>
                • <strong>Phân số:</strong> <code>\\frac{a}{b}</code> • <strong>Căn:</strong> <code>\\sqrt{x}</code> • <strong>Mũ:</strong> <code>x^2</code><br>
                • <strong>Tập hợp:</strong> <code>\\mathbb{R}, \\mathbb{Z}, \\mathbb{N}</code><br>
                • <strong>Ký hiệu:</strong> <code>\\pi, \\alpha, \\beta, \\sum, \\int</code><br>
                <strong style="color: #10B981;">✨ Hệ thống tự động thêm \\( \\) khi phát hiện LaTeX!</strong><br>
                <strong style="color: #1677FF;">📋 Paste ảnh: Ctrl+V để dán ảnh từ clipboard!</strong>
            </div>
            <div id="livePreview" style="margin-top: 16px; padding: 16px; background: #F8FAFC; border-radius: 8px; border: 2px solid #E2E8F0; min-height: 60px;">
                <strong style="color: #64748B; font-size: 13px;">📋 Preview:</strong>
                <div id="previewContent" style="margin-top: 8px; color: #1e293b; line-height: 1.8;"></div>
            </div>
        </div>
        
        <div class="form-group" id="pastedImagesContainer" style="display: none;">
            <label>Ảnh đã paste</label>
            <div id="pastedImagesList" style="display: flex; flex-wrap: wrap; gap: 12px;"></div>
        </div>
        
        <div class="form-group">
            <label>Thêm ảnh</label>
            <input type="file" class="form-control" id="qImage" accept="image/*" onchange="handleImageUpload()">
            <div id="imagePreview" style="margin-top: 15px;"></div>
        </div>
        
        <div id="dynamicFields"></div>
        
        <div class="form-group">
            <label>Lời giải chi tiết</label>
            <textarea class="form-control" id="qExplanation" style="min-height: 140px;" placeholder="Nhập lời giải chi tiết...">${question.explanation || ''}</textarea>
            <small style="color: #64748B; display: block; margin-top: 8px;">
                💡 Lời giải sẽ hiển thị sau khi học viên nộp bài. Hỗ trợ LaTeX giống phần câu hỏi.
            </small>
        </div>
        
        <button class="btn btn-primary" onclick="saveQuestion()">💾 Lưu câu hỏi</button>
    `;
    
    updateQuestionType();
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('questionModal').classList.remove('active');
}

// Live preview LaTeX
let pastedImages = [];

function handlePaste(e) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            e.preventDefault();
            
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imgData = event.target.result;
                
                // Thêm vào danh sách ảnh đã paste
                pastedImages.push({
                    data: imgData,
                    name: 'pasted-' + Date.now() + '.png'
                });
                
                // Hiển thị ảnh
                renderPastedImages();
                
                // Thông báo
                alert('✅ Đã paste ảnh thành công!\n\nẢnh sẽ được lưu cùng câu hỏi.');
            };
            
            reader.readAsDataURL(blob);
            break;
        }
    }
}

function renderPastedImages() {
    const container = document.getElementById('pastedImagesContainer');
    const list = document.getElementById('pastedImagesList');
    
    if (pastedImages.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    list.innerHTML = pastedImages.map((img, idx) => `
        <div style="position: relative; border: 2px solid #E2E8F0; border-radius: 8px; padding: 8px; background: white;">
            <img src="${img.data}" style="max-width: 200px; max-height: 150px; display: block; border-radius: 4px;">
            <button type="button" onclick="removePastedImage(${idx})" style="position: absolute; top: 4px; right: 4px; background: #EF4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-weight: 700;">×</button>
            <small style="display: block; margin-top: 4px; color: #64748B;">${img.name}</small>
        </div>
    `).join('');
}

function removePastedImage(index) {
    pastedImages.splice(index, 1);
    renderPastedImages();
}

function updateLivePreview() {
    const content = document.getElementById('qContent').value;
    const previewDiv = document.getElementById('previewContent');
    
    if (!previewDiv) return;
    
    if (!content) {
        previewDiv.innerHTML = '<span style="color: #94A3B8; font-style: italic;">Nhập nội dung để xem preview...</span>';
        return;
    }
    
    // Auto-wrap LaTeX: tự động thêm \( \) khi detect LaTeX commands
    let processedContent = autoWrapLatex(content);
    
    previewDiv.innerHTML = processedContent;
    
    // Hiển thị ảnh paste trong preview với zoom controls
    if (pastedImages.length > 0) {
        previewDiv.innerHTML += '<div style="margin-top: 12px;">' + 
            pastedImages.map((img, idx) => `
                <div style="display: inline-block; position: relative; margin-right: 12px; margin-bottom: 12px; border: 2px solid #E2E8F0; border-radius: 12px; padding: 8px; background: #F8FAFC;">
                    <div style="margin-bottom: 8px; display: flex; gap: 6px; justify-content: center;">
                        <button onclick="zoomPreviewImage(${idx}, -0.1)" type="button" style="background: #1677FF; color: white; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">🔍-</button>
                        <span id="previewZoomLevel${idx}" style="font-weight: 700; font-size: 13px; color: #1677FF; min-width: 45px; text-align: center; display: inline-flex; align-items: center; justify-content: center;">100%</span>
                        <button onclick="zoomPreviewImage(${idx}, 0.1)" type="button" style="background: #1677FF; color: white; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">🔍+</button>
                        <button onclick="resetPreviewImage(${idx})" type="button" style="background: #F59E0B; color: white; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">↺</button>
                    </div>
                    <div id="previewImgContainer${idx}" style="width: 300px; height: 250px; overflow: hidden; border-radius: 8px; background: #1e293b; position: relative; cursor: move;">
                        <img id="previewImg${idx}" src="${img.data}" style="position: absolute; max-width: none; user-select: none; -webkit-user-drag: none;" draggable="false">
                    </div>
                </div>
            `).join('') +
            '</div>';
        
        // Initialize image positions and add drag functionality
        setTimeout(() => {
            pastedImages.forEach((img, idx) => {
                initPreviewImageDrag(idx);
            });
        }, 100);
    }
    
    // Render LaTeX
    if (window.MathJax) {
        MathJax.typesetPromise([previewDiv]).catch((err) => console.log('Preview error:', err));
    }
}

// Tự động wrap LaTeX commands với \( \)
function autoWrapLatex(text) {
    // Regex để detect LaTeX commands
    // Matches: \command, \frac{}{}, \sqrt{}, etc.
    const latexPattern = /\\[a-zA-Z]+(\{[^}]*\})*(\[[^\]]*\])*/g;
    
    // Nếu đã có delimiter, không xử lý
    if (text.includes('\\(') || text.includes('$')) {
        return text;
    }
    
    // Kiểm tra có LaTeX command không
    if (!latexPattern.test(text)) {
        return text;
    }
    
    // Tự động wrap toàn bộ đoạn chứa LaTeX
    // Nếu có ít nhất 1 command LaTeX, wrap toàn bộ
    return '\\(' + text + '\\)';
}

// Ensure LaTeX wrapped cho việc lưu vào database
function ensureLatexWrapped(text) {
    if (!text || text.trim() === '') return text;
    
    // Nếu đã có delimiter, giữ nguyên
    if (text.includes('\\(') || text.includes('$')) {
        return text;
    }
    
    // Detect LaTeX commands: \command
    const hasLatex = /\\[a-zA-Z]+/.test(text);
    
    if (hasLatex) {
        // Wrap toàn bộ text với \( \)
        return '\\(' + text + '\\)';
    }
    
    return text;
}

// ===================================
// CẬP NHẬT DYNAMIC FIELDS THEO LOẠI CÂU HỎI
// ===================================

function updateQuestionType() {
    const qId = document.getElementById('qId').value;
    const type = getTypeFromId(qId.replace('id', ''));
    const container = document.getElementById('dynamicFields');
    
    let html = '';
    
    if (type === 'mcq') {
        html = `
            <div class="form-group">
                <label>Đáp án (A, B, C, D)</label>
                <input type="text" class="form-control" id="optA" placeholder="A. ...">
                <input type="text" class="form-control" id="optB" placeholder="B. ..." style="margin-top: 10px;">
                <input type="text" class="form-control" id="optC" placeholder="C. ..." style="margin-top: 10px;">
                <input type="text" class="form-control" id="optD" placeholder="D. ..." style="margin-top: 10px;">
            </div>
            <div class="form-group">
                <label>Đáp án đúng</label>
                <select class="form-control" id="correctAns">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        `;
    } else if (type === 'multiselect') {
        html = `
            <div class="form-group">
                <label>Đáp án (chọn nhiều)</label>
                <input type="text" class="form-control" id="optA" placeholder="A. ...">
                <input type="text" class="form-control" id="optB" placeholder="B. ..." style="margin-top: 10px;">
                <input type="text" class="form-control" id="optC" placeholder="C. ..." style="margin-top: 10px;">
                <input type="text" class="form-control" id="optD" placeholder="D. ..." style="margin-top: 10px;">
            </div>
            <div class="form-group">
                <label>Đáp án đúng (VD: A,C hoặc B,D)</label>
                <input type="text" class="form-control" id="correctAns" placeholder="A,C">
            </div>
        `;
    } else if (type === 'fill') {
        html = `
            <div class="form-group">
                <label>Đáp án điền vào (VD: "trọng lực")</label>
                <input type="text" class="form-control" id="correctAns">
            </div>
        `;
    } else if (type === 'fillmulti') {
        html = `
            <div class="form-group">
                <label>Các đáp án điền (phân cách bằng dấu |)</label>
                <input type="text" class="form-control" id="correctAns" placeholder="đáp án 1|đáp án 2|đáp án 3">
            </div>
        `;
    } else if (type === 'truefalse') {
        html = `
            <div class="form-group">
                <label>Đáp án đúng</label>
                <select class="form-control" id="correctAns">
                    <option value="true">Đúng</option>
                    <option value="false">Sai</option>
                </select>
            </div>
        `;
    } else if (type === 'dragdrop') {
        html = `
            <div class="form-group">
                <label>Các từ kéo (phân cách bằng |)</label>
                <input type="text" class="form-control" id="dragItems" placeholder="từ 1|từ 2|từ 3">
            </div>
            <div class="form-group">
                <label>Các vị trí thả (phân cách bằng |)</label>
                <input type="text" class="form-control" id="dropZones" placeholder="vị trí 1|vị trí 2|vị trí 3">
            </div>
            <div class="form-group">
                <label>Đáp án đúng (JSON: {"vị trí": "từ"})</label>
                <textarea class="form-control" id="correctAns" placeholder='{"vị trí 1": "từ 1", "vị trí 2": "từ 2"}'></textarea>
            </div>
        `;
    } else if (type === 'matrix') {
        html = `
            <div class="form-group">
                <label>Các phát biểu (phân cách bằng |)</label>
                <textarea class="form-control" id="statements" placeholder="Phát biểu 1|Phát biểu 2|Phát biểu 3"></textarea>
            </div>
            <div class="form-group">
                <label>Đáp án đúng (phân cách bằng | - true/false)</label>
                <input type="text" class="form-control" id="correctAns" placeholder="true|false|true">
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// ===================================
// XỬ LÝ ẢNH - KÉO THẢ, PHÓNG TO/THU NHỎ
// ===================================

let currentImage = {
    url: '',
    position: { x: 0, y: 0 },
    scale: 1
};

function handleImageUpload() {
    const file = document.getElementById('qImage').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        currentImage.url = e.target.result;
        currentImage.position = { x: 0, y: 0 };
        currentImage.scale = 1;
        renderImageEditor();
    };
    reader.readAsDataURL(file);
}

function renderImageEditor() {
    const container = document.getElementById('imagePreview');
    if (!currentImage.url) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="image-container">
            <img 
                src="${currentImage.url}" 
                class="draggable-image" 
                id="dragImage"
                style="transform: translate(${currentImage.position.x}px, ${currentImage.position.y}px) scale(${currentImage.scale});"
                draggable="false">
        </div>
        <div class="image-controls">
            <button class="btn btn-secondary" onclick="zoomImage(-0.1)" type="button">🔍-</button>
            <span style="margin: 0 10px; font-weight: 700;">${Math.round(currentImage.scale * 100)}%</span>
            <button class="btn btn-secondary" onclick="zoomImage(0.1)" type="button">🔍+</button>
            <button class="btn btn-warning" onclick="resetImage()" type="button">↺ Reset</button>
        </div>
    `;
    
    // Enable dragging
    const img = document.getElementById('dragImage');
    let isDragging = false;
    let startX, startY;
    
    img.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - currentImage.position.x;
        startY = e.clientY - currentImage.position.y;
        img.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentImage.position.x = e.clientX - startX;
        currentImage.position.y = e.clientY - startY;
        img.style.transform = `translate(${currentImage.position.x}px, ${currentImage.position.y}px) scale(${currentImage.scale})`;
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            img.style.cursor = 'move';
        }
    });
}

function zoomImage(delta) {
    currentImage.scale = Math.max(0.1, Math.min(3, currentImage.scale + delta));
    renderImageEditor();
}

function resetImage() {
    currentImage.position = { x: 0, y: 0 };
    currentImage.scale = 1;
    renderImageEditor();
}

// ===================================
// LƯU CÂU HỎI
// ===================================

function saveQuestion() {
    const qId = document.getElementById('qId').value;
    const type = getTypeFromId(qId.replace('id', ''));
    let content = document.getElementById('qContent').value;
    let explanation = document.getElementById('qExplanation').value;
    
    // Auto-wrap LaTeX nếu chưa có delimiter
    content = ensureLatexWrapped(content);
    explanation = ensureLatexWrapped(explanation);
    
    const question = {
        id: qId,
        type: type,
        content: content,
        explanation: explanation,
        image: currentImage.url ? { ...currentImage } : null,
        pastedImages: pastedImages.length > 0 ? [...pastedImages] : []  // Lưu ảnh paste
    };
    
    // Thu thập đáp án theo loại
    if (type === 'mcq' || type === 'multiselect') {
        question.options = [
            ensureLatexWrapped(document.getElementById('optA').value),
            ensureLatexWrapped(document.getElementById('optB').value),
            ensureLatexWrapped(document.getElementById('optC').value),
            ensureLatexWrapped(document.getElementById('optD').value)
        ];
        question.correctAnswer = document.getElementById('correctAns').value;
    } else if (type === 'dragdrop') {
        question.dragItems = document.getElementById('dragItems').value.split('|');
        question.dropZones = document.getElementById('dropZones').value.split('|');
        question.correctAnswer = document.getElementById('correctAns').value;
    } else if (type === 'matrix') {
        question.statements = document.getElementById('statements').value.split('|');
        question.correctAnswer = document.getElementById('correctAns').value.split('|');
    } else {
        question.correctAnswer = document.getElementById('correctAns').value;
    }
    
    if (editingQuestionIndex === -1) {
        currentQuestions.push(question);
    } else {
        currentQuestions[editingQuestionIndex] = question;
    }
    
    closeModal();
    renderParsedQuestions();
}

// ===================================
// LƯU ĐỀ THI
// ===================================

function updateCategoryOptions() {
    const type = document.getElementById('examType').value;
    const categorySelect = document.getElementById('examCategory');
    
    if (type === 'tsa') {
        categorySelect.innerHTML = `
            <option value="basic">Các dạng cơ bản</option>
            <option value="advanced">Luyện tư duy toán học</option>
            <option value="full">Full đề TSA</option>
        `;
    } else if (type === 'hsa') {
        categorySelect.innerHTML = `
            <option value="basic">Các dạng cơ bản</option>
            <option value="advanced">Định lượng</option>
            <option value="full">Full đề HSA</option>
        `;
    }
}

function saveExam() {
    const name = document.getElementById('examName').value;
    const code = document.getElementById('examCode').value;
    const time = parseInt(document.getElementById('examTime').value);
    const type = document.getElementById('examType').value;
    const category = document.getElementById('examCategory').value;
    
    if (!name || !code || currentQuestions.length === 0) {
        alert('❌ Vui lòng nhập đầy đủ thông tin!\n\n✅ Cần có:\n- Tên đề thi\n- Mã đề\n- Ít nhất 1 câu hỏi');
        return;
    }
    
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    
    // Kiểm tra đang edit hay tạo mới
    const isEditing = typeof window.editingExamIndex === 'number';
    
    if (!isEditing) {
        // Kiểm tra mã đề đã tồn tại chưa (chỉ khi tạo mới)
        if (exams.some(e => e.code === code)) {
            alert('⚠️ Mã đề "' + code + '" đã tồn tại!\n\nVui lòng đổi mã đề khác.');
            return;
        }
    }
    
    const exam = {
        id: isEditing ? exams[window.editingExamIndex].id : 'exam-' + Date.now(),
        name: name,
        code: code,
        type: type,
        category: category,
        timeMinutes: time,
        totalQuestions: currentQuestions.length,
        questions: currentQuestions,
        createdAt: isEditing ? exams[window.editingExamIndex].createdAt : new Date().toISOString(),
        updatedAt: isEditing ? new Date().toISOString() : undefined
    };
    
    if (isEditing) {
        exams[window.editingExamIndex] = exam;
        delete window.editingExamIndex;
    } else {
        exams.push(exam);
    }
    
    localStorage.setItem('exams', JSON.stringify(exams));
    
    // Cập nhật exam-list.js (lưu vào localStorage để admin có thể export)
    updateExamList();
    
    const categoryName = category === 'basic' ? 'Cơ bản' : category === 'advanced' ? (type === 'tsa' ? 'Tư duy toán học' : 'Định lượng') : 'Full đề';
    
    alert((isEditing ? '✅ Đã cập nhật đề thi thành công!' : '✅ Đã lưu đề thi thành công!') + '\n\n📝 Đề: ' + name + '\n🔖 Mã: ' + code + '\n📊 Số câu: ' + currentQuestions.length + '\n🏷️ Mục: ' + categoryName + '\n\n💡 Học viên có thể làm bài ngay trong Phòng luyện ' + type.toUpperCase());
    
    // Reset form
    document.getElementById('examName').value = '';
    document.getElementById('examCode').value = '';
    currentQuestions = [];
    currentImage = { url: '', position: { x: 0, y: 0 }, scale: 1 };
    pastedImages = [];
    renderParsedQuestions();
    
    // Reset button
    const saveBtn = document.querySelector('button[onclick="saveExam()"]');
    if (saveBtn) {
        saveBtn.innerHTML = '💾 Lưu đề thi';
        saveBtn.style.background = '';
    }
    
    switchTab(3); // Chuyển sang tab danh sách đề
}

function updateExamList() {
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    const examListData = exams.map(exam => ({
        id: exam.id,
        name: exam.name,
        code: exam.code,
        timeMinutes: exam.timeMinutes,
        type: exam.type || 'tsa',
        category: exam.category || 'full',
        fileUrl: 'localStorage' // Đánh dấu đây là đề từ localStorage
    }));
    localStorage.setItem('examListData', JSON.stringify(examListData));
}

// ===================================
// TAB 3: DANH SÁCH ĐỀ THI
// ===================================

function renderExamList() {
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    const container = document.getElementById('examList');
    
    if (exams.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">Chưa có đề thi nào</div>';
        return;
    }
    
    const getCategoryName = (type, category) => {
        if (category === 'basic') return 'Cơ bản';
        if (category === 'advanced') return type === 'tsa' ? 'Tư duy toán học' : 'Định lượng';
        if (category === 'full') return 'Full đề';
        return 'Full đề'; // default
    };
    
    const html = exams.map((exam, index) => `
        <div class="course-card">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <h3 style="color: #1677FF; margin-bottom: 10px;">${exam.name}</h3>
                    <p style="color: #64748B; margin-bottom: 15px;">
                        📝 Mã đề: <strong>${exam.code}</strong> | 
                        ⏱️ ${exam.timeMinutes} phút | 
                        📊 ${exam.totalQuestions} câu hỏi |
                        🏷️ ${exam.type.toUpperCase()} - ${getCategoryName(exam.type, exam.category || 'full')}
                    </p>
                    <small style="color: #94A3B8;">
                        Tạo lúc: ${new Date(exam.createdAt).toLocaleString('vi-VN')}
                    </small>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="viewExam(${index})">👁️ Xem</button>
                    <button class="btn btn-warning" onclick="editExam(${index})">✏️ Sửa</button>
                    <button class="btn btn-danger" onclick="deleteExam(${index})">🗑️ Xóa</button>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function editExam(index) {
    const exams = JSON.parse(localStorage.getItem('exams'));
    const exam = exams[index];
    
    if (!confirm(`Sửa đề thi: ${exam.name}?\n\nBạn sẽ có thể chỉnh sửa thông tin và câu hỏi.`)) return;
    
    // Load dữ liệu vào form
    document.getElementById('examName').value = exam.name;
    document.getElementById('examCode').value = exam.code;
    document.getElementById('examTime').value = exam.timeMinutes;
    document.getElementById('examType').value = exam.type;
    document.getElementById('examCategory').value = exam.category || 'full';
    
    // Load câu hỏi
    currentQuestions = exam.questions || [];
    renderParsedQuestions();
    
    // Lưu index để update thay vì tạo mới
    window.editingExamIndex = index;
    
    // Chuyển về tab tạo đề
    switchTab(2);
    
    // Thay đổi text button
    const saveBtn = document.querySelector('button[onclick="saveExam()"]');
    if (saveBtn) {
        saveBtn.innerHTML = '💾 Cập nhật đề thi';
        saveBtn.style.background = '#F59E0B';
    }
    
    alert('✅ Đã load đề thi!\n\nBạn có thể chỉnh sửa thông tin và câu hỏi, sau đó nhấn "Cập nhật đề thi".');
}

function viewExam(index) {
    const exams = JSON.parse(localStorage.getItem('exams'));
    const exam = exams[index];
    
    alert(`📝 ${exam.name}\n\nSố câu: ${exam.questions.length}\nThời gian: ${exam.time} phút\n\nChi tiết:\n${exam.questions.map((q, i) => `Câu ${i+1} [${q.id}]: ${q.content.slice(0, 50)}...`).join('\n')}`);
}

function deleteExam(index) {
    if (!confirm('Xóa đề thi này?')) return;
    
    const exams = JSON.parse(localStorage.getItem('exams'));
    exams.splice(index, 1);
    localStorage.setItem('exams', JSON.stringify(exams));
    
    renderExamList();
    loadStats();
}

// ===================================
// TAB 4: QUẢN LÝ KHÓA HỌC
// ===================================

function renderCourseList() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const container = document.getElementById('courseList');
    
    if (courses.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">Chưa có khóa học nào</div>';
        return;
    }
    
    const html = courses.map((course, index) => `
        <div class="course-card">
            <h3 style="color: #1677FF; margin-bottom: 10px;">${course.title}</h3>
            <p style="color: #64748B; margin-bottom: 10px;">${course.description}</p>
            <p style="color: #F59E0B; font-weight: 700;">
                🔑 Role: ${course.required_role || 'Tất cả'}
            </p>
            <button class="btn btn-danger" onclick="deleteCourse(${index})">Xóa</button>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function openCourseModal() {
    if (currentUser.role !== 'admin') {
        alert('⚠️ Chỉ Admin mới có quyền tạo khóa học!');
        return;
    }
    document.getElementById('courseModal').classList.add('active');
    // Reset form
    document.getElementById('courseName').value = '';
    document.getElementById('courseDesc').value = '';
    document.getElementById('courseRole').value = '';
}

function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('active');
}

function saveCourse() {
    const title = document.getElementById('courseName').value;
    const description = document.getElementById('courseDesc').value;
    const required_role = document.getElementById('courseRole').value;
    
    if (!title) {
        alert('Vui lòng nhập tên khóa học!');
        return;
    }
    
    const course = {
        id: Date.now().toString(),
        title: title,
        description: description,
        required_role: required_role || null,
        videos: []
    };
    
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    closeCourseModal();
    renderCourseList();
    loadStats();
    
    alert('✅ Đã tạo khóa học!');
}

function deleteCourse(index) {
    if (!confirm('Xóa khóa học này?')) return;
    const courses = JSON.parse(localStorage.getItem('courses'));
    courses.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(courses));
    renderCourseList();
    loadStats();
}

// ===================================
// TAB 5: PHÂN QUYỀN HỌC VIÊN
// ===================================

function renderEnrollmentManager() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const container = document.getElementById('enrollmentManager');
    
    if (courses.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">Chưa có khóa học nào. Vui lòng tạo khóa học trước!</div>';
        return;
    }
    
    const html = users.filter(u => u.role !== 'admin').map((user, userIndex) => `
        <div class="course-card">
            <h3 style="color: #051A39; margin-bottom: 15px;">
                👤 ${user.fullname} <span style="color: #64748B; font-size: 14px;">(${user.username})</span>
            </h3>
            <div style="margin-top: 15px;">
                ${courses.map((course, courseIndex) => {
                    const enrolled = user.enrollments && user.enrollments.includes(course.id);
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #F8FAFC; border-radius: 8px; margin-bottom: 10px;">
                            <span>${course.title}</span>
                            <button 
                                class="btn ${enrolled ? 'btn-danger' : 'btn-success'}" 
                                onclick="toggleEnrollment(${userIndex}, '${course.id}')">
                                ${enrolled ? '❌ Hủy quyền' : '✅ Cấp quyền'}
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html || '<div class="alert alert-warning">Không có học viên nào</div>';
}

function toggleEnrollment(userIndex, courseId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users[userIndex];
    
    if (!user.enrollments) {
        user.enrollments = [];
    }
    
    const index = user.enrollments.indexOf(courseId);
    
    if (index > -1) {
        user.enrollments.splice(index, 1);
        alert('✅ Đã hủy quyền truy cập!');
    } else {
        user.enrollments.push(courseId);
        alert('✅ Đã cấp quyền truy cập!');
    }
    
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Cập nhật currentUser nếu đang đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.username === user.username) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    renderEnrollmentManager();
}

// ===================================
// KHỞI TẠO KHI LOAD TRANG
// ===================================

loadStats();

// ===================================
// PREVIEW IMAGE ZOOM & PAN
// ===================================

const previewImageStates = {};

function initPreviewImageDrag(idx) {
    const img = document.getElementById(`previewImg${idx}`);
    const container = document.getElementById(`previewImgContainer${idx}`);
    
    if (!img || !container) return;
    
    // Initialize state
    if (!previewImageStates[idx]) {
        previewImageStates[idx] = {
            scale: 1,
            x: 0,
            y: 0,
            isDragging: false
        };
        
        // Center image initially
        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        previewImageStates[idx].x = (containerRect.width - imgRect.width) / 2;
        previewImageStates[idx].y = (containerRect.height - imgRect.height) / 2;
        updatePreviewImageTransform(idx);
    }
    
    // Add drag listeners
    let startX, startY;
    
    img.addEventListener('mousedown', (e) => {
        previewImageStates[idx].isDragging = true;
        startX = e.clientX - previewImageStates[idx].x;
        startY = e.clientY - previewImageStates[idx].y;
        img.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (previewImageStates[idx].isDragging) {
            previewImageStates[idx].x = e.clientX - startX;
            previewImageStates[idx].y = e.clientY - startY;
            updatePreviewImageTransform(idx);
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (previewImageStates[idx].isDragging) {
            previewImageStates[idx].isDragging = false;
            img.style.cursor = 'move';
        }
    });
    
    // Add wheel zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        zoomPreviewImage(idx, delta);
    });
}

function zoomPreviewImage(idx, delta) {
    if (!previewImageStates[idx]) return;
    
    previewImageStates[idx].scale = Math.max(0.5, Math.min(3, previewImageStates[idx].scale + delta));
    updatePreviewImageTransform(idx);
    
    const levelDisplay = document.getElementById(`previewZoomLevel${idx}`);
    if (levelDisplay) {
        levelDisplay.textContent = Math.round(previewImageStates[idx].scale * 100) + '%';
    }
}

function resetPreviewImage(idx) {
    if (!previewImageStates[idx]) return;
    
    const img = document.getElementById(`previewImg${idx}`);
    const container = document.getElementById(`previewImgContainer${idx}`);
    
    if (!img || !container) return;
    
    previewImageStates[idx].scale = 1;
    
    // Recenter
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    previewImageStates[idx].x = (containerRect.width - (imgRect.width / previewImageStates[idx].scale)) / 2;
    previewImageStates[idx].y = (containerRect.height - (imgRect.height / previewImageStates[idx].scale)) / 2;
    
    updatePreviewImageTransform(idx);
    
    const levelDisplay = document.getElementById(`previewZoomLevel${idx}`);
    if (levelDisplay) {
        levelDisplay.textContent = '100%';
    }
}

function updatePreviewImageTransform(idx) {
    const img = document.getElementById(`previewImg${idx}`);
    if (!img || !previewImageStates[idx]) return;
    
    img.style.transform = `translate(${previewImageStates[idx].x}px, ${previewImageStates[idx].y}px) scale(${previewImageStates[idx].scale})`;
}

// ===================================
// IMAGE ZOOM MODAL FOR PREVIEW
// ===================================

let zoomModal = null;
let zoomLevel = 1;
let zoomIsDragging = false;
let zoomStartX, zoomStartY, zoomTranslateX = 0, zoomTranslateY = 0;
let zoomCurrentImage = null;

function openImageZoomModal(imageSrc) {
    // Create modal if not exists
    if (!zoomModal) {
        zoomModal = document.createElement('div');
        zoomModal.className = 'zoom-modal';
        zoomModal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 99999;
            align-items: center;
            justify-content: center;
        `;
        
        zoomModal.innerHTML = `
            <div style="position: relative; width: 90%; height: 90%; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: rgba(15, 23, 42, 0.9); border-radius: 12px 12px 0 0;">
                    <div style="color: white; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                        <span>🖼️</span>
                        <span>Xem ảnh chi tiết - Chỉnh kích thước & vị trí</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="adjustZoomLevel(-0.2)" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px;">
                            🔍 Zoom Out
                        </button>
                        <button onclick="adjustZoomLevel(0.2)" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px;">
                            🔍 Zoom In
                        </button>
                        <button onclick="resetZoomView()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px;">
                            ↺ Reset
                        </button>
                        <button onclick="closeZoomModal()" style="background: #EF4444; border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 14px;">
                            ✕ Đóng
                        </button>
                    </div>
                </div>
                <div id="zoomContainer" style="flex: 1; background: #1e293b; border-radius: 0 0 12px 12px; overflow: hidden; position: relative; cursor: move;">
                    <img id="zoomImageElement" style="position: absolute; transition: transform 0.1s ease-out; max-width: none; user-select: none; -webkit-user-drag: none;">
                    <div id="zoomLevelDisplay" style="position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 14px;">100%</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(zoomModal);
        
        // Add drag functionality
        const container = document.getElementById('zoomContainer');
        container.addEventListener('mousedown', startZoomDrag);
        document.addEventListener('mousemove', doZoomDrag);
        document.addEventListener('mouseup', stopZoomDrag);
        
        // Add wheel zoom
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            adjustZoomLevel(delta);
        });
    }
    
    // Set image and show modal
    zoomCurrentImage = document.getElementById('zoomImageElement');
    zoomCurrentImage.src = imageSrc;
    resetZoomView();
    zoomModal.style.display = 'flex';
    
    // Center image initially
    setTimeout(() => centerZoomImage(), 50);
}

function closeZoomModal() {
    if (zoomModal) {
        zoomModal.style.display = 'none';
    }
}

function adjustZoomLevel(delta) {
    zoomLevel = Math.max(0.5, Math.min(5, zoomLevel + delta));
    updateZoomTransform();
    document.getElementById('zoomLevelDisplay').textContent = Math.round(zoomLevel * 100) + '%';
}

function resetZoomView() {
    zoomLevel = 1;
    zoomTranslateX = 0;
    zoomTranslateY = 0;
    updateZoomTransform();
    document.getElementById('zoomLevelDisplay').textContent = '100%';
    centerZoomImage();
}

function centerZoomImage() {
    if (!zoomCurrentImage) return;
    const container = document.getElementById('zoomContainer');
    const containerRect = container.getBoundingClientRect();
    const imgRect = zoomCurrentImage.getBoundingClientRect();
    
    zoomTranslateX = (containerRect.width - imgRect.width) / 2;
    zoomTranslateY = (containerRect.height - imgRect.height) / 2;
    updateZoomTransform();
}

function updateZoomTransform() {
    if (zoomCurrentImage) {
        zoomCurrentImage.style.transform = `translate(${zoomTranslateX}px, ${zoomTranslateY}px) scale(${zoomLevel})`;
    }
}

function startZoomDrag(e) {
    if (e.target === zoomCurrentImage || e.target.id === 'zoomContainer') {
        zoomIsDragging = true;
        zoomStartX = e.clientX - zoomTranslateX;
        zoomStartY = e.clientY - zoomTranslateY;
        document.body.style.cursor = 'grabbing';
    }
}

function doZoomDrag(e) {
    if (zoomIsDragging) {
        zoomTranslateX = e.clientX - zoomStartX;
        zoomTranslateY = e.clientY - zoomStartY;
        updateZoomTransform();
    }
}

function stopZoomDrag() {
    zoomIsDragging = false;
    document.body.style.cursor = 'default';
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomModal && zoomModal.style.display === 'flex') {
        closeZoomModal();
    }
});
