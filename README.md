# 📄 Image to PDF Converter

A modern React application that converts folders of images into beautiful PDF documents with customizable options.

## ✨ Features

- **Folder Upload**: Select entire folders of images at once using the native folder picker
- **Drag & Drop**: Drag and drop individual images or multiple files
- **Image Preview**: Preview and reorder images before conversion
- **Customizable PDF Options**:
  - Page orientation (Portrait/Landscape)
  - Page format (A4, Letter, Legal)
  - Images per page (1, 2, 4, 6, or 9)
  - Image quality control
  - Adjustable margins
- **Real-time Estimates**: See estimated PDF size and page count
- **Local Processing**: All processing happens in your browser - no server uploads
- **Modern UI**: Beautiful, responsive design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd image-to-pdf-converter
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

1. **Upload Images**: 
   - Click "Select Folder" to choose an entire folder of images
   - Or drag and drop individual images into the upload area
   - Or click the upload area to select individual files

2. **Arrange Images**: 
   - Use the up/down arrows to reorder images
   - Click the ✕ button to remove unwanted images

3. **Configure PDF Settings**:
   - Choose page orientation and format
   - Select how many images per page
   - Adjust image quality (affects file size)
   - Set page margins

4. **Generate PDF**:
   - Enter a filename for your PDF
   - Click "Generate PDF" to create and download your document

## 🛠️ Built With

- **React 18** - Modern React with TypeScript
- **jsPDF** - Client-side PDF generation
- **react-dropzone** - Drag and drop file uploads
- **file-saver** - File download functionality

## 📱 Browser Support

This application works in all modern browsers that support:
- File API
- Canvas API
- Blob API
- ES6+ features

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Privacy & Security

- **No Server Uploads**: All image processing happens locally in your browser
- **No Data Collection**: Your images never leave your device
- **Secure**: No external API calls or third-party services

## 📝 Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- WebP (.webp)

## 🎨 Customization

The application supports various PDF customization options:

### Page Formats
- **A4**: 210 × 297 mm
- **Letter**: 8.5 × 11 inches
- **Legal**: 8.5 × 14 inches

### Layout Options
- **1 image per page**: Full-page images
- **2 images per page**: Side-by-side or top-bottom
- **4 images per page**: 2×2 grid
- **6 images per page**: 2×3 grid
- **9 images per page**: 3×3 grid

## 🚀 Building for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Enjoy converting your images to PDF! 📄✨**