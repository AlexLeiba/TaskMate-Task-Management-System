import { TriggerInput } from "@/components/Protected/Shared-protected/TriggerInput";
import { Button } from "@/components/ui/button";
import { mount } from "cypress/react";

describe("TriggerInput", () => {
  it("should render without input modal and with children", () => {
    mount(
      <TriggerInput
        isOpenedTitleInput={false}
        handleSubmitValue={cy.stub()}
        inputName="inputName"
        placeholder="placeholder text"
        label="Input label"
        setIsOpenedTitleInput={() => {}}
        classNameContainer=""
      >
        <Button data-test="trigger-child-button">Trigger child</Button>
      </TriggerInput>,
    );

    cy.get("[data-test=trigger-input-opened-state]").should("not.exist");
    cy.get("[data-test=trigger-input-children]").should("be.visible");
  });
  it("should render with input modal and without children", () => {
    mount(
      <TriggerInput
        isOpenedTitleInput={true}
        handleSubmitValue={cy.stub()}
        inputName="inputName"
        placeholder="placeholder text"
        label="Input label"
        setIsOpenedTitleInput={() => {}}
        classNameContainer=""
      >
        <Button data-test="trigger-child-button">Trigger child</Button>
      </TriggerInput>,
    );

    cy.get("[data-test=trigger-input-opened-state]").should("be.visible");
    cy.get("[data-test=trigger-input-children]").should("not.exist");
  });
  it("input should work and validate typed value", () => {
    mount(
      <TriggerInput
        dataTest="trigger"
        isOpenedTitleInput={true}
        handleSubmitValue={cy.stub()}
        inputName="inputName"
        placeholder="placeholder text"
        label="Input label"
        setIsOpenedTitleInput={() => {}}
        classNameContainer=""
      >
        <Button data-test="trigger-child-button">Trigger child</Button>
      </TriggerInput>,
    );
    // alias
    cy.get("[data-test=trigger-input]").as("triggerInput");
    cy.get("[data-test=trigger-submit]").as("triggerSubmitButton");
    //

    // submit input with no value
    cy.get("@triggerSubmitButton").eq(0).realClick();

    //assert error message
    cy.contains(/Is required/i).should("be.visible");

    //type in input value
    cy.get("@triggerInput").eq(0).realType("Test title");

    // click on submit button
    cy.get("@triggerSubmitButton").eq(0).realClick();

    // assert error message not present
    cy.contains(/Is required/i).should("not.exist");
  });
  it("callbacks handleSubmitValue and setIsOpenedTitleInput should be called ", () => {
    const setIsOpenedTitleInput = cy.stub().as("setIsOpenedTitleInput");
    const submitForm = cy.stub().as("submitForm");
    mount(
      <TriggerInput
        dataTest="trigger"
        isOpenedTitleInput={true}
        handleSubmitValue={submitForm}
        inputName="inputName"
        placeholder="placeholder text"
        label="Input label"
        setIsOpenedTitleInput={setIsOpenedTitleInput}
        classNameContainer=""
      >
        <Button data-test="trigger-child-button">Trigger child</Button>
      </TriggerInput>,
    );

    //aliases
    cy.get("[data-test=trigger-submit]").as("triggerSubmitButton");
    cy.get("[data-test=trigger-cancel]").as("triggerCancelButton");
    cy.get("[data-test=trigger-input]").as("triggerInput");
    //

    //type in input value
    cy.get("@triggerInput").eq(0).realType("Test title");

    //assert submit button calls the handleSubmitValue callback

    cy.get("@triggerSubmitButton").eq(0).realClick();
    cy.get("@submitForm").should("have.been.called");

    //assert cancel button calls the setIsOpenedTitleInput callback
    cy.get("@triggerCancelButton").eq(0).realClick();
    cy.get("@setIsOpenedTitleInput").should("have.been.called");
  });
});
