import { waitForAsync } from "@angular/core/testing";
import { loginWithRequest, loginWithForm, logOut } from "../../support/utils";

describe('template spec', () => {
  beforeEach(() => {loginWithForm()})
  afterEach(() => {logOut()})

  it('Conseil tab navigation', () => {
    testConseilTabsNavigation();
  })
  it('Expertise tab navigation', () => {
    testExpertiseTabsNavigation();
  })
  it('Gerance tab navigation', () => {
    testGeranceTabsNavigation();
  })
  it('Fidusign tab navigation', () => {
    testFidusignTabsNavigation();
  })
})

function testFidusignTabsNavigation() {
  cy.get('[ng-reflect-router-link="/fidusign/consultation"]')
  .click();
  cy.url().should('contain', 'fidusign/consultation');

  cy.get('[ng-reflect-router-link="/fidusign/signature"]')
  .click();
  cy.url().should('contain', 'fidusign/signature');

  cy.get('[ng-reflect-router-link="/fidusign/consultation"]')
  .click();
  cy.url().should('contain', 'fidusign/consultation');
}

function testGeranceTabsNavigation() {
  cy.get('[ng-reflect-router-link="/gerance-associes/consultation"]')
  .click();
  cy.url().should('contain', 'gerance-associes/consultation/');

  cy.get('[ng-reflect-router-link="/gerance-associes/traitement"]')
  .click();
  cy.url().should('contain', 'gerance-associes/traitement');

  cy.get('[ng-reflect-router-link="/gerance-associes/telechargeme"]')
  .click();
  cy.url().should('contain', 'gerance-associes/telechargement');

  cy.get('[ng-reflect-router-link="/gerance-associes/consultation"]')
  .click();
  cy.url().should('contain', 'gerance-associes/consultation/');
}

function testConseilTabsNavigation() {
  cy.get('[ng-reflect-router-link="/conseil/consultation"]')
  .click();
  cy.url().should('contain', 'conseil/consultation/');

  cy.get('[ng-reflect-router-link="/conseil/traitement"]')
  .click();
  cy.url().should('contain', '/conseil/traitement');

  cy.get('[ng-reflect-router-link="/conseil/telechargement"]')
  .click();
  cy.url().should('contain', 'conseil/telechargement');

  cy.get('[ng-reflect-router-link="/conseil/clients"]')
  .click();
  cy.url().should('contain', 'conseil/clients');

  cy.get('[ng-reflect-router-link="/conseil/consultation"]')
  .click();
  cy.url().should('contain', 'conseil/consultation/');
}

function testExpertiseTabsNavigation() {
  cy.get('[ng-reflect-router-link="/expertise-consulting/consulta"]')
  .click();
  cy.url().should('contain', 'expertise-consulting/consultation');

  cy.get('[ng-reflect-router-link="/expertise-consulting/telechar"]')
  .click();
  cy.url().should('contain', 'expertise-consulting/telechargement');

  cy.get('[ng-reflect-router-link="/expertise-consulting/missing-"]')
  .click();
  cy.url().should('contain', 'expertise-consulting/missing-documents');

  cy.get('[ng-reflect-router-link="/expertise-consulting/exports"]')
  .click();
  cy.url().should('contain', 'expertise-consulting/exports');

  cy.get('[ng-reflect-router-link="/expertise-consulting/consulta"]')
  .click();
  cy.url().should('contain', 'expertise-consulting/consultation');
}
