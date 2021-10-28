describe('The Home Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('should render successfully', () => {
    cy.get('[data-cy="navigation"]').should('be.visible');
    cy.get('[data-cy="home-page-teaser"]').should('be.visible');
    cy.get('[data-cy="footer"]').should('be.visible');
  });
});
