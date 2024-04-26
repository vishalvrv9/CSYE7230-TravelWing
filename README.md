# CSYE7230-TravelWing
![Screenshot 2024-04-12 094957](https://github.com/Sheetalpujarii/CSYE7230-TravelWing/assets/62785078/7ef90dca-f230-4f96-a18b-642cd611568e)

Hi, we are team Travel Wing!

It was amidst the bustling streets of New York City and the serene shores of New Jersey that the concept of TravelWing took flight. As an international student embarking on this trip, our one of the team-members encountered the very challenges many travelers face: the daunting task of creating an itinerary that aligns perfectly with one's unique preferences and schedule. While "Top 10 Things to Do" lists and standard tour packages offered a glimpse into possible experiences, they fell short of the personalized journey desired. Each suggested plan was a one-size-fits-all solution that didn't fit at all. Moreover, the booking process felt like piecing together a complex puzzle with scattered pieces across different websites.

## Concept

TravelWing emerged as a beacon for travelers yearning for customization. Leveraging the power of the OpenAI API, we present you with the ability to craft a travel plan that's as unique as your fingerprints. TravelWing goes beyond being a mere tool; it's your personal travel guide, seamlessly blending your preferences, dates, and aspirations into a cohesive and thorough itinerary.

With TravelWing, planning your itinerary is as simple as filling out a prompt. Tell us what you seek, and our AI will retrieve information to curate a travel plan that resonates with your wishes. For our members, these plans aren't just ephemeral; save them for future reference or have them sent to you in a neatly packaged PDF via email.

## How to Run the Application Locally

There are 3 high level components to this application

- NextJS + ReactJS Frontend
- Nodejs (Express) backend
- MongoDB Cluster

### Integrations

The backend integrates with OpenAI API (for itinerary generation) and Amadeus APIs (for fetching flight and hotel booking details)

The frontend and backend also integrate with firebase to implement Authentication and Authorization

### Backend

The backend code is located in the ```./backend``` folder. Backend node application uses mongoose as an ORM to talk to the MongoDB cluster hosted on provisioned Atlas. To run the setup locally, you will need a mongoDB provisioned cluster or a docker container running and you will have to add the details of this MongoDB instance in your environment variables. The complete list of environment variables needed for the application are given below:

```
PORT=8080 # recommended port 
NODE_ENV=dev
CHATGPT_KEY=add-your-key
MONGODB_URI=add-mongodb-uri
FIREBASE_API_KEY=add-your-firebase-key
FIREBASE_AUTH_DOMAIN=project-details
FIREBASE_PROJECT_ID=project-details-fetched-from-firebase-project-console
FIREBASE_STORAGE_BUCKET=project-details-fetched-from-firebase-project-console
FIREBASE_MESSAGING_SENDER_ID=project-details-fetched-from-firebase-project-console
FIREBASE_APP_ID=project-details-fetched-from-firebase-project-console
FIREBASE_MEASUREMENT_ID=project-details-fetched-from-firebase-project-console
AMADEUS_CLIENT_ID=api-keys-from-amadeus
AMADEUS_CLIENT_SECRET=api-keys-from-amadeus

```
First, Install Backend dependencies using:  ```npm install```

After adding the above details, just run ```npm start``` to start the backend application

### Frontend

The frontend code is in two folders
- ```./frontend```
- ```./lp```


The landing page is created using nextjs to enable efficient and complex server rendered animations. The landing page by default runs on port 3001 and the front end tries to communicate with port 8080 by default (as the backend runs on port 8080 by default as mentioned above)

The front client rendered react components run on port 3000 and the client keeps redirecting between 3000 and 3001 based on implementation and functionality. 

Inorder to run the entire frontend, we need to 
- first go into the ```./lp``` folder
- install lp dependencies using:  ```npm install```
- run ```npm run dev``` or run ```npm build && npm start``` and this will start the landing page on port 3001

Then, we need to start a different terminal session and go into the ```./frontend``` folder
- install frontend dependencies using: ```npm install```
- run ```npm start``` to run the react client.

After that, visit ```http://travelwing.online:3001``` to visite the application




