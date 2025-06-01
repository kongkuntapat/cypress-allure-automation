describe('API Automation Example', () => {
  it('should POST create new user (with API key)', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'QA Tester',
        job: 'Automation'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
    });
  });
});
