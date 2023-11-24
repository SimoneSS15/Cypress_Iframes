/// <reference types="cypress" />

context('Iframes', () => {
  beforeEach(() => {
    cy.visit('http://demo.automationtesting.in/Frames.html') // site de exemplo com vários Iframes
  })

  // É necessário baixar a biblioteca do Iframe para cypress - npm install -D cypress-iframe.
  // Em seguida deve adicionar a linha :
  //import 'cypress-iframe';
  // ou
  //require('cypress-iframe'); no arquivo commands.js ou index.js

  it.skip('Tentar interagir com elemento dentro do iframe (sem trocar contexto)', () => {
    // esse teste ficará com o .skip, serve apenas para entender o motivo
    // de trocarmos de contexto para interagir com os iframes
    cy.get('input[type=text]')
    .first() // vai mostrar o primeiro elemento
    .should('be.visible') // mostra que está vivível
    .type('bora agilizar') // digita o texto no campo

  });

  it('Conferir se iframe foi carregado em tela após acesso', () => {

    cy.frameLoaded('#singleframe') // carrega o iframe

  })

  it('Iframes dentro de iFrames', () => {
    cy.get('a.analystic[href$=Multiple]').click()

    cy.frameLoaded('[src*=SingleFrame]')
    cy.frameLoaded('[src*=MultipleFrames]')

  });

  it.only('Interagir com elemento dentro do iframe (trocando contexto)', () => {

    cy.iframe('[src*=SingleFrame]')
      .find('input[type=text]')
      .should('be.visible')
      .type('bora agilizar')

  });

  it('Executar algumas ações dentro do iframe (enter)', () => {

    cy.enter('[src*=SingleFrame]').then(body => {
      body()
        .find('input[type=text]')
        .should('be.visible')
        .type('bora agilizar hehe')
    })

  });

  it('Interagir com elemento de iframe dentro de iframe', () => {

    cy.get('a.analystic[href$=Multiple]').click()

    // assim não funciona, precisa navegar na estrutura
    // cy.iframe('[src*=SingleFrame]')
    //   .find('input[type=text]')
    //   .should('be.visible')
    //   .type('bora agilizar')

    cy.iframe('[src*=MultipleFrames]').within(() => {
      cy.iframe('[src*=SingleFrame]')
        .find('input[type=text]')
        .should('be.visible')
        .type('bora agilizar')
    })

  });

})