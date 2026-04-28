import { setupClerkTestingToken } from "@clerk/testing/cypress";
import { LIST_STATUSES_CYPRESS } from "../data/statuses";
import { CARD_PRIORITIES_CYPRESS } from "../data/priorities";

describe("Board page", () => {
  beforeEach(() => {
    setupClerkTestingToken();
    cy.viewport(1280, 800);
    cy.visit("/");

    cy.window().its("Clerk").should("exist"); //check if clerk exists in the global object window

    cy.window().its("Clerk.loaded").should("eq", true); //this command (should) will retry until the assertion is true or timeout occurs 4s, until then the next line won't be reached.

    // sign in with Clerk
    cy.clerkSignIn({
      strategy: "email_code",
      identifier: Cypress.env("testUser"),
    });

    //assert the session cookie present in the browser after sign in
    cy.getCookie("__session").should("exist");

    cy.url().should("include", "/dashboard");
  });

  it("List: create, delete, copy, edit title, status. Board: create board", () => {
    ////////CREATE NEW BOARD FOR TESTING ALL LIST AND CARD OPERATIONS///////
    //THE BOARD WILL BE DELETED AT THE END OF ALL TESTS//

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

    // intercept loading board background images
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("loadImages");
      cy.wait("@loadImages"); //wait for loading images request
    });

    // assert all dialog contents to be loaded and visible
    cy.get("[data-test=create-new-board-dialog-dashboard]").should(
      "be.visible",
    );
    // assert dialog body visible
    cy.get("[data-test=dialog-board-details-dashboard-container]").should(
      "be.visible",
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

    // click on first board image card
    cy.get("[data-test=dialog-board-image-card]").eq(0).realClick();

    // assert image card was selected
    cy.get("[data-test=dialog-board-image-card]")
      .eq(0)
      .should("have.attr", "data-selected", "true");

    //type the board title
    cy.get("[data-test=dialog-board-details-title-input]")
      .eq(0)
      .type("Test Board");

    //alias intercept create board request
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("createBoard");
    });

    // click on submit button
    cy.get("[data-test=dialog-board-details-submit-button]").eq(0).realClick();

    //wait for create board api response 200
    cy.wait("@createBoard").its("response.statusCode").should("eq", 200);

    // assert create board modal has closed after successfull creation of new board
    cy.get("[data-test=create-new-board-dialog-dashboard]").should("not.exist");

    //assert there are more than 0 boards on dashboard page
    cy.get("[data-test=dashboard-board-card]").should(
      "have.length.greaterThan",
      0,
    );

    /////// NAVIGATE TO BOARD PAGE//////

    // click on first created board to redirect to board page
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

    // assert error message is present within the Add new list trigger
    cy.get("@addNewListTrigger")
      .eq(0)
      .within(() => {
        cy.contains(/Is required/i).should("be.visible");
      });

    //type in title value
    cy.get("[data-test=add-new-list-input]").eq(0).realType("Test List");

    // alias intercept creating a new list
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("createList");
    });

    // click on submit button
    cy.get("[data-test=add-new-list-submit]").eq(0).realClick();

    // wait for list to be created with api response 200
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

    // wait for delete list api response 200
    cy.wait("@deleteList").its("response.statusCode").should("eq", 200);

    // assert modal closed
    cy.get("[data-test=delete-dialog]").should("not.exist");

    ////// TEST LIST COPY ///////
    cy.get("@addNewListTrigger").eq(0).realClick();

    //type in list title
    cy.get("[data-test=add-new-list-input]")
      .eq(0)
      .realType("Test List to be copied");

    //alias intercept creating a new list
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("createList");
    });

    // click on submit button
    cy.get("[data-test=add-new-list-submit]").eq(0).realClick();

    //wait for list to be created with api response 200
    cy.wait("@createList").its("response.statusCode").should("eq", 200);

    // assert list was created
    cy.get("[data-test=list]").should("have.length.greaterThan", 0);

    // assert options menu trigger visible
    cy.get("[data-test=list-options-trigger]").should("be.visible");

    //click on options menu trigger
    cy.get("[data-test=list-options-trigger]").eq(0).realClick();

    //assert copy button is visible
    cy.get("[data-test=list-options-copy-button]").should("be.visible");

    //alias intercept copy new list
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("copyList");
    });

    // click on copy button
    cy.get("[data-test=list-options-copy-button]").eq(0).realClick();

    //wait for list to be copied with api response 200
    cy.wait("@copyList").its("response.statusCode").should("eq", 200);

    //assert new list was created and visible
    cy.get("[data-test=list]").should("have.length.greaterThan", 1);

    /////// TEST EDITING LIST TITLE///////

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

    // assert error message is present within the edit list modal
    cy.get("[data-test=edit-list-title-trigger]")
      .eq(0)
      .within(() => {
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

    //wait for list to be edited with api response 200
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

    //wait for list to be edited with api response 200
    cy.wait("@changeListStatus").its("response.statusCode").should("eq", 200);

    //assert list status new value is equal to selected status value
    cy.get("[data-test=list-status-trigger]").should(
      "have.attr",
      "data-selected",
      LIST_STATUSES_CYPRESS.at(-1)?.value,
    );
  });

  it("Card: create, delete, copy, edit title, priority, assignee. Board: delete board", () => {
    ////// NAVIGATE TO BOARD PAGE//////

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

    // assert after click on Add a card button element the input and buttons are visible
    // assert only elements within the ticket card container
    cy.get("@addNewCardTrigger")
      .eq(0)
      .within(() => {
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
        cy.contains(/Is required/i).should("be.visible");

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

        //wait for card to be created with api response 200
        cy.wait("@createNewCard").its("response.statusCode").should("eq", 200);
      });

    // assert card was created
    cy.get("[data-test=ticket-card]").should("be.visible");

    ////// TEST CARD DELETION//////

    // focus card
    cy.get("[data-test=ticket-card]").eq(0).focus();

    // assert card options trigger visible
    cy.get("[data-test=card-options-trigger]").should("be.visible");

    // click on card options trigger
    cy.get("[data-test=card-options-trigger]").eq(0).focus().realClick();

    // assert delete button is visible
    cy.get("[data-test=delete-card-button-option]").should("be.visible");

    // click on delete button
    cy.get("[data-test=delete-card-button-option]").eq(0).realClick();

    // assert open delete modal
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // click on cancel button
    cy.get("[data-test=delete-dialog-cancel-button]").eq(0).realClick();

    // assert delete modal has closed
    cy.get("[data-test=delete-dialog]").should("not.exist");

    // click again on delete button
    cy.get("[data-test=delete-card-button-option]").eq(0).realClick();

    // assert open delete modal
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // alias intercept delete files from card

    cy.intercept("DELETE", "/api/fileupload").as("deleteFiles");
    //alias intercept delete card
    cy.location("pathname")
      .then((pathname) => {
        cy.intercept({
          method: "POST",
          pathname: pathname,
        });
      })
      .as("deleteCard");

    // click on delete button
    cy.get("[data-test=delete-dialog-delete-button]").eq(0).realClick();

    // assert delete card and files response 200
    cy.wait("@deleteFiles").its("response.statusCode").should("eq", 200);
    cy.wait("@deleteCard").its("response.statusCode").should("eq", 200);

    ///// TEST CARD COPYING//////

    //create new card
    cy.get("@addNewCardTrigger").eq(0).realClick();

    //type in title value
    cy.get("[data-test=add-new-card-input]").realType("Test Card to copy");

    // alias intercept create new card to copy
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("createNewCardToCopy");
    });

    // click on submit button
    cy.get("[data-test=add-new-card-submit]").realClick();

    //wait for card to be created
    cy.wait("@createNewCardToCopy")
      .its("response.statusCode")
      .should("eq", 200);

    // focus card
    cy.get("[data-test=ticket-card]").eq(0).focus();

    // assert card options trigger visible
    cy.get("[data-test=card-options-trigger]").should("be.visible");

    // click on card options trigger
    cy.get("[data-test=card-options-trigger]").eq(0).realClick();

    // assert copy button is visible
    cy.get("[data-test=copy-card-button-option]").should("be.visible");

    // alias intercept create new card to copy
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("copyCard");
    });

    // click on copy button
    cy.get("[data-test=copy-card-button-option]").eq(0).realClick();

    //wait for copied card to be created
    cy.wait("@copyCard").its("response.statusCode").should("eq", 200);

    // assert copied card was created
    cy.get("[data-test=ticket-card]").should("have.length.greaterThan", 1);

    ////// TEST EDIT CARD TITLE/////

    // assert casrd options menu is opened and edit title button is visible
    cy.get("[data-test=card-title-trigger]").should("be.visible");
    // click on edit title button trigger
    cy.get("[data-test=card-title-trigger]").eq(0).realClick();

    // assert edit card title input visible
    cy.get("[data-test=card-title-textarea]").should("be.visible");
    cy.get("[data-test=card-title-cancel]").should("be.visible");
    cy.get("[data-test=card-title-submit]").should("be.visible");

    // click on cancel button
    cy.get("[data-test=card-title-cancel]").eq(0).realClick();

    // assert edit card title input has closed
    cy.get("[data-test=card-title-textarea]").should("not.exist");
    cy.get("[data-test=card-title-cancel]").should("not.exist");
    cy.get("[data-test=card-title-submit]").should("not.exist");

    // click on edit title button trigger again
    cy.get("[data-test=card-title-trigger]").eq(0).realClick();

    // assert edit card title input visible
    cy.get("[data-test=card-title-textarea]").should("be.visible");
    cy.get("[data-test=card-title-cancel]").should("be.visible");
    cy.get("[data-test=card-title-submit]").should("be.visible");

    // type in title value
    cy.get("[data-test=card-title-textarea]").realType("Edited title");

    // alias intercept edit card title
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("editCardTitle");
    });

    // submit with title value
    cy.get("[data-test=card-title-submit]").eq(0).realClick();

    //wait for card to be edited
    cy.wait("@editCardTitle").its("response.statusCode").should("eq", 200);

    // assert card title was updated
    cy.get("[data-test=ticket-card]").eq(0).should("contain", "Edited title");

    /////TEST CARD PRIORITY/////

    //assert priority button visible
    cy.get("[data-test=priority-trigger]").should("be.visible");

    //click on priority button to open popover priority options
    cy.get("[data-test=priority-trigger]").eq(0).realClick();

    //assert priority options content visible
    cy.get("[data-test=priority-content-options]").should("be.visible");
    // .and("should", "have.length", CARD_PRIORITIES_CYPRESS.length);

    //alias intercept edit card priority
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("editCardPriority");
    });

    //click on last priority option
    cy.get("[data-test=priority-content-options]").last().realClick();

    //wait for card priority to be edited with api response 200
    cy.wait("@editCardPriority").its("response.statusCode").should("eq", 200);

    //assert priority content options not visible after submit
    cy.get("[data-test=priority-content-options]").should("not.exist");

    // assert the right priority was selected in the trigger
    cy.get("[data-test=priority-trigger]")
      .eq(0)
      .should(
        "have.attr",
        "data-selected",
        CARD_PRIORITIES_CYPRESS[CARD_PRIORITIES_CYPRESS.length - 1].value,
      );

    //click on priority trigger button again
    cy.get("[data-test=priority-trigger]").eq(0).realClick();

    //assert the right priority was selected in the card
    cy.get("[data-test=priority-content-options]")
      .last()
      .should(
        "have.attr",
        "data-selected",
        CARD_PRIORITIES_CYPRESS[CARD_PRIORITIES_CYPRESS.length - 1].value,
      );

    ///// TEST CARD ASSIGNEE////

    // assert assignee button visible
    cy.get("[data-test=assign-to-trigger").should("be.visible");

    // click on assignee button trigger
    cy.get("[data-test=assign-to-trigger").eq(0).realClick();

    // assert assignee popover options content visible and with at least one member
    cy.get("[data-test=assign-to-user-option-button]")
      .should("be.visible")
      .and("have.length.greaterThan", 0);

    // alias intercept assign a ticket card
    cy.location("pathname").then((pathname) => {
      cy.intercept({
        method: "POST",
        pathname: pathname,
      }).as("assignCard");
    });

    // click on last assignee option
    cy.get("[data-test=assign-to-user-option-button]").last().realClick();

    //wait for card to be assigned with api response 200
    cy.wait("@assignCard").its("response.statusCode").should("eq", 200);

    //assert the list options not exist (has closed) after selection
    cy.get("[data-test=assign-to-user-option-button]").should("not.exist");

    // assert the selected assignee is present in the trigger button
    cy.get("[data-test=assign-to-trigger")
      .eq(0)
      .should("have.attr", "data-selected", "true");

    //click on assignee trigger button again to open assignee popover
    cy.get("[data-test=assign-to-trigger").eq(0).realClick();

    // assert the selected assignee is present in the list options
    cy.get("[data-test=assign-to-user-option-button]").should(
      "have.attr",
      "data-selected",
      "true",
    );

    /////NAVIGATE TO DASHBOARD AND DELETE THE BOARD//////

    //click on logo
    cy.get("[data-test=logo]").eq(0).realClick();

    // assert dashboard board
    cy.url().should("include", "/dashboard");

    // aliases
    cy.get("[data-test=dashboard-boards] [data-test=delete-board-button]")
      .eq(0)
      .as("deleteBoardButton");
    //

    // click on delete board button of first board card
    cy.get("@deleteBoardButton").eq(0).realClick();

    // assert open delete modal
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // assert open delete modal visible
    cy.get("[data-test=delete-dialog]").should("be.visible");

    // intercept deleteting board and its files card api request
    cy.location("pathname").then((pathname) => {
      const organizationId = pathname.split("/").at(-1);
      cy.intercept("POST", `/dashboard/${organizationId}`).as("deleteBoard");
      cy.intercept("DELETE", "/api/fileupload").as("deleteFile");
    });

    // click on delete button of the delete modal
    cy.get("[data-test=delete-dialog-delete-button]").eq(0).realClick();

    // assert delete board api response 200
    cy.wait("@deleteFile").its("response.statusCode").should("eq", 200);
    cy.wait("@deleteBoard").its("response.statusCode").should("eq", 200);

    // assert delete modal closed
    cy.get("[data-test=delete-dialog]").should("not.exist");
  });

  it.skip("CardDetails: edit description, priority, assignee, due date, list status", () => {
    // TODO
  });
  it.skip("CardDetails Tabs: comments, attachments, checklist", () => {
    // TODO
  });
  it.skip("Board view navigations", () => {
    // TODO
  });
});
