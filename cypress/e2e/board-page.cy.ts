import { setupClerkTestingToken } from "@clerk/testing/cypress";
import { LIST_STATUSES_CYPRESS } from "../data/statuses";

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

  it("List: create, delete, copy", () => {
    // NAVIGATE TO BOARD PAGE//

    // assert board exists
    cy.get("[data-test=dashboard-board-card]").should("be.visible");

    // click on board to redirect to board page
    cy.get("[data-test=dashboard-board-card]").eq(0).realClick();

    // assert board page url
    cy.url().should("include", "/board");

    //////TEST LIST CREATION//////

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
    cy.get("[data-test=list]").should("have.length.greaterThan", 0);

    ///// TEST LIST DELETION ////

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
    // cy.get("[data-test=list]").should("not.exist");

    ////// TEST LIST COPY ///////
    cy.get("@addNewListTrigger").eq(0).realClick();

    //type in input of create list form
    cy.get("[data-test=add-new-list-input]")
      .eq(0)
      .realType("Test List to be copied");

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
    cy.get("[data-test=list]").should("have.length.greaterThan", 0);

    // assert options menu trigger visible
    cy.get("[data-test=list-options-trigger]").should("be.visible");

    //click on options menu trigger
    cy.get("[data-test=list-options-trigger]").eq(0).realClick();

    //assert copy button is visible
    cy.get("[data-test=list-options-copy-button]").should("be.visible");

    //intercept copy new list alias
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("copyList");
    });

    // click on copy button
    cy.get("[data-test=list-options-copy-button]").eq(0).realClick();

    //wait for list to be copied
    cy.wait("@copyList").its("response.statusCode").should("eq", 200);

    //assert new list was created and visible
    cy.get("[data-test=list]").should("have.length.greaterThan", 1);

    //NEW COPIED LIST WILL REMAIN FOR FURTHER CARDS TESTS BEFORE BEING DELETED

    ///////////// CREATE A LIST FOR LATER CARDS TESTS////////////

    //     //type in title value
    //     cy.get("[data-test=add-new-list-input]")
    //       .eq(0)
    //       .realType("Test List with cards");
    //
    //     // intercept creating a new list
    //     cy.location("pathname").then((pathname) => {
    //       cy.intercept({
    //         method: "POST",
    //         pathname: pathname,
    //       }).as("createList");
    //     });
    //
    //     // click on submit button
    //     cy.get("[data-test=add-new-list-submit]").eq(0).realClick();
    //
    //     cy.wait("@createList").its("response.statusCode").should("eq", 200);
    //
    //     // assert list was created
    //     cy.get("[data-test=list]").should("have.length", 1);
  });
  it("List: edit title, status", () => {
    // NAVIGATE TO BOARD PAGE//

    // assert board exists
    cy.get("[data-test=dashboard-board-card]").should("be.visible");

    // click on board to redirect to board page
    cy.get("[data-test=dashboard-board-card]").eq(0).realClick();

    // assert board page url
    cy.url().should("include", "/board");

    //// TEST EDITING LIST TITLE////

    // assert options menu trigger visible
    cy.get("[data-test=list-options-trigger]").should("be.visible");

    //click on options menu trigger
    cy.get("[data-test=list-options-trigger]").eq(0).realClick();

    //assert edit button is visible
    cy.get("[data-test=edit-list-title-trigger]").should("be.visible");

    //click on edit button
    cy.get("[data-test=edit-list-title-trigger]").eq(0).realClick();

    //assert edit list title input visible
    cy.get("[data-test=edit-list-title-input]").should("be.visible");
    cy.get("[data-test=edit-list-title-cancel]").should("be.visible");
    cy.get("[data-test=edit-list-title-submit]").should("be.visible");

    // clear input value and submit with no title value
    cy.get("[data-test=edit-list-title-input]").clear();
    cy.get("[data-test=edit-list-title-submit]").eq(0).realClick();

    // assert error message is required title within the edit list modal
    cy.get("[data-test=edit-list-title-trigger]").within(() => {
      cy.contains(/Is required/i).should("be.visible");
    });

    //type in title value
    cy.get("[data-test=edit-list-title-input]").realType(
      "Edited title of Test List",
    );

    //alias intercept edit list title
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("editListTitle");
    });

    // submit with title value
    cy.get("[data-test=edit-list-title-submit]").eq(0).realClick();

    //wait for list to be edited
    cy.wait("@editListTitle").its("response.statusCode").should("eq", 200);

    //assert edit title content not visible
    cy.get("[data-test=edit-list-title-input]").should("not.exist");
    cy.get("[data-test=edit-list-title-cancel]").should("not.exist");
    cy.get("[data-test=edit-list-title-submit]").should("not.exist");

    //////TEST EDIT LIST STATUS//////
    // assert list status trigger button visible
    cy.get("[data-test=list-status-trigger]").should("be.visible");

    // click on list status trigger
    cy.get("[data-test=list-status-trigger]").eq(0).realClick();

    //assert list status content is visible
    cy.get("[data-test=select-list-status-button]")
      .should("be.visible")
      .and("have.length", LIST_STATUSES_CYPRESS.length);

    //alias intercept change list status
    cy.location("pathname")
      .then((pathname) => {
        cy.intercept({
          method: "POST",
          pathname: pathname,
        });
      })
      .as("changeListStatus");

    //click on last list status option
    cy.get("[data-test=select-list-status-button]").last().realClick();

    //wait for list to be edited
    cy.wait("@changeListStatus").its("response.statusCode").should("eq", 200);

    //assert list status new value is equal to selected status value
    cy.get("[data-test=list-status-trigger]").should(
      "have.attr",
      "data-selected",
      LIST_STATUSES_CYPRESS.at(-1)?.value,
    );
  });

  it("Card: create, delete, copy", () => {
    // NAVIGATE TO BOARD PAGE//

    // assert board exists on Dashboard page
    cy.get("[data-test=dashboard-board-card]").should("be.visible");

    // click on board to redirect to board page
    cy.get("[data-test=dashboard-board-card]").eq(0).realClick();

    // assert board page url
    cy.url().should("include", "/board");

    // assert a list exists
    cy.get("[data-test=list]").should("be.visible");

    //alises
    cy.get("[data-test=add-new-card-trigger]").as("addNewCardTrigger");
    //

    //// TEST CARD CREATION////

    // assert Add a card button visible
    cy.get("@addNewCardTrigger").should("be.visible");

    // click on Add a card button
    cy.get("@addNewCardTrigger").eq(0).realClick();

    // assert after click Add a card button element with input and buttons are visible
    cy.get("[data-test=add-new-card-input]").should("be.visible");
    cy.get("[data-test=add-new-card-submit]").should("be.visible");
    cy.get("[data-test=add-new-card-cancel]").should("be.visible");

    //click on cancel button
    cy.get("[data-test=add-new-card-cancel]").realClick();

    // assert after click cancel button element with input and buttons are not visible
    cy.get("[data-test=add-new-card-input]").should("not.exist");
    cy.get("[data-test=add-new-card-submit]").should("not.exist");
    cy.get("[data-test=add-new-card-cancel]").should("not.exist");

    //click again on Add a card button
    cy.get("@addNewCardTrigger").eq(0).realClick();

    // click on submit with no title value
    cy.get("[data-test=add-new-card-submit]").realClick();

    // assert error message is required title within the Add a card button
    cy.get("@addNewCardTrigger").within(() => {
      cy.contains(/Is required/i).should("be.visible");
    });

    //type in title value
    cy.get("[data-test=add-new-card-input]").realType("Test Card");

    //intercept create new card alias
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("createNewCard");
    });

    // click on submit button
    cy.get("[data-test=add-new-card-submit]").realClick();

    //wait for card to be created
    cy.wait("@createNewCard").its("response.statusCode").should("eq", 200);

    // assert card was created
    cy.get("[data-test=ticket-card]").should("be.visible");

    ////// TEST CARD DELETION//////

    ///// TEST CARD COPYING//////
  });
  it("Card: edit title, priority, assignee", () => {});

  it("CardDetails: edit description, priority, assignee, due date, list status", () => {});
  it("CardDetails Tabs: comments, attachments, checklist", () => {});
});
