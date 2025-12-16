# 🎨 ArtFusion - AI-Powered Image Style Transfer

ArtFusion adalah aplikasi web yang memungkinkan pengguna untuk mengubah gaya foto mereka menggunakan kecerdasan buatan dengan teknik **style transfer**. Aplikasi ini menggunakan model **CycleGAN** yang telah dilatih untuk mentransfer gaya artistik dari pelukis terkenal ke foto pengguna.

## 📸 Demo Hasil Transformasi

### Gaya Van Gogh
<img src="images/vangogh-before-after.jpg" alt="Van Gogh Style Comparison" width="800"/>

### Gaya Monet
<img src="images/monet-before-after.jpg" alt="Monet Style Comparison" width="800"/>

### Gaya Cezanne
<img src="images/cezanne-before-after.jpg" alt="Cezanne Style Comparison" width="800"/>

### Gaya Ukiyo-e
<img src="images/ukiyoe-before-after.jpg" alt="Ukiyo-e Style Comparison" width="800"/>

## 🚀 Fitur Utama

- **Style Transfer AI**: Menggunakan model CycleGAN untuk mentransfer gaya artistik
- **4 Gaya Artistik**: Van Gogh, Monet, Cezanne, dan Ukiyo-e
- **Interface Modern**: UI/UX yang intuitif dengan design responsif
- **Upload Mudah**: Drag & drop atau click untuk upload gambar
- **Preview Real-time**: Melihat hasil transformasi secara langsung
- **Download Hasil**: Unduh gambar yang telah ditransformasi

## 🏗️ Arsitektur Aplikasi

### Frontend (React + TypeScript)
| Teknologi | Versi/Detail |
|-----------|--------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Deployment** | Vercel |
| **Live URL** | [art-fusion-pearl.vercel.app](https://art-fusion-pearl.vercel.app) |

### Backend (Flask + PyTorch)
| Teknologi | Versi/Detail |
|-----------|--------------|
| **Framework** | Flask Python API |
| **AI Engine** | PyTorch 2.0 |
| **Model** | CycleGAN pre-trained |
| **Deployment** | PythonAnywhere |
| **API URL** | `https://arifinn.pythonanywhere.com` |

## 🛠️ Teknologi Stack

### Frontend
