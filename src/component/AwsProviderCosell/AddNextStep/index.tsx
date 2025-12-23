// React
import React, { useState } from "react";

// PrimeReact
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

// Context
import { useCoSellContext } from "../../../context/Cosell.context";

// API
import { postNextstep } from "./apiHandler";

// Helpers
import { labelMapper } from "./helper";

// Utils
import { displayErrorMessage } from "../../../utils/globalHelper";

// Components
import ErrorDetails from "@template/component/ui-components/ErrorDetails";

export const NextStepDialog: React.FC<{
  modalTitle: string;
  visible: boolean;
  onHide: () => void;
  actions?: any;
}> = ({ modalTitle, visible, onHide, actions }) => {
  // State
  const [isFetching, setIsFetching] = useState(false);
  const [formValue, setFormValue] = useState<Record<string, any>>({});
  const [errorValue, setErrorValue] = useState<Record<string, boolean>>({});
  const [errorStatus, setErrorStatus] = useState("");

  // Context
  const { data, setData, opportunityList, setOpportunityList } =
    useCoSellContext();

  // Handlers
  const onChangeValue = (name: string, value: any) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));

    if (errorValue[name]) {
      const hasError = !value || (Array.isArray(value) && !value.length);
      setErrorValue((prev) => ({ ...prev, [name]: hasError }));
    }
  };

  const triggerAlert = (alert: {
    type: string;
    message: string;
    title: string;
  }) => {
    actions.addAlert(alert);
  };

  // validation
  const validateField = (): boolean => {
    const newErrorValue: Record<string, boolean> = {};
    let isValid = true;

    if (!formValue?.nextStep) {
      newErrorValue.nextStep = true;
      isValid = false;
    }

    setErrorValue(newErrorValue);
    return isValid;
  };

  // Ui
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label="Cancel"
        severity="secondary"
        disabled={isFetching}
        onClick={onHide}
      />
      <Button
        label="Submit"
        loading={isFetching}
        onClick={() =>
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
          )
        }
      />
    </div>
  );

  return (
    <Dialog
      header={modalTitle}
      visible={visible}
      style={{ width: "35rem" }}
      onHide={onHide}
      footer={footer}
      onShow={() => {
        setFormValue({ nextStep: "" });
        setErrorValue({});
        setErrorStatus("");
      }}
      modal
    >
      <div className="field">
        <label htmlFor={labelMapper.nextStep.name}>
          {labelMapper.nextStep.label}
        </label>

        <InputTextarea
          id={labelMapper.nextStep.name}
          rows={3}
          value={formValue?.nextStep || ""}
          maxLength={labelMapper.nextStep.maxLength}
          className={errorValue?.nextStep ? "p-invalid" : ""}
          onChange={(e) =>
            onChangeValue(labelMapper.nextStep.name, e.target.value)
          }
        />

        {errorValue?.nextStep && (
          <small className="p-error">
            {displayErrorMessage(
              errorValue?.nextStep,
              labelMapper.nextStep.validationMessage
            )}
          </small>
        )}
      </div>

      <ErrorDetails errorStatus={errorStatus} />
    </Dialog>
  );
};
