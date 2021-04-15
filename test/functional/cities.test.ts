import { City } from '@src/models/city';

describe('Cities functional tests', () => {
  beforeAll(async () => {
    await City.deleteMany({});
    const city = new City({
      _id: '607765195331817a34e32c1e',
      name: 'Porto Alegre',
      state: 'Rio Grande do Sul',
    });
    await city.save();
  });
  describe('When creating a new city', () => {
    it('should create a city with success', async () => {
      const newCity = {
        name: 'Porto Alegre',
        state: 'Rio Grande do Sul',
      };

      const response = await global.testRequest.post('/cities').send(newCity);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newCity));
    });

    it('should return 422 when there is a validation error', async () => {
      const newCity = {
        state: 'Rio Grande do Sul',
      };
      const response = await global.testRequest.post('/cities').send(newCity);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'City validation failed: name: Path `name` is required.',
      });
    });
  });

  describe('When find a city', () => {
    it('Should return a city by name with success', async () => {
      const { body, status } = await global.testRequest.get(
        '/cities?name=Porto Alegre'
      );
      const city = {
        id: '607765195331817a34e32c1e',
        name: 'Porto Alegre',
        state: 'Rio Grande do Sul',
      };
      expect(status).toBe(200);
      expect(body).toEqual(expect.objectContaining(city));
    });

    it('Should return 422 if not send a parameter', async () => {
      const { body, status } = await global.testRequest.get('/cities');

      expect(status).toBe(422);
      expect(body).toEqual({ error: 'Parameter not found' });
    });

    it('Should return 404 if not find a city', async () => {
      const { body, status } = await global.testRequest.get(
        '/cities?name=Pelotas'
      );

      expect(status).toBe(404);
      expect(body).toEqual({ error: 'City not found.' });
    });
  });
});
