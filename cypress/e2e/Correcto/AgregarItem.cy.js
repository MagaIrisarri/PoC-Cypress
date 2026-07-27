describe('Flujo 2 - Agregar item y validar listado', () => {
  
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });
 

  it('agregar producto al carrito', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.inventory_item').first().find('button').should('have.text', 'Remove');
  });

  it('ver producto en el carrito', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.inventory_item_price').should('have.text', '$29.99');
  });

});