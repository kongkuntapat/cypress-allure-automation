describe("Login (data-driven)", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should test all users in fixture", function () {
    cy.fixture("users").then((users) => {
      users.forEach((user) => {
        cy.get('[data-test="username"]').clear().type(user.username);
        cy.get('[data-test="password"]').clear().type(user.password);
        cy.get('[data-test="login-button"]').click();

        if (user.shouldSucceed) {
          cy.url().should("include", "/inventory.html");
          cy.get("#react-burger-menu-btn").click(); 
          cy.get("#logout_sidebar_link").click();
        } else {
          cy.get('[data-test="error"]').should("exist");
        }
      });
    });
  });
});
