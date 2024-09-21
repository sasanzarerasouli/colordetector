
const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');

let scale = 1; // Variable to keep track of zoom level

// Your existing rgbToHsv and getColorName functions...

imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width; // Set original width
            canvas.height = img.height; // Set original height
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

// Function to apply zoom
function applyZoom() {
    ctx.setTransform(scale, 0, 0, scale, 0, 0); // Apply scale
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    // Redraw the image with the current scale
    const img = new Image();
    img.src = canvas.toDataURL(); // Use current canvas data
    img.onload = () => {
        ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
    };
}

// Event for zoom in
document.getElementById('zoomIn').addEventListener('click', function() {
    scale += 0.1; // Increase scale
    applyZoom();
});

// Event for zoom out
document.getElementById('zoomOut').addEventListener('click', function() {
    scale = Math.max(scale - 0.1, 0.1); // Decrease scale, not less than 0.1
    applyZoom();
});

// Event when clicking on the image
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale; // Adjusted for scale
    const y = (e.clientY - rect.top) / scale; // Adjusted for scale

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const adjustedX = Math.floor(x);
    const adjustedY = Math.floor(y);

    const imageData = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const colorName = getColorName(r, g, b);
    colorInfo.textContent = `Clicked Color: ${colorName}`;
    colorInfo.style.color = `rgb(${r}, ${g}, ${b})`;
});
</script>
