describe('Pruebas Cortas: Autenticación', () => {

  it('✅ Éxito: Login con credenciales válidas', () => {
    cy.iniciarSesion('standard_user', 'secret_sauce');
    
    // Validación: Comprueba que entramos al inventario
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it('❌ Fallo forzado: Credenciales incorrectas', () => {
    cy.iniciarSesion('usuario_falso', 'clave_falsa');
    
    // Validación: Aparece el error de no coincidencia
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('❌ Fallo forzado: Usuario bloqueado', () => {
    cy.iniciarSesion('locked_out_user', 'secret_sauce');
    
    // Validación: Aparece el error de usuario bloqueado
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.');
  });
});

describe('Pruebas Cortas: Carrito y Checkout', () => {
  
  beforeEach(() => {
    // Inicia sesión correctamente antes de cada prueba de este bloque
    cy.iniciarSesion('standard_user', 'secret_sauce');
  });

  it('✅ Éxito: Añadir productos y reflejar en el contador', () => {
    cy.añadirAlCarrito();
    
    // Validación: El icono del carrito debe mostrar un "3"
    cy.get('.shopping_cart_badge').should('have.text', '3');
  });

  it('✅ Éxito: Flujo de compra completo', () => {
    cy.añadirAlCarrito();
    cy.hacerCompra(); 
    // La validación de éxito ya está dentro de tu comando hacerCompra()
  });

  it('❌ Fallo forzado: Checkout sin completar el formulario', () => {
    cy.añadirAlCarrito();
    cy.get('#shopping_cart_container > a').click();
    cy.get('#checkout').click(); 
    
    // Forzamos el error haciendo click en continuar con el formulario vacío
    cy.get('#continue').click();
    
    // Validación: Cypress comprueba que salte el error del nombre faltante
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Error: First Name is required');
  });
});