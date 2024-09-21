const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

// وقتی تصویری آپلود می‌شود
imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

// زمانی که روی تصویر کلیک می‌شود
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    colorInfo.textContent = `Clicked Color: ${rgbColor}`;
    colorInfo.style.color = rgbColor;
});
