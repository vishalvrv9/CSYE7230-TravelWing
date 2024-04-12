#!/bin/bash

sudo apt-get update


sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

sudo DEBIAN_FRONTEND=noninteractive node -v
 
sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip

sudo unzip WebAppRenamed -d WebApp
echo `pwd`
echo `ls`
cd WebApp
echo `ls`
cd webapp
echo `ls`
cd backend
echo `ls`
sudo npm install