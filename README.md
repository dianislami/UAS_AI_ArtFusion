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

## 📋 Prerequisites

Sebelum memulai, pastikan sistem Anda sudah terinstall:

### Untuk Frontend:
- **Node.js** (v18.0.0 atau lebih baru)
- **npm** (biasanya sudah terinstall dengan Node.js)
- **Git**

### Untuk Backend:
- **Python** (v3.8 - v3.10, disarankan v3.10)
- **pip** (package manager Python)
- **Git**

### Cek Instalasi:
```bash
# Cek Node.js
node --version

# Cek npm
npm --version

# Cek Python
python --version

# Cek pip
pip --version

# Cek Git
git --version
```

## 🛠️ Setup Lengkap dari Awal

### 1. Clone Repository

```bash
# Clone repository
git clone [URL_REPOSITORY_ANDA]
cd [NAMA_FOLDER_REPOSITORY]

# Atau jika belum ada repository, buat folder baru
mkdir ArtFusion-Project
cd ArtFusion-Project
```

### 2. Setup Frontend

```bash
# Masuk ke folder frontend
cd ArtFusion

# Install dependencies
npm install

# Jika ada error, coba:
npm install --legacy-peer-deps

# Atau hapus node_modules dan install ulang:
rm -rf node_modules package-lock.json
npm install
```

#### Dependencies Frontend:
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@types/node": "^22.8.6",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.15.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.12.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.2",
    "typescript-eslint": "^8.15.0",
    "vite": "^6.0.1"
  }
}
```

### 3. Setup Backend

```bash
# Masuk ke folder backend
cd ../ArtFusion_Backend

# Buat virtual environment (disarankan)
python -m venv venv

# Aktifkan virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Jika ada error, install satu per satu:
pip install Flask==2.3.2
pip install torch==2.0.1
pip install torchvision==0.15.2
pip install Pillow==9.5.0
pip install flask-cors==4.0.0
pip install dominate==2.8.0
pip install visdom==0.2.4
```

#### Dependencies Backend (requirements.txt):
```txt
Flask==2.3.2
torch==2.0.1
torchvision==0.15.2
Pillow==9.5.0
flask-cors==4.0.0
dominate==2.8.0
visdom==0.2.4
```

### 4. Download Model Pre-trained

Model CycleGAN pre-trained sudah ada di folder `checkpoints/`, tapi jika belum ada:

```bash
# Pastikan ada folder checkpoints dengan structure:
checkpoints/
├── style_vangogh_pretrained/
│   ├── latest_net_G.pth
│   └── test_opt.txt
├── style_monet_pretrained/
│   ├── latest_net_G.pth
│   └── test_opt.txt
├── style_cezanne_pretrained/
│   ├── latest_net_G.pth
│   └── test_opt.txt
└── style_ukiyoe_pretrained/
    ├── latest_net_G.pth
    └── test_opt.txt
```

## 🔧 Running di Development

### 1. Jalankan Backend

```bash
# Masuk ke folder backend
cd ArtFusion_Backend

# Aktifkan virtual environment jika belum
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Jalankan Flask server
python app.py

# Server akan berjalan di: http://localhost:5000
```

### 2. Jalankan Frontend

Buka terminal baru:

```bash
# Masuk ke folder frontend
cd ArtFusion

# Jalankan development server
npm run dev

# Server akan berjalan di: http://localhost:5173
```

### 3. Test Aplikasi

1. Buka browser ke `http://localhost:5173`
2. Upload gambar
3. Pilih style
4. Klik "Transform Image"
5. Download hasil

## 📂 Struktur Proyek Lengkap

```
ArtFusion-Project/
│
├── ArtFusion/                     # Frontend React
│   ├── public/
│   │   ├── images/                # Tempat gambar demo
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── convert.tsx        # Komponen utama style transfer
│   │   │   ├── hero_section.tsx   # Section hero
│   │   │   ├── navbar.tsx         # Navigation bar
│   │   │   ├── about.tsx          # Section about
│   │   │   ├── team.tsx           # Section team
│   │   │   ├── footer.tsx         # Footer
│   │   │   ├── modal.tsx          # Modal component
│   │   │   ├── card_stack.tsx     # Card component
│   │   │   └── team_card.tsx      # Team card component
│   │   ├── lib/
│   │   │   └── utils.ts           # Utility functions
│   │   ├── assets/                # Static assets
│   │   ├── App.tsx                # Main App component
│   │   ├── App.css                # App styles
│   │   ├── index.css              # Global styles
│   │   ├── landing_page.tsx       # Landing page component
│   │   └── main.tsx               # Entry point
│   ├── components.json            # shadcn/ui config
│   ├── eslint.config.js           # ESLint config
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencies & scripts
│   ├── postcss.config.js          # PostCSS config
│   ├── tailwind.config.js         # Tailwind config
│   ├── tsconfig.json              # TypeScript config
│   ├── tsconfig.app.json          # App TypeScript config
│   ├── tsconfig.node.json         # Node TypeScript config
│   ├── vite.config.ts             # Vite config
│   ├── vercel.json                # Vercel deployment config
│   └── README.md                  # Documentation
│
└── ArtFusion_Backend/             # Backend Flask API
    ├── checkpoints/               # Pre-trained models
    │   ├── style_vangogh_pretrained/
    │   │   ├── latest_net_G.pth
    │   │   └── test_opt.txt
    │   ├── style_monet_pretrained/
    │   ├── style_cezanne_pretrained/
    │   └── style_ukiyoe_pretrained/
    ├── data/                      # Data loading modules
    │   ├── __init__.py
    │   ├── aligned_dataset.py
    │   ├── base_dataset.py
    │   ├── colorization_dataset.py
    │   ├── image_folder.py
    │   ├── single_dataset.py
    │   ├── template_dataset.py
    │   └── unaligned_dataset.py
    ├── models/                    # Neural network models
    │   ├── __init__.py
    │   ├── base_model.py
    │   ├── colorization_model.py
    │   ├── cycle_gan_model.py
    │   ├── networks.py
    │   ├── pix2pix_model.py
    │   ├── template_model.py
    │   └── test_model.py
    ├── options/                   # Configuration options
    │   ├── __init__.py
    │   ├── base_options.py
    │   ├── test_options.py
    │   └── train_options.py
    ├── results/                   # Generated results
    ├── test_images/               # Test images
    ├── util/                      # Utility functions
    │   ├── __init__.py
    │   ├── get_data.py
    │   ├── html.py
    │   ├── image_pool.py
    │   ├── util.py
    │   └── visualizer.py
    ├── app.py                     # Flask API server
    ├── test.py                    # Model inference script
    ├── requirements.txt           # Python dependencies
    └── Procfile                   # Process file untuk deployment
```

## 🌐 Deployment Production

### Deploy Frontend ke Vercel

1. **Persiapan:**
```bash
# Build production
cd ArtFusion
npm run build

# Test build locally
npm run preview
```

2. **Deploy ke Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

3. **Konfigurasi vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy Backend ke PythonAnywhere

1. **Upload Files:**
   - Upload semua file backend ke PythonAnywhere
   - Pastikan struktur folder sama

2. **Install Dependencies:**
```bash
# Di console PythonAnywhere
pip3.10 install --user Flask==2.3.2
pip3.10 install --user torch==2.0.1
pip3.10 install --user torchvision==0.15.2
pip3.10 install --user Pillow==9.5.0
pip3.10 install --user flask-cors==4.0.0
pip3.10 install --user dominate==2.8.0
pip3.10 install --user visdom==0.2.4
```

3. **Configure WSGI:**
```python
import sys
import os

# Add your project directory to sys.path
path = '/home/yourusername/ArtFusion_Backend'
if path not in sys.path:
    sys.path.append(path)

# Add the user-installed packages to sys.path
user_packages = '/home/yourusername/.local/lib/python3.10/site-packages'
if user_packages not in sys.path:
    sys.path.insert(0, user_packages)

from app import app as application

if __name__ == "__main__":
    application.run()
```

## 📚 Cara Penggunaan

1. **Buka Aplikasi**: Kunjungi URL deployment atau localhost
2. **Upload Gambar**: Klik "Choose File" atau drag & drop
3. **Pilih Style**: Pilih Van Gogh, Monet, Cezanne, atau Ukiyo-e
4. **Transform**: Klik "Transform Image" dan tunggu
5. **Download**: Unduh hasil yang sudah jadi

## 🔥 API Documentation

### Health Check
```http
GET /api/health
```

**Response:**
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

**Parameters:**
- `file`: Image file (jpg, png, jpeg) - max 10MB
- `style`: Style type (`vangogh`, `monet`, `cezanne`, `ukiyoe`)

**Response Success:**
```json
{
  "success": true,
  "result_image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD..."
}
```

**Response Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🧠 Tentang Model AI

ArtFusion menggunakan **CycleGAN** (Cycle-Consistent Generative Adversarial Networks):

### Spesifikasi Teknis:
- **Architecture**: CycleGAN dengan ResNet generator
- **Input Resolution**: 256x256 pixels
- **Training Dataset**: Paintings dari master artists
- **Framework**: PyTorch 2.0
- **Model Size**: ~45MB per style

### Cara Kerja:
1. **Input Processing**: Resize dan normalize gambar
2. **Style Transfer**: CycleGAN mentransfer style artistik
3. **Post Processing**: Convert kembali ke format normal
4. **Output**: Gambar dengan style baru

## 🛠️ Development Tips

### Frontend Development:
```bash
# Hot reload untuk development
npm run dev

# Linting
npm run lint

# Type checking
npm run type-check

# Build untuk production
npm run build
```

### Backend Development:
```bash
# Debug mode
export FLASK_DEBUG=1
python app.py

# Test API endpoint
curl -X GET http://localhost:5000/api/health

# Test style transfer
curl -X POST -F "file=@test.jpg" -F "style=vangogh" http://localhost:5000/api/convert
```

### Common Issues & Solutions:

1. **CORS Error**: Pastikan flask-cors terinstall dan dikonfigurasi
2. **Model Not Found**: Cek path ke folder checkpoints
3. **Memory Error**: Resize gambar ke ukuran lebih kecil
4. **Port Already in Use**: Ganti port di konfigurasi

## 👥 Tim Pengembang

- **Lead Developer**: [Nama Anda]
- **AI Engineer**: [Nama Tim]  
- **Frontend Developer**: [Nama Tim]
- **Backend Developer**: [Nama Tim]

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License.

## 🤝 Kontribusi

1. Fork repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📞 Support

- **Issues**: [GitHub Issues]
- **Email**: [your-email@domain.com]
- **Documentation**: [Link to full docs]

## 🔮 Roadmap

- [ ] Tambah gaya artistik baru (Picasso, Da Vinci)
- [ ] Real-time webcam style transfer
- [ ] Mobile app (React Native)
- [ ] Batch processing multiple images
- [ ] API untuk third-party developers
- [ ] Performance optimization

---

**⭐ Star repo ini jika bermanfaat!**
