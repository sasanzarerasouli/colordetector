const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

// Expanded color dictionary with comprehensive RGB values
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
    '50,205,50': 'Lime Green',
    // Add more colors as needed
};

// A more comprehensive approach for color names
function getColorName(r, g, b) {
    const rgbString = `${r},${g},${b}`;
    const closestColor = Object.keys(colorNames).reduce((prev, curr) => {
        const [cr, cg, cb] = curr.split(',').map(Number);
        const distPrev = Math.sqrt(Math.pow(cr - r, 2) + Math.pow(cg - g, 2) + Math.pow(cb - b, 2));
        const distCurr = Math.sqrt(Math.pow(cr - r, 2) + Math.pow(cg - g, 2) + Math.pow(cb - b, 2));
        return distCurr < distPrev ? curr : prev;
    });
    return colorNames[closestColor] || 'Unknown Color';
}

let img; // Declare img globally to use in click event

// Event when image is uploaded
imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            // Set canvas dimensions
            const aspectRatio = img.width / img.height;
            const desiredSize = 400; // Set your desired size
            if (img.width > img.height) {
                canvas.width = desiredSize;
                canvas.height = desiredSize / aspectRatio;
            } else {
                canvas.height = desiredSize;
                canvas.width = desiredSize * aspectRatio;
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

    // Calculate the scale factor
    const scaleX = img.width / canvas.width;
    const scaleY = img.height / canvas.height;

    // Adjust x and y based on the scale
    const adjustedX = Math.floor(x * scaleX);
    const adjustedY = Math.floor(y * scaleY);

    // Get color data
    const imageData = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const colorName = getColorName(r, g, b);
    colorInfo.textContent = `Clicked Color: ${colorName}`;
    colorInfo.style.color = `rgb(${r}, ${g}, ${b})`;
});
