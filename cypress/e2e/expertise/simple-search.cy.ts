import { loginWithForm, logOut, selectBudgetCode } from "../../support/utils";

describe('template spec', () => {
  beforeEach(() => {
    loginWithForm();
    cy.get('[ng-reflect-router-link="/expertise-consulting/consulta"]')
    .click();
    cy.url().should('contain', 'expertise-consulting/consultation');
    selectBudgetCode('69630');
  });
  afterEach(() => {logOut();});

  it('Expertise simple search and clear folder', () => {
    cy.get('.search-customer')
    .find('input')
    .type('00251158');
    cy.get('.actif')
    .find('mat-icon').click();
    cy.get('.actif').should('not.exist');

    cy.get('.search-customer')
    .find('input')
    .type('JYC');
    cy.get('.simplebar-content-wrapper')
    .find('mat-card').first().click();
    cy.get('.selected-customer')
    .find('button').click();
    cy.get('.actif').should('not.exist');
  });

  it('Expertise simple search and clear name', () => {
    cy.get('#keyword-search')
    .find('input')
    .type('string search{enter}');
    cy.get('.actif')
    .find('mat-icon').click();
    cy.get('.actif').should('not.exist');

    cy.get('#keyword-search')
    .find('input')
    .type('123 456');
    cy.get('#btn-search').click();
    cy.get('.actif')
    .find('mat-icon').click();
    cy.get('.actif').should('not.exist');

    cy.get('#keyword-search')
    .find('input')
    .type('png{enter}');
    cy.get('.actif').should('not.be.hidden');
    cy.get('#keyword-search')
    .find('input').clear();
    cy.get('.actif').should('not.exist');
  });

  it('Expertise simple search and clear both then one', () => {
    cy.get('.search-customer')
    .find('input')
    .type('00251158');
    cy.get('#keyword-search')
    .find('input')
    .type('string search{enter}');
    cy.get('.filtres-actifs').children().should('have.length', 2);
    cy.get('#btn-clear-search').click();
    cy.get('.filtres-actifs').should('be.hidden');

    cy.get('.search-customer')
    .find('input')
    .type('JYC');
    cy.get('.simplebar-content-wrapper')
    .find('mat-card').first().click();
    cy.get('#keyword-search')
    .find('input')
    .type('string search{enter}');
    cy.get('.filtres-actifs').children().should('have.length', 2);
    cy.get('.selected-customer')
    .find('button').click();
    cy.get('.filtres-actifs').children().should('have.length', 1);
  });
})
