describe('Cities functional tests', () => {
  describe('When creating a newity', () => {
    it('should create a city with success', async() => {
      const newCity = {
        name: 'Porto Alegre',
        state: 'Rio Grande do Sul'
      };

      const response = await global.testRequest.post('/cities').send(newCity);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newCity));
    });
  });
});