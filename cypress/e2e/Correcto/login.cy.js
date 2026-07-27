
describe('Flujo 1 - Login', () => {

  it('login exitoso', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_list').should('be.visible');
  });
});
