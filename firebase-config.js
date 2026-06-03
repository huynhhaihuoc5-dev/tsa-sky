/**
 * FIREBASE CONFIGURATION - SKY EDU
 * 
 * ⚠️ QUAN TRỌNG: PASTE CONFIG TỪ FIREBASE CONSOLE VÀO ĐÂY!
 * 
 * Lấy config từ: Firebase Console > Project Settings > Your apps
 */

// ✅ FIREBASE CONFIG - SKY EDU
const firebaseConfig = {
    apiKey: "AIzaSyB98WF6rrr59QHT0UYCkQPUCG0b4zPckWs",
    authDomain: "sky-edu-8be67.firebaseapp.com",
    databaseURL: "https://sky-edu-8be67-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sky-edu-8be67",
    storageBucket: "sky-edu-8be67.firebasestorage.app",
    messagingSenderId: "435746488193",
    appId: "1:435746488193:web:38d64cae0235883c51b280",
    measurementId: "G-K5WD34TTC0"
};

// Initialize Firebase
let app, auth, database;

// Kiểm tra Firebase SDK đã load chưa
if (typeof firebase === 'undefined') {
    console.error('❌ Firebase SDK chưa được load! Vui lòng kiểm tra các script tags.');
    
    // Tạo dummy FirebaseAPI để tránh lỗi
    window.FirebaseAPI = {
        createUser: async () => ({ success: false, error: 'Firebase chưa được cài đặt' }),
        loginUser: async () => ({ success: false, error: 'Firebase chưa được cài đặt' }),
        getAllUsers: async () => [],
        deleteUser: async () => ({ success: false }),
        toggleBanUser: async () => ({ success: false }),
        getUserByUsername: async () => null,
        updateUser: async () => ({ success: false }),
        confirmIPUpdate: async () => ({ success: false }),
        getUserIP: async () => 'unknown',
        checkIPExists: async () => false,
        createDefaultAdmin: async () => ({ success: false })
    };
} else {
    try {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        database = firebase.database();
        console.log('✅ Firebase initialized successfully');
        console.log('📦 Project:', firebaseConfig.projectId);
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        console.error('Config:', firebaseConfig);
    }
}

/**
 * FIREBASE API WRAPPER
 */
const FirebaseAPI = {
    
    // ==================== USERS ====================
    
    /**
     * Tạo user mới với Authentication + Database
     * Giới hạn: 1 IP = 1 tài khoản
     */
    createUser: async function(email, password, fullname, username) {
        try {
            // Lấy IP
            const userIP = await this.getUserIP();
            
            // Kiểm tra IP đã được sử dụng chưa
            const ipExists = await this.checkIPExists(userIP);
            if (ipExists) {
                return { 
                    success: false, 
                    error: 'IP này đã được sử dụng để đăng ký tài khoản!\n\nMỗi IP chỉ được đăng ký 1 tài khoản.' 
                };
            }
            
            // Tạo tài khoản Firebase Auth
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;
            
            // Lưu thông tin vào Realtime Database
            await database.ref('users/' + uid).set({
                fullname,
                username,
                email,
                role: 'user',
                banned: false,
                registeredIP: userIP,  // IP đăng ký
                allowedIP: userIP,      // IP được phép đăng nhập
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                enrollments: []
            });
            
            // Lưu IP record
            await database.ref('ipRecords/' + userIP.replace(/\./g, '_')).set({
                uid,
                username,
                registeredAt: firebase.database.ServerValue.TIMESTAMP
            });
            
            return { success: true, uid };
        } catch (error) {
            console.error('Lỗi tạo user:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Đăng nhập
     * Giới hạn: 1 tài khoản chỉ đăng nhập từ 1 IP
     * Nếu đổi IP cần xác nhận
     */
    loginUser: async function(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;
            
            // Lấy thông tin user từ database
            const snapshot = await database.ref('users/' + uid).once('value');
            const userData = snapshot.val();
            
            if (!userData) {
                await auth.signOut();
                return { success: false, error: 'Không tìm thấy thông tin tài khoản!' };
            }
            
            if (userData.banned) {
                await auth.signOut();
                return { success: false, error: 'Tài khoản đã bị khóa!' };
            }
            
            // Lấy IP hiện tại
            const currentIP = await this.getUserIP();
            
            // Kiểm tra IP có khớp với allowedIP không
            if (userData.allowedIP && userData.allowedIP !== currentIP) {
                await auth.signOut();
                return {
                    success: false,
                    needIPConfirm: true,
                    userData: { uid, ...userData },
                    oldIP: userData.allowedIP,
                    newIP: currentIP
                };
            }
            
            // Tạo session token mới
            const sessionToken = 'token_' + uid + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            // Cập nhật session token và IP đăng nhập cuối
            await database.ref('users/' + uid).update({
                sessionToken: sessionToken,
                lastLoginIP: currentIP,
                lastLogin: firebase.database.ServerValue.TIMESTAMP
            });
            
            return { 
                success: true, 
                sessionToken: sessionToken,
                userData: { uid, ...userData, sessionToken: sessionToken } 
            };
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Xác nhận đổi IP
     * Cho phép user đăng nhập từ IP mới
     */
    confirmIPUpdate: async function(uid, newIP) {
        try {
            await database.ref('users/' + uid).update({
                allowedIP: newIP,
                lastIPChange: firebase.database.ServerValue.TIMESTAMP
            });
            return { success: true };
        } catch (error) {
            console.error('Lỗi cập nhật IP:', error);
            return { success: false, error: error.message };
        }
    },
        try {
            const snapshot = await database.ref('users/' + uid).once('value');
            const userData = snapshot.val();
            
            if (!userData) return false;
            if (userData.banned) return false;
            if (userData.sessionToken !== token) return false; // Token không khớp = session khác
            
            return true;
        } catch (error) {
            console.error('Lỗi kiểm tra session:', error);
            return false;
        }
    },
    
    /**
     * Đăng xuất - xóa session token
     */
    logoutUser: async function(uid) {
        try {
            await database.ref('users/' + uid).update({
                sessionToken: null
            });
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Lấy IP người dùng
     */
    getUserIP: async function() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.warn('Không lấy được IP thật, dùng fingerprint');
            return `local_${navigator.userAgent.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '')}`;
        }
    },
    
    /**
     * Kiểm tra IP đã được sử dụng để đăng ký chưa
     */
    checkIPExists: async function(ip) {
        try {
            const snapshot = await database.ref('ipRecords/' + ip.replace(/\./g, '_')).once('value');
            return snapshot.exists();
        } catch (error) {
            console.error('Lỗi kiểm tra IP:', error);
            return false;
        }
    },
    
    /**
     * Lấy tất cả users (Admin only)
     */
    getAllUsers: async function() {
        try {
            const snapshot = await database.ref('users').once('value');
            const data = snapshot.val();
            return data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];
        } catch (error) {
            console.error('Lỗi lấy users:', error);
            return [];
        }
    },
    
    /**
     * Lấy user theo username
     */
    getUserByUsername: async function(username) {
        try {
            const snapshot = await database.ref('users')
                .orderByChild('username')
                .equalTo(username)
                .once('value');
            const data = snapshot.val();
            if (data) {
                const entries = Object.entries(data);
                return { id: entries[0][0], ...entries[0][1] };
            }
            return null;
        } catch (error) {
            console.error('Lỗi lấy user:', error);
            return null;
        }
    },
    
    /**
     * Cập nhật user
     */
    updateUser: async function(userId, updates) {
        try {
            await database.ref('users/' + userId).update(updates);
            return { success: true };
        } catch (error) {
            console.error('Lỗi cập nhật user:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Ban/Unban user
     */
    toggleBanUser: async function(userId, banned) {
        try {
            await database.ref('users/' + userId).update({ banned });
            return { success: true };
        } catch (error) {
            console.error('Lỗi ban user:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Xóa user hoàn toàn
     * Xóa cả Authentication, Database và IP record
     */
    deleteUser: async function(userId) {
        try {
            // Lấy thông tin user trước khi xóa
            const snapshot = await database.ref('users/' + userId).once('value');
            const userData = snapshot.val();
            
            if (!userData) {
                return { success: false, error: 'User không tồn tại!' };
            }
            
            // 1. Xóa IP record
            if (userData.registeredIP) {
                await database.ref('ipRecords/' + userData.registeredIP.replace(/\./g, '_')).remove();
                console.log('✅ Đã xóa IP record:', userData.registeredIP);
            }
            
            // 2. Xóa dữ liệu trong Realtime Database
            await database.ref('users/' + userId).remove();
            console.log('✅ Đã xóa user database:', userData.username);
            
            // 3. Xóa Firebase Authentication
            // QUAN TRỌNG: Cần admin SDK để xóa user khác
            // Vì Firebase Client SDK không cho phép xóa user khác
            // Workaround: Xóa thủ công hoặc dùng Cloud Function
            
            // Note: User vẫn còn trong Firebase Auth nhưng không đăng nhập được
            // vì database đã bị xóa
            
            return { 
                success: true,
                warning: 'User đã được xóa khỏi database. IP đã được giải phóng.'
            };
        } catch (error) {
            console.error('Lỗi xóa user:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== EXAMS ====================
    
    /**
     * Lưu đề thi
     */
    saveExam: async function(examId, examData) {
        try {
            await database.ref('exams/' + examId).set({
                ...examData,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
            return { success: true };
        } catch (error) {
            console.error('Lỗi lưu đề thi:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Lấy tất cả đề thi
     */
    getAllExams: async function() {
        try {
            const snapshot = await database.ref('exams').once('value');
            const data = snapshot.val();
            return data ? Object.entries(data).map(([id, exam]) => ({ id, ...exam })) : [];
        } catch (error) {
            console.error('Lỗi lấy đề thi:', error);
            return [];
        }
    },
    
    /**
     * Xóa đề thi
     */
    deleteExam: async function(examId) {
        try {
            await database.ref('exams/' + examId).remove();
            return { success: true };
        } catch (error) {
            console.error('Lỗi xóa đề thi:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== COURSES ====================
    
    /**
     * Lưu khóa học
     */
    saveCourse: async function(courseId, courseData) {
        try {
            await database.ref('courses/' + courseId).set({
                ...courseData,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
            return { success: true };
        } catch (error) {
            console.error('Lỗi lưu khóa học:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Lấy tất cả khóa học
     */
    getAllCourses: async function() {
        try {
            const snapshot = await database.ref('courses').once('value');
            const data = snapshot.val();
            return data ? Object.entries(data).map(([id, course]) => ({ id, ...course })) : [];
        } catch (error) {
            console.error('Lỗi lấy khóa học:', error);
            return [];
        }
    },
    
    // ==================== ENROLLMENTS ====================
    
    /**
     * Gán khóa học cho user
     */
    enrollUser: async function(userId, courseId) {
        try {
            const enrollmentId = `${userId}_${courseId}`;
            await database.ref('enrollments/' + enrollmentId).set({
                userId,
                courseId,
                enrolledAt: firebase.database.ServerValue.TIMESTAMP
            });
            return { success: true };
        } catch (error) {
            console.error('Lỗi gán khóa học:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Hủy gán khóa học
     */
    unenrollUser: async function(userId, courseId) {
        try {
            const enrollmentId = `${userId}_${courseId}`;
            await database.ref('enrollments/' + enrollmentId).remove();
            return { success: true };
        } catch (error) {
            console.error('Lỗi hủy gán khóa học:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Lấy khóa học của user
     */
    getUserCourses: async function(userId) {
        try {
            const snapshot = await database.ref('enrollments')
                .orderByChild('userId')
                .equalTo(userId)
                .once('value');
            const data = snapshot.val();
            return data ? Object.values(data).map(e => e.courseId) : [];
        } catch (error) {
            console.error('Lỗi lấy khóa học của user:', error);
            return [];
        }
    },
    
    // ==================== ADMIN OPERATIONS ====================
    
    /**
     * Tạo admin mặc định
     * Username: admin
     * Password: Bh25052k8@
     * Email: admin@skyedu.id.vn
     */
    createDefaultAdmin: async function() {
        try {
            // Kiểm tra admin đã tồn tại chưa
            const adminUser = await this.getUserByUsername('admin');
            if (adminUser) {
                console.log('✅ Admin đã tồn tại');
                return { success: true, exists: true };
            }
            
            // Tạo admin với credentials cố định
            const adminEmail = 'admin@skyedu.id.vn';
            const adminPassword = 'Bh25052k8@';
            const adminUsername = 'admin';
            const adminFullname = 'Administrator';
            
            try {
                // Tạo user Firebase Auth
                const userCredential = await auth.createUserWithEmailAndPassword(adminEmail, adminPassword);
                const uid = userCredential.user.uid;
                
                // Lấy IP
                const userIP = await this.getUserIP();
                
                // Lưu thông tin admin vào Realtime Database
                await database.ref('users/' + uid).set({
                    fullname: adminFullname,
                    username: adminUsername,
                    email: adminEmail,
                    role: 'admin',
                    banned: false,
                    ip: userIP,
                    lastIPChange: firebase.database.ServerValue.TIMESTAMP,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                    enrollments: []
                });
                
                // Lưu IP record
                await database.ref('ipRecords/' + userIP.replace(/\./g, '_')).set({
                    uid,
                    username: adminUsername,
                    registeredAt: firebase.database.ServerValue.TIMESTAMP
                });
                
                console.log('✅ Đã tạo admin mặc định');
                console.log('   Username: admin');
                console.log('   Password: Bh25052k8@');
                console.log('   Email: admin@skyedu.id.vn');
                
                return { success: true };
            } catch (authError) {
                // Nếu email đã tồn tại trong Firebase Auth, chỉ update role trong database
                if (authError.code === 'auth/email-already-in-use') {
                    console.log('📝 Email admin đã tồn tại trong Firebase Auth');
                    return { success: true, exists: true };
                }
                throw authError;
            }
        } catch (error) {
            console.error('Lỗi tạo admin:', error);
            return { success: false, error: error.message };
        }
    },
    
    // ==================== REAL-TIME LISTENERS ====================
    
    /**
     * Lắng nghe thay đổi users (real-time)
     */
    listenToUsers: function(callback) {
        database.ref('users').on('value', (snapshot) => {
            const data = snapshot.val();
            const users = data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];
            callback(users);
        });
    },
    
    /**
     * Hủy lắng nghe
     */
    stopListening: function(path) {
        database.ref(path).off();
    }
};

console.log('✅ Firebase API ready');

// Export để dùng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseAPI;
}

// Tự động tạo admin khi load lần đầu
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            // Đợi 2 giây để Firebase khởi tạo xong
            setTimeout(() => {
                FirebaseAPI.createDefaultAdmin().catch(err => {
                    console.warn('⚠️ Không thể tạo admin tự động:', err.message);
                });
            }, 2000);
        } else {
            console.warn('⚠️ Firebase chưa sẵn sàng. Admin sẽ không được tạo tự động.');
        }
    });
}
