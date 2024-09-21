const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

// Expanded color dictionary to map RGB values to color names (more comprehensive)
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
    '0,0,128': 'Navy',
    '192,192,192': 'Silver',
    '255,165,0': 'Orange',
    '173,216,230': 'Light Blue',
    '0,191,255': 'Deep Sky Blue',
    '75,0,130': 'Indigo',
    '255,20,147': 'Deep Pink',
    '46,139,87': 'Sea Green',
    '255,215,0': 'Gold',
    '218,165,32': 'Goldenrod',
    '220,20,60': 'Crimson',
    '233,150,122': 'Dark Salmon',
    '153,50,204': 'Dark Orchid',
    '106,90,205': 'Slate Blue',
    '50,205,50': 'Lime Green'
};

// Helper function to get color name from RGB values
function getColorName(r, g, b) {
    const rgbString = `${r},${g},${b}`;
    return colorNames[rgbString] || 'Unknown Color'; // Show 'Unknown Color' if no match is found
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

    // Get the image dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate the scale ratio
    const scaleX = imgWidth / rect.width;
    const scaleY = imgHeight / rect.height;

    // Adjust x and y based on scale ratio
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
