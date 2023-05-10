const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
describe('Launches API', () => {
	beforeAll(async () => {
		await mongoConnect();
	});
	afterAll(async () => {
		await mongoDisconnect();
	});

	describe('  Test GET /launches', () => {
		test('it should respond with 200 success', async () => {
			const response = await request(app)
				.get('/v1/launches')
				.expect('Content-type', /json/)
				.expect(200);
		});
	});

	const completeLaunchData = {
		mission: 'USS EnterPrise',
		rocket: 'NCC 1701-D',
		target: 'Kepler-62 f',
		launchDate: 'January 4, 2028',
	};

	const launchDataWithoutDate = {
		mission: 'USS EnterPrise',
		rocket: 'NCC 1701-D',
		target: 'Kepler-62 f',
	};

	const completeLaunchDataWithInvalidDate = {
		mission: 'USS EnterPrise',
		rocket: 'NCC 1701-D',
		target: 'Kepler-62 f',
		launchDate: 'loot',
	};

	describe('  Test POST /launches', () => {
		test('it should respond with 201 created', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(completeLaunchData)
				.expect(201)
				.expect('Content-type', /json/);

			const requestDate = new Date(completeLaunchData.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			expect(responseDate).toBe(requestDate);
			expect(response.body).toMatchObject(launchDataWithoutDate);
		});

		test(' it should catch missing required properties', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchDataWithoutDate)
				.expect(400)
				.expect('Content-type', /json/);

			expect(response.body).toStrictEqual({
				error: 'Missing mission property',
			});
		});
		test(' it should catch invalid date', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(completeLaunchDataWithInvalidDate)
				.expect(400)
				.expect('Content-type', /json/);

			expect(response.body).toStrictEqual({
				error: 'Invalid launch date',
			});
		});
	});
});
