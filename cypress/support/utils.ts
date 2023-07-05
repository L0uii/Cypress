/**
 * NOT IMPLEMENTED.
 * Logs the user
 * using a request.
 * Make sure "cypress.json" + CYPRESS_ environment variables
 * have username and password values set.
 */
export const loginWithRequest = () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    expect(username, 'username was set').to.be.a('string').and.not.be.empty;
    if (typeof password !== 'string' || !password) {
        throw new Error('Missing password value, set using CYPRESS_password=...');
    }

    /*
    cy.request({
        method: 'POST',
        url: 'http://ged-alf-rec.fiducial.dom:8080/alfresco/api/-default-/public/authentication/versions/1/tickets',
        form: true,
        body: {
            userId: username,
            password: password
        }
    });*/
}

/**
 * Logs the user in
 * using the interface.
 * Make sure "cypress.json" + CYPRESS_ environment variables
 * have username and password values set.
 */
export const loginWithForm = () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  if (typeof password !== 'string' || !password) {
    throw new Error('Missing password value, set using CYPRESS_password=...')
  }

  cy.visit('/');
  cy.get('[formcontrolname="username"]')
    .clear()
    .type(username)
    .should('have.value', username);

    cy.get('[formcontrolname="password"]')
    .clear()
    .type(password, {log: false})
    .should(password$ => {
      if (password$.val() !== password) {
        throw new Error('Different value of typed password')
      };
    })
    .type('{enter}');

    cy.url().should('contain', '/portail');
    cy.wait(500);
}

/**
 * Logs the user out
 * using the interface.
 */
export const logOut = () => {
  cy.get('.user')
  .click();

  cy.get('.mat-menu-content > :nth-child(2)')
  .click();
}

/**
 * Selects budget code
 * using the interface.
 */
export const selectBudgetCode = (budgetCode) => {
  cy.get('#codeBudgetDropdown')
  .find('input')
  .clear()
  .type(budgetCode+'{enter}');
}
