describe('Truck On User flows', () => {
  beforeEach(() => {
    cy.interceptGraphQlQuery()
    cy.visit('http://localhost:3000/')
  })

  it('should display a list of trails on the landing page', () => {
    cy.url('http://localhost:3000/')
    cy.get('[href="/trail/1"]')
      .contains('Mosquito Pass')
    cy.get('[href="/trail/11"]')
      .contains('Switzerland Trail')
  })

  it('should search trails when typing in the search bar and clean input when clear search is clicked', () => {
    cy.get('.search-input')
      .type('sch')
    cy.get('.trail-card-container > :nth-child(1)')
      .contains('Schofield Pass')
    cy.get('.reset-search')
      .click()
    cy.get('.trail-card-container > :nth-child(1)')
      .contains('Mosquito Pass')
    cy.get('.trail-card-container > :nth-child(3)')
      .contains('Schofield Pass')
  })

  it('should filter trails based on categories selected in filter options after clicking apply', () => {
    cy.get('.filter-button')
      .click()
    cy.get('.filter-dropdown-content > .filter-options-container > .type-filters > :nth-child(3)')
      .click()
    cy.get('.filter-dropdown-content > .filter-options-container > .activity-filters > :nth-child(3)')
      .click()
    cy.get('.filter-apply-button')
      .click()
    cy.get('.trail-card-container > :nth-child(1)')
      .contains('Loch Lomond')
    cy.get('.filter-button')
      .click()
    cy.get('.filter-reset-button')
      .click()
    cy.get('.filter-button')
      .click()
    cy.get('.trail-card-container > :nth-child(2)')
      .contains('Black Bear Pass')
  })
})
