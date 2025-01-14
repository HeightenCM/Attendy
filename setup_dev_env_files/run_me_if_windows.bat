@echo off
echo Installing backend dependencies...
cd ../backend
npm i
npm i --save-dev nodemon
echo Installation complete!
echo Installating frontend dependencies...
echo Use npm install in the frontend folder
pause
