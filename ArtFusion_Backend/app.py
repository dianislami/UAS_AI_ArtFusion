from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import base64
import io
from PIL import Image
import tempfile
import subprocess
import shutil
from pathlib import Path
import uuid
import json

app = Flask(__name__)
CORS(app)  # Enable CORS untuk frontend

# Mapping style name ke model name
STYLE_MAPPING = {
    'Vincent Van Gogh': 'style_vangogh_pretrained',
    'Claude Monet': 'style_monet_pretrained', 
    'Paul Cezanne': 'style_cezanne_pretrained',
    'Ukiyo-e': 'style_ukiyoe_pretrained'
}

@app.route('/api/styles', methods=['GET'])
def get_styles():
    """Endpoint untuk mendapatkan list style yang tersedia"""
    styles = list(STYLE_MAPPING.keys())
    return jsonify({
        'success': True,
        'styles': styles
    })

@app.route('/api/convert', methods=['POST'])
def convert_image():
    """Endpoint untuk convert gambar dengan style tertentu"""
    try:
        # Get data from request
        data = request.get_json()
        
        if not data or 'image' not in data or 'style' not in data:
            return jsonify({
                'success': False,
                'message': 'Missing image or style parameter'
            }), 400
        
        image_data = data['image']
        style_name = data['style']
        
        # Validate style
        if style_name not in STYLE_MAPPING:
            return jsonify({
                'success': False,
                'message': f'Invalid style. Available styles: {list(STYLE_MAPPING.keys())}'
            }), 400
        
        # Decode base64 image
        try:
            # Remove data URL prefix if exists
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            
            # Decode base64
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert to RGB if necessary
            if image.mode in ['RGBA', 'P']:
                image = image.convert('RGB')
                
        except Exception as e:
            return jsonify({
                'success': False,
                'message': f'Invalid image data: {str(e)}'
            }), 400
        
        # Generate unique filename
        unique_id = str(uuid.uuid4())
        temp_dir = f'./temp_{unique_id}'
        os.makedirs(temp_dir, exist_ok=True)
        
        # Save input image
        input_filename = f'input_{unique_id}.jpg'
        input_path = os.path.join(temp_dir, input_filename)
        image.save(input_path, 'JPEG', quality=95)
        
        # Get model name
        model_name = STYLE_MAPPING[style_name]
        
        # Run style transfer
        cmd = [
            'python', 'test.py',
            '--dataroot', temp_dir,
            '--name', model_name,
            '--model', 'test',
            '--no_dropout',
            '--num_test', '1'
        ]
        
        try:
            # Run the command
            result = subprocess.run(cmd, capture_output=True, text=True, cwd='./')
            
            if result.returncode != 0:
                print(f"Error running style transfer: {result.stderr}")
                return jsonify({
                    'success': False,
                    'message': 'Failed to process image'
                }), 500
            
            # Get result image path
            base_name = os.path.splitext(input_filename)[0]
            result_image_path = f'./results/{model_name}/test_latest/images/{base_name}_fake.png'
            
            if not os.path.exists(result_image_path):
                return jsonify({
                    'success': False,
                    'message': 'Result image not generated'
                }), 500
            
            # Read result image and convert to base64
            with open(result_image_path, 'rb') as img_file:
                result_image_bytes = img_file.read()
                result_base64 = base64.b64encode(result_image_bytes).decode('utf-8')
            
            # Clean up temp directory
            shutil.rmtree(temp_dir, ignore_errors=True)
            
            return jsonify({
                'success': True,
                'result_image': f'data:image/png;base64,{result_base64}',
                'message': 'Image processed successfully'
            })
            
        except Exception as e:
            print(f"Error during processing: {str(e)}")
            # Clean up temp directory
            shutil.rmtree(temp_dir, ignore_errors=True)
            return jsonify({
                'success': False,
                'message': f'Processing failed: {str(e)}'
            }), 500
    
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Unexpected error: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint untuk health check"""
    return jsonify({
        'success': True,
        'message': 'ArtFusion Backend is running!'
    })

if __name__ == '__main__':
    print("🎨 Starting ArtFusion Backend API...")
    print("📡 Server will run on http://localhost:5000")
    print("🚀 Available endpoints:")
    print("   GET  /api/health - Health check")
    print("   GET  /api/styles - Get available styles") 
    print("   POST /api/convert - Convert image with selected style")
    print()
    
    app.run(debug=True, host='0.0.0.0', port=5000)