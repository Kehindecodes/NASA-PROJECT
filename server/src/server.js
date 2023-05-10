const http = require('http');
const app = require('./app');
require('dotenv').config();
const { mongoConnect } = require('./services/mongo');
const server = http.createServer(app);

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

const PORT = process.env.PORT || 8080;

async function startServer() {
	await mongoConnect();
	await loadPlanetsData();
	await loadLaunchesData();
	server.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
}

startServer();
