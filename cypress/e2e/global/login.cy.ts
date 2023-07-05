import { waitForAsync } from "@angular/core/testing";

describe('Login Page', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  if (typeof password !== 'string' || !password) {
    throw new Error('Missing password value, set using CYPRESS_password=...')
  }

  beforeEach(() =>{
    cy.visit('/')
  });

  it('Visits login page', () => {
    cy.contains(`Nom d'utilisateur`);
    cy.contains('Mot de passe');
    cy.contains('Connexion');
  })

  it('Try connexion without password', () => {
    cy.get('[formcontrolname="username"]')
    .type(username)
    .should('have.value', username);

    cy.get('[formcontrolname="password"]')
    .type('test')
    .clear()
    .should('have.value', '');

    cy.get('button[type="submit"]').should('be.disabled');
  })

  it('Try connexion without username', () => {
    cy.get('[formcontrolname="username"]')
    .clear()
    .should('have.value', '');

    cy.get('[formcontrolname="password"]')
    .clear()
    .type(password, {log: false})
    .should(password$ => {
      if (password$.val() !== password) {
        throw new Error('Different value of typed password')
      };
    });

    cy.get('button[type="submit"]').should('be.disabled');
  })

  it('Try connexion with wrong credentials', () => {

    cy.get('[formcontrolname="username"]')
    .clear()
    .type('fakeUserName')
    .should('have.value', 'fakeUserName');

    cy.get('[formcontrolname="password"]')
    .clear()
    .type('fakePassword')
    .should('have.value', 'fakePassword');

    cy.get('button[type="submit"]')
    .should('be.enabled')
    .click();

    cy.contains(`Le nom d'utilisateur ou le mot de passe entré est inconnu`);
  })

  it('Try connexion with click', () => {
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
    });

    cy.get('button[type="submit"]')
    .should('be.enabled')
    .click();

    cy.url().should('contain', '/portail');
  })

  it('Try connexion with enter' , () => {
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
  })
});
