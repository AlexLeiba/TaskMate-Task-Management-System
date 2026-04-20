import { setupClerkTestingToken } from "@clerk/testing/cypress";

describe("Board page", () => {
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

  it.only("List: create, delete, copy", () => {
    // assert board exists
    cy.get("[data-test=dashboard-board-card]").should("be.visible");

    // click on board to redirect to board page
    cy.get("[data-test=dashboard-board-card]").eq(0).realClick();

    // assert board page url
    cy.url().should("include", "/board");

    //assert no lists created
    cy.get("[data-test=list]").should("not.exist");

    // assert add new list trigger visible
    cy.get("[data-test=add-new-list-trigger]").as("addNewListTrigger");
    cy.get("@addNewListTrigger").should("be.visible");

    // click on add new list trigger
    cy.get("@addNewListTrigger").eq(0).realClick();

    // assert create new list element with input and buttons visible
    cy.get("[data-test=add-new-list-input]").should("be.visible");
    cy.get("[data-test=add-new-list-submit]").should("be.visible");
    cy.get("[data-test=add-new-list-cancel]").should("be.visible");

    // click on cancel button
    cy.get("[data-test=add-new-list-cancel]").eq(0).realClick();

    // assert create new list element with input and buttons not visible
    cy.get("[data-test=add-new-list-input]").should("not.exist");
    cy.get("[data-test=add-new-list-submit]").should("not.exist");
    cy.get("[data-test=add-new-list-cancel]").should("not.exist");

    // click again on add new list trigger
    cy.get("@addNewListTrigger").eq(0).realClick();

    // assert create new list element with input and buttons visible
    cy.get("[data-test=add-new-list-input]").should("be.visible");
    cy.get("[data-test=add-new-list-submit]").should("be.visible");
    cy.get("[data-test=add-new-list-cancel]").should("be.visible");

    // click on submit button with no title value
    cy.get("[data-test=add-new-list-submit]").eq(0).realClick();

    // assert error message is required title within the add new list trigger
    cy.get("@addNewListTrigger").within(() => {
      cy.contains(/Is required/i).should("be.visible");
    });

    //type in title value
    cy.get("[data-test=add-new-list-input]").eq(0).realType("Test List");

    // intercept creating a new list
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("createList");
    });

    // click on submit button
    cy.get("[data-test=add-new-list-submit]").eq(0).realClick();

    cy.wait("@createList").its("response.statusCode").should("eq", 200);

    // assert list was created
    cy.get("[data-test=list]").should("have.length", 1);

    // assert options menu visible
    cy.get("[data-test=list-options-trigger]").should("be.visible");

    //click on options menu trigger
    cy.get("[data-test=list-options-trigger]").eq(0).realClick();

    // assert delete button visible
    cy.get("[data-test=list-options-delete-button]").should("be.visible");

    // click on delete button
    cy.get("[data-test=list-options-delete-button]").eq(0).realClick();

    // assert delete modal visible
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // click on cancel button
    cy.get("[data-test=delete-dialog-cancel-button]").eq(0).realClick();

    // assert delete modal not visible
    cy.get("[data-test=delete-dialog]").should("not.exist");

    // click on options delete button
    cy.get("[data-test=list-options-delete-button]").eq(0).realClick();

    // assert delete modal visible
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // alias intercept delete list
    cy.location("pathname")
      .then((pathname) => {
        cy.intercept({
          method: "POST",
          pathname: pathname,
        });
      })
      .as("deleteList");

    // click on modal delete button
    cy.get("[data-test=delete-dialog-delete-button]").eq(0).realClick();

    // assert delete list response 200
    cy.wait("@deleteList").its("response.statusCode").should("eq", 200);

    // assert modal closed
    cy.get("[data-test=delete-dialog]").should("not.exist");

    // assert list deleted
    cy.get("[data-test=list]").should("not.exist");
  });
  it("List: edit title, status", () => {});
  it("Card: create, delete, copy", () => {});
  it("Card: edit title, priority, assignee", () => {});

  it("CardDetails: edit description, priority, assignee, due date, list status", () => {});
  it("CardDetails Tabs: comments, attachments, checklist", () => {});
});
