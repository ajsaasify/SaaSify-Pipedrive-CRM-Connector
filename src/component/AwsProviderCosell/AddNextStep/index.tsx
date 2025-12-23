import {
  Flex,
  Modal,
  ModalBody,
  Button,
  ModalFooter,
  LoadingButton,
  TextArea,
} from "@hubspot/ui-extensions";
import React, { useState } from "react";
import { ButtonVariant, FormButton } from "../../../types/enums/button.enum";
import { ModalId, ModalWidth } from "../../../types/enums/modal.enum";
import { useCoSellContext } from "../../../context/Cosell.context";
import { postNextstep } from "./apiHandler";
import { labelMapper } from "./helper";
import { displayErrorMessage } from "../../../utils/globalHelper";
import { FlexJustify, Size } from "../../../types/enums/flex.enum";
import ErrorDetails from "../../../plugin/UiComponent/ErrorDetails";

export const NextStepModal: React.FC<{
  actions: any;
  modalTitle: string;
}> = ({ actions, modalTitle }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [formValue, setFormValue] = useState<Record<string, any>>({});
  const [errorValue, setErrorValue] = useState<Record<string, boolean>>({});
  const { data, setData, opportunityList, setOpportunityList } =
    useCoSellContext();
  const [errorStatus, setErrorStatus] = useState("");
  function onChangeValue(name: string, value: any) {
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorValue[name]) {
      let errorFind = !value || (Array.isArray(value) && !value.length);
      setErrorValue((prev) => ({ ...prev, [name]: errorFind }));
    }
    return;
  }
  const triggerAlert = (alert: {
    type: string;
    message: string;
    title: string;
  }) => {
    actions.addAlert(alert);
  };

  const validateField = (): boolean => {
    let isValid = true;
    const newErrorValue: Record<string, boolean> = {};
    if (!formValue?.nextStep) {
      isValid = false;
      newErrorValue.nextStep = true;
      setErrorValue(newErrorValue);
    }
    return isValid;
  };

  return (
    <Modal
      id={ModalId.NEXTSTEP}
      title={modalTitle}
      width={ModalWidth.MEDIUM}
      onOpen={() => {
        setFormValue({ nextStep: "" });
        setErrorStatus("");
        setErrorValue({});
      }}
    >
      <ModalBody>
        <TextArea
          label={labelMapper.nextStep.label}
          name={labelMapper.nextStep.name}
          rows={3}
          value={formValue?.nextStep}
          error={errorValue?.nextStep}
          validationMessage={displayErrorMessage(
            errorValue?.nextStep,
            labelMapper.nextStep.validationMessage
          )}
          maxLength={labelMapper.nextStep.maxLength}
          onChange={(value) => {
            onChangeValue(labelMapper.nextStep.name, value);
          }}
        />
        <ErrorDetails errorStatus={errorStatus} />
      </ModalBody>
      <ModalFooter>
        <Flex gap={Size.sm} justify={FlexJustify.END}>
          <Button
            variant={ButtonVariant.SECONDARY}
            disabled={isFetching}
            onClick={() => actions.closeOverlay(ModalId.NEXTSTEP)}
          >
            {FormButton.CANCEL}
          </Button>
          <LoadingButton
            variant={ButtonVariant.PRIMARY}
            loading={isFetching}
            onClick={() => {
              postNextstep(
                formValue,
                validateField,
                triggerAlert,
                setIsFetching,
                data,
                actions,
                setData,
                setErrorStatus,
                opportunityList,
                setOpportunityList
              );
            }}
          >
            {FormButton.SUBMIT}
          </LoadingButton>
        </Flex>
      </ModalFooter>
    </Modal>
  );
};
