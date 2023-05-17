

# NASA Mission Control Dashboard

The NASA Mission Control Dashboard is a web-based application that allows users to schedule missions to target Kepler exoplanets. It is built using React, ExpressJS, and MongoDB, and utilizes the NASA API to get Kepler planets and rockets information. The application allows users to schedule missions, see upcoming launches, and view past successful launches.

## Features

1. **Schedule a mission**: Users can schedule a mission by choosing a planet, rocket, setting a mission name, and selecting a launch date.

2. **View upcoming launches**: Users can see the list of upcoming launches and their details, including mission name, planet, rocket, and launch date.

3. **View past successful launches**: Users can see the list of past successful launches and their details, including mission name, planet, rocket, launch date, and outcome.

4. **Abort a launch**: Users can abort a launch that has been scheduled by clicking on the abort button.

## Technologies Used

The following technologies have been used in the development of this application:

1. **NASA API**: Used to get Kepler planets and rocket information.

2. **Arwes**: A React-based framework that provides a futuristic sci-fi look and feel.

3. **PM2**: A process manager that helps manage the application process.

4. **Axios**: A JavaScript library used to make HTTP requests to the NASA API.

5. **React**: A JavaScript library used to build the user interface.

6. **ExpressJS**: A Node.js framework used to build the backend API.

7. **CSV-parser**: A Node.js library used to parse CSV files.

8. **Super-test**: A Node.js library used for testing the API.

9. **Jest**: A JavaScript testing framework used to test the React components.

10. **MongoDB**: A NoSQL database used to store the mission and launch data.

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository to your local machine.
```
git clone https://github.com/your-github-username/nasa-project.git
```

2. Install the dependencies using npm or yarn.
```
cd nasa-project
npm install
```

3. Create a .env file in the root directory and add the following environment variables:
```
NASA_API_KEY=<your-nasa-api-key>
MONGO_DB_URI=<your-mongodb-uri>
```

4. Start the backend API using the following command:
```
npm run server
```

5. Start the frontend UI using the following command:
```
npm run client
```

6. The application can now be accessed on http://localhost:8080.


