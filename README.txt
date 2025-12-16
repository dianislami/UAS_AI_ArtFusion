# 🎨 ArtFusion - AI-Powered Image Style Transfer

ArtFusion adalah aplikasi web yang memungkinkan pengguna untuk mengubah gaya foto mereka menggunakan kecerdasan buatan dengan teknik style transfer. Aplikasi ini menggunakan model CycleGAN yang telah dilatih untuk mentransfer gaya artistik dari pelukis terkenal ke foto pengguna.

## 📸 Demo Hasil Transformasi

### Gaya Van Gogh
<!-- Masukkan gambar perbandingan Van Gogh di sini -->
![Van Gogh Style Comparison](images/vangogh-before-after.jpg)

### Gaya Monet
<!-- Masukkan gambar perbandingan Monet di sini -->
![Monet Style Comparison](images/monet-before-after.jpg)

### Gaya Cezanne
<!-- Masukkan gambar perbandingan Cezanne di sini -->
![Cezanne Style Comparison](images/cezanne-before-after.jpg)

### Gaya Ukiyo-e
<!-- Masukkan gambar perbandingan Ukiyo-e di sini -->
![Ukiyo-e Style Comparison](images/ukiyoe-before-after.jpg)

## 🚀 Fitur Utama

- **Style Transfer AI**: Menggunakan model CycleGAN untuk mentransfer gaya artistik
- **4 Gaya Artistik**: Van Gogh, Monet, Cezanne, dan Ukiyo-e
- **Interface Modern**: UI/UX yang intuitif dengan design responsif
- **Upload Mudah**: Drag & drop atau click untuk upload gambar
- **Preview Real-time**: Melihat hasil transformasi secara langsung
- **Download Hasil**: Unduh gambar yang telah ditransformasi

## 🏗️ Arsitektur Aplikasi

### Frontend (React + TypeScript)
- **Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel
- **URL**: [https://art-fusion-pearl.vercel.app](https://art-fusion-pearl.vercel.app)

### Backend (Flask + PyTorch)
- **Framework**: Flask Python API
- **AI Engine**: PyTorch 2.0
- **Model**: CycleGAN pre-trained models
- **Deployment**: PythonAnywhere
- **API URL**: `https://arifinn.pythonanywhere.com`

## 🛠️ Teknologi yang Digunakan

### Frontend Stack
```json
{
  "react": "^18.3.1",
  "typescript": "^5.6.2",
  "vite": "^6.0.1",
  "tailwindcss": "^4.0.0",
  "@types/react": "^18.3.12",
  "eslint": "^9.15.0"
}
```

### Backend Stack
```txt
Flask==2.3.2
torch==2.0.1
torchvision==0.15.2
Pillow==9.5.0
flask-cors==4.0.0
dominate==2.8.0
visdom==0.2.4
```

## 📂 Struktur Proyek

```
ArtFusion/
├── src/
│   ├── components/
│   │   ├── convert.tsx         # Komponen utama style transfer
│   │   ├── hero_section.tsx    # Section hero halaman utama
│   │   ├── navbar.tsx          # Navigation bar
│   │   ├── about.tsx           # Section tentang aplikasi
│   │   ├── team.tsx            # Section tim pengembang
│   │   └── footer.tsx          # Footer aplikasi
│   ├── App.tsx                 # Komponen utama aplikasi
│   └── main.tsx               # Entry point
├── public/                    # Asset statis
├── package.json              # Dependencies frontend
└── vercel.json              # Konfigurasi deployment Vercel

ArtFusion_Backend/
├── checkpoints/              # Model CycleGAN pre-trained
│   ├── style_vangogh_pretrained/
│   ├── style_monet_pretrained/
│   ├── style_cezanne_pretrained/
│   └── style_ukiyoe_pretrained/
├── models/                   # Definisi model neural network
├── data/                     # Data loader dan preprocessing
├── util/                     # Utility functions
├── app.py                   # Flask API server
├── test.py                  # Script inference model
└── requirements.txt         # Dependencies backend
```

## 🔧 Setup dan Instalasi

### Frontend Setup
```bash
cd ArtFusion
npm install
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend Setup
```bash
cd ArtFusion_Backend
pip install -r requirements.txt
python app.py        # Start Flask server
```

## 🌐 Deployment

### Frontend di Vercel
1. Connect repository ke Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy otomatis setiap push ke main branch

### Backend di PythonAnywhere
1. Upload semua file backend ke PythonAnywhere
2. Install dependencies: `pip3.10 install --user -r requirements.txt`
3. Configure WSGI file dengan Python path yang benar
4. Reload web application

## 📚 Cara Penggunaan

1. **Buka Aplikasi**: Kunjungi [https://art-fusion-pearl.vercel.app](https://art-fusion-pearl.vercel.app)
2. **Upload Gambar**: Klik tombol "Choose File" atau drag & drop gambar
3. **Pilih Gaya**: Pilih salah satu dari 4 gaya artistik yang tersedia
4. **Proses**: Klik "Transform Image" dan tunggu proses selesai
5. **Download**: Unduh hasil transformasi yang telah selesai

## 🔥 API Endpoints

### Health Check
```http
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "message": "ArtFusion API is running"
}
```

### Style Transfer
```http
POST /api/convert
Content-Type: multipart/form-data
```
Parameters:
- `file`: Image file (jpg, png, jpeg)
- `style`: Style type (vangogh, monet, cezanne, ukiyoe)

Response:
```json
{
  "success": true,
  "result_image": "base64_encoded_image"
}
```

## 🧠 Tentang Model AI

ArtFusion menggunakan **CycleGAN** (Cycle-Consistent Generative Adversarial Networks) untuk melakukan style transfer. Model ini telah dilatih menggunakan:

- **Dataset Van Gogh**: Painting karya Vincent van Gogh
- **Dataset Monet**: Painting karya Claude Monet  
- **Dataset Cezanne**: Painting karya Paul Cézanne
- **Dataset Ukiyo-e**: Traditional Japanese woodblock prints

### Spesifikasi Teknis Model
- **Architecture**: CycleGAN dengan ResNet generator
- **Input Size**: 256x256 pixels
- **Training**: Adversarial loss + cycle consistency loss
- **Framework**: PyTorch 2.0

## 👥 Tim Pengembang

- **Lead Developer**: [Nama Anda]
- **UI/UX Designer**: [Nama Tim]
- **AI Engineer**: [Nama Tim]
- **DevOps**: [Nama Tim]

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk detail lebih lanjut.

## 🤝 Kontribusi

Kontribusi sangat welcome! Silakan:
1. Fork repository ini
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:
- Email: [your-email@domain.com]
- GitHub Issues: [Link to issues]
- Documentation: [Link to docs]

## 🔮 Roadmap

- [ ] Tambah gaya artistik baru (Picasso, Da Vinci, dll)
- [ ] Optimasi performa model untuk processing lebih cepat
- [ ] Mobile app (React Native)
- [ ] Batch processing untuk multiple images
- [ ] Real-time style transfer dengan webcam
- [ ] API untuk developer third-party

---

**⭐ Jika project ini bermanfaat, jangan lupa kasih star di GitHub!**

