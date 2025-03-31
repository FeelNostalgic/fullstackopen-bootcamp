@echo off
setlocal

echo Running npm build...
npm run build || exit /b

echo Copying dist to NodeJS folder...
xcopy /E /I /Y dist NodeJS

echo Deploying to Fly...
fly deploy

echo Deployment completed successfully!
endlocal