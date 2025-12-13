import sys
import os
import base64
import tempfile
import uuid
import subprocess
from io import BytesIO
from PIL import Image
import json

# Add parent directory to path untuk import modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

def handler(request):
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
    
    # Handle preflight requests
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Parse JSON body
        body = json.loads(request.body)
        image_data = body.get('image')
        style = body.get('style')
        
        if not image_data or not style:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Missing image or style'})
            }
        
        # Style mapping
        style_mapping = {
            'monet': 'style_monet_pretrained',
            'vangogh': 'style_vangogh_pretrained', 
            'cezanne': 'style_cezanne_pretrained',
            'ukiyoe': 'style_ukiyoe_pretrained'
        }
        
        if style not in style_mapping:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid style'})
            }
        
        # Decode base64 image
        image_data = image_data.split(',')[1] if ',' in image_data else image_data
        image_bytes = base64.b64decode(image_data)
        
        # Save temp image
        temp_dir = tempfile.gettempdir()
        input_filename = f"input_{uuid.uuid4()}.jpg"
        input_path = os.path.join(temp_dir, input_filename)
        
        with open(input_path, 'wb') as f:
            f.write(image_bytes)
        
        # Run style transfer
        backend_dir = os.path.dirname(__file__ + '/..')
        style_dir = style_mapping[style]
        
        cmd = [
            'python', os.path.join(backend_dir, 'test.py'),
            '--dataroot', temp_dir,
            '--name', style_dir,
            '--model', 'test',
            '--no_dropout',
            '--load_size', '256',
            '--crop_size', '256',
            '--batch_size', '1',
            '--gpu_ids', '-1',
            '--num_test', '1',
            '--epoch', 'latest',
            '--preprocess', 'resize_and_crop'
        ]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=25)
            
            if result.returncode != 0:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({'error': f'Style transfer failed: {result.stderr}'})
                }
            
            # Find output image
            results_dir = os.path.join(backend_dir, 'results', style_dir, 'test_latest', 'images')
            output_filename = f"{os.path.splitext(input_filename)[0]}_fake_B.png"
            output_path = os.path.join(results_dir, output_filename)
            
            if not os.path.exists(output_path):
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({'error': 'Output image not found'})
                }
            
            # Read and encode output image
            with open(output_path, 'rb') as f:
                output_bytes = f.read()
                output_base64 = base64.b64encode(output_bytes).decode('utf-8')
            
            # Cleanup temp files
            try:
                os.remove(input_path)
                os.remove(output_path)
            except:
                pass
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'image': f"data:image/png;base64,{output_base64}"
                })
            }
            
        except subprocess.TimeoutExpired:
            return {
                'statusCode': 408,
                'headers': headers,
                'body': json.dumps({'error': 'Request timeout'})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': f'Internal server error: {str(e)}'})
        }