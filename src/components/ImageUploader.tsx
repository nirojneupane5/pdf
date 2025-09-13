import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.css';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploaderProps {
  onImagesSelected: (images: ImageFile[]) => void;
  images: ImageFile[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected, images }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );

    const newImages: ImageFile[] = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    onImagesSelected([...images, ...newImages]);
    setIsDragActive(false);
  }, [images, onImagesSelected]);

  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onDrop(files);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    onImagesSelected(updatedImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesSelected(newImages);
  };

  return (
    <div className="image-uploader">
      <div className="upload-section">
        <div 
          {...getRootProps()} 
          className={`dropzone ${dropzoneActive || isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <div className="upload-icon">📁</div>
            <p className="upload-text">
              Drag & drop images here, or click to select files
            </p>
            <p className="upload-subtext">
              Supports: JPG, PNG, GIF, BMP, WebP
            </p>
          </div>
        </div>

        <div className="folder-upload">
          <label htmlFor="folder-input" className="folder-button">
            📂 Select Folder
          </label>
          <input
            id="folder-input"
            type="file"
            {...({ webkitdirectory: "" } as any)}
            multiple
            onChange={handleFolderSelect}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {images.length > 0 && (
        <div className="image-preview-section">
          <h3>Selected Images ({images.length})</h3>
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={image.id} className="image-item">
                <div className="image-controls">
                  <button
                    className="move-button"
                    onClick={() => moveImage(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveImage(index, Math.min(images.length - 1, index + 1))}
                    disabled={index === images.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => removeImage(image.id)}
                  >
                    ✕
                  </button>
                </div>
                <img 
                  src={image.preview} 
                  alt={image.file.name}
                  className="preview-image"
                />
                <p className="image-name">{image.file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
