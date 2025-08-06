import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS

# Add the src directory to the path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')

# Enable CORS for all routes
CORS(app, origins=['*'])

# Health check endpoint for Railway
@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'DSCPL Spiritual Companion API is running',
        'version': '1.0.0'
    }), 200

# Root API endpoint
@app.route('/api')
def api_root():
    return jsonify({
        'message': 'DSCPL Spiritual Companion API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health'
        }
    })

# Root endpoint
@app.route('/')
def root():
    return jsonify({
        'message': 'DSCPL Spiritual Companion API',
        'version': '1.0.0',
        'status': 'running'
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"Starting Flask app on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
