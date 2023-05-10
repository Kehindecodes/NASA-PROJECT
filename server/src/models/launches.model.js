const launchesDatabase = require('./laumches.mongo');
const planets = require('./planets.mongo');
const axios = require('axios');
const DEFAULT_FLIGHT_NUMBER = 100;
const SPACE_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
	console.log('downloading lauch data... ');
	const response = await axios.post(SPACE_API_URL, {
		query: {},
		options: {
			pagination: false,
			populate: [
				{
					path: 'rocket',
					select: {
						name: 1,
					},
				},
				{
					path: 'payloads',
					select: {
						customers: 1,
					},
				},
			],
		},
	});
	if (response.status !== 200) {
		console.log('Problem downloading launch data');
		throw new Error('Launch data download failed');
	}
	const launchDocs = response.data.docs;
	for (const launchDoc of launchDocs) {
		const payload = launchDoc['payloads'];
		const customers = payload.flatMap((payload) => {
			return payload['customers'];
		});
		const launch = {
			flightNumber: launchDoc['flight_number'],
			mission: launchDoc['name'],
			rocket: launchDoc['rocket']['name'],
			launchDate: launchDoc['date_local'],
			upcoming: launchDoc['upcoming'],
			success: launchDoc['success'],
			customers: customers,
		};
		// console.log(` ${launch.mission} ${launch.upcoming} ${launch.success}`);

		// TODO : populate launches collection..

		await saveLaunch(launch);
	}
}
async function loadLaunchesData() {
	const firstLaunch = await findLaunch({
		fligherNumber: 1,
		rocket: 'falcon',
		mission: 'falconSat',
	});
	if (firstLaunch) {
		console.log(console.log('lauch data already loaded'));
	} else {
		await populateLaunches();
	}
}

async function findLaunch(filter) {
	return await launchesDatabase.findOne(filter);
}
async function existsLaunchWithId(launchId) {
	return await launchesDatabase.findLaunch({
		flightNumber: launchId,
	});
}

async function getLatestFlightNumber() {
	const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}
	return latestLaunch.flightNumber;
}
async function getAllLaunches(skip, limit) {
	return await launchesDatabase
		.find({}, { _id: 0, __v: 0 })
		.sort({ flightNumber: 1 })
		.skip(skip)
		.limit(limit);
}

async function saveLaunch(launch) {
	await launchesDatabase.findOneAndUpdate(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{
			upsert: true,
		},
	);
}
async function scheduleNewLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.target,
	});
	console.log(planet);
	if (!planet) {
		throw new Error('No matching planet found');
	}

	const newFlightNumber = (await getLatestFlightNumber()) + 1;

	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ['zero to Mastery', 'NASA'],
		flightNumber: newFlightNumber,
	});
	await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
	const aborted = await launchesDatabase.updateOne(
		{
			flightNumber: launchId,
		},
		{
			upcoming: false,
			success: false,
		},
	);

	return aborted.ModifiedCount == 1;
}

module.exports = {
	loadLaunchesData,
	existsLaunchWithId,
	scheduleNewLaunch,
	getAllLaunches,
	abortLaunchById,
};
