#!/bin/bash

# Helper script to run and deploy Vaasa Lunch

show_help() {
  echo "Vaasa Lunch Helper Script"
  echo ""
  echo "Usage: ./run.sh [command]"
  echo ""
  echo "Commands:"
  echo "  dev          Run the development server"
  echo "  test         Test the API endpoints"
  echo "  deploy       Deploy to Vercel"
  echo "  deploy:prod  Deploy to Vercel production"
  echo "  help         Show this help message"
  echo ""
}

case "$1" in
  dev)
    echo "Starting development server..."
    npm run dev
    ;;
  test)
    echo "Running API tests..."
    npm test
    ;;
  deploy)
    echo "Deploying to Vercel..."
    vercel
    ;;
  deploy:prod)
    echo "Deploying to Vercel production..."
    vercel --prod
    ;;
  help|*)
    show_help
    ;;
esac
