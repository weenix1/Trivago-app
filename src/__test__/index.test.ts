import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../app';
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
		name: 'Test Accommodation',
		description: 'Test description',
		maxGuests: 200,
		destinations: [{ city: 'Berlin' }],
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

	let _id: string | null = null;

	it('should check that the GET /accommodation endpoint returns a success message', async () => {
		const response = await request.get('/accommodation');
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Test successful');
	});

	it('should check that the POST /accommodation endpoint book a new accommodation', async () => {
		const response = await request
			.post('/accommodation')
			.send(validAccommodation);
		_id = response.body._id;
		expect(response.status).toBe(201);
		expect(response.body._id).toBeDefined();
		expect(response.body.name).toBeDefined();
		expect(response.body.maxGuests).toBeDefined();
		expect(response.body.description).toBeDefined();
		expect(response.body.destinations).toBeDefined();
	});

	it('should check that the GET /accommodation:id returns a valid product with a valid id', async () => {
		const response = await request.get(`/accommodation/${_id}`);
		expect(response.status).toBe(200);
		expect(response.body._id).toBeDefined();
		expect(response.body.name).toBeDefined();
		expect(response.body.maxGuests).toBeDefined();
		expect(response.body.description).toBeDefined();
		expect(response.body.destinations).toBeDefined();
	});

	it('should check that the GET /accommodation/:id returns a 404 without a valid id', async () => {
		const response = await request.get(
			`/accommodation/999999999999999999999999`,
		);
		expect(response.status).toBe(404);
	});

	it('should check that a valid PUT /accommodation/:id name update request gets executed correctly', async () => {
		const response = await request
			.put(`/accommodation/${_id}`)
			.send(nameUpdate);
		expect(response.status).toBe(200);
		expect(response.body.name).toBe(nameUpdate.name);
		expect(typeof response.body.name).toBe('string');
	});

	it('should check that a valid PUT /accommodation/:id name update request gets 404 on an invalid ID', async () => {
		const response = await request
			.put(`/accommodation/444444444444444444444444`)
			.send(nameUpdate);
		expect(response.status).toBe(404);
	});

	it('should check that a valid PUT /accommodation/:id guest no update request gets executed correctly', async () => {
		const response = await request
			.put(`/accommodation/${_id}`)
			.send(maxGuestsUpdate);
		expect(response.status).toBe(200);
		expect(response.body.maxGuests).toBe(maxGuestsUpdate.maxGuests);
		expect(typeof response.body.maxGuests).toBe('string');
	});

	it('should check that a valid PUT /accommodation/:id guest no update request gets 404 on an invalid ID', async () => {
		const response = await request
			.put(`/accommodation/444444444444444444444444`)
			.send(maxGuestsUpdate);
		expect(response.status).toBe(404);
	});

	it('should check that a valid PUT /accommodation/:id destinations update request gets executed correctly', async () => {
		const response = await request
			.put(`/accommodation/${_id}`)
			.send(destinationsUpdate);
		expect(response.status).toBe(200);
		expect(response.body.destinations).toBe(destinationsUpdate.destinations);
		expect(typeof response.body.destinations).toBe('string');
	});

	it('should check that a valid PUT /accommodation/:id destinationsUpdate update request gets 404 on an invalid ID', async () => {
		const response = await request
			.put(`/accommodation/444444444444444444444444`)
			.send(destinationsUpdate);
		expect(response.status).toBe(404);
	});

	it('should check that a valid PUT /accommodation/:id description update request gets executed correctly', async () => {
		const response = await request
			.put(`/accommodation/${_id}`)
			.send(descriptionUpdate);
		expect(response.status).toBe(200);
		expect(response.body.description).toBe(descriptionUpdate.description);
		expect(typeof response.body.description).toBe('string');
	});

	it('should check that a valid PUT /accommodation/:id description update request gets 404 on an invalid ID', async () => {
		const response = await request
			.put(`/accommodation/444444444444444444444444`)
			.send(descriptionUpdate);
		expect(response.status).toBe(404);
	});

	it('should check that the DELETE /accommodation/:id returns a valid product with a valid id', async () => {
		const response = await request.delete(`/accommodation/${_id}`);
		expect(response.status).toBe(204);
		const deleteAccommodationResponse = await request.get(
			`/accommodation/${_id}`,
		);
		expect(deleteAccommodationResponse.status).toBe(404);
	});

	it('should check that the DELETE /accommodation/:id returns a 404 without a valid id', async () => {
		const response = await request.delete(
			`/accommodation/999999999999999999999999`,
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
