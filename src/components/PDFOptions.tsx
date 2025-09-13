import React from 'react';
import './PDFOptions.css';

interface PDFOptions {
  orientation: 'portrait' | 'landscape';
  format: 'a4' | 'letter' | 'legal';
  quality: number;
  margin: number;
  imagesPerPage: number;
}

interface PDFOptionsProps {
  options: PDFOptions;
  onOptionsChange: (options: PDFOptions) => void;
  estimatedSize: string;
  imageCount: number;
}

const PDFOptionsComponent: React.FC<PDFOptionsProps> = ({
  options,
  onOptionsChange,
  estimatedSize,
  imageCount
}) => {
  const handleChange = (key: keyof PDFOptions, value: any) => {
    onOptionsChange({
      ...options,
      [key]: value
    });
  };

  return (
    <div className="pdf-options">
      <h3>PDF Settings</h3>
      
      <div className="options-grid">
        <div className="option-group">
          <label htmlFor="orientation">Orientation</label>
          <select
            id="orientation"
            value={options.orientation}
            onChange={(e) => handleChange('orientation', e.target.value)}
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="format">Page Format</label>
          <select
            id="format"
            value={options.format}
            onChange={(e) => handleChange('format', e.target.value)}
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="imagesPerPage">Images per Page</label>
          <select
            id="imagesPerPage"
            value={options.imagesPerPage}
            onChange={(e) => handleChange('imagesPerPage', parseInt(e.target.value))}
          >
            <option value={1}>1 image per page</option>
            <option value={2}>2 images per page</option>
            <option value={4}>4 images per page</option>
            <option value={6}>6 images per page</option>
            <option value={9}>9 images per page</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="quality">
            Image Quality: {Math.round(options.quality * 100)}%
          </label>
          <input
            id="quality"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={options.quality}
            onChange={(e) => handleChange('quality', parseFloat(e.target.value))}
            className="quality-slider"
          />
          <div className="quality-labels">
            <span>Lower size</span>
            <span>Higher quality</span>
          </div>
        </div>

        <div className="option-group">
          <label htmlFor="margin">
            Margin: {options.margin}mm
          </label>
          <input
            id="margin"
            type="range"
            min="0"
            max="30"
            step="5"
            value={options.margin}
            onChange={(e) => handleChange('margin', parseInt(e.target.value))}
            className="margin-slider"
          />
          <div className="margin-labels">
            <span>0mm</span>
            <span>30mm</span>
          </div>
        </div>
      </div>

      <div className="pdf-info">
        <div className="info-item">
          <span className="info-label">Images:</span>
          <span className="info-value">{imageCount}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Estimated pages:</span>
          <span className="info-value">
            {Math.ceil(imageCount / options.imagesPerPage)}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Estimated size:</span>
          <span className="info-value">{estimatedSize}</span>
        </div>
      </div>
    </div>
  );
};

export default PDFOptionsComponent;
