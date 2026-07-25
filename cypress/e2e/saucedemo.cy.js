describe('SauceDemo - flujos básicos', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('login exitoso', () => {
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
  });

  it('agregar producto al carrito', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('ver producto en el carrito', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);
  });

  it('fallo forzado - elemento inexistente', () => {
    cy.get('.no-existe-este-elemento').should('be.visible');
  });

  it('fallo forzado - aserción incorrecta', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').should('have.text', '5'); // en realidad dice 1
  });

  it('correcto las distintas imagenes con standard_user', () => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('.inventory_item_img img').then(($imgs) => {
      const srcs = [...$imgs].map((img) => img.getAttribute('src'));
      const unicos = new Set(srcs);
      expect(unicos.size, 'cada producto debería tener su propia imagen').to.eq(
        srcs.length,
      );
    });
  });

  it('detecta bug de imágenes con problem_user', () => {
    cy.visit('/');
    cy.get('#user-name').type('problem_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('.inventory_item_img img').then(($imgs) => {
      const srcs = [...$imgs].map((img) => img.getAttribute('src'));
      const unicos = new Set(srcs);
      expect(unicos.size, 'cada producto debería tener su propia imagen').to.eq(
        srcs.length,
      );
    });
  });
});
