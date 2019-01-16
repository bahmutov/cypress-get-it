/// <reference types="cypress" />

it('finds element by test id data attribute', () => {
  cy.visit('index.html')
  cy.get('[data-test-id="foo"]').should('have.text', 'foo')
  cy.getDataTestId('foo').should('have.text', 'foo')
  cy.getDataTest('bar').should('have.text', 'bar')
  cy.getTestId('baz').should('have.text', 'baz')
})
