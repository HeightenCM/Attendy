@echo off
echo Installing backend dependencies...
cd ../backend
npm i
npm i --save-dev nodemon
echo Installation complete!
echo Installating frontend dependencies...
cd ../frontend
npm i
echo Installation complete!
echo Goodbye...
pause
