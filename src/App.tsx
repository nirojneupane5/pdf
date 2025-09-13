import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import PDFOptionsComponent from './components/PDFOptions';
import { generatePDF, estimatePDFSize } from './utils/pdfGenerator';
import './App.css';

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

const defaultPDFOptions: PDFOptions = {
  orientation: 'portrait',
  format: 'a4',
  quality: 0.8,
  margin: 10,
  imagesPerPage: 1
};

function App() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pdfOptions, setPdfOptions] = useState<PDFOptions>(defaultPDFOptions);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filename, setFilename] = useState('my-images');

  const handleImagesSelected = useCallback((newImages: ImageFile[]) => {
    setImages(newImages);
  }, []);

  const handlePDFOptionsChange = useCallback((options: PDFOptions) => {
    setPdfOptions(options);
  }, []);

  const handleGeneratePDF = async () => {
    if (images.length === 0) {
      alert('Please select some images first!');
      return;
    }

    setIsGenerating(true);
    try {
      await generatePDF(images, filename, pdfOptions);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearAllImages = () => {
    images.forEach(image => URL.revokeObjectURL(image.preview));
    setImages([]);
  };

  const estimatedSize = images.length > 0 ? estimatePDFSize(images, pdfOptions) : '0 KB';

  return (
    <div className="App">
      <header className="app-header">
        <h1>📄 Image to PDF Converter</h1>
        <p>Convert your image folders into beautiful PDF documents</p>
      </header>

      <main className="app-main">
        <ImageUploader 
          images={images} 
          onImagesSelected={handleImagesSelected}
        />

        {images.length > 0 && (
          <>
            <PDFOptionsComponent
              options={pdfOptions}
              onOptionsChange={handlePDFOptionsChange}
              estimatedSize={estimatedSize}
              imageCount={images.length}
            />

            <div className="generation-section">
              <div className="filename-input">
                <label htmlFor="filename">PDF Filename:</label>
                <input
                  id="filename"
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Enter filename (without .pdf)"
                />
              </div>

              <div className="action-buttons">
                <button
                  className="clear-button"
                  onClick={clearAllImages}
                  disabled={isGenerating}
                >
                  🗑️ Clear All
                </button>
                
                <button
                  className="generate-button"
                  onClick={handleGeneratePDF}
                  disabled={isGenerating || images.length === 0}
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner"></span>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      📥 Generate PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {images.length === 0 && (
          <div className="welcome-section">
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">📁</div>
                <h3>Folder Upload</h3>
                <p>Select entire folders of images at once</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Customizable</h3>
                <p>Adjust quality, layout, and page settings</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast & Secure</h3>
                <p>Process images locally in your browser</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React & jsPDF • Process images locally in your browser</p>
      </footer>
    </div>
  );
}

export default App;