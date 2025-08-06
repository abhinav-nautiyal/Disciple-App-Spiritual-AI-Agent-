#!/usr/bin/env python3
"""
Simple startup script for Flask app
"""
import os
import sys
import subprocess

def main():
    print("Starting DSCPL Backend...")
    
    # Set environment variables if not present
    if not os.getenv('SECRET_KEY'):
        os.environ['SECRET_KEY'] = 'dev-secret-key'
    
    # Get port from environment or default
    port = os.getenv('PORT', '5001')
    print(f"Using port: {port}")
    
    # Start the Flask app
    try:
        # Change to backend directory
        os.chdir(os.path.dirname(__file__))
        
        # Start Flask app
        subprocess.run([
            'python3.11', 'src/main.py'
        ], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"Error starting Flask app: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main() 