import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../app';
import { AccomodationModel } from '../accomodation/model';
dotenv.config();

const request = supertest(app);

describe('Testing Jest config', () => {
	it('should pass', () => {
		expect(true).toBe(true);
	});
});

describe('Testing the app endpoints', () => {
	beforeAll((done) => {
		console.log('This gets run before all tests in this suite');
		mongoose.connect(process.env.MONGO_URL_TEST!).then(() => {
			console.log('Connected to the test database');
			done();
		});
	});

	const validAccommodation = {
		_id: '61b35966709d6a21984623c3',
		name: 'Test Accommodation',
		description: 'Test description',
		maxGuests: 200,
		destination: [
			{
				_id: '61b3588a709d6a21984623bc',
				city: 'paris',
				createdAt: '2021-12-10T13:39:22.423Z',
				updatedAt: '2021-12-10T13:39:22.423Z',
				__v: 0,
			},
		],
		createdAt: '2021-12-10T13:43:02.593Z',
		updatedAt: '2021-12-10T13:43:02.593Z',
		__v: 0,
	};

	const nameUpdate = {
		name: 'Test Accommodation Updated',
	};

	const maxGuestsUpdate = {
		maxGuests: 25,
	};

	const descriptionUpdate = {
		description: 'Test description Updated',
	};

	const destinationsUpdate = {
		destinations: [{ city: 'new city' }],
	};

	let _id: string;

	it('checking GET /accommodation endpoint', async () => {
		const response = await request.get('/accomodation');
		expect(response.status).toBe(200);
	});

	it('checking the POST /accommodation endpoint book a new accommodation', async () => {
		const response = await request
			.post('/accomodation')
			.send(validAccommodation);
		expect(response.status).toBe(201);
	});

	it('checking the POST /accommodation endpoint returns  404 on an invalid accommodation type', async () => {
		const response = await request
			.post('/accomodation')
			.send(descriptionUpdate);
		expect(response.status).toBe(400);
	});

	it('checking the GET /accommodation:id returns object  with a valid id', async () => {
		const response = await request.get('/accomodation/' + _id);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('checking the GET /accommodation/:id returns a 404 without a valid id', async () => {
		const response = await request.get(
			`/accomodation/999999999999999999999999`,
		);
		expect(response.status).toBe(404);
	});

	it('checking a valid PUT /accommodation/:id name update request gets executed correctly', async () => {
		const response = await request.put('/accomodation/' + _id);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('checking a valid PUT /accommodation/:id name update request gets 404 without a valid id', async () => {
		const response = await request
			.put(`/accomodation/999999999999999999999999`)
			.send(nameUpdate);
		expect(response.status).toBe(404);
	});

	it('checking the DELETE /accommodation/:id ', async () => {
		const response = await request.delete('/accomodation/' + _id);
		expect(response.status).toBe(404);
	});

	it('checking the DELETE /accomodation/:id returns a 404 without a valid id', async () => {
		const response = await request.delete(
			`/accomodation/999999999999999999999999`,
		);
		expect(response.status).toBe(404);
	});

	afterAll((done) => {
		mongoose.connection
			.dropDatabase()
			.then(() => {
				return mongoose.connection.close();
			})
			.then(() => {
				done();
			});
	});
});
