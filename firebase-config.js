/**
 * FIREBASE CONFIGURATION - SKY EDU
 * 
 * HƯỚNG DẪN SETUP:
 * 1. Vào https://console.firebase.google.com/
 * 2. Tạo project mới hoặc chọn project có sẵn
 * 3. Vào Project Settings → Your Apps → Web app
 * 4. Copy config và paste vào dưới đây
 */

// ⚠️ THAY ĐỔI CONFIG NÀY VỚI THÔNG TIN CỦA BẠN
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

/**
 * FIREBASE API WRAPPER
 */
const FirebaseAPI = {
    
    // ==================== USERS ====================
    
    /**
     * Lưu user mới
     */
    saveUser: async function(userId, userData) {
        try {
            await database.ref('users/' + userId).set({
                ...userData,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
            return { success: true };
        } catch (error) {
            console.error('Lỗi lưu user:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Lấy tất cả users
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
     * Xóa user
     */
    deleteUser: async function(userId) {
        try {
            await database.ref('users/' + userId).remove();
            return { success: true };
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
