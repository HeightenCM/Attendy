@echo off
echo Installing backend dependencies...
cd ../backend
npm i
npm i --save-dev nodemon
echo Installation complete!
echo Installating frontend dependencies...
echo Use 'npm install' and 'npm i -D react-router-dom'  in the frontend folder
pause
