describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'test',
      name: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:5173')
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

  it.only('login fails with wrong credentials', function () {
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
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#note-input').type('a new note created by cypress')
      cy.get('#save-button').click()
      cy.contains('a new note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('#note-input').type('another note created by cypress')
        cy.get('#save-button').click()
      })

      it('can be marked as important', function () {
        cy.contains('another note created by cypress').contains('make not important').click()
        cy.contains('another note created by cypress').contains('make important')
      })
    })

  })
})