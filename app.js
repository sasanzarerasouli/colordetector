const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

// Helper function to get color name from RGB values
function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, v * 100]; // Return HSV values
}

function getColorName(r, g, b) {
    const [h, s, v] = rgbToHsv(r, g, b);

    // First check for grayscale colors (black, white, gray)
    if (v < 15) return 'Black'; // Very dark colors
    if (v > 85 && s < 10) return 'White'; // Very light colors
    if (v >= 15 && v <= 85 && s < 20) return 'Gray'; // Mid brightness, low saturation

    // Hue ranges for specific colors
    if (h >= 0 && h < 15) return 'Red'; // Reds
    if (h >= 15 && h < 45) return 'Orange'; // Oranges
    if (h >= 45 && h < 65) return 'Yellow'; // Yellows
    if (h >= 65 && h < 150) return 'Green'; // Greens
    if (h >= 150 && h < 240) return 'Blue'; // Blues
    if (h >= 240 && h < 285) return 'Purple'; // Purples
    if (h >= 285 && h < 330) return 'Pink'; // Pinks
    if (h >= 330 && h < 360) return 'Red'; // Reds (again)

    // If none of the above, we assume brown for medium saturations and low brightness
    if (s > 20 && v < 60) return 'Brown'; // Low brightness, moderate saturation

    return 'Color'; // Fallback for other combinations
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

    // Calculate the adjusted coordinates based on the aspect ratio
    const adjustedX = Math.floor(x * (imgData.width / canvas.width));
    const adjustedY = Math.floor(y * (imgData.height / canvas.height));

    // Get the color data from the image
    const imageData = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const colorName = getColorName(r, g, b);
    colorInfo.textContent = `Clicked Color: ${colorName}`;
    colorInfo.style.color = `rgb(${r}, ${g}, ${b})`;
});
