import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface PDFOptions {
  orientation: 'portrait' | 'landscape';
  format: 'a4' | 'letter' | 'legal';
  quality: number;
  margin: number;
  imagesPerPage: number;
}

const defaultOptions: PDFOptions = {
  orientation: 'portrait',
  format: 'a4',
  quality: 0.8,
  margin: 10,
  imagesPerPage: 1
};

export const generatePDF = async (
  images: ImageFile[], 
  filename: string = 'images-to-pdf',
  options: Partial<PDFOptions> = {}
): Promise<void> => {
  const opts = { ...defaultOptions, ...options };
  
  if (images.length === 0) {
    throw new Error('No images provided');
  }

  const pdf = new jsPDF({
    orientation: opts.orientation,
    unit: 'mm',
    format: opts.format
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - (opts.margin * 2);
  const contentHeight = pageHeight - (opts.margin * 2);

  let isFirstPage = true;

  for (let i = 0; i < images.length; i += opts.imagesPerPage) {
    if (!isFirstPage) {
      pdf.addPage();
    }
    isFirstPage = false;

    const pageImages = images.slice(i, i + opts.imagesPerPage);
    
    if (opts.imagesPerPage === 1) {
      // Single image per page
      const image = pageImages[0];
      await addImageToPDF(pdf, image, opts.margin, opts.margin, contentWidth, contentHeight, opts.quality);
    } else {
      // Multiple images per page (grid layout)
      const cols = Math.ceil(Math.sqrt(opts.imagesPerPage));
      const rows = Math.ceil(opts.imagesPerPage / cols);
      const cellWidth = contentWidth / cols;
      const cellHeight = contentHeight / rows;

      for (let j = 0; j < pageImages.length; j++) {
        const row = Math.floor(j / cols);
        const col = j % cols;
        const x = opts.margin + (col * cellWidth);
        const y = opts.margin + (row * cellHeight);
        
        await addImageToPDF(
          pdf, 
          pageImages[j], 
          x + 2, 
          y + 2, 
          cellWidth - 4, 
          cellHeight - 4, 
          opts.quality
        );
      }
    }
  }

  // Save the PDF
  const pdfBlob = pdf.output('blob');
  saveAs(pdfBlob, `${filename}.pdf`);
};

const addImageToPDF = async (
  pdf: jsPDF,
  imageFile: ImageFile,
  x: number,
  y: number,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        // Calculate dimensions to maintain aspect ratio
        const aspectRatio = img.width / img.height;
        let width = maxWidth;
        let height = maxWidth / aspectRatio;

        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }

        // Center the image within the available space
        const centerX = x + (maxWidth - width) / 2;
        const centerY = y + (maxHeight - height) / 2;

        // Convert image to canvas for better quality control
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/jpeg', quality);
        
        pdf.addImage(dataURL, 'JPEG', centerX, centerY, width, height);
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageFile.file.name}`));
    };

    img.src = imageFile.preview;
  });
};

export const getPageDimensions = (format: string, orientation: string) => {
  const formats: Record<string, [number, number]> = {
    'a4': [210, 297],
    'letter': [216, 279],
    'legal': [216, 356]
  };

  const [width, height] = formats[format] || formats['a4'];
  return orientation === 'landscape' ? [height, width] : [width, height];
};

export const estimatePDFSize = (images: ImageFile[], options: Partial<PDFOptions> = {}): string => {
  const opts = { ...defaultOptions, ...options };
  const avgImageSize = images.reduce((sum, img) => sum + img.file.size, 0) / images.length;
  const compressionRatio = opts.quality;
  const estimatedSize = (avgImageSize * images.length * compressionRatio) + (images.length * 1024); // Add overhead
  
  if (estimatedSize < 1024 * 1024) {
    return `${Math.round(estimatedSize / 1024)} KB`;
  } else {
    return `${(estimatedSize / (1024 * 1024)).toFixed(1)} MB`;
  }
};
