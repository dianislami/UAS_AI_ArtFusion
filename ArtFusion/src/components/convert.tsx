import React, { useState, useRef, useEffect } from 'react';
import Modal from './modal'

const styleOptions = [
  {
    id: 1,
    name: 'Vincent Van Gogh',
    img: './images/van_gogh.png',
  },
  {
    id: 2,
    name: 'Claude Monet',
    img: './images/monet.png',
  },
  {
    id: 3,
    name: 'Paul Cezanne',
    img: './images/cezanne.png',
  },
  {
    id: 4,
    name: 'Ukiyo-e',
    img: './images/ukiyo.png',
  }
];

const API_BASE_URL = 'http://localhost:5000/api';

const ConvertPage: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0].id);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const convertRef = useRef<HTMLDivElement>(null);
  const [visibleConvert, setVisibleConvert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleConvert(true);
      },
      { threshold: 0.5 }
    );
    if (convertRef.current) observer.observe(convertRef.current);
    return () => observer.disconnect();
  }, []);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImg(ev.target?.result as string);
        setResultImg(null); // reset result
        setError(null); // reset error
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleConvert() {
    if (!uploadedImg) return;
    
    setIsConverting(true);
    setError(null);
    setResultImg(null);
    
    try {
      const selectedStyleName = styleOptions.find(s => s.id === selectedStyle)?.name;
      
      const response = await fetch(`${API_BASE_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImg,
          style: selectedStyleName
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResultImg(data.result_image);
      } else {
        setError(data.message || 'Failed to convert image');
      }
    } catch (error) {
      console.error('Error converting image:', error);
      setError('Failed to connect to server. Make sure the backend is running.');
    } finally {
      setIsConverting(false);
    }
  }

  function handleDownload() {
    if (!resultImg) return;
    
    const link = document.createElement('a');
    link.href = resultImg;
    const styleName = styleOptions.find(s => s.id === selectedStyle)?.name || 'converted';
    link.download = `${styleName.replace(/\s+/g, '_')}_image.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div ref={convertRef} className={`transition-all duration-700 px-4 ${visibleConvert ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="mb-12 lg:mb-24">
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-8 lg:mb-24"></div>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl mb-8 lg:mb-12 text-center">
          Convert Gambarmu Di Sini
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
          {/* Kiri: Pilihan Style */}
          <div className="flex flex-col items-center justify-start gap-4 lg:gap-6 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Pilih Style</h2>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-2 lg:mb-6"></div>

            <div className="flex flex-col gap-3 lg:gap-4 w-full">
              {styleOptions.map(style => (
                <button
                  key={style.id}
                  className={`flex items-center gap-4 sm:gap-6 lg:gap-12 px-4 sm:px-6 py-3 rounded-xl border-2 transition text-lg sm:text-xl lg:text-2xl shadow-lg hover:cursor-pointer ${selectedStyle === style.id ? 'border-[#F3E3B2] bg-[#F3E3B2]/20 transition-transform duration-500 ease-in-out scale-105' : 'border-transparent bg-white/5'}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <img src={style.img} alt={style.name} className="w-16 lg:w-24 h-auto object-cover rounded-lg flex-shrink-0" />
                  <span className="truncate">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kanan: Form Upload & Hasil */}
          <div className="flex flex-col items-center justify-start gap-4 lg:gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Upload Gambar</h2>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-2 lg:mb-6"></div>
            
            <form className="flex flex-col gap-4 w-full max-w-md items-center">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUpload} 
                className="block w-full text-sm sm:text-md file:mr-4 sm:file:mr-6 file:py-2 file:px-4 sm:file:px-8 file:rounded-lg file:border-0 file:text-sm sm:file:text-md file:bg-[#AB743C] file:text-[#211008] hover:file:bg-[#F3E3B2] hover:file:cursor-pointer" 
              />
              {uploadedImg && (
                <img 
                  src={uploadedImg} 
                  alt="Preview" 
                  className="p-2 lg:p-4 w-full h-full max-h-40 lg:max-h-54 object-contain rounded-xl border" 
                />
              )}
              <button 
                type="button" 
                onClick={handleConvert} 
                disabled={!uploadedImg || isConverting}
                className="py-2 sm:py-3 w-full rounded-lg bg-[#AB743C] text-[#211008] text-base sm:text-lg shadow hover:bg-[#F3E3B2] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isConverting ? 'Converting...' : 'Convert'}
              </button>
            </form>
            
            {/* Error message */}
            {error && (
              <div className="w-full max-w-md p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}
            <div className="w-full max-w-md min-h-[80px] flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-[#F3E3B2] rounded-xl bg-white/10">
              {isConverting ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F3E3B2]"></div>
                  <span className="text-base sm:text-lg font-semibold text-center px-2">Processing...</span>
                </div>
              ) : resultImg ? (
                <div className="flex flex-col items-center gap-3 w-full">
                  <img 
                    src={resultImg} 
                    alt="Hasil" 
                    className="w-full h-full max-h-40 sm:max-h-48 object-contain rounded-xl" 
                  />
                  <button 
                    onClick={() => setShowPopup(true)} 
                    className="px-4 sm:px-6 py-2 rounded-lg bg-[#AB743C] text-[#211008] hover:bg-[#F3E3B2] transition font-semibold w-full text-sm sm:text-base"
                  >
                    Lihat & Download
                  </button>
                </div>
              ) : (
                <span className="text-base sm:text-lg font-semibold text-center px-2">Hasil akan muncul di sini</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        resultImg={resultImg || ''}
        onDownload={handleDownload}
        styleName={styleOptions.find(s => s.id === selectedStyle)?.name || 'Unknown'}
      />
    </div>
  );
};

export default ConvertPage;