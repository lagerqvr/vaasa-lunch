#!/bin/zsh

# Development script for running both backend and frontend
echo "🚀 Starting Vaasa Lunch development environment"

# Default ports
BACKEND_PORT=3000
FRONTEND_PORT=5500

# Kill any processes running on our ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:$BACKEND_PORT | xargs kill -9 2>/dev/null
lsof -ti:$FRONTEND_PORT | xargs kill -9 2>/dev/null

# Start backend in the background
echo "🔧 Starting backend server on port $BACKEND_PORT..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 2

# Start frontend using npx to ensure we use the local package
echo "🌐 Starting frontend on port $FRONTEND_PORT..."
cd "$(dirname "$0")"
npx live-server --port=$FRONTEND_PORT --no-browser --quiet &
FRONTEND_PID=$!

# Open browser
echo "🌎 Opening browser..."
open "http://localhost:$FRONTEND_PORT"

echo "✅ Development environment running!"
echo "   Backend: http://localhost:$BACKEND_PORT"
echo "   Frontend: http://localhost:$FRONTEND_PORT"
echo ""
echo "📋 Press Ctrl+C to stop all servers"

# Trap SIGINT to clean up processes
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null; kill $FRONTEND_PID 2>/dev/null; echo '👋 Goodbye!'; exit" INT

# Wait for user to press Ctrl+C
wait
