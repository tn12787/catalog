import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session');
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiVG9tIE5vcnRvbiIsImVtYWlsIjoidHBqbm9ydG9uQGhvdG1haWwuY28udWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2drLTI2amdWR3RhdFo2LWMyS3NaWWJsQU9aNFJNeE5Ndm5yOXBnSHc9czk2LWMiLCJzdWIiOiJjbDAxNnVmcjEwMTMyMDltZ3hoMnJ6YnZzIiwiaWF0IjoxNjQ1ODAxNDE5LCJleHAiOjE2NDgzOTM0MTl9.2eScaV2vQRVUqzxC43miI1lNfgE5xY6bnWxJRV-CM5hzdZKb7HlNOzw8nIOJWn_n0fyQQaosdPZRniQ69_CGbg';
  // Generate and set a valid cookie from the fixture that next-auth can decrypt
  cy.setCookie('next-auth.session-token', token);

  Cypress.Cookies.preserveOnce('next-auth.session-token');
});
