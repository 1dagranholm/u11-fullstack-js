#!/bin/sh

mkdir todo-app &&
git clone https://github.com/1dagranholm/u11-fullstack-js.git ./todo-app &&
cd ./todo-app/app && npm i &&
cd ../server && npm i &&
rm ../install.sh &&
echo -------------------------
echo Install completed
echo -------------------------
