describe("Dashboard page desktop and tablet view", () => {
  beforeEach(() => {
    // setupClerkTestingToken();
    cy.viewport(1280, 800);
    cy.visit("/");

    cy.window().its("Clerk", { timeout: 15000 }).should("exist"); //check if clerk exists

    cy.window()
      .its("Clerk.loaded", { timeout: 15000 })
      .should("eq", true, { timeout: 15000 }); //this command (should) will retry until the assertion is true or timeout occurs 4s, until then the next line won't be reached.

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
    cy.get("[data-test=create-new-board-card]").should("be.visible", {
      timeout: 15000,
    });

    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);

      // assert activity data
      cy.visit(`/dashboard/${organizationId}/activity`)
        .url()
        .should("include", "/activity");
      cy.get("h1").should("be.visible", { timeout: 15000 });

      // assert settings data
      cy.visit(`/dashboard/${organizationId}/settings`)
        .url()
        .should("include", "/settings");
      cy.get("h1").should("be.visible", { timeout: 15000 });
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
      cy.get("h1").should("be.visible", { timeout: 15000 });

      //  assert overview data
      cy.visit(`/dashboard/${organizationId}/overview`)
        .url()
        .should("include", "/overview");
      cy.get("h1").should("be.visible", { timeout: 15000 });
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
    cy.url().should("include", "/select-organization", { timeout: 15000 });
    cy.get("[data-clerk-component=OrganizationList]").should("be.visible", {
      timeout: 15000,
    });

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
});
