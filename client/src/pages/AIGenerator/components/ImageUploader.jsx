import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';

export const ImageUploader = ({ image, setImage }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageMeta, setImageMeta] = useState(null);

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setImageMeta({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setImage(null);
    setImageMeta(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="qm-ai-image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
          }
        }}
      />

      {!image ? (
        <div
          className={`qm-ai-dropzone ${isDragging ? 'dragging' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="qm-ai-dropzone-icon">
            <UploadCloud size={36} />
          </div>
          <div className="qm-ai-dropzone-text">
            <p className="qm-dropzone-title">
              <strong>Drag & drop an image</strong> or <span className="qm-dropzone-link">browse</span>
            </p>
            <p className="qm-dropzone-hint">
              Supports textbook photos, handwritten notes, infographics, or slide screenshots (PNG, JPG up to 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="qm-ai-image-preview-card">
          <div className="qm-ai-preview-thumb-container">
            <img src={image} alt="Uploaded material" className="qm-ai-preview-thumb" />
          </div>
          <div className="qm-ai-preview-info">
            <div className="qm-ai-preview-header">
              <span className="qm-ai-status-badge">
                <CheckCircle2 size={14} /> Ready for Vision Analysis
              </span>
              <button
                type="button"
                className="qm-ai-remove-image-btn"
                onClick={handleRemove}
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <p className="qm-ai-filename">{imageMeta?.name || 'Uploaded Image'}</p>
            <p className="qm-ai-filesize">{imageMeta?.size || ''}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
