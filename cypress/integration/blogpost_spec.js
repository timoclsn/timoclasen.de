describe('The Blog Post', () => {
    it('successfully loads', () => {
        cy.visit('/blog');
        cy.get('[data-cy=blogpost-link]').first().click();
    });
});
