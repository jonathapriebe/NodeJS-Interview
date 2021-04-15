import { City } from '@src/models/city';
import { Customer } from '@src/models/customer';

describe('Customer functional tests', () => {
  beforeAll(async () => {
    await Customer.deleteMany({});
    await City.deleteMany({});
    const city = new City({
      _id: '607765195331817a34e32c1e',
      name: 'Porto Alegre',
      state: 'Rio Grande do Sul',
    });
    await city.save();

    const customer = new Customer({
      _id: '60782456831a012733ff97bd',
      name: 'João',
      gender: 'Masculino',
      age: 15,
      dt_birthday: '1988-04-05T00:00:00.000Z',
      city_id: '607765195331817a34e32c1e',
    });
    await customer.save();
  });
  describe('When find a Customer', () => {
    it('Should return a customer by name with success', async () => {
      const { body, status } = await global.testRequest.get(
        '/customer?name=João'
      );
      const customer = {
        name: 'João',
        gender: 'Masculino',
        age: 15,
        dt_birthday: '1988-04-05T00:00:00.000Z',
        city_id: '607765195331817a34e32c1e',
      };
      expect(status).toBe(200);
      expect(body).toEqual(expect.objectContaining(customer));
    });

    it('Should return 422 if not send a parameter', async () => {
      const { body, status } = await global.testRequest.get('/customer');

      expect(status).toBe(422);
      expect(body).toEqual({ error: 'Parameter not found' });
    });

    it('Should return 404 if not find a customer', async () => {
      const { body, status } = await global.testRequest.get(
        '/customer?name=Pedro'
      );

      expect(status).toBe(404);
      expect(body).toEqual({ error: 'Customer not found.' });
    });
  });

  describe('When create a Customer', () => {
    it('Should create a customer with success', async () => {
      const newCustomer = {
        name: 'João',
        gender: 'Masculino',
        age: 15,
        dt_birthday: '1988-04-05T00:00:00.000Z',
        city_id: '607765195331817a34e32c1e',
      };
      const { body, status } = await global.testRequest
        .post('/customer')
        .send(newCustomer);
      expect(status).toBe(201);
      expect(body).toEqual(expect.objectContaining(newCustomer));
    });

    it('should return 404 when City not found', async () => {
      const newCustomer = {
        name: 'João',
        gender: 'Masculino',
        age: 15,
        dt_birthday: '1988-04-05T00:00:00.000Z',
        city_id: '607765195331817a34e32c44',
      };
      const response = await global.testRequest
        .post('/customer')
        .send(newCustomer);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'City not found',
      });
    });

    it('should return 422 when there is a validation error', async () => {
      const newCustomer = {
        name: 'João',
        gender: 'Masculino',
        age: 15,
        city_id: '607765195331817a34e32c1e',
      };
      const response = await global.testRequest
        .post('/customer')
        .send(newCustomer);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Customer validation failed: dt_birthday: Path `dt_birthday` is required.',
      });
    });
  });

  describe('When update a Customer', () => {
    it('Should update a customer with success', async () => {
      const customer = {
        name: 'Joãozinho',
        gender: 'Masculino',
        age: 15,
        dt_birthday: '1988-04-05T00:00:00.000Z',
        city_id: '607765195331817a34e32c1e',
      };
      const { body, status } = await global.testRequest
        .put('/customer/60782456831a012733ff97bd')
        .send({ name: 'Joãozinho' });
      expect(status).toBe(200);
      expect(body).toEqual(expect.objectContaining(customer));
    });

    it('should return 422 when name in body not found', async () => {
      const response = await global.testRequest
        .put('/customer/60782456831a012733ff97bd')
        .send();
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'Name is required',
      });
    });

    it('should return 404 when Customer not found', async () => {
      const response = await global.testRequest
        .put('/customer/60782456831a012733ff9744')
        .send({ name: 'Joãozinho' });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Customer not found.',
      });
    });
  });

  describe('When delete a Customer', () => {
    it('Should delete a customer with success', async () => {
      const { body, status } = await global.testRequest.delete(
        '/customer/60782456831a012733ff97bd'
      );
      expect(status).toBe(200);
      expect(body).toEqual({ message: 'Customer deleted' });
    });

    it('should return 404 when Customer not found', async () => {
      const response = await global.testRequest.delete(
        '/customer/60782456831a012733ff9744'
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Customer not found.',
      });
    });
  });
});
