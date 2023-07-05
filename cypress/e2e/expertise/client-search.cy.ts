import { loginWithForm, logOut, selectBudgetCode } from "../../support/utils";
import "cypress-real-events";

describe('template spec', () => {
    beforeEach(() => {
        loginWithForm();
        cy.get('[ng-reflect-router-link="/expertise-consulting/consulta"]')
        .click();
        cy.url().should('contain', 'expertise-consulting/consultation');
        selectBudgetCode('69630');
        cy.get('#mat-tab-label-0-1').click();
      });
    afterEach(() => {logOut()});

  it('Expertise client number hover text', () => {
    cy.get('.cdk-column-CodeClientMR')
    .eq(2)
    .find('span')
    .realHover({scrollBehavior:"center"});
    cy.get('.cdk-overlay-container')
    .contains('Recherche n° client');
  });

  it('Expertise client number click', () => {
    cy.get('.cdk-column-CodeClientMR')
    .eq(2)
    .find('span')
    .click();
    cy.get('.actif').contains('Numéro ou nom dossier');
  });

  it('Expertise client number right click', () => {
    cy.get('.cdk-column-CodeClientMR')
    .eq(2)
    .find('span')
    .rightclick();
    cy.get('.cdk-overlay-container')
    .contains('Numéro dossier copié !');
  });
})
