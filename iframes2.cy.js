/// <reference types="cypress" />

context('Iframes', () => {
    beforeEach(() => {
      cy.visit('Endereço da Página com Iframes') 
    })
 it('Interagindo com iframes', () => {
    cy.get('Primeiro Iframe')
               .its('0.contentDocument')
               .its('body')
               .find('Segundo Iframe')
               .its('0.contentDocument')
               .its('body')
               .find('Terceiro Iframe')
               .its('0.contentDocument')
               .its('body')
               .find("Elemento").click()
           
       })


 });
