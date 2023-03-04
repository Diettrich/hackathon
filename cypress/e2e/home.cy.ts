// home.cy.ts
describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the search bar", () => {
    cy.get('input[type="text"][placeholder="Search players"]').should("exist");
  });

  it("displays the list of players", () => {
    cy.get('[data-testid="card-container"]').should("have.length.gte", 1);
  });

  it("can search for players", () => {
    cy.get('input[type="text"][placeholder="Search players"]').type("John");
    cy.get('[data-testid="card-container"]').should("have.length.gte", 1);
  });

  it("can navigate to the next page", () => {
    cy.get('[data-testid="pagination-next"]').click();
    cy.get('[data-testid="card-container"]').should("have.length.gte", 1);
  });

  it("can navigate to the previous page", () => {
    cy.get('[data-testid="pagination-previous"]').click();
    cy.get('[data-testid="card-container"]').should("have.length.gte", 1);
  });

  it("can navigate to a specific page", () => {
    cy.get('[data-testid="pagination-page-2"]').click();
    cy.get('[data-testid="card-container"]').should("have.length.gte", 1);
  });
});

export {};
