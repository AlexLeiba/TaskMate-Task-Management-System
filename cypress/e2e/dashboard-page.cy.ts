import { setupClerkTestingToken } from "@clerk/testing/cypress";

describe("Dashboard page desktop and tablet view", () => {
  beforeEach(() => {
    setupClerkTestingToken();
    cy.viewport(1280, 800);
    cy.visit("/");

    cy.window().its("Clerk").should("exist"); //check if clerk exists

    cy.window().its("Clerk.loaded").should("eq", true); //this command (should) will retry until the assertion is true or timeout occurs 4s, until then the next line won't be reached.

    cy.clerkSignIn({
      strategy: "email_code",
      identifier: Cypress.env("testUser"),
    });

    cy.getCookie("__session").should("exist");

    cy.url().should("include", "/dashboard");
  });

  it("Dashboard navigations", () => {
    // aliases
    cy.url().as("currentUrl");
    cy.get("[data-test=logo]").eq(0).as("logo");

    // assert dashboard board
    cy.get("@currentUrl").should("include", "/dashboard");
    cy.get("[data-test=create-new-board-card]").should("be.visible");

    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);

      // assert activity data
      cy.visit(`/dashboard/${organizationId}/activity`)
        .url()
        .should("include", "/activity");
      cy.get("h1").should("be.visible");

      // assert settings data
      cy.visit(`/dashboard/${organizationId}/settings`)
        .url()
        .should("include", "/settings");
      cy.get("h1").should("be.visible");
      cy.get("[data-clerk-component=OrganizationProfile]").should(
        "be.visible",
        {
          timeout: 15000,
        },
      );

      // assert billing data
      cy.visit(`/dashboard/${organizationId}/billings`)
        .url()
        .should("include", "/billings");
      cy.get("h1").should("be.visible");

      //  assert overview data
      cy.visit(`/dashboard/${organizationId}/overview`)
        .url()
        .should("include", "/overview");
      cy.get("h1").should("be.visible");
      cy.get("[data-test=status-overview]").should("be.visible", {
        timeout: 15000,
      });
      cy.get("[data-test=priority-breakdown]").should("be.visible", {
        timeout: 15000,
      });
      cy.get("[data-test=team-workload]").should("be.visible", {
        timeout: 15000,
      });
      cy.get("[data-test=finished-work-overview]").should("be.visible", {
        timeout: 15000,
      });
      cy.get("[data-test=recent-activity]").should("be.visible", {
        timeout: 15000,
      });
    });

    cy.get("@logo").click();
    cy.get("@currentUrl").should("include", "/dashboard");

    // assert organization data
    cy.visit("/select-organization");
    cy.url().should("include", "/select-organization");
    cy.get("[data-clerk-component=OrganizationList]").should("be.visible");

    cy.get("@logo").click();
    cy.get("@currentUrl").should("include", "/dashboard");
  });

  it("Sidebar", () => {
    // aliases
    cy.get("[data-test=sidebar-content]").as("sidebarContent");
    cy.get("[data-test=sidebar-menu-items]").as("sidebarMenuItems");
    cy.get("[data-test=sidebar-accordion]").as("sidebarAccordion");
    cy.get("[data-test=sidebar-accordion-trigger]").as(
      "sidebarAccordionTrigger",
    );
    cy.get("[data-test=sidebar-accordion-content]").as(
      "sidebarAccordionContent",
    );
    cy.get("[data-test=sidebar-accordion-content-nav-buttons]").as(
      "sidebarAccordionContentNavButtons",
    );
    cy.get("[data-test=header-sidebar-trigger]").as("headerSidebarTrigger");
    //

    cy.url().should("include", "/dashboard");

    // assert default visible sidebar
    cy.get("@sidebarContent").should("be.visible");

    // assert hide and show sidebar
    cy.get("@headerSidebarTrigger").click();
    cy.get("@sidebarContent").should("be.hidden");
    cy.get("@headerSidebarTrigger").click();
    cy.get("@sidebarContent").should("be.visible");

    // assert if default org is selected, only one element is visible and sidebar expanded
    cy.get("@sidebarAccordionTrigger").should(($items) => {
      const openedAccordions = [...$items].filter((item) => {
        const value = item.getAttribute("data-state");
        return value === "open";
      });

      expect(openedAccordions.length).to.eq(1);
    });

    // cy.get("@sidebarAccordionTrigger").filter("[data-state=open]").should("have.length", 1);

    // assert click on each organization item and check navigation valid url
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);

      cy.get("@sidebarAccordionContentNavButtons").each((navButton) => {
        cy.wrap(navButton).click();
        cy.url().should("include", `/dashboard/${organizationId}`);
      });
    });
  });

  it.only("Board: Create, Delete and Navigate", () => {
    cy.url().should("include", "/dashboard");

    //aliases
    cy.get("[data-test=create-new-board-card]").as("createNewBoardCard");
    //

    // assert new board dialog not exists in the dom
    cy.get("[data-test=create-new-board-dialog-dashboard]").should("not.exist");

    // assert create new board card visible
    cy.get("@createNewBoardCard").should("be.visible");

    // event click on create new board card
    cy.get("@createNewBoardCard").click();

    // assert create new board dialog visible
    cy.get('[role="dialog"]')
      .should("be.visible")
      .and("have.attr", "data-state", "open");

    // intercept loading background images
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("loadImages");
      cy.wait("@loadImages"); //wait for loading images request
    });

    // assert all dialog contents to be loaded and visible
    cy.get("[data-test=create-new-board-dialog-dashboard]").should(
      "be.visible",
    );
    // dialog body
    cy.get("[data-test=dialog-board-details-dashboard-container]").should(
      "be.visible",
      {
        timeout: 15000,
      },
    );

    // assert dialog background images cards are loaded
    cy.get("[data-test=dialog-board-image-card]")
      .should("be.visible")
      .should("have.length.greaterThan", 0);

    // assert dialog submit button visible
    cy.get("[data-test=dialog-board-details-submit-button]").should(
      "be.visible",
    );

    // assert dialog title input visible
    cy.get("[data-test=dialog-board-details-title-input]").should("be.visible");

    // click on first image card
    cy.get("[data-test=dialog-board-image-card]").eq(0).realClick();

    // assert image card was selected
    cy.get("[data-test=dialog-board-image-card]")
      .eq(0)
      .should("have.attr", "data-selected", "true");

    // click on submit button with no title input data
    cy.get("[data-test=dialog-board-details-submit-button]").eq(0).realClick();

    // assert error is required title
    cy.get("[data-test=error-message]")
      .eq(0)
      .contains(/Is required/i)
      .should("be.visible");

    //type board title
    cy.get("[data-test=dialog-board-details-title-input]")
      .eq(0)
      .realType("Test Board");

    // intercept create board request
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("createBoard");
    });

    // click on submit button
    cy.get("[data-test=dialog-board-details-submit-button]").eq(0).realClick();

    // assert create board response 200
    cy.wait("@createBoard").its("response.statusCode").should("eq", 200);

    // assert create board modal has closed after successfull creation of new board
    cy.get("[data-test=create-new-board-dialog-dashboard]").should("not.exist");

    //assert there are more than 0 boards on dashboard page
    cy.get("[data-test=dashboard-board-card]").should(
      "have.length.greaterThan",
      0,
    );

    // aliases
    cy.get("[data-test=dashboard-boards] [data-test=delete-board-button]")
      .eq(0)
      .as("deleteBoardButton");
    //

    // click on delete board button of first board card
    cy.get("@deleteBoardButton").eq(0).realClick();

    // assert open delete modal
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // click on delete modal cancel button
    cy.get("[data-test=delete-dialog-cancel-button]").eq(0).realClick();

    // assert delete modal has closed
    cy.get("[data-test=delete-dialog]").should("not.exist");

    // click again on delete board button of first board card
    cy.get("@deleteBoardButton").eq(0).realClick();

    // assert open delete modal visible
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // intercept deleteting board card api request
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("deleteBoard");
      cy.intercept("DELETE", "/api/fileupload").as("deleteFile");
    });

    // click on delete button of the delete modal
    cy.get("[data-test=delete-dialog-delete-button]").eq(0).realClick();

    // assert delete board response 200
    cy.wait("@deleteFile").its("response.statusCode").should("eq", 200);
    cy.wait("@deleteBoard").its("response.statusCode").should("eq", 200);

    // assert delete modal closed
    cy.get("[data-test=delete-dialog]").should("not.exist");

    ///////////////HEADER CREATE NEW BOARD WORKFLOW////////////////

    //aliases
    cy.get("[data-test=header-create-new-board-button]")
      .eq(0)
      .as("headerCreateNewBoardButton");
    //

    // assert header create new board modal not exists in dom
    cy.get("[data-test=create-new-board-dialog-header]").should("not.exist");

    // assert create board button visible
    cy.get("@headerCreateNewBoardButton").should("be.visible");

    // create an intercept alias for loading background images before click on create button
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("loadImages");
    });

    // click on create board button
    cy.get("@headerCreateNewBoardButton").eq(0).realClick();

    // assert create new board dialog visible
    cy.get('[role="dialog"]')
      .should("be.visible")
      .and("have.attr", "data-state", "open");
    cy.get("[data-test=create-new-board-dialog-header]").should("be.visible");

    cy.wait("@loadImages"); //wait (intersept) for loading images request

    // assert loaded images visible in dialog
    cy.get("[data-test=dialog-board-image-card]").should("be.visible");

    // assert dialog submit button visible
    cy.get("[data-test=dialog-board-details-submit-button]").should(
      "be.visible",
    );
    // assert dialog title input visible
    cy.get("[data-test=dialog-board-details-title-input]").should("be.visible");

    // click on submit button with no value in title input data
    cy.get("[data-test=dialog-board-details-submit-button]").eq(0).realClick();

    // assert error is required title to have value
    cy.get("[data-test=error-message]")
      .eq(0)
      .contains(/Is required/i)
      .should("be.visible");

    //type in title input value
    cy.get("[data-test=dialog-board-details-title-input]")
      .eq(0)
      .realType("Test Board");

    // click on first image card
    cy.get("[data-test=dialog-board-image-card]").eq(0).realClick();

    // assert image card was selected
    cy.get("[data-test=dialog-board-image-card]")
      .eq(0)
      .should("have.attr", "data-selected", "true");

    // intercept create board request
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("createBoard");
    });

    // click on submit button
    cy.get("[data-test=dialog-board-details-submit-button]").eq(0).realClick();

    // assert create board response Status 200
    cy.wait("@createBoard").its("response.statusCode").should("eq", 200);

    //assert that user was redirected to created board
    cy.url().should("include", "/board");

    //click logo to redirect to dashboard page
    cy.get("[data-test=logo]").eq(0).realClick();

    // assert dashboard board
    cy.url().should("include", "/dashboard");

    // assert create new board card button exists
    cy.get("[data-test=create-new-board-card]").should("be.visible");

    // assert created board card exists
    cy.get("[data-test=dashboard-board-card]").should("be.visible");

    // click on created board card
    cy.get("[data-test=dashboard-board-card]").eq(0).realClick();

    // assert navigation to board page
    cy.url().should("include", "/board");

    //click logo to redirect to dashboard page
    cy.get("[data-test=logo]").eq(0).realClick();

    // assert dashboard board
    cy.url().should("include", "/dashboard");

    // click on delete board button of first board card
    cy.get("@deleteBoardButton").eq(0).realClick();

    // assert open delete modal visible
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // intercept deleteting board card api request
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("deleteBoard");
      cy.intercept("DELETE", "/api/fileupload").as("deleteFile");
    });

    // click on delete button of the delete modal
    cy.get("[data-test=delete-dialog-delete-button]").eq(0).realClick();

    // assert delete board response 200
    cy.wait("@deleteFile").its("response.statusCode").should("eq", 200);
    cy.wait("@deleteBoard").its("response.statusCode").should("eq", 200);

    // assert delete modal closed
    cy.get("[data-test=delete-dialog]").should("not.exist");
  });
});
