describe('Flujo 4 - Login', () => {

  it('correcto las distintas imagenes con standard_user', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_item_img img').then(($imgs) => {
      const srcs = [...$imgs].map((img) => img.getAttribute('src'));
      const unicos = new Set(srcs);
      expect(unicos.size, 'cada producto debería tener su propia imagen').to.eq(
        srcs.length,
      );
    });
  });

  it('detecta bug de imágenes con problem_user', () => {
    cy.login('problem_user', 'secret_sauce');
    cy.get('.inventory_item_img img').then(($imgs) => {
      const srcs = [...$imgs].map((img) => img.getAttribute('src'));
      const unicos = new Set(srcs);
      expect(unicos.size, 'cada producto debería tener su propia imagen').to.eq(
        srcs.length,
      );
    });
  });
});
