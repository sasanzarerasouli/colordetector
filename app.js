const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

// Helper function to get color name from RGB values
function getColorName(r, g, b) {
    if (r > g && r > b) {
        return 'Red';
    } else if (g > r && g > b) {
        return 'Green';
    } else if (b > r && b > g) {
        return 'Blue';
    } else if (r === g && g === b) {
        return 'Gray';
    } else if (r === g) {
        return 'Yellow';
    } else if (g === b) {
        return 'Cyan';
    } else if (r === b) {
        return 'Magenta';
    } else {
        return 'Color';
    }
}

// Event when image is uploaded
imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Set canvas dimensions
            const aspectRatio = img.width / img.height;
            if (img.width > img.height) {
                canvas.width = 400; // Set your desired width
                canvas.height = 400 / aspectRatio; // Adjust height according to aspect ratio
            } else {
                canvas.height = 400; // Set your desired height
                canvas.width = 400 * aspectRatio; // Adjust width according to aspect ratio
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

// Event when clicking on the image
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scaleX = imgData.width / canvas.width;
    const scaleY = imgData.height / canvas.height;

    const adjustedX = Math.floor(x * scaleX);
    const adjustedY = Math.floor(y * scaleY);

    const imageData = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const colorName = getColorName(r, g, b);
    colorInfo.textContent = `Clicked Color: ${colorName}`;
    colorInfo.style.color = `rgb(${r}, ${g}, ${b})`;
});
