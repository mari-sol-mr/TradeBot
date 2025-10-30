const path = require('path');
const fs = require('fs'); // file system module

function generateLogoGalleryHTML(imageUrls, news)
{


  galleryContents = ''
  for (let i = 0; i < imageUrls.length; i++) {
    galleryContents += `<div class="gallery-item" style="animation-delay: ${i * 0.4}s">` +
    `<img src="${imageUrls[i]}" alt="Image" >` +
    `<div class="gallery-text">` + news[i] + `</div>
    </div>`;
  }

// Generate HTML string
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Small Image Gallery</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .gallery {
      display: flex;
    
      gap: 30px;
      
      flex-direction: column;
      align-items: flex-start;
    }

    .gallery-item {
      display: flex;
      
      justify-content: flex-start;
      text-align: left;
      gap: 12px;
      opacity: 0;
      transform: translateY(10px);
      animation: fadeIn 0.6s ease-out forwards;
    }

    .gallery img {
      width: 100px;
      height: auto;
      border-radius: 4px;
    
    }

    .gallery-text {
      font-size: 17px;
      color: #333;
      font-weight: bold;
      color: blue;
    }  

    @keyframes fadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

  </style>
</head>
<body>
  <div class="gallery" id="gallery">` +
  galleryContents + 
  `</div>
</body>
</html>`;



  // Write to a file
  const outputPath = path.join(__dirname, 'stockLogosGallery.html');
  fs.writeFileSync(outputPath, htmlContent);

  console.log(`✅ HTML saved to ${outputPath}`);
}


module.exports.generateLogoGalleryHTML = generateLogoGalleryHTML;