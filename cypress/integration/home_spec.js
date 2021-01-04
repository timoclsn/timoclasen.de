describe('The Home Page', () => {
    before(() => {
        cy.visit('/');
    });

    it('should render successfully', () => {
        cy.get('[data-cy="home-page-teaser"]').should('be.visible');
    });
});
