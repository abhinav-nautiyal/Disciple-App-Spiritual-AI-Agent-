#!/usr/bin/env python3
"""
Main entry point for Railway deployment
"""
import os
import sys

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import and run the Flask app
from backend.start import main

if __name__ == '__main__':
    main() 