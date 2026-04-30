const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "HAPPYBIRTHDAYHATAM1234567890";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

// Canvas phụ để lấy dữ liệu pixel của chữ
const textCanvas = document.createElement('canvas');
const tctx = textCanvas.getContext('2d');
textCanvas.width = canvas.width;
textCanvas.height = canvas.height;

let currentText = "3";
let textScale = 300; // Độ lớn của số/chữ

function draw() {
    // Vẽ nền đen để các chữ li ti chạy dọc không bị mờ
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Vẽ hiệu ứng Matrix Rain hồng chạy dọc full màn
    ctx.fillStyle = "rgba(255, 105, 180, 0.3)"; // Màu hồng nhạt cho nền mưa
    ctx.font = fontSize + "px Courier New";
    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });

    // 2. Tạo mảng điểm (Dots) cho số và chữ chính
    tctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    tctx.fillStyle = "white";
    tctx.font = `bold ${textScale}px Arial`;
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    tctx.fillText(currentText, textCanvas.width / 2, textCanvas.height / 2);

    const imgData = tctx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;

    // Quét từng pixel và vẽ dấu chấm hồng nếu pixel đó có màu
    const gap = 8; // Khoảng cách giữa các dấu chấm (chỉnh số này để chấm to/nhỏ/dày/thưa)
    for (let y = 0; y < textCanvas.height; y += gap) {
        for (let x = 0; x < textCanvas.width; x += gap) {
            const index = (y * textCanvas.width + x) * 4;
            const alpha = imgData[index + 3];
            if (alpha > 128) {
                ctx.fillStyle = "#ff69b4"; // Màu hồng đậm cho dấu chấm
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2); // Vẽ dấu chấm tròn
                ctx.fill();
            }
        }
    }
}

let matrixInterval = setInterval(draw, 40);

// Kịch bản đếm ngược và đổi chữ
setTimeout(() => { currentText = "2"; }, 1500);
setTimeout(() => { currentText = "1"; }, 3000);
setTimeout(() => { 
    currentText = "HAPPY"; 
    textScale = 150; 
}, 4500);
setTimeout(() => { 
    currentText = "KHÁNH LINH"; // Bạn có thể đổi thành HÀ TÂM tùy ý
    textScale = 120; 
}, 6500);

// Chuyển sang màn hình bánh
setTimeout(() => {
    clearInterval(matrixInterval);
    document.getElementById('stage1').classList.remove('active');
    document.getElementById('stage3').classList.add('active');
}, 10000);