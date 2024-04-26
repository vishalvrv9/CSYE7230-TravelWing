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

cd ..
echo `ls`
cd frontend
sudo npm install
echo `pwd`

sudo mv /tmp/webapplication.service /etc/systemd/system/webapplication.service
sudo mv /tmp/frontend.service /etc/systemd/system/frontend.service


sudo systemctl daemon-reload

echo "Starting the backend service..."
sudo systemctl start webapplication.service

echo "Waiting for 30 seconds for the backend to stabilize..."
sleep 30

echo "Starting the frontend service..."
sudo systemctl start frontend.service

echo "backend and frontend services are running"