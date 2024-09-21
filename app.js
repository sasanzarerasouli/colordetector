const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

// Dictionary to map RGB values to color names (simplified for common colors)
const colorNames = {
    '255,0,0': 'Red',
    '0,255,0': 'Green',
    '0,0,255': 'Blue',
    '255,255,0': 'Yellow',
    '0,255,255': 'Cyan',
    '255,0,255': 'Magenta',
    '255,255,255': 'White',
    '0,0,0': 'Black',
    '128,128,128': 'Gray',
    '128,0,0': 'Maroon',
    '128,128,0': 'Olive',
    '0,128,0': 'Dark Green',
    '128,0,128': 'Purple',
    '0,128,128': 'Teal',
    '0,0,128': 'Navy'
};

// Helper function to get color name from RGB values
function getColorName(r, g, b) {
    const rgbString = `${r},${g},${b}`;
    return colorNames[rgbString] || `rgb(${r}, ${g}, ${b})`; // Default to RGB code if no match
}

// Event when image is uploaded
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

// Event when clicking on the image
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const colorName = getColorName(r, g, b);
    colorInfo.textContent = `Clicked Color: ${colorName}`;
    colorInfo.style.color = `rgb(${r}, ${g}, ${b})`;
});
