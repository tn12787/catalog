describe('We can artificially log in and end up on the overview page', () => {
  it('We can log in', () => {
    cy.visit('/overview');

    // We should be redirected to the login page
    cy.findByText(/Log in/).should('exist');

    // Now, let's fake log in
    cy.login();

    cy.visit('/overview');

    cy.findByText(/Upcoming Releases/).should('exist'); // now we can get through the overview page
  });
});
