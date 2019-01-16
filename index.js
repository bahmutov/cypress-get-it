/// <reference types="cypress" />

const getSomethingToWords = s => Cypress._.split(Cypress._.snakeCase(s), '_')

const getAttribute = words => {
  // ['get', 'data', test', 'id']
  words.shift()
  return words.join('-')
}

global.cy = new Proxy(global.cy, {
  get (target, prop) {
    console.log('getting prop', prop)
    if (/^get\w+/.test(prop)) {
      console.log('get<Something>', prop)
      const words = getSomethingToWords(prop)
      console.log(words)
      const attribute = getAttribute(words)
      console.log(attribute)

      return selector => {
        cy.log(`${prop} "${selector}"`)
        return target.get(`[${attribute}="${selector}"]`, { log: false })
      }
    } else {
      return target[prop]
    }
  }
})
