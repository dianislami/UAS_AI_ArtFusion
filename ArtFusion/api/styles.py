import json
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        styles = [
            {'id': 'monet', 'name': 'Claude Monet'},
            {'id': 'vangogh', 'name': 'Vincent Van Gogh'},
            {'id': 'cezanne', 'name': 'Paul Cezanne'},
            {'id': 'ukiyoe', 'name': 'Ukiyo-e'}
        ]
        
        response = {'success': True, 'styles': styles}
        self.wfile.write(json.dumps(response).encode())