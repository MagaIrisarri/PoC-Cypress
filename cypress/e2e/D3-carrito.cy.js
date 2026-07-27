describe('Test Carrito de Compras - Saucedemo', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
  });

  const usuarios = [
    {usuario: 'standard_user', contraseña: 'secret_sauce'},
    {usuario: 'problem_user', contraseña: 'secret_sauce'}
  ];

  usuarios.forEach((usuario) => {

    it(`Compra con el usuariok ${usuario.usuario}`, () => {
  
      cy.iniciarSesion(usuario.usuario, usuario.contraseña); 
      
      cy.añadirAlCarrito(); 
      
      cy.hacerCompra(); 
      
      cy.cerrarSesion(); 
    });
   
  });

})
