#!/usr/bin/env python3
"""
Simple test script to verify Flask app starts correctly
"""
import os
import sys
import requests
import time
import subprocess
import signal

# Add the src directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

def test_flask_app():
    """Test if Flask app starts and responds to health check"""
    print("Testing Flask app...")
    
    # Start the Flask app in a subprocess
    process = subprocess.Popen([
        'python3.11', 'src/main.py'
    ], cwd=os.path.dirname(__file__))
    
    try:
        # Wait for app to start
        print("Waiting for app to start...")
        time.sleep(5)
        
        # Test health check endpoint
        print("Testing health check endpoint...")
        response = requests.get('http://localhost:5001/api/health', timeout=10)
        
        if response.status_code == 200:
            print("✅ Health check passed!")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed: {e}")
        return False
    finally:
        # Clean up
        process.terminate()
        process.wait()

if __name__ == '__main__':
    success = test_flask_app()
    sys.exit(0 if success else 1) 