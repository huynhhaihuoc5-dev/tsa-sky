// Khởi tạo object nếu chưa có
window.examQuestionsData = window.examQuestionsData || {};

// Dữ liệu cho Đề số 2 (Mã đề: 8UIT7J)
window.examQuestionsData['exam-2'] = [
    {
        type: 'mcq',
        text: 'Để hoàn thành một bài tập nhóm, tổ một cần cử ra 1 bạn nam và 1 bạn nữ làm đại diện thuyết trình. Biết tổ một có 3 bạn nam học giỏi Lý, 2 bạn nam học giỏi Hóa và 5 bạn nữ. Hỏi có bao nhiêu cách chọn ra cặp đôi thuyết trình này?',
        options: ['25', '26', '23', '24'],
        correctAnswer: 'A'
    },
    {
        type: 'mcq',
        text: 'Một tổ học sinh gồm 6 bạn nam và 4 bạn nữ. Giáo viên chủ nhiệm muốn chọn ra một nhóm gồm 2 học sinh đi trực nhật sao cho trong nhóm phải có ít nhất một bạn nữ. Hỏi có bao nhiêu cách chọn nhóm trực nhật?',
        options: ['22', '12', '36', '30'],
        correctAnswer: 'D'
    },
    {
        type: 'mcq',
        text: 'Một cửa hàng thời trang có 5 mẫu áo thun khác nhau và 4 mẫu quần đùi khác nhau. Để chụp ảnh sản phẩm, stylist có thể phối đồ theo hai phong cách:\n- Phong cách 1: Chỉ mặc một chiếc áo thun dáng giấu quần (chọn 1 trong các mẫu áo).\n- Phong cách 2: Phối hợp 1 chiếc áo thun và 1 chiếc quần đùi.\nHỏi stylist có bao nhiêu cách chọn trang phục cho người mẫu chụp ảnh?',
        options: ['36', '30', '25', '35'],
        correctAnswer: 'C'
    },
    {
        type: 'mcq',
        text: 'Một quán cơm bình dân có 3 loại món chính (Thịt lợn, Thịt gà, Cá), 4 loại món rau và 2 loại canh. Để khuyến khích khách hàng, quán đưa ra hai lựa chọn combo:\n- Combo A: Gồm 1 món chính và 1 món rau.\n- Combo B: Gồm 1 món chính và 1 loại canh.\nHỏi một thực khách có bao nhiêu cách chọn ra một combo để ăn trưa?',
        options: ['18', '36', '20', '22'],
        correctAnswer: 'A'
    },
    {
        type: 'mcq',
        text: 'Có bao nhiêu số tự nhiên gồm 4 chữ số mà cả bốn chữ số đều là chữ số chẵn?',
        options: ['9999', '1200', '1000', '500'],
        correctAnswer: 'D'
    },
    {
        type: 'mcq',
        text: 'Có bao nhiêu số tự nhiên chẵn gồm 3 chữ số khác nhau được lập từ tập hợp $A=\\{1,2,3,4,5,6,7\\}$?',
        options: ['90', '120', '210', '360'],
        correctAnswer: 'A'
    },
    {
        type: 'mcq',
        text: 'Để đi từ Hà Nội vào Đà Nẵng, một đoàn du lịch có thể chọn đi bằng máy bay hoặc tàu hoả.\n- Nếu đi bằng máy bay, có 3 hãng hàng không nội địa khai thác.\n- Nếu đi bằng tàu hoả, họ phải mua vé chặng 1 từ Hà Nội đến Vinh (có 4 chuyến tàu khác nhau), sau đó mua tiếp vé chặng 2 từ Vinh vào Đà Nẵng (có 3 chuyến tàu khác nhau).\nHỏi đoàn du lịch có bao nhiêu cách lựa chọn phương tiện và chuyến đi?',
        options: ['14', '15', '51', '41'],
        correctAnswer: 'B'
    },
    {
        type: 'fill',
        text: 'Một cửa hàng trà sữa phục vụ khách hàng chọn ly trà theo công thức: chọn 1 loại cốt trà (có 4 loại) và chọn 1 loại trân châu đi kèm (có 5 loại). Hỏi khách hàng có bao nhiêu cách để thiết lập một ly trà sữa cho riêng mình?',
        correctAnswer: '20'
    },
    {
        type: 'fill',
        text: 'Cho sơ đồ mạch điện gồm hai đoạn mắc nối tiếp. Đoạn thứ nhất gồm 3 bóng đèn mắc song song, đoạn thứ hai gồm 4 bóng đèn mắc song song. Để dòng điện chạy qua được cả mạch, mỗi đoạn chỉ cần ít nhất 1 bóng đèn hoạt động. Hỏi có bao nhiêu cách chọn ra 1 bóng đèn ở đoạn một và 1 bóng đèn ở đoạn hai để kiểm tra độ sáng?',
        correctAnswer: '12'
    },
    {
        type: 'fill',
        text: 'Một hộp chứa 6 viên bi xanh và 8 viên bi đỏ (các viên bi khác nhau về kích thước). Bạn Nam muốn chọn ra từ hộp một cặp gồm 1 viên bi xanh và 1 viên bi đỏ. Hỏi Nam có bao nhiêu cách chọn?',
        correctAnswer: '48'
    },
    {
        type: 'fill',
        text: 'Có bao nhiêu số tự nhiên chẵn gồm 2 chữ số khác nhau được lập từ tập hợp $S=\\{1,2,3,4,5,6\\}$?',
        correctAnswer: '15'
    },
    {
        type: 'fill',
        text: 'Để đi từ thành phố A đến thành phố C, hành khách có thể chọn đi đường hàng không hoặc đường bộ. Nếu đi đường hàng không, có 3 chuyến bay thẳng mỗi ngày. Nếu đi đường bộ, hành khách phải đi từ A đến B (có 4 hãng xe khách), rồi đi tiếp từ B đến C (có 5 hãng xe khách). Hỏi có bao nhiêu cách di chuyển từ A đến C?',
        correctAnswer: '23'
    },
    {
        type: 'fill',
        text: 'Từ tập hợp chữ số $X=\\{1,2,3,4,5\\}$, có bao nhiêu số tự nhiên có 3 chữ số được thành lập? (Các chữ số có thể giống nhau).',
        correctAnswer: '125'
    },
    {
        type: 'fill',
        text: 'Một người muốn mặc một bộ đồ hoàn chỉnh gồm một chiếc áo sơ mi và một chiếc quần tây. Biết trong tủ đồ có 6 chiếc áo sơ mi màu sắc khác nhau và 5 chiếc quần tây kiểu dáng khác nhau. Hỏi người đó có bao nhiêu cách phối một bộ đồ?',
        correctAnswer: '30'
    },
    {
        type: 'fill',
        text: 'Để đi từ nhà đến trường, bạn An phải đi qua một trạm xe buýt trung chuyển. Biết rằng từ nhà đến trạm xe buýt có 4 con đường đi, và từ trạm xe buýt đến trường có 5 con đường đi. Hỏi An có bao nhiêu lộ trình khác nhau để đi từ nhà đến trường?',
        correctAnswer: '20'
    },
    {
        type: 'fill',
        text: 'Một đội mật mã quân sự cần chọn ra 1 mật mã khẩn cấp từ một danh sách gồm 12 mật mã hệ chữ (mã A) và 15 mật mã hệ số (mã B). Hỏi có bao nhiêu cách chọn mật mã?',
        correctAnswer: '27'
    },
    {
        type: 'fill',
        text: 'Gia đình An tham gia một chuyến du lịch ở Sa Pa. Khi dừng chân ở một nhà hàng để ăn trưa, quản lý nhà hàng đưa ra thực đơn (menu) gồm các món ăn:\n- Món chay: Đậu xốt cà chua, Rau cải luộc, Nấm hương xào xả (3 món).\n- Món mặn: Trâu gác bếp, Gà nướng Tây Bắc, Cá hồi áp chảo (3 món).\n- Món xào: Su su xào tỏi, Lợn bản xào lăn, Lòng gà xào măng, Bò xào cần tây (4 món).\n- Món hấp: Khoai sọ hấp, Thịt dải hấp, Cá tầm hấp xì dầu, Ngô nếp hấp (4 món).\nHỏi gia đình An có bao nhiêu cách để chọn 1 thực đơn gồm 1 món chay, 1 món mặn, 1 món xào?',
        correctAnswer: '36'
    },
    {
        type: 'fill',
        text: 'Một giỏ trứng khi đếm từng chục, từng tá (12 quả), hoặc nhóm 15 quả đều dư 5 quả, nhưng khi đếm theo nhóm 7 quả thì vừa hết. Biết số trứng trong giỏ ít hơn 400 quả. Hỏi giỏ trứng có bao nhiêu quả trứng?',
        correctAnswer: '245'
    },
    {
        type: 'fill',
        text: 'Một mật mã an toàn của một hệ thống máy tính gồm 3 ký tự xếp thành một hàng ngang. Người dùng thiết lập mật mã bằng cách chọn các ký tự từ tập hợp gồm:\n- 3 chữ cái: A, B, C\n- 3 chữ số: 1, 2, 3\nBiết rằng mật mã hợp lệ phải thỏa mãn đồng thời hai điều kiện sau:\n- Phải có mặt ít nhất một chữ cái và ít nhất một chữ số.\n- Các ký tự trong mật mã không được lặp lại (đôi một khác nhau).\nHỏi có bao nhiêu mật mã hợp lệ có thể tạo ra?',
        correctAnswer: '108'
    },
    {
        type: 'fill',
        text: 'Có bao nhiêu số tự nhiên gồm 3 chữ số khác nhau được lập từ tập $A=\\{1,2,3,4,5,6,7\\}$ sao cho chữ số đứng giữa luôn lớn hơn hai chữ số hai bên ($a<b$ và $b>c$)?',
        correctAnswer: '70'
    }
];