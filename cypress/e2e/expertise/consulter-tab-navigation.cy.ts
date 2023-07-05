import { loginWithForm, logOut, selectBudgetCode } from "../../support/utils";

describe('template spec', () => {
  beforeEach(() => {loginWithForm()});
  afterEach(() => {logOut()});

  it('Expertise consulter sub tabs navigation', () => {
    cy.get('[ng-reflect-router-link="/expertise-consulting/consulta"]')
    .click();
    cy.url().should('contain', 'expertise-consulting/consultation');

    selectBudgetCode('69630');

    cy.get('#mat-tab-label-0-1')
    .contains('Comptabilité / Gestion')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-2')
    .contains('Fiscal')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-3')
    .contains('Social')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-4')
    .contains('Juridique')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-5')
    .contains('Généralités (non visible client)')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-6')
    .contains('Fiducial (non visible client)')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-7')
    .contains('Chef d\'entreprise')
    .click();
    testColumns();

    cy.get('#mat-tab-label-0-0')
    .click();
    cy.get('.home-tab')
    .contains('Documents déposés par les clients et en attente de traitement');
  });

  function testColumns() {
    cy.get('.mat-header-row')
    .should('contain', 'Numéro dossier')
    .and('contain','Nom dossier')
    .and('contain','Nom du document')
    .and('contain','Date document')
    .and('contain','Date de dépot en GED')
    .and('contain','Dernière modification')
    .and('contain','Classement')
    .and('contain','Type de document')
    .and('contain','Origine collaborateur')
    .and('contain','Visibilité client')
    .and('contain','Options');
  }
})
