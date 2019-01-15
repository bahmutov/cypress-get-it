/// <reference types="cypress" />

const getSomethingToWords = s => Cypress._.split(Cypress._.snakeCase(s), '_')

const getAttribute = words => {
  // ['get', 'data', test', 'id']
  words.shift()
  return words.join('-')
}

const cy = new Proxy(global.cy, {
  get (target, prop) {
    console.log('getting prop', prop)
    if (/^get\w+/.test(prop)) {
      console.log('get<Something>', prop)
      const words = getSomethingToWords(prop)
      console.log(words)
      const attribute = getAttribute(words)
      console.log(attribute)

      return selector => {
        cy.log(prop, selector)
        return target.get(`[${attribute}="${selector}"]`)
      }
    } else {
      return target[prop]
    }
  }
})

it('finds element by test id data attribute', () => {
  cy.visit('index.html')
  cy.get('[data-test-id="foo"]').should('have.text', 'foo')
  cy.getDataTestId('foo').should('have.text', 'foo')
  cy.getDataTest('bar').should('have.text', 'bar')
  cy.getTestId('baz').should('have.text', 'baz')
})
