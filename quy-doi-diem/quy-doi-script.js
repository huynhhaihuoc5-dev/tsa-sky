// ======================================
// SKY EDU - QUY ĐỔI ĐIỂM
// ======================================

const UNIVERSITY_DATA = {
    NEU: {
        name: "ĐH Kinh tế Quốc dân",
        HSA: [
            { min:114, max:128, thptMin:28, thptMax:30 },
            { min:103, max:114, thptMin:26, thptMax:28 },
            { min:89, max:103, thptMin:24, thptMax:26 },
            { min:85, max:89, thptMin:22, thptMax:24 }
        ],
        TSA: [
            { min:80.23, max:88.31, thptMin:28, thptMax:30 },
            { min:70.10, max:80.23, thptMin:26, thptMax:28 },
            { min:62.05, max:70.10, thptMin:24, thptMax:26 },
            { min:60.00, max:62.05, thptMin:22, thptMax:24 }
        ]
    },
    TMU: {
        name: "ĐH Thương mại",
        HSA: [
            { min:120, max:130, thptMin:28, thptMax:30 },
            { min:110, max:120, thptMin:26.5, thptMax:28 },
            { min:100, max:110, thptMin:25, thptMax:26.5 },
            { min:89, max:100, thptMin:22.5, thptMax:25 },
            { min:80, max:89, thptMin:20, thptMax:22.5 }
        ],
        TSA: [
            { min:89, max:100, thptMin:28, thptMax:30 },
            { min:78, max:89, thptMin:26.5, thptMax:28 },
            { min:69, max:78, thptMin:25, thptMax:26.5 },
            { min:58, max:69, thptMin:22.5, thptMax:25 },
            { min:50, max:58, thptMin:20, thptMax:22.5 }
        ]
    },
    PTIT: {
        name: "Học viện Công nghệ Bưu chính Viễn thông",
        HSA: [
            { min:105, max:150, thptMin:27.25, thptMax:30 },
            { min:97, max:105, thptMin:25.25, thptMax:27.25 },
            { min:91, max:97, thptMin:23.50, thptMax:25.25 },
            { min:82, max:91, thptMin:20.50, thptMax:23.50 },
            { min:75, max:82, thptMin:19.00, thptMax:20.50 }
        ],
        TSA: [
            { min:75.53, max:100, thptMin:27.25, thptMax:30 },
            { min:69.29, max:75.53, thptMin:25.25, thptMax:27.25 },
            { min:65.42, max:69.29, thptMin:23.50, thptMax:25.25 },
            { min:59.50, max:65.42, thptMin:20.50, thptMax:23.50 },
            { min:50.00, max:59.50, thptMin:19.00, thptMax:20.50 }
        ]
    },
    UTC: {
        name: "ĐH Giao thông Vận tải",
        HSA: [
            { min:118, max:127, thptMin:29.25, thptMax:30 },
            { min:109.81, max:118, thptMin:28.46, thptMax:29.25 },
            { min:103.13, max:109.81, thptMin:27.55, thptMax:28.46 },
            { min:88.23, max:103.13, thptMin:25.08, thptMax:27.55 },
            { min:80.84, max:88.23, thptMin:23.46, thptMax:25.08 },
            { min:67, max:80.84, thptMin:19.50, thptMax:23.46 },
            { min:53.60, max:67, thptMin:15.00, thptMax:19.50 }
        ],
        TSA: [
            { min:83.98, max:100, thptMin:29.25, thptMax:30 },
            { min:76.23, max:83.98, thptMin:28.46, thptMax:29.25 },
            { min:69.88, max:76.23, thptMin:27.55, thptMax:28.46 },
            { min:59.71, max:69.88, thptMin:25.08, thptMax:27.55 },
            { min:55.22, max:59.71, thptMin:23.46, thptMax:25.08 },
            { min:46.95, max:55.22, thptMin:19.50, thptMax:23.46 },
            { min:37.44, max:46.95, thptMin:15.00, thptMax:19.50 }
        ]
    },
    UTC2: {
        name: "ĐH Công nghệ GTVT",
        HSA: [
            { min:87, max:150, thptMin:25, thptMax:30 },
            { min:79, max:87, thptMin:23, thptMax:25 },
            { min:72, max:79, thptMin:21, thptMax:23 },
            { min:63, max:72, thptMin:18, thptMax:21 },
            { min:56.75, max:63, thptMin:16, thptMax:18 }
        ],
        TSA: [
            { min:59.61, max:100, thptMin:25, thptMax:30 },
            { min:53.87, max:59.61, thptMin:23, thptMax:25 },
            { min:49.89, max:53.87, thptMin:21, thptMax:23 },
            { min:44.05, max:49.89, thptMin:18, thptMax:21 },
            { min:40.18, max:44.05, thptMin:16, thptMax:18 }
        ]
    },
    HVNH: {
        name: "Học viện Ngân hàng",
        HSA: [
            { min:115, max:128, thptMin:28, thptMax:30 },
            { min:105, max:115, thptMin:26, thptMax:28 },
            { min:95, max:105, thptMin:24, thptMax:26 },
            { min:90, max:95, thptMin:22, thptMax:24 },
            { min:85, max:90, thptMin:21, thptMax:22 }
        ],
        TSA: []
    },
    PHENIKAA: {
        name: "ĐH Phenikaa",
        HSA: [
            { min:102, max:130, thptMin:27.50, thptMax:30 },
            { min:75.90, max:102, thptMin:22.20, thptMax:27.50 },
            { min:60.60, max:75.90, thptMin:17.40, thptMax:22.20 },
            { min:57.00, max:60.60, thptMin:16.00, thptMax:17.40 }
        ],
        TSA: [
            { min:69.29, max:94.60, thptMin:27.50, thptMax:30 },
            { min:52.20, max:69.29, thptMin:22.20, thptMax:27.50 },
            { min:42.80, max:52.20, thptMin:17.40, thptMax:22.20 },
            { min:40.00, max:42.80, thptMin:16.00, thptMax:17.40 }
        ]
    },
    HOU: {
        name: "ĐH Mở Hà Nội",
        HSA: [
            { min:83, max:150, thptMin:21.50, thptMax:30 },
            { min:58, max:83, thptMin:17.10, thptMax:21.50 },
            { min:56, max:58, thptMin:16.50, thptMax:17.10 }
        ],
        TSA: [
            { min:54.68, max:100, thptMin:21.50, thptMax:30 },
            { min:40.34, max:54.68, thptMin:17.10, thptMax:21.50 },
            { min:38.65, max:40.34, thptMin:16.50, thptMax:17.10 }
        ]
    },
    HUNRE: {
        name: "ĐH Tài nguyên & Môi trường",
        HSA: [
            { min:131.33, max:150, thptMin:26.50, thptMax:30 },
            { min:118, max:131.33, thptMin:24.00, thptMax:26.50 },
            { min:110, max:118, thptMin:22.50, thptMax:24.00 },
            { min:94, max:110, thptMin:19.50, thptMax:22.50 },
            { min:70, max:94, thptMin:15.00, thptMax:19.50 }
        ],
        TSA: []
    },
    TLU1: {
        name: "ĐH Thăng Long (Nhóm 1)",
        HSA: [
            { min:106, max:150, thptMin:28, thptMax:30 },
            { min:92, max:106, thptMin:26, thptMax:28 },
            { min:83, max:92, thptMin:24, thptMax:26 },
            { min:75, max:83, thptMin:21, thptMax:24 }
        ],
        TSA: [
            { min:72.01, max:100, thptMin:28, thptMax:30 },
            { min:62.44, max:72.01, thptMin:26, thptMax:28 },
            { min:56.25, max:62.44, thptMin:24, thptMax:26 },
            { min:50.00, max:56.25, thptMin:21, thptMax:24 }
        ]
    },
    TLU2: {
        name: "ĐH Thăng Long (Nhóm 2)",
        HSA: [
            { min:130, max:150, thptMin:28, thptMax:30 },
            { min:112, max:130, thptMin:26, thptMax:28 },
            { min:98, max:112, thptMin:24, thptMax:26 },
            { min:75, max:98, thptMin:20, thptMax:24 }
        ],
        TSA: [
            { min:88.97, max:100, thptMin:28, thptMax:30 },
            { min:73.85, max:88.97, thptMin:26, thptMax:28 },
            { min:64.08, max:73.85, thptMin:24, thptMax:26 },
            { min:50.00, max:64.08, thptMin:20, thptMax:24 }
        ]
    },
    HUST: {
        name: "ĐH Bách khoa Hà Nội",
        TSA: [
            { min: 46, max: 50, thptMin: 19.50, thptMax: 20.96 },
            { min: 50, max: 56, thptMin: 20.96, thptMax: 23.74 },
            { min: 56, max: 60, thptMin: 23.74, thptMax: 25.15 },
            { min: 60, max: 70, thptMin: 25.15, thptMax: 27.20 },
            { min: 70, max: 80, thptMin: 27.20, thptMax: 28.84 },
            { min: 80, max: 81, thptMin: 28.84, thptMax: 28.95 },
            { min: 81, max: 82, thptMin: 28.95, thptMax: 29.05 },
            { min: 82, max: 85, thptMin: 29.05, thptMax: 29.25 },
            { min: 85, max: 90, thptMin: 29.25, thptMax: 29.53 },
            { min: 90, max: 95, thptMin: 29.53, thptMax: 29.85 },
            { min: 95, max: 100, thptMin: 29.85, thptMax: 30.00 }
        ]
    }
};

const HSA_TABLE_DATA = {
    UET: {
        130:30.00,129:30.00,128:30.00,127:30.00,126:29.90,125:29.85,124:29.76,123:29.75,122:29.54,121:29.52,
        120:29.50,119:29.39,118:29.25,117:29.04,116:29.03,115:29.00,114:28.78,113:28.77,112:28.75,111:28.52,
        110:28.50,109:28.29,108:28.25,107:28.02,106:28.00,105:27.79,104:27.75,103:27.52,102:27.50,101:27.26,
        100:27.25,99:27.02,98:27.00,97:26.75,96:26.52,95:26.50,94:26.25,93:26.02,92:26.00,91:25.75,
        90:25.50,89:25.25,88:25.03,87:25.00,86:24.75,85:24.50,84:24.25,83:24.00,82:23.75,81:23.50,
        80:23.25,79:23.00,78:22.75,77:22.50,76:22.25,75:21.85
    },
    USSH_C00: {
        130:29.50,129:29.49,128:29.47,127:29.46,126:29.41,125:29.36,124:29.28,123:29.26,122:29.25,121:29.17,
        120:29.08,119:29.06,118:29.05,117:29.03,116:29.02,115:29.00,114:28.78,113:28.76,112:28.75,111:28.54,
        110:28.53,109:28.51,108:28.50,107:28.27,106:28.25,105:28.25,104:28.04,103:28.02,102:28.00,101:27.76,
        100:27.75,99:27.53,98:27.52,97:27.50,96:27.26,95:27.25,94:27.04,93:27.03,92:27.00,91:26.76,
        90:26.75,89:26.51,88:26.50,87:26.27,86:26.25,85:26.03,84:26.00,83:25.76,82:25.75,81:25.52,
        80:25.50,79:25.25,78:25.03,77:25.00,76:24.75,75:24.52
    },
    UEB_ULIS_USSH_D01: {
        130:27.75,129:27.75,128:27.66,127:27.57,126:27.55,125:27.52,124:27.50,123:27.27,122:27.26,121:27.25,
        120:27.05,119:27.00,118:26.75,117:26.75,116:26.52,115:26.50,114:26.27,113:26.25,112:26.00,111:25.76,
        110:25.75,109:25.52,108:25.50,107:25.27,106:25.25,105:25.00,104:24.76,103:24.75,102:24.50,101:24.26,
        100:24.25,99:24.00,98:24.00,97:23.75,96:23.52,95:23.50,94:23.25,93:23.01,92:23.00,91:22.75,
        90:22.70,89:22.50,88:22.26,87:22.25,86:22.00,85:21.75,84:21.75,83:21.50,82:21.35,81:21.25,
        80:21.02,79:21.00,78:20.75,77:20.54,76:20.50,75:20.25
    },
    UMP_B00_UED_N2: {
        130:29.50,129:29.50,128:29.50,127:29.50,126:29.48,125:29.47,124:29.46,123:29.41,122:29.19,121:29.05,
        120:29.00,119:28.88,118:28.75,117:28.52,116:28.51,115:28.50,114:28.27,113:28.26,112:28.25,111:28.00,
        110:27.76,109:27.75,108:27.57,107:27.50,106:27.26,105:27.25,104:27.00,103:26.85,102:26.75,101:26.75,
        100:26.50,99:26.49,98:26.25,97:26.00,96:25.85,95:25.75,94:25.50,93:25.27,92:25.25,91:25.00,
        90:24.75,89:24.50,88:24.25,87:24.00,86:23.75,85:23.52,84:23.50,83:23.25,82:22.85,81:22.60,
        80:22.25,79:22.00,78:21.75,77:21.35,76:21.10,75:20.75
    }
};

// ======================================
// KHỞI TẠO DROPDOWN
// ======================================

const schoolSelect = document.getElementById("school");

// Thêm các trường quy đổi khoảng
for (const key in UNIVERSITY_DATA) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = UNIVERSITY_DATA[key].name;
    schoolSelect.appendChild(option);
}

// Thêm nhóm ĐHQGHN (tra bảng HSA)
const extraSchools = [
    ["UET", "ĐHQGHN - UET / UMP(A00) / HAUI"],
    ["USSH_C00", "ĐHQGHN - USSH(C00) / UED(N3)"],
    ["UEB_ULIS_USSH_D01", "ĐHQGHN - UEB / ULIS / USSH(D01)"],
    ["UMP_B00_UED_N2", "ĐHQGHN - UMP(B00) / UED(N2)"]
];

extraSchools.forEach(item => {
    const option = document.createElement("option");
    option.value = item[0];
    option.textContent = item[1];
    schoolSelect.appendChild(option);
});

// ======================================
// HÀM NỘI SUY TUYẾN TÍNH
// ======================================

function interpolate(value, minInput, maxInput, minOutput, maxOutput) {
    return minOutput + ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput);
}

// ======================================
// QUY ĐỔI ĐIỂM
// ======================================

document.getElementById("convertBtn").addEventListener("click", () => {
    const school = document.getElementById("school").value;
    const examType = document.getElementById("examType").value;
    const score = parseFloat(document.getElementById("inputScore").value);
    const resultBox = document.getElementById("resultBox");

    if (!school) {
        resultBox.innerHTML = `
            <iconify-icon icon="lucide:alert-circle" style="font-size: 60px; color: #F59E0B;"></iconify-icon>
            <p class="result-label" style="margin-top: 20px; color: #F59E0B;">Vui lòng chọn trường!</p>
        `;
        return;
    }

    if (isNaN(score)) {
        resultBox.innerHTML = `
            <iconify-icon icon="lucide:alert-circle" style="font-size: 60px; color: #F59E0B;"></iconify-icon>
            <p class="result-label" style="margin-top: 20px; color: #F59E0B;">Vui lòng nhập điểm hợp lệ!</p>
        `;
        return;
    }

    // Nhóm ĐHQGHN - Tra bảng HSA
    if (HSA_TABLE_DATA[school]) {
        if (examType !== "HSA") {
            resultBox.innerHTML = `
                <iconify-icon icon="lucide:x-circle" style="font-size: 60px; color: #EF4444;"></iconify-icon>
                <p class="result-label" style="margin-top: 20px; color: #EF4444;">Nhóm này chỉ hỗ trợ HSA!</p>
            `;
            return;
        }

        const roundedScore = Math.round(score);
        const value = HSA_TABLE_DATA[school][roundedScore];

        if (!value) {
            resultBox.innerHTML = `
                <iconify-icon icon="lucide:search-x" style="font-size: 60px; color: #EF4444;"></iconify-icon>
                <p class="result-label" style="margin-top: 20px; color: #EF4444;">Không tìm thấy dữ liệu cho điểm ${roundedScore}</p>
            `;
            return;
        }

        resultBox.innerHTML = `
            <iconify-icon icon="lucide:check-circle-2" style="font-size: 50px; color: #10B981;"></iconify-icon>
            <p class="result-label">Điểm THPT tương đương</p>
            <div class="result-score">${value}</div>
            <p style="color: #64748B; font-size: 14px;">
                Điểm HSA <strong>${roundedScore}</strong> ≈ <strong>${value}</strong> điểm THPT
            </p>
        `;
        return;
    }

    // Nhóm trường khác - Nội suy khoảng
    const ranges = UNIVERSITY_DATA[school][examType];

    if (!ranges || ranges.length === 0) {
        resultBox.innerHTML = `
            <iconify-icon icon="lucide:x-circle" style="font-size: 60px; color: #EF4444;"></iconify-icon>
            <p class="result-label" style="margin-top: 20px; color: #EF4444;">Không có dữ liệu ${examType} cho trường này!</p>
        `;
        return;
    }

    let result = null;

    for (const item of ranges) {
        if (score >= item.min && score <= item.max) {
            result = interpolate(score, item.min, item.max, item.thptMin, item.thptMax);
            break;
        }
    }

    if (result === null) {
        resultBox.innerHTML = `
            <iconify-icon icon="lucide:alert-triangle" style="font-size: 60px; color: #F59E0B;"></iconify-icon>
            <p class="result-label" style="margin-top: 20px; color: #F59E0B;">Điểm ${score} nằm ngoài khoảng quy đổi!</p>
        `;
        return;
    }

    resultBox.innerHTML = `
        <iconify-icon icon="lucide:check-circle-2" style="font-size: 50px; color: #10B981;"></iconify-icon>
        <p class="result-label">Điểm THPT tương đương</p>
        <div class="result-score">${result.toFixed(2)}</div>
        <p style="color: #64748B; font-size: 14px;">
            Điểm ${examType} <strong>${score}</strong> ≈ <strong>${result.toFixed(2)}</strong> điểm THPT
        </p>
    `;
});

// ======================================
// SWITCH TABS
// ======================================

function switchConvertTab(index) {
    document.querySelectorAll('.tab-convert').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.convert-content').forEach((content, i) => {
        content.classList.toggle('active', i === index);
    });
    
    if (index === 1) renderReferenceTable();
}

// ======================================
// BẢNG THAM KHẢO
// ======================================

function renderReferenceTable() {
    const tbody = document.getElementById('referenceTable');
    let html = '';

    for (const key in UNIVERSITY_DATA) {
        const uni = UNIVERSITY_DATA[key];
        
        // TSA
        if (uni.TSA && uni.TSA.length > 0) {
            uni.TSA.forEach(range => {
                html += `
                    <tr>
                        <td>${uni.name}</td>
                        <td>TSA</td>
                        <td>${range.min} - ${range.max}</td>
                        <td>${range.thptMin} - ${range.thptMax}</td>
                    </tr>
                `;
            });
        }
        
        // HSA
        if (uni.HSA && uni.HSA.length > 0) {
            uni.HSA.forEach(range => {
                html += `
                    <tr>
                        <td>${uni.name}</td>
                        <td>HSA</td>
                        <td>${range.min} - ${range.max}</td>
                        <td>${range.thptMin} - ${range.thptMax}</td>
                    </tr>
                `;
            });
        }
    }

    tbody.innerHTML = html;
}
