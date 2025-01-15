@echo off
echo Installing backend dependencies...
cd ../backend
npm i
npm i --save-dev nodemon
echo Installation complete!
echo Installating frontend dependencies...
echo Use 'npm install', 'npm i -D react-router-dom', 'npm install jwt-decode'  in the frontend folder
pause
