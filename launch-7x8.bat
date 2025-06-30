@echo off
chcp 65001 >nul
title Application 7x8 - Lancement automatique

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║                   APPLICATION 7x8                    ║
echo ║              Lancement automatique                   ║
echo ╚══════════════════════════════════════════════════════╝
echo.

:: Vérifier si le dossier existe
if not exist "d:\Projet perso\7x8\7x8" (
    echo ❌ Erreur: Le dossier du projet n'existe pas !
    echo    Chemin: d:\Projet perso\7x8\7x8  //A MODIFIER SELON VOTRE CHEMIN D'ACCES
    pause
    exit /b 1
)

cd /d "d:\Projet perso\7x8\7x8"

echo 🔍 Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé !
    echo    Téléchargez-le depuis : https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js détecté

echo.
echo 🔧 Vérification des dépendances...
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    npm install
    if errorlevel 1 (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
)
echo ✅ Dépendances prêtes

echo.
echo 🚀 Démarrage de l'application...
echo ⏳ Patientez pendant l'initialisation...

:: Supprimer l'ancien log s'il existe
if exist server.log del server.log

:: Démarrer le serveur et capturer la sortie
echo Lancement de npm run dev...
start /b cmd /c "npm run dev > server.log 2>&1"

:: Attendre que le serveur soit prêt avec timeout
echo 🔄 Attente du serveur...
set /a counter=0
:wait_loop
timeout /t 2 /nobreak >nul
set /a counter+=2

if exist server.log (
    findstr /c:"Local:" server.log >nul 2>&1
    if not errorlevel 1 goto server_ready
    
    findstr /c:"localhost:" server.log >nul 2>&1
    if not errorlevel 1 goto server_ready
)

echo    Démarrage en cours... (%counter%s)

:: Timeout après 30 secondes
if %counter% geq 30 (
    echo ❌ Timeout - Le serveur ne répond pas
    echo Contenu du log:
    if exist server.log type server.log
    pause
    exit /b 1
)

goto wait_loop

:server_ready
echo ✅ Serveur prêt !

:: Extraire l'URL du serveur
set SERVER_URL=http://localhost:5173
if exist server.log (
    for /f "tokens=2 delims= " %%i in ('findstr /c:"Local:" server.log 2^>nul') do set SERVER_URL=%%i
    if "!SERVER_URL!"=="" (
        for /f "tokens=2 delims= " %%i in ('findstr /c:"localhost:" server.log 2^>nul') do set SERVER_URL=http://%%i
    )
)

echo 🌐 Ouverture du navigateur...
echo    URL: %SERVER_URL%

:: Ouvrir le navigateur
start "" "%SERVER_URL%"

:: Attendre un peu pour que le navigateur s'ouvre
timeout /t 3 /nobreak >nul

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║  🎉 Application lancée avec succès !                ║
echo ║                                                      ║
echo ║  📱 L'application s'ouvre dans votre navigateur     ║
echo ║  🔄 Laissez cette fenêtre ouverte                   ║
echo ║  ❌ Fermez cette fenêtre pour arrêter l'app         ║
echo ╚══════════════════════════════════════════════════════╝
echo.

:: Garder la fenêtre ouverte pour maintenir le serveur
echo 💡 Appuyez sur n'importe quelle touche pour arrêter l'application...
pause >nul

:: Nettoyer
echo 🛑 Arrêt de l'application...
taskkill /f /im node.exe >nul 2>&1
if exist server.log del server.log
echo ✅ Application arrêtée proprement
pause
