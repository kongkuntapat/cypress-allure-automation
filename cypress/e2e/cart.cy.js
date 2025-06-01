describe("Cart Feature", () => {
  beforeEach(() => {
    cy.login();
    cy.url().should("include", "/inventory.html");
  });

  it("should add first product to cart", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
  });

  it("should remove product from cart", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".inventory_item").first().contains("Remove").click();
    cy.get(".shopping_cart_badge").should("not.exist");
  });

  it("should show product in cart page", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("have.length", 1);
  });

  it("should remove product from cart page", () => {
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get(".cart_item").should("have.length", 0);
    cy.get(".shopping_cart_badge").should("not.exist");
  });
});
