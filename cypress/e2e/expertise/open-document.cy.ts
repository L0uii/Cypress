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

  it('Expertise file hover text', () => {
    cy.get('.cdk-column-NommageMR')
    .eq(2)
    .find('span')
    .realHover({scrollBehavior:"center"});
    cy.get('.cdk-overlay-container')
    .contains('Ouvrir aperçu');
  });

  it('Expertise file click open and close through filename', () => {
    cy.get('.cdk-column-NommageMR')
    .eq(2)
    .find('span')
    .click();
    cy.url().should('contain', 'expertise-consulting/consultation/(view:files');
    cy.get('.adf-viewer-close-button')
    .click();
  });

  it('Expertise file click open and close through the "..." menu', () => {
    cy.get('.cdk-column-OptionsMR')
    .eq(2)
    .find('button')
    .click();
    cy.get('.cdk-overlay-container')
    .contains('Aperçu')
    .click();
    cy.url().should('contain', 'expertise-consulting/consultation/(view:files');
    cy.get('.adf-viewer-close-button')
    .click();
  });
})
