import { City } from "@src/models/city";

describe('Cities functional tests', () => {
  beforeAll(async () => await City.deleteMany({}));
  describe('When creating a new city', () => {
    it('should create a city with success', async() => {
      const newCity = {
        name: 'Porto Alegre',
        state: 'Rio Grande do Sul'
      };

      const response = await global.testRequest.post('/cities').send(newCity);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newCity));
    });

    it('should return 422 when there is a validation error', async () => {
      const newCity = {
        state: 'Rio Grande do Sul'
      };
      const response = await global.testRequest.post('/cities').send(newCity);
      console.log(response.body);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'City validation failed: name: Path `name` is required.',
      });
    });

  });
});