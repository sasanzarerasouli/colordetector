const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');


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

   
    if (v < 15) return 'Black'; // Very dark colors
    if (v > 85 && s < 10) return 'White'; // Very light colors
    if (v >= 15 && v <= 85 && s < 20) return 'Gray'; // Mid brightness, low saturation

  
    // Reds
    if ((h >= 0 && h < 15) || (h >= 330 && h < 360)) return 'Red';
    // Browns (based on specific saturation and value ranges)
    if (h >= 10 && h < 30 && s >= 0.3 && s < 0.7 && v >= 0.2 && v < 0.6) return 'Brown';
    // Oranges
    if (h >= 15 && h < 45 && !(s >= 0.3 && s < 0.7 && v >= 0.2 && v < 0.6)) return 'Orange';
    // Yellows
    if (h >= 45 && h < 65) return 'Yellow';
    // Greens
    if (h >= 65 && h < 150) return 'Green';
    // Cyans
    if (h >= 150 && h < 180) return 'Cyan';
    // Blues
    if (h >= 180 && h < 240) return 'Blue';
    // Purples
    if (h >= 240 && h < 285) return 'Purple';
    // Pinks
    if (h >= 285 && h < 330) return 'Pink';
    //no match
    return 'Unknown';
    
   //Brown
    if (s > 20 && v < 60) return 'Brown'; // Low brightness, moderate saturation

    return 'Color'; // Fallback for other combinations
}


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


canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scaleX = imgData.width / canvas.width;
    const scaleY = imgData.height / canvas.height;

   
    const adjustedX = Math.floor(x * (imgData.width / canvas.width));
    const adjustedY = Math.floor(y * (imgData.height / canvas.height));


    const imageData = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const colorName = getColorName(r, g, b);
    colorInfo.textContent = `Clicked Color: ${colorName}`;
    colorInfo.style.color = `rgb(${r}, ${g}, ${b})`;
});

//sasanzarerasouli
