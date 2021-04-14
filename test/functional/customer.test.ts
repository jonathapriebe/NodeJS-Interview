import supertest from 'supertest';

describe('Customer functional tests', () => {
  it('Should return a customer by id', async () => {
    const {body, status} = await supertest(app).get('/customer');
    expect(status).toBe(200);
    expect(body).toBe({
      name: 'João',
      gender: 'Masculino',
      age: 15,
      dtBirthday: '1988-04-05',
      idCity: '123'
    })
  })
})