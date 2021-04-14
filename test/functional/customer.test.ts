describe('Customer functional tests', () => {
  it('Should return a customer', async () => {
    const {body, status} = await global.testRequest.get('/customer');
    expect(status).toBe(200);
    expect(body).toEqual({
      name: 'João',
      gender: 'Masculino',
      age: 15,
      dtBirthday: '1988-04-05',
      idCity: '123'
    })
  })
})