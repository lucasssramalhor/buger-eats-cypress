describe('home page', () => {
  it('app deve estar online', () => {
    cy.viewport(1920, 1080);
    // Aqui é passado qual a resolução utilizada

    cy.visit('https://buger-eats.vercel.app');
    // Visita uma URL inserida

    cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats');
    // O cypress tem um elemento h1, utiliza o should para validar
    // Assert: Exprectativa para uma validação
  });
});