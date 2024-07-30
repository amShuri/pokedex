describe("Basic Pokédex Functionality", () => {
  beforeEach(() => {
    cy.visit("127.0.0.1:8080");
  });

  it("successfully loads the Pokemon List", () => {
    const pokemonPerPage = 24;
    cy.get(".pokemon-box").should("have.length", pokemonPerPage);
  });

  it("successfully navigates between pages", () => {
    cy.get(".pokemon-box .pokemon-name").eq(0).should("contain", "bulbasaur");
    cy.get("#next-page-btn").click();
    cy.get(".pokemon-box .pokemon-name")
      .eq(0)
      .should("not.contain", "bulbasaur");
  });

  it("successfully opens up pokemon modals", () => {
    cy.get(".pokemon-box").eq(0).click();
    cy.get(".modal-body .col").eq(0).children(".pokemon-img").should("exist");
  });

  it("loads on page 1 with valid amount of total pages", () => {
    const pokemonPerPage = 24;
    const avgPokemonCount = 1000;
    const avgPageCount = Math.ceil(avgPokemonCount / pokemonPerPage);
    cy.get("#current-page").should("contain", "1");
    cy.get("#total-pages")
      .invoke("text")
      .then((text) => parseInt(text))
      .should("be.gt", avgPageCount);
  });

  it("disables the 'previous button' when on page 1", () => {
    cy.get("#previous-page-btn").should("be.disabled");
    cy.get("#next-page-btn").click();
    cy.get("#previous-page-btn").should("not.be.disabled");
    cy.get("#previous-page-btn").click();
    cy.get("#previous-page-btn").should("be.disabled");
  });
});
