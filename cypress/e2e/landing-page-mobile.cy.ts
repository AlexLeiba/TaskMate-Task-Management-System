import { OVERVIEW_OPTIONS } from "../../lib/consts/public/overview";

describe("Landing page mobile view", () => {
  beforeEach(() => {
    cy.viewport(375, 800);
    cy.visit("/");
  });

  it("Header section", () => {
    // check default expanded mobile menu
    cy.get("[data-test=mobile-menu]").should("exist");
    cy.get("[data-test=accordion]").should("not.exist");

    cy.get("[data-test=header-mobile]").within(() => {
      cy.get("[data-test=toggle-menu]").click();
      cy.wait(500); //delay animation
    });
    // assert expanded mobile menu
    cy.get("[data-test=accordion]").should("exist");

    // close expanded menu
    cy.get("[data-test=toggle-menu]").click();
    cy.wait(500); //delay animation

    // assert collapsed mobile menu
    cy.get("[data-test=accordion]").should("not.exist");
  });

  it("Charts Overview section", () => {
    // scroll to overview section
    cy.get("[data-test=overview]").scrollIntoView();

    cy.get("[data-test=overview]").within(() => {
      // aliases
      cy.get("[data-test=overview-image]").as("overviewImages");
      cy.get("[data-test=overview-hovered-option]").as("hoveredOptions");
      cy.get("[data-test=overview-hovered-option] p").as(
        "hoveredOptionsParagraph",
      );
      //

      // assert length
      cy.get("@hoveredOptions").its("length").should("be.greaterThan", 0);

      cy.get("@overviewImages").its("length").should("be.greaterThan", 0);

      // assert hover

      cy.wrap(OVERVIEW_OPTIONS.slice(0, 4)).each((_, index) => {
        cy.get("@overviewImages").eq(index).realClick();
        cy.get("@hoveredOptionsParagraph")
          .eq(index)
          .should("have.class", "font-medium");
      });

      // CHANGE OVERVIEW PAGE
      //aliases
      cy.get("[data-test=overview-pagination] button").as("paginationButtons");
      //

      // click on pagination buttons
      cy.get("@paginationButtons").eq(0).should("be.disabled");
      cy.get("@paginationButtons").eq(1).click().should("be.disabled");
      cy.get("@paginationButtons").eq(0).should("not.be.disabled");

      // assert if cards were rendered
      cy.get("@hoveredOptions").its("length").should("be.greaterThan", 0);
      cy.get("@overviewImages").its("length").should("be.greaterThan", 0);

      // assert hover over cards
      cy.wrap(OVERVIEW_OPTIONS.slice(4)).each((_, index) => {
        cy.get("@overviewImages").eq(index).realClick();
        cy.get("@hoveredOptionsParagraph")
          .eq(4 + index)
          .should("have.class", "font-medium");
      });

      // paginate back
      cy.get("@paginationButtons").eq(0).click().should("be.disabled");
      cy.get("@paginationButtons").eq(1).should("not.be.disabled");
    });
  });
});
