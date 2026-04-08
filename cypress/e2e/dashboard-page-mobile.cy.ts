describe("Dashboard page mobile view", () => {
  beforeEach(() => {
    cy.viewport(375, 800);
    cy.visit("/");

    cy.clerkLoaded();
    cy.clerkSignIn({
      strategy: "email_code",
      identifier: Cypress.env("testUser"),
    });

    cy.getCookie("__session").should("exist");

    cy.url().should("include", "/dashboard");
  });

  it("Dashboard Navigations", () => {
    // aliases
    cy.get("[data-test=logo]").as("logo");
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
      cy.visit(`dashboard/${organizationId}`)
        .url()
        .should("include", "/dashboard");
    });

    cy.visit("/select-organization");
    cy.url().should("include", "/select-organization");

    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.visit(`dashboard/${organizationId}`)
        .url()
        .should("include", "/dashboard");
    });
  });

  it.only("Sidebar", () => {
    // aliases
    cy.get("[data-test=header-sidebar-trigger]").as("headerSidebarTrigger");
    cy.get("[data-test=logo]").as("logo");
    //

    cy.url().should("include", "/dashboard");

    // assert default hidden sidebar
    cy.get("[data-test=sidebar-content]").should("not.exist");

    // assert hide and show sidebar
    cy.get("@headerSidebarTrigger").click();
    cy.get("[data-test=sidebar-content]").should("be.visible");

    // assert if default org is selected, only one element is visible and sidebar expanded
    cy.get("[data-test=sidebar-accordion-trigger]").should(($items) => {
      const openedAccordions = [...$items].filter((item) => {
        const value = item.getAttribute("data-state");
        return value === "open";
      });

      expect(openedAccordions.length).to.eq(1);
    });

    // cy.get("@sidebarAccordionTrigger").filter("[data-state=open]").should("have.length", 1);

    // assert click on each sodebar item and check navigation valid url
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);

      cy.get("[data-test=sidebar-accordion-content-nav-buttons]")
        .its("length")
        .then((length) => {
          for (let i = 0; i < length; i++) {
            cy.get("[data-test=sidebar-accordion-content-nav-buttons]")
              .eq(i)
              .click();

            cy.url({ timeout: 10000 }).should(
              "include",
              `/dashboard/${organizationId}`,
            );

            cy.get("[data-test=sidebar-content]").should("not.exist"); //sidebar closed
            cy.get("@headerSidebarTrigger").click(); //reopen sidebar
          }
        });
    });

    // nav to create new org page
    cy.get("[data-test=sidebar-content]").should("be.visible");
    cy.get("[data-test=add-new-organization-button]").click();
    cy.url({ timeout: 10000 }).should("include", "/select-organization");
    //   open close sidebar on create new org page
    cy.get("[data-test=sidebar-content]").should("not.exist");
    cy.get("@headerSidebarTrigger").click();
    cy.get("[data-test=sidebar-content]").should("be.visible");
    cy.get("[data-test=add-new-organization-button]").click();
    cy.get("[data-test=sidebar-content]").should("not.exist");

    cy.get("@logo").click();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");
  });
});
