describe("Dashboard page mobile view", () => {
  beforeEach(() => {
    cy.viewport(375, 800);
    cy.visit("/");

    cy.window().its("Clerk", { timeout: 15000 }).should("exist"); //check if clerk exists

    cy.window()
      .its("Clerk.loaded", { timeout: 15000 })
      .should("eq", true, { timeout: 15000 }); //this command (should) will retry until the assertion is true or timeout occurs 4s, until then the next line wont be reached.

    cy.clerkSignIn({
      strategy: "email_code",
      identifier: Cypress.env("testUser"),
    });

    cy.getCookie("__session").should("exist");

    cy.url().should("include", "/dashboard");
  });

  it("Dashboard Navigations", () => {
    // aliases
    cy.url().as("currentUrl");
    cy.get("[data-test=footer] [data-test=logo]").eq(0).as("logo");
    //

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
    cy.get("[data-test=header-sidebar-trigger]").as("headerSidebarTrigger");
    cy.get("[data-test=footer] [data-test=logo]").eq(0).as("logo");
    cy.url().as("currentUrl");
    //

    cy.get("@currentUrl").should("include", "/dashboard");

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

    // assert click and navigate with valid url on each sodebar item
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
    cy.get("@currentUrl").should("include", "/dashboard");
  });
});
