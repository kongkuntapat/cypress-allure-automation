describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login successfully", () => {
    cy.login();
    cy.url().should("include", "/inventory.html");
    cy.contains("Products").should("be.visible");
  });

  it("should show error for incorrect username", () => {
    cy.get('[data-test="username"]').type("uresname_fail");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("should show error for incorrect password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("password_fail");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("should show error when no input", () => {
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username is required"
    );
  });

  it("should show error when no input username", () => {
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username is required"
    );
  });

  it("should show error when no input password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Password is required"
    );
  });
});
