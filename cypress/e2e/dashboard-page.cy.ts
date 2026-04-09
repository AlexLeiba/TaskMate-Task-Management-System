describe("Dashboard page desktop and tablet view", () => {
  beforeEach(() => {
    // setupClerkTestingToken();
    cy.viewport(1280, 800);
    cy.visit("/");

    cy.clerkLoaded();
    cy.clerkSignIn({
      strategy: "email_code",
      identifier: Cypress.env("testUser"),
    });

    cy.getCookie("__session").should("exist");

    cy.url().should("include", "/dashboard");
  });

  it("Dashboard navigations", () => {
    // aliases
    cy.get("[data-test=logo]").eq(0).as("logo");
    cy.url().should("include", "/dashboard").as("includeDashboardUrl");
    //
    cy.get("@includeDashboardUrl");

    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.visit(`dashboard/${organizationId}/activity`)
        .url()
        .should("include", "/activity");

      cy.visit(`dashboard/${organizationId}/settings`)
        .url()
        .should("include", "/settings");

      cy.visit(`dashboard/${organizationId}/billings`)
        .url()
        .should("include", "/billings");

      cy.visit(`dashboard/${organizationId}/overview`)
        .url()
        .should("include", "/overview");
    });

    cy.get("@logo").click();
    cy.get("@includeDashboardUrl");

    cy.visit("/select-organization");
    cy.url().should("include", "/select-organization");

    cy.get("@logo").click();
    cy.get("@includeDashboardUrl");
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
