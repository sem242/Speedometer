#!/usr/bin/env python3
"""
Simple HTTP Server for GPS Speedometer
Run with: python server.py
Access at: http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
SCRIPT_DIR = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Customize log format
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    # Change to script directory
    os.chdir(SCRIPT_DIR)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"=" * 50)
        print(f"GPS Speedometer Server")
        print(f"=" * 50)
        print(f"Server running at: http://localhost:{PORT}")
        print(f"Server running at: http://127.0.0.1:{PORT}")
        print(f"")
        print(f"Access from iPhone on same network:")
        print(f"  Find your computer's IP address")
        print(f"  Navigate to: http://<your-ip>:{PORT}")
        print(f"")
        print(f"Press Ctrl+C to stop the server")
        print(f"=" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()
