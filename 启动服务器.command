#!/bin/bash
# Double-click this file on Mac to start the server
cd "$(dirname "$0")"
echo "Starting Bino EduTour local server..."
echo "Open browser: http://localhost:8080"
python3 -m http.server 8080
