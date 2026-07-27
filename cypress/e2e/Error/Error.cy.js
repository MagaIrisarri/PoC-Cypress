describe('SauceDemo - flujos básicos', () => {

  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });
  
  it('fallo forzado - aserción incorrecta', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_badge').should('have.text', '5'); // en realidad dice 1
  });

});
