import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImg: string;
  onDownload: () => void;
  styleName: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, resultImg, onDownload, styleName }) => {
  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-[#211008] rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl border-2 border-[#F3E3B2] shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F3E3B2] leading-tight">
            Hasil Konversi - {styleName}
          </h3>
          <button 
            onClick={onClose} 
            className="text-[#F3E3B2] hover:text-white text-2xl sm:text-3xl leading-none transition flex-shrink-0"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        {/* Image Container */}
        <div className="mb-4 sm:mb-6 bg-white/5 p-3 sm:p-4 rounded-xl">
          <img 
            src={resultImg} 
            alt="Hasil Konversi" 
            className="w-full h-auto max-h-[50vh] sm:max-h-[55vh] lg:max-h-[60vh] object-contain rounded-lg" 
          />
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg bg-white/10 text-[#F3E3B2] hover:bg-white/20 transition text-sm sm:text-base order-2 sm:order-1 sm:ml-auto"
          >
            Tutup
          </button>
          <button 
            onClick={onDownload} 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg bg-[#AB743C] text-[#211008] hover:bg-[#F3E3B2] transition font-semibold text-sm sm:text-base order-1 sm:order-2"
          >
            Download Gambar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;