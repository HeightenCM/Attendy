#!/bin/bash

echo "Installing backend dependencies..."
cd ../backend
npm i
npm i --save-dev nodemon

echo "Installing frontend dependencies..."
cd ../frontend
npm i

echo "Installation complete!"
echo "Goodbye..."