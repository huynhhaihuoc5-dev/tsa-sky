// Khởi tạo bộ nhớ tạm để chứa câu hỏi
if (!window.examQuestionsData) window.examQuestionsData = {};

window.examQuestionsData['de3'] = [

{
    id: 1,
    type: "mcq",
    text: "Điểm cực tiểu của đồ thị hàm số $y=-x^3+3x^2+36$ là?",
    options: [
        "$x=0$",
        "$y=36$",
        "$(2;40)$",
        "$(0;36)$"
    ],
    correctAnswer: "D"
},

{
    id: 2,
    type: "mcq",
    text: "Cho hình chóp tứ giác $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA\\perp(ABCD)$, $SA=3a$. Tính thể tích hình chóp.",
    options: [
        "$2a^3$",
        "$a^3$",
        "$\\frac13a^3$",
        "$3a^3$"
    ],
    correctAnswer: "B"
},

{
    id: 3,
    type: "mcq",
    text: "Từ 10 điểm phân biệt trong mặt phẳng, có thể tạo ra bao nhiêu vectơ khác $\\vec{0}$?",
    options: [
        "$A_{10}^{2}$",
        "$C_{10}^{2}$",
        "10",
        "$2^{10}$"
    ],
    correctAnswer: "A"
},

{
    id: 4,
    type: "mcq",
    text: "Tập xác định của hàm số $$y=\\frac{36}{\\sqrt{1-\\log_3(5-x)}}$$",
    options: [
        "[2;5]",
        "(2;5)",
        "$(-\\infty;2)$",
        "$(-\\infty;5)$"
    ],
    correctAnswer: "B"
},

{
    id: 5,
    type: "mcq",
    text: "Một cửa hàng hoa có 3 loại hoa hồng (Đỏ, Vàng, Trắng) và 2 loại hoa lan (Hồ điệp, Vũ nữ). Thiết kế 1: chọn 1 loại hoa hồng và 1 loại hoa lan. Thiết kế 2: chọn 2 loại hoa hồng khác nhau. Hỏi có bao nhiêu cách chọn?",
    options: [
        "12",
        "9",
        "36",
        "22"
    ],
    correctAnswer: "B"
},

{
    id: 6,
    type: "mcq",
    text: "Một tổ học sinh gồm 6 nam và 4 nữ. Chọn nhóm gồm 2 học sinh sao cho có ít nhất một nữ.",
    options: [
        "22",
        "12",
        "36",
        "30"
    ],
    correctAnswer: "C"
},

{
    id: 7,
    type: "matrix",

    text: `
        Cho elip (E):
        $$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$$
        (a,b>0).

        Xét tính đúng sai của các mệnh đề sau:
    `,

    rows: [
        "Thể tích khối tròn xoay khi đem miền phẳng giới hạn bởi elip quay quanh trục Ox bằng $$\\frac{4}{3}\\pi a^2b$$",

        "Thể tích khối tròn xoay khi đem miền phẳng giới hạn bởi elip quay quanh trục Oy bằng $$\\frac{4}{3}\\pi ab^2$$"
    ],

    correctAnswer: {
        0: "Sai",
        1: "Sai"
    }
},

{
    id: 8,
    type: "mcq",
    text: "Cho khối nón có đường sinh $2a$ và bán kính đáy bằng $a$. Thể tích của khối nón bằng",
    options: [
        "$\\frac{2\\pi a^3}{3}$",
        "$\\frac{\\pi a^3}{3}$",
        "$\\frac{\\sqrt3\\pi a^3}{3}$",
        "$\\frac{\\sqrt3\\pi a^3}{2}$"
    ],
    correctAnswer: "C"
},

{
    id: 9,
    type: "matrix",

    text: `
    Cho bảng số liệu:

    <table border="1" style="
        border-collapse:collapse;
        width:100%;
        margin-top:12px;
        font-size:18px;
    ">

        <tr>
            <th style="
                padding:14px;
                text-align:center;
            ">
                Địa điểm
            </th>

            <th style="
                padding:14px;
                text-align:center;
                width:180px;
            ">
                Số người đi
            </th>
        </tr>

        <tr>
            <td style="padding:14px;text-align:center;">
                Đền Ngọc Sơn
            </td>
            <td style="padding:14px;text-align:center;">
                2
            </td>
        </tr>

        <tr>
            <td style="padding:14px;text-align:center;">
                Chùa Một Cột
            </td>
            <td style="padding:14px;text-align:center;">
                1
            </td>
        </tr>

        <tr>
            <td style="padding:14px;text-align:center;">
                Lăng Bác
            </td>
            <td style="padding:14px;text-align:center;">
                2
            </td>
        </tr>

        <tr>
            <td style="padding:14px;text-align:center;">
                Tháp Rùa
            </td>
            <td style="padding:14px;text-align:center;">
                2
            </td>
        </tr>

        <tr>
            <td style="padding:14px;text-align:center;">
                Hồ Hoàn Kiếm
            </td>
            <td style="padding:14px;text-align:center;">
                3
            </td>
        </tr>

    </table>
    `,

    rows: [
        "Mốt của mẫu số liệu trên bằng 3",
        "Có 10 cách chọn 1 bạn thuyết trình"
    ],

    correctAnswer: {
        0:"Sai",
        1:"Đúng"
    }
},
{
    id: 10,
    type: "fill",
    text: `
    Cho hàm số $y=f(x)$ có bảng biến thiên như sau:

    <img src="data/de3A/anhcau10.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

    Hàm số $|f(x)|$ có bao nhiêu điểm cực trị?
    `,
    blanksCount: 1,
    correctAnswer: ["7"]
},

{
    id: 11,
    type: "mcq",
    text: `
Cho hàm số bậc ba có đồ thị như hình vẽ:

    <img src="data/de3A/anhcau11.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

Khẳng định nào dưới đây là đúng?
`,
    options: [
        "$a>0,\\ b<0,\\ c<0,\\ d>0$",
        "$a>0,\\ b>0,\\ c<0,\\ d>0$",
        "$a<0,\\ b<0,\\ c<0,\\ d>0$",
        "$a>0,\\ b>0,\\ c>0,\\ d>0$"
    ],
    correctAnswer: "A"
},

{
    id: 12,
    type: "matrix",

    text: `
    Cho hàm số $$y=\\log_{0.5}x.$$

    Xét tính đúng sai của các phát biểu sau.
    `,

    rows: [
        "Hàm số nghịch biến trên $(0;+\\infty)$.",
        "Đồ thị hàm số cắt trục hoành tại điểm $A(1;0)$.",
        "Đồ thị hàm số đi qua điểm $N\\left(\\frac12;1\\right)$."
    ],

    correctAnswer: {
        0: "Sai",
        1: "Đúng",
        2: "Đúng"
    }
},

{
    id: 13,
    type: "matrix",

text: `
Cho hàm số

\\[
y=a^x\\;(0\\lt a\\ne1)
\\]

Xét tính đúng sai của các phát biểu sau.
`,

    rows: [
        "Tập giá trị của hàm số là \\((0;+\\infty)\\).",
        "Hàm số nghịch biến trên tập số thực khi \\(a\\in(0;1)\\).",
        "Đạo hàm của hàm số là \\(y'=a^x\\ln a\\)."
    ],

    correctAnswer: {
        0:"Sai",
        1:"Đúng",
        2:"Sai"
    }
},
{
    id:14,
    type:"mcq",
    text:"Tập xác định của hàm số $y=\\dfrac{36}{\\cos^2x-\\sin^2x}$ là?",
    options:[
        "$R\\setminus\\left\\{\\frac{\\pi}{4}+\\frac{k\\pi}{2}\\mid k\\in\\mathbb Z\\right\\}$",
        "$R\\setminus\\left\\{\\frac{\\pi}{2}+\\frac{k\\pi}{2}\\mid k\\in\\mathbb Z\\right\\}$",
        "$R\\setminus\\left\\{\\frac{\\pi}{4}+k\\pi\\mid k\\in\\mathbb Z\\right\\}$",
        "$R\\setminus\\left\\{\\frac{\\pi}{2}+k\\pi\\mid k\\in\\mathbb Z\\right\\}$"
    ],
    correctAnswer:"A"
},

{
    id:15,
    type:"matrix",
    text:"Cho hàm số $y=\\dfrac{3x-2}{x-3}$. Xét tính đúng sai của các phát biểu sau.",
    rows:[
        "Hàm số đã cho nghịch biến trên $R\\setminus\\{3\\}$",
        "Hàm số xác định trên $(-\\infty;3)\\cup(3;+\\infty)$",
        "Tập giá trị của hàm số là R"
    ],
    correctAnswer:{
    0:"Sai",
    1:"Đúng",
    2:"Sai"
}
},

{
    id:16,
    type:"matrix",
    text:`
Một đại lý bảo hiểm nhân thọ thống kê độ tuổi khách hàng nam và nữ.

    <img src="data/de3A/anhcau16.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">
`,
    rows:[
        "Độ tuổi trung bình mua bảo hiểm của khách hàng nam nhỏ hơn khách hàng nữ",
        "Độ tuổi nhiều nhất của khách hàng nam là 41",
        "Độ tuổi nhiều nhất của khách hàng nữ là 38"
    ],
correctAnswer:{
    0:"Đúng",
    1:"Sai",
    2:"Đúng"
}
},

{
    id:17,
    type:"fill",
    text:"Một giỏ trứng khi đếm từng chục, từng tá hoặc nhóm 15 đều dư 5 quả, nhưng chia theo nhóm 7 thì vừa hết. Biết số trứng nhỏ hơn 400. Hỏi giỏ có bao nhiêu quả?",
    blanksCount:1,
    correctAnswer:["245"]
},

{
    id: 18,
    type: "dragdrop",

    text: `
        <img src="data/de3A/anhcau18.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

    Một vòng quay may mắn có 8 ô được đánh số từ 1 đến 8,
    trong đó các ô 1,2,6 được tô đậm.
    `,

    choices: [
        "5/8",
        "3/8",
        "1/2",
        "1/4"
    ],

    targets: [
        "Xác suất quay được ô chứa số nguyên tố là",
        "Xác suất quay được ô chứa số chẵn được tô đậm là"
    ],

    correctAnswer: {
        0: "1/2",
        1: "1/4"
    }
},

{
    id:19,
    type:"fillmulti",

    text:`
    Cho elip:
    $$\\frac{x^2}{25}+\\frac{y^2}{16}=1$$
    `,

    labels:[
        "$F_1F_2=$",
        "$MF_1+MF_2=$",
        "Chu vi hình chữ nhật cơ sở của elip (E) là",
        "Tâm sai $e=$"
    ],

    correctAnswer:[
        "6",
        "10",
        "36",
        "0.6"
    ]
},

{
    id:20,
    type:"fill",

    text:`
    Cho hàm số $f(x)$ thỏa mãn

    $$\\lim_{x\\to1}
    \\frac{f(x)-5}{x-1}=5$$

    Tính giới hạn

    $$N=
    \\lim_{x\\to1}
    \\frac{
        \\sqrt[3]{3f(x)-7}-2
    }{
        x-1
    }
    $$
    `,

    blanksCount:1,

    correctAnswer:[1.25]
},

{
    id:21,
    type:"fill",

    text:`
    100! có bao nhiêu chữ số 0 ở cuối?
    `,

    blanksCount:1,

    correctAnswer:["24"]
},

{
    id:22,
    type:"fill",

    text:`
    Tiệm cận xiên của đồ thị hàm số

    $$y=
    \\frac{x^2-2x+2}
         {x-1}
    $$

    có dạng $y=mx+n$.

    Tính giá trị $2m+3n$.
    `,

    blanksCount:1,

    correctAnswer:["-1"]
},

{
    id:23,
    type:"fill",
    text:`
Cho hàm số $y=f(x)$ có bảng biến thiên như hình vẽ:

<img src="data/de3A/anhcau23.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

Số đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số

$$g(x)=\\frac{7}{f(x)-1}$$

là:
`,
    blanksCount:1,
    correctAnswer:["0"]
},

{
    id:24,
    type:"fill",
    text:`
Biết rằng

$$
\\lim_{x\\to+\\infty}
\\left(
\\frac{4x^2-3x+1}{x+2}
-ax-b
\\right)=0
$$

Tính giá trị:

$$a-2b$$
`,
    blanksCount:1,
    correctAnswer:["26"]
},

{
    id:25,
    type:"multi",

    text:"Hàm số nào dưới đây có tập xác định là $\\mathbb R$?",

    options:[
        "$y=\\dfrac{\\cos^2x+2}{\\cot^2x+1}$",
        "$y=\\sqrt{2+2\\cos x}$",
        "$y=\\cot 3x-\\tan x$",
        "$y=\\sqrt{\\sin x+2}$"
    ],

    correctAnswer:["B","D"]
},

{
    id:26,
    type:"fill",
    text:`
Trên một hồ nước có hình tròn đã trồng sẵn 36 cây xanh.

Người ta muốn chặt đi 18 cây trong số đó.

Hỏi có bao nhiêu cách chặt sao cho không có hai cây kề nhau cùng bị chặt?

<img src="data/de3A/anhcau26.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">
`,
    blanksCount:1,
    correctAnswer:["2"]
},

{
    id:27,
    type:"fill",
    text:`
Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$,
$SA\\perp(ABCD)$.

Số đo góc nhị diện $[S,BC,A]$ bằng $60^\\circ$.

Khoảng cách giữa hai đường thẳng $SC$ và $BD$ bằng

$$
\\frac{a\\sqrt{30}}{n}
$$

Tính giá trị:

$$2n$$
`,
    blanksCount:1,
    correctAnswer:["20"]
},

{
    id:28,
    type:"mcq",
    text:`
Một tháp kiểm soát không lưu cao 80m sử dụng ra-đa đặt trên đỉnh tháp.

Máy bay ở vị trí A cách mặt đất 10km,
cách 300km về phía đông và 200km về phía bắc so với tháp.

Tính khoảng cách từ máy bay đến ra-đa.

<img src="data/de3A/anhcau28.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">
`,
    options:[
        "300 km",
        "360,692 km",
        "360,555 km",
        "360,694 km"
    ],
    correctAnswer:"B"
},

{
    id:29,
    type:"matrix",
    text:"Xét tính đúng sai của các phát biểu sau về việc sắp xếp 7 nữ và 3 nam quanh bàn tròn.",
    rows:[
        "Tổng số cách xếp 10 người vào bàn tròn là 9!",
        "Số cách xếp sao cho 3 học sinh nam luôn ngồi cạnh nhau là 30240",
        "Số cách xếp sao cho 3 học sinh nam không cùng ngồi cạnh nhau là 332640"
    ],
    correctAnswer:{
        0:"Đúng",
        1:"Đúng",
        2:"Đúng"
    }
},

{
    id:30,
    type:"mcq",
    text:"Tổng số mặt phẳng đối xứng của chóp tứ giác đều và hình lập phương là:",
    options:[
        "12",
        "13",
        "14",
        "15"
    ],
    correctAnswer:"B"
},

{
    id:31,
    type:"mcq",
    text:`
Người ta xếp các hình vuông kề nhau như hình.

Mỗi hình vuông có cạnh bằng một nửa cạnh hình trước.

Hình vuông đầu tiên có cạnh 20cm.

<img src="data/de3A/anhcau31.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

Độ dài đoạn thẳng AB gần nhất với:
`,
    options:[
        "40cm",
        "35cm",
        "42cm",
        "38cm"
    ],
    correctAnswer:"A"
},

{
    id:32,
    type:"mcq",
    text:"Có bao nhiêu cách chia 8 cái kẹo khác nhau cho 4 em bé sao cho mỗi em bé nhận ít nhất một cái?",
    options:[
        "86880",
        "40824",
        "20326",
        "26000"
    ],
    correctAnswer:"B"
},

{
    id:33,
    type:"fillmulti",

    text:`

    <div style="
        line-height:1.9;
        font-size:18px;
    ">

    Huy biệt danh là <b>"Michelin Boy"</b> lỡ mang danh là
    <b>"chiếc lốp dự phòng"</b> trong lòng một cô gái.

    Anh ấy chỉ được cô ấy nhắn tin rủ đi chơi, tâm sự hay nhận quà
    vào những tháng mà cô ấy gặp trục trặc hoặc chia tay người yêu
    chính thức.

    Để duy trì mối quan hệ mập mờ này, Huy quyết định lập một kế hoạch
    tặng quà tăng tiến qua từng tháng:

    <img
        src="data/de3A/anhcau33.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

    <div style="margin-left:20px">

        ✓ Tháng thứ nhất, anh ấy tặng cô gái
        <b>3 món quà nhỏ</b>.

        <br><br>

        ✓ Kể từ tháng thứ hai trở đi,
        số lượng quà tháng sau sẽ tăng thêm
        <b>3 món quà</b>
        so với tháng ngay trước đó.

        <br><br>

        ✓ Giá đồng giá:
        Mỗi món quà Huy chọn mua đều có giá trị
        <b>36.000 đồng</b>.

    </div>

    <br>

    </div>
    `,

    labels:[

        "Tính số lượng quà mà Huy đã tặng riêng trong tháng thứ 10:",

        "Bắt đầu từ tháng thứ mấy thì số quà trong riêng tháng đó vượt quá 20 món:",

        "Tổng số tiền Huy đã chi trả sau 1 năm (đơn vị: nghìn đồng):"

    ],

    correctAnswer:[
        "30",
        "7",
        "8424"
    ]
},
{
    id:34,
    type:"multi",

    text:"Kim giờ và kim phút đang chỉ đúng 9 giờ. Sau ít nhất bao lâu thì hai kim vuông góc với nhau?",

    options:[
        "$\\frac{360}{11}$ phút",
        "$\\frac{6}{11}$ giờ",
        "$\\frac{180}{11}$ phút",
        "$\\frac{3}{11}$ giờ"
    ],

    correctAnswer:["A","B"]
},
{
    id:35,
    type:"matrix",

    text:`
</b> Trong hình bên dưới, vị trí cabin mà Bình và Cường ngồi trên vòng quay được đánh dấu với điểm B và C.

    <br><br>

    Khi vòng quay đang hoạt động, gọi α là số đo của một góc lượng giác tia đầu OA, tia cuối OB.

    <img src="data/de3A/anhcau35.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">
    `,

    rows:[

        "Chiều cao từ điểm A đến mặt đất được tính bởi công thức $(13+10\\sin\\alpha)$ mét.",

        "Độ cao của điểm B so với mặt đất khi $\\alpha=-30^\\circ$ là 8m.",

        "Chiều cao từ điểm B đến mặt đất bằng 23m khi và chỉ khi $\\alpha=\\dfrac{\\pi}{2}+2k\\pi;\\ k\\in\\mathbb Z$.",

        "Khi điểm B cách mặt đất 4m thì điểm C cách mặt đất là 14m."
    ],

    correctAnswer:{
        0:"Đúng",
        1:"Đúng",
        2:"Đúng",
        3:"Sai"
    }
},
{
    id:36,
    type:"matrix",

    text:`
    Trò chơi tháp Hà Nội gồm có 3 cọc gỗ $A,B,C$ và $n$ chiếc đĩa có kích thước khác nhau được đục thủng để lồng các cọc gỗ như hình minh họa sau:

    <div style="
        display:flex;
        gap:20px;
        justify-content:center;
        align-items:flex-start;
        flex-wrap:wrap;
        margin:20px 0;
    ">

        <img
            src="data/de3A/anhcau36.jpg"
            style="
                width:auto;
                height:auto;
                max-width:none;
                display:block;
            "
        >

        <img
            src="data/de3A/anhcau36.1.jpg"
            style="
                width:auto;
                height:auto;
                max-width:none;
                display:block;
            "
        >

    </div>

    <div style="
        line-height:1.9;
        font-size:18px;
    ">

    Luật chơi như sau:

    <br><br>

    ✓ Ban đầu, tất cả các đĩa được đặt ở cọc A theo thứ tự đĩa to ở dưới, đĩa nhỏ ở trên.

    <br><br>

    ✓ Mỗi lượt chơi, người chơi chuyển "đĩa trên cùng" của một cọc sang cọc khác.

    <br><br>

    ✓ Trong toàn bộ các bước, không có đĩa nào được đặt trên một đĩa bé hơn.

    <br><br>

    → Trò chơi kết thúc khi toàn bộ đĩa được chuyển sang cọc C.

    <br><br>

    Gọi $v_n$ là số bước ít nhất để chuyển toàn bộ đĩa từ cọc A sang cọc C.

    Xét tính đúng sai của các mệnh đề sau:

    </div>
    `,

    rows:[

        "Dãy $v_n$ có công thức tổng quát như sau: $v_n=2^n-2,\\;\\forall n\\in\\mathbb N^*$.",

        "Hai chữ số tận cùng của số hạng $v_{36}$ là 35.",

        "Trong một chương trình truyền hình thực tế, thí sinh được yêu cầu giải bài toán Tháp Hà Nội với một bộ gồm 10 đĩa. Biết rằng người chơi này có tốc độ thao tác rất nhanh và chuẩn xác, trung bình cứ 3 giây là thực hiện xong 1 lần di chuyển đĩa. Thời gian tối thiểu để thí sinh này hoàn thành phần thi là 3068 giây."
    ],

    correctAnswer:{
        0:"Sai",
        1:"Đúng",
        2:"Sai"
    }
},

{
    id:37,
    type:"mcq",
    text:"Số cách xếp 4 người vào một bàn tròn gồm 8 ghế là:",
    options:[
        "180",
        "210",
        "240",
        "270"
    ],
    correctAnswer:"B"
},

{
    id:38,
    type:"fillmulti",

    text:`
</b> Bạn Huy vừa quyết định tạm dừng làm "LOVE TRƯỜNG" của một cô gái để dồn toàn bộ thời gian còn lại cho giai đoạn ôn thi nước rút.

Để đo lường mức độ quyết tâm, một nhà tâm lý học đã mô hình hóa mức độ vương vấn (tính bằng đơn vị "tâm trạng" - ký hiệu là M) của Huy theo thời gian t (tính bằng ngày) kể từ khi bắt đầu "cắt đứt liên lạc" bằng hàm số:

<div style="text-align:center;margin:18px 0;font-size:24px;font-weight:700;">
M(t)=M₀.e<sup>-kt</sup>
</div>

<img src="data/de3A/anhcau38.jpg"
     style="
        width:auto;
        max-width:420px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

<b>Trong đó:</b><br><br>

✓ M₀ là mức độ vương vấn ban đầu ngay tại thời điểm Huy đưa ra quyết định (t = 0).<br><br>

✓ k là hằng số thể hiện tốc độ quên (phụ thuộc vào ý chí của Huy và độ dày của tập đề cương Hóa, Lý, Toán).<br><br>

Dữ liệu thực tế ghi nhận:<br><br>

✓ Ngay tại thời điểm bắt đầu (t = 0), mức độ vương vấn đạt đỉnh điểm là M₀ = 100.<br><br>

✓ Sau 2 ngày lao đầu vào giải đề, hình bóng cô ấy trong tâm trí Huy đã giảm đi một nửa, tức là chỉ còn lại 50.<br><br>

Hãy tìm hằng số tốc độ quên k của Huy (làm tròn đến chữ số thập phân thứ ba).

<br><br>

Các chuyên gia tâm lý khẳng định:

"Chỉ khi mức độ vương vấn giảm xuống dưới 5, bộ não mới có thể tập trung hoàn toàn 100% công suất cho các câu hỏi phân hóa 9+".

Hỏi Huy cần ít nhất bao nhiêu ngày (làm tròn đến phần nguyên) để đạt đến trạng thái "băng giá" này?
`,

    labels:[
        "Giá trị k =",
        "Số ngày tối thiểu ="
    ],

    correctAnswer:[
        "0.347",
        "9"
    ]
},

{
    id:39,
    type:"fill",

    text:`
</b> Một vòng xuyến giao thông dạng hình tròn có bán kính 10dm.

Người ta trang trí bên trong vòng xuyến năm hình tròn nhỏ bằng nhau,
tiếp xúc với nhau và tiếp xúc với mép trong của vòng xuyến để trồng hoa,
phần còn lại được lát gạch (phần tô đậm).

Cho π = 3,14.

<img src="data/de3A/anhcau39.jpg"
     style="
        width:auto;
        max-width:360px;
        height:auto;
        display:block;
        margin:20px auto;
     ">

Diện tích phần lát gạch trong vòng xuyến là bao nhiêu mét vuông?

(Làm tròn đến chữ số thập phân thứ 3)
`,
    blanksCount:1,
    correctAnswer:[0.988]
},
{
    id:40,
    type:"matrix",

    text:`
    </b> Cho tam giác đều H có cạnh bằng 12.

    Chia tam giác đều thành 144 tam giác đều cạnh bằng 1
    bởi các đường thẳng song song với các cạnh của tam giác đều đó
    (như hình vẽ).

    Gọi S là tập hợp các đỉnh của 144 tam giác đều có cạnh bằng 1 đó.

    <img src="data/de3A/anhcau40.jpg"
         style="
            display:block;
            margin:25px auto;
            width:auto;
            max-width:650px;
            height:auto;
         ">
    `,

    rows:[

        "Tập S có tất cả 144 phần tử.",

        "Số tập con gồm 4 phần tử của tập S là $C_{91}^{4}$.",

        "Sau khi chia tam giác đều H, có tất cả 660 hình bình hành mà các đỉnh của các hình bình hành này thuộc tập hợp S.",

        "Chọn ngẫu nhiên 4 đỉnh của tập S. Xác suất để 4 đỉnh chọn được là bốn đỉnh của một hình bình hành bằng $\\dfrac{1}{890}$."
    ],

    correctAnswer:{
        0:"Sai",
        1:"Đúng",
        2:"Sai",
        3:"Đúng"
    }
}
];