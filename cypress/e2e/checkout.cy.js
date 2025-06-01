describe("Checkout Feature", () => {
  beforeEach(() => {
    cy.login();
    cy.url().should("include", "/inventory.html");
  });

  it("should complete checkout with 1 item", () => {
    let productName = "";
    cy.get(".inventory_item")
      .first()
      .find(".inventory_item_name")
      .invoke("text")
      .then((text) => {
        productName = text.trim();
      });

    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");

    cy.then(() => {
      cy.get(".cart_item .inventory_item_name").should(
        "have.text",
        productName
      );
    });

    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");

    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("10100");
    cy.get('[data-test="continue"]').click();

    cy.url().should("include", "/checkout-step-two.html");

    cy.then(() => {
      cy.get(".cart_item .inventory_item_name").should(
        "have.text",
        productName
      );
    });

    cy.get('[data-test="finish"]').click();

    cy.url().should("include", "/checkout-complete.html");
    cy.contains("Thank you for your order!").should("be.visible");
  });

  it("should show error when first name is missing", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("10100");
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should(
      "contain",
      "Error: First Name is required"
    );
  });

  it("should show error when last name is missing", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="postalCode"]').type("10100");
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should(
      "contain",
      "Error: Last Name is required"
    );
  });

  it("should show error when postal code is missing", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should(
      "contain",
      "Error: Postal Code is required"
    );
  });

  it("should show errors when nothing is filled", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Error: First Name is required"
    );
  });
});
