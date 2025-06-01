describe("Logout Feature", () => {
  beforeEach(() => {
    cy.login();
    cy.url().should("include", "/inventory.html");
  });

  it("should logout successfully", () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();
    
    cy.url().should("eq", Cypress.config().baseUrl);
    cy.get('[data-test="login-button"]').should('be.visible');
  });
});
