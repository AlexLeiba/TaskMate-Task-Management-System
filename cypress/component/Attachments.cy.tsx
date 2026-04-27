import { Attachments } from "@/components/Protected/Pages/Board/BoardViews/KanbanView/TicketCard/TicketCardDetails/InteractiveFeaturesTabs/Attachments/Attachments";

import { mount } from "cypress/react";

describe("should render", () => {
  mount(<Attachments cardDetailsId={""} />);

  //   aliases
  cy.get("[data-test=upload-file-button]").as("uploadFileButton");
  cy.get("[data-test=add-attachment-button]").as("attachmentButton");
  //

  // assert upload file button and add attachment button are visible
  cy.get("@uploadFileButton").should("be.visible");
  cy.get("@attachmentButton").should("be.visible");

  //upload png file
  cy.get("input[type=file]").selectFile(
    "cypress/fixtures/fake-image-upload.png",
  );

  //assert preview is visible

  //upload pdf file

  //assert preview is visible

  //upload txt file

  //assert preview is visible
});
