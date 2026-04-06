import { TabType } from "../../lib/types";
import { HEADER_TABS_LINKS } from "../../lib/consts/links";
import {
  EXECUTION_TOOLS_DATA,
  ORGANIZATION_TOOLS_DATA,
  TESTIMONIALS_DATA,
} from "../../lib/consts/public/body";
import { OVERVIEW_OPTIONS } from "../../lib/consts/public/overview";

describe("Landing page desktop view", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit("/");
  });

  it("Header section", () => {
    // aliases
    cy.get("[data-test=expanded-header-tab]").as("expandedHeaderTab");
    cy.get("[data-test=logo]").as("logo");
    //
    cy.get("[data-test=header]").within(() => {
      cy.get("[data-test=logo]").should("be.visible");

      // assert default state of header tabs
      cy.get("@expandedHeaderTab")
        .should("have.attr", "style")
        .and("include", "transform:translateY(-100%)");

      cy.wrap(HEADER_TABS_LINKS).each((tab: TabType) => {
        cy.wait(500);
        // click link
        cy.get(`[data-test=${tab.value}]`).should("be.visible").click();

        // assert if expanded
        cy.get("@expandedHeaderTab")
          .should("be.visible")
          .and("have.css", "transform")
          .and("include", "52");

        // assert header content
        cy.get("[data-test=card-tabs-content]")
          .its("length")
          .should("be.greaterThan", 0);
        cy.get("[data-test=side-tabs-content]")
          .its("length")
          .should("be.greaterThan", 0);
      });
    });
    // assert click outside header
    cy.wait(500);
    cy.get("[data-test=organization-features] [data-test=feature-card]")
      .eq(0)
      .click();

    cy.wait(500);
    // assert default state of header tabs
    cy.get("@expandedHeaderTab").should("not.be.visible");

    // click on login button
    cy.get("[data-test=auth-links]").within(() => {
      //from home nav to sign in page
      cy.get("[data-test=signin-link]").click();
      cy.url().should("include", "/sign-in");

      // nav back home
      cy.get("@logo").eq(0).click();
      cy.url().should("include", "/");

      // from home nav to sign up
      cy.get("[data-test=signup-link]").click();
      cy.url().should("include", "/sign-up");

      // nav back home
      cy.get("@logo").eq(0).click();
      cy.url().should("include", "/");

      // from home nav to sign in
      cy.get("[data-test=signin-link]").click();
      cy.url().should("include", "/sign-in");

      // from sign in nav to sign up
      cy.get("[data-test=signup-link]").click();
      cy.url().should("include", "/sign-up");

      // from sign up nav to sign in
      cy.get("[data-test=signin-link]").click();
      cy.url().should("include", "/sign-in");

      // nav back to home
      cy.get("@logo").eq(0).click();
      cy.url().should("include", "/");
    });

    // click on join for free button
  });

  it("Hero section call to action button", () => {
    cy.get("[data-test=join-for-free-link]").click();
    cy.url().should("include", "/sign-up");
  });

  it("Organization features slider section", () => {
    // scroll to organization features
    cy.get("[data-test=organization-features]").scrollIntoView();

    cy.get("[data-test=organization-features]").within(() => {
      // check the length of feature cards
      cy.get("[data-test=feature-card]")
        .its("length")
        .should("be.greaterThan", 0);

      // check if feature cards are visible
      cy.get("[data-test=feature-card]").should("be.visible");

      // check default active feature card
      cy.get("[data-test=feature-card]").eq(0).should("have.class", "bg-muted");

      //check default slider 1 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-1] div").should(
        "have.class",
        "bg-muted-foreground",
      );

      // click on the first feature card
      cy.wrap(ORGANIZATION_TOOLS_DATA).each((_, index) => {
        cy.get("[data-test=feature-card]").eq(index).click();

        //check  slider 1 page selected
        cy.get(
          `[data-test=slider-content] [data-test=slide-page-${index + 1}] div`,
        ).should("have.class", "bg-muted-foreground");
      });
    });
  });
  it("Task management helpers slider section", () => {
    // scroll to organization features
    cy.get("[data-test=execution-features]").scrollIntoView();

    cy.get("[data-test=execution-features]").within(() => {
      // check the length of feature cards
      cy.get("[data-test=feature-card]")
        .its("length")
        .should("be.greaterThan", 0);

      // check if feature cards are visible
      cy.get("[data-test=feature-card]").should("be.visible");

      // check default active feature card
      cy.get("[data-test=feature-card]").eq(0).should("have.class", "bg-muted");

      //check default slider 1 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-1] div").should(
        "have.class",
        "bg-muted-foreground",
      );

      cy.wrap(EXECUTION_TOOLS_DATA).each((_, index) => {
        // click on each card
        cy.get("[data-test=feature-card]").eq(index).click();

        //check  slider selected
        cy.get(
          `[data-test=slider-content] [data-test=slide-page-${index + 1}] div`,
        ).should("have.class", "bg-muted-foreground");
      });
    });
  });

  it("Charts overview section", () => {
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
        cy.get("@overviewImages").eq(index).realHover();
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
        cy.get("@overviewImages").eq(index).realHover();
        cy.get("@hoveredOptionsParagraph")
          .eq(4 + index)
          .should("have.class", "font-medium");
      });

      // paginate back
      cy.get("@paginationButtons").eq(0).click().should("be.disabled");
      cy.get("@paginationButtons").eq(1).should("not.be.disabled");
    });
  });

  it("Testimonials section", () => {
    // scroll to testimonial section
    cy.get("[data-test=testimonials]").scrollIntoView();

    //  query section
    cy.get("[data-test=testimonials]").within(() => {
      // aliases
      cy.get("[data-test=slider-content]").as("sliderContent");
      cy.get("[data-test=next]").as("nextSlideButton");
      cy.get("[data-test=previous]").as("previousSlideButton");

      //

      cy.wrap(TESTIMONIALS_DATA).each((_, index) => {
        cy.wait(500);
        // assert click on slide pagination
        cy.get(`[data-test=slide-page-${index + 1}]`).click();
        cy.get(`[data-test=content-item-${index + 1}]`).should("be.visible");
      });

      cy.get("[data-test=slide-page-1]").click();
      cy.get("[data-test=content-item-1]").should("be.visible");

      // assert click on navigation buttons
      cy.get("@nextSlideButton").click();
      cy.get("[data-test=content-item-2]").should("be.visible");

      cy.get("@previousSlideButton").click();
      cy.get("[data-test=content-item-1]").should("be.visible");
    });
  });
});
