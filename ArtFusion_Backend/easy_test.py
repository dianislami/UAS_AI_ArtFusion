#!/usr/bin/env python3
"""
Easy Test Script untuk ArtFusion Backend
Script ini memudahkan testing model dengan berbagai style
"""

import os
import sys
import subprocess
import argparse

def run_test(style, input_path, num_images=1):
    """
    Menjalankan test untuk style tertentu
    
    Args:
        style: nama style (monet, vangogh, cezanne, ukiyoe)
        input_path: path ke folder/file gambar input
        num_images: jumlah gambar yang akan diproses
    """
    
    style_models = {
        'monet': 'style_monet_pretrained',
        'vangogh': 'style_vangogh_pretrained', 
        'cezanne': 'style_cezanne_pretrained',
        'ukiyoe': 'style_ukiyoe_pretrained'
    }
    
    if style not in style_models:
        print(f"Error: Style '{style}' tidak tersedia.")
        print(f"Style yang tersedia: {list(style_models.keys())}")
        return False
    
    model_name = style_models[style]
    
    # Command untuk menjalankan test
    cmd = [
        'python', 'test.py',
        '--dataroot', input_path,
        '--name', model_name,
        '--model', 'test',
        '--no_dropout',
        '--num_test', str(num_images)
    ]
    
    print(f"\n🎨 Memulai style transfer dengan style: {style.upper()}")
    print(f"📁 Input: {input_path}")
    print(f"🖼️  Jumlah gambar: {num_images}")
    print("=" * 50)
    
    try:
        result = subprocess.run(cmd, check=True)
        print(f"\n✅ Test berhasil!")
        print(f"📂 Hasil disimpan di: ./results/{model_name}/test_latest/")
        print(f"🌐 Buka file: ./results/{model_name}/test_latest/index.html")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error saat menjalankan test: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Easy Test Script untuk ArtFusion')
    parser.add_argument('style', choices=['monet', 'vangogh', 'cezanne', 'ukiyoe'], 
                       help='Pilih style untuk transfer')
    parser.add_argument('--input', '-i', default='./test_images', 
                       help='Path ke folder atau file gambar input (default: ./test_images)')
    parser.add_argument('--num', '-n', type=int, default=3,
                       help='Jumlah gambar yang akan diproses (default: 3)')
    
    args = parser.parse_args()
    
    # Cek apakah input path ada
    if not os.path.exists(args.input):
        print(f"❌ Error: Path '{args.input}' tidak ditemukan!")
        return
    
    # Jalankan test
    success = run_test(args.style, args.input, args.num)
    
    if success:
        print(f"\n🎉 Selesai! Silakan cek hasil di folder results/")
        
        # Buka hasil di browser (opsional)
        style_models = {
            'monet': 'style_monet_pretrained',
            'vangogh': 'style_vangogh_pretrained', 
            'cezanne': 'style_cezanne_pretrained',
            'ukiyoe': 'style_ukiyoe_pretrained'
        }
        
        html_path = f"./results/{style_models[args.style]}/test_latest/index.html"
        if os.path.exists(html_path):
            print(f"💡 Untuk melihat hasil, buka: {html_path}")

if __name__ == "__main__":
    main()