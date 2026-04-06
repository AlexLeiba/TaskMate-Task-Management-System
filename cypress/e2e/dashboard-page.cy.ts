import { setupClerkTestingToken } from "@clerk/testing/cypress";

describe("Dashboard page", () => {
  beforeEach(() => {
    setupClerkTestingToken();
  });
  it("Dashboard page", () => {
    cy.visit("/");

    // setupClerkTestingToken();

    cy.clerkLoaded();
    cy.clerkSignIn({
      strategy: "password",
      identifier: "alexleiba13+999@gmail.com",
      password: "2e37504ff7b2ed1f1d7d66c9e5d96b17",
    });

    cy.getCookie("__session").should("exist");

    // cy.window().its("Clerk").should("exist");
    // cy.window().its("Clerk.user").should("exist");

    cy.visit("/dashboard");
  });
});
