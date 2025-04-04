describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    const user = {
      username: 'test',
      name: 'test',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)

    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, 2025')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login in', function () {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('test logged in')
  })

  it('login fails with wrong credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'test logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#note-input').type('a new note created by cypress')
      cy.get('#save-button').click()
      cy.contains('a new note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'another note created by cypress', important: true })
      })

      it('can be marked as not important', function () {
        cy.contains('another note created by cypress').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: true })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: true })
      })

      it('one of those can be mode important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})