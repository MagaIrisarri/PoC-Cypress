Cypress.Commands.add('iniciarSesion', (usuario, contraseña) => {
  cy.visit('https://www.saucedemo.com/')
  cy.get('#user-name').type(usuario) 
  cy.get('#password').type(contraseña)
  cy.get('#login-button').click()

})

Cypress.Commands.add('añadirAlCarrito', () => {
    
  // Selecciona solo los 3 primeros productos
  cy.get('.btn_inventory').each((button, index) => {    
    if (index < 3) {    
      cy.wrap(button).click();
    }

  })

})

Cypress.Commands.add('hacerCompra', () => {

  
  cy.get('#shopping_cart_container > a').click();

  cy.get('#checkout').click(); 
  

  cy.get('#first-name').type('John');

  cy.get('#last-name').type('Doe');

  cy.get('#postal-code').type('123456');

  cy.get('#continue').click();
 

  cy.get('#finish').click(); 

 
  cy.contains('Thank you for your order!').should('be.visible');

})

Cypress.Commands.add('cerrarSesion', () => {
  // Abrir el menú a la izq arriba, las 3 barritas
  cy.get('#react-burger-menu-btn').click(); 
  
  // Esperar dinámicamente a que la animación termine y el enlace sea visible, luego hacer click
  cy.get('#logout_sidebar_link')
    .should('be.visible') 
    .click(); 
});

Cypress.Commands.add(
  'login',
  (usuario, pass) => {
      cy.visit('/');
      cy.get('#user-name').type(usuario);
      cy.get('#password').type(pass);
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
    });
