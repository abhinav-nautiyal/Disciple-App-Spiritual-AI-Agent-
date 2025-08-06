import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, render_template, jsonify
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.ai_chat import ai_chat_bp
from src.routes.spiritual_programs import spiritual_programs_bp
from src.routes.calendar_integration import calendar_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')

# Enable CORS for all routes
CORS(app, origins=['http://localhost:5173', 'http://localhost:3000', '*'])

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(ai_chat_bp, url_prefix='/api/chat')
app.register_blueprint(spiritual_programs_bp, url_prefix='/api/spiritual-programs')
app.register_blueprint(calendar_bp, url_prefix='/api/calendar')

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
            'health': '/api/health',
            'chat': '/api/chat',
            'spiritual-programs': '/api/spiritual-programs',
            'calendar': '/api/calendar'
        }
    })

# Serve React frontend
@app.route('/')
def serve_frontend():
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404
    
    index_path = os.path.join(static_folder_path, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(static_folder_path, 'index.html')
    else:
        return jsonify({
            'message': 'DSCPL Spiritual Companion API',
            'version': '1.0.0',
            'note': 'Frontend not built yet'
        })

@app.route('/<path:path>')
def serve_frontend_routes(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404
    
    # Check if it's a static file
    if '.' in path:
        file_path = os.path.join(static_folder_path, path)
        if os.path.exists(file_path):
            return send_from_directory(static_folder_path, path)
    
    # Otherwise serve the React app
    index_path = os.path.join(static_folder_path, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(static_folder_path, 'index.html')
    else:
        return jsonify({
            'message': 'DSCPL Spiritual Companion API',
            'version': '1.0.0',
            'note': 'Frontend not built yet'
        })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
