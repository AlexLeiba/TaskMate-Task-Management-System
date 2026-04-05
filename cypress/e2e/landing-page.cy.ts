describe("Landing page desktop view", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit("/");
  });

  it.only("Header section", () => {});

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
      cy.get("[data-test=feature-card]").eq(0).click();

      //check  slider 1 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-1] div").should(
        "have.class",
        "bg-muted-foreground",
      );

      // click on the second feature card
      cy.get("[data-test=feature-card]").eq(1).click();

      //check  slider 2 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-2] div").should(
        "have.class",
        "bg-muted-foreground",
      );

      // click on the third feature card
      cy.get("[data-test=feature-card]").eq(2).click();

      //check  slider 3 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-3] div").should(
        "have.class",
        "bg-muted-foreground",
      );
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

      // click on the first feature card
      cy.get("[data-test=feature-card]").eq(0).click();

      //check  slider 1 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-1] div").should(
        "have.class",
        "bg-muted-foreground",
      );

      // click on the second feature card
      cy.get("[data-test=feature-card]").eq(1).click();

      //check  slider 2 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-2] div").should(
        "have.class",
        "bg-muted-foreground",
      );

      // click on the third feature card
      cy.get("[data-test=feature-card]").eq(2).click();

      //check  slider 3 page selected
      cy.get("[data-test=slider-content] [data-test=slide-page-3] div").should(
        "have.class",
        "bg-muted-foreground",
      );
    });
  });

  it("Chart overview section", () => {
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
      cy.get("@overviewImages").eq(0).realHover();
      cy.get("@hoveredOptionsParagraph")
        .eq(0)
        .should("have.class", "font-medium");

      cy.get("[data-test=overview-image]").eq(1).realHover();
      cy.get("@hoveredOptionsParagraph")
        .eq(1)
        .should("have.class", "font-medium");

      cy.get("[data-test=overview-image]").eq(2).realHover();
      cy.get("@hoveredOptionsParagraph")
        .eq(2)
        .should("have.class", "font-medium");

      cy.get("[data-test=overview-image]").eq(3).realHover();
      cy.get("@hoveredOptionsParagraph")
        .eq(3)
        .should("have.class", "font-medium");

      // change page
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
      cy.get("@overviewImages").eq(0).realHover();
      cy.get("@hoveredOptionsParagraph")
        .eq(4)
        .should("have.class", "font-medium");

      cy.get("@overviewImages").eq(1).realHover();
      cy.get("@hoveredOptionsParagraph")
        .eq(5)
        .should("have.class", "font-medium");

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

      // assert default active slide content
      cy.get("[data-test=content-item-1]").should("be.visible");

      // assert default active slide button
      cy.get("[data-test=slide-page-1]").should("be.visible");

      // assert click on slide pagination
      cy.get("[data-test=slide-page-2]").click();
      cy.get("[data-test=content-item-2]").should("be.visible");

      cy.get("[data-test=slide-page-3]").click();
      cy.get("[data-test=content-item-3]").should("be.visible");

      cy.get("[data-test=slide-page-4]").click();
      cy.get("[data-test=content-item-4]").should("be.visible");

      cy.get("[data-test=slide-page-5]").click();
      cy.get("[data-test=content-item-5]").should("be.visible");

      cy.get("[data-test=slide-page-1]").click();
      cy.get("[data-test=content-item-1]").should("be.visible");

      // assert click on navigation buttons
      cy.get("@nextSlideButton").click();
      cy.get("[data-test=content-item-2]").should("be.visible");

      cy.get("@previousSlideButton").click();
      cy.get("[data-test=content-item-1]").should("be.visible");
    });
  });

  //protected pages, learn how to mock auth token, test user exp on protected routes
});
