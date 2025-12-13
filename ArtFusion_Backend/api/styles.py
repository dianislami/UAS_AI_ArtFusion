import json

def handler(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type'
    }
    
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    styles = [
        {'id': 'monet', 'name': 'Monet'},
        {'id': 'vangogh', 'name': 'Van Gogh'},
        {'id': 'cezanne', 'name': 'Cezanne'},
        {'id': 'ukiyoe', 'name': 'Ukiyo-e'}
    ]
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'styles': styles})
    }