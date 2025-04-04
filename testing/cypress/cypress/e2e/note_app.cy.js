describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, 2025')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })
})