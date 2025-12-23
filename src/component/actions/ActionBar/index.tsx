import React from "react";
import { PDButtonSize, PDButtonType } from "@template/enum/pipedrive.enum";
import { DefaultView } from "@template/enum/view.enum";
import PDButton from "@template/component/ui-components/pipedriveButton";

export type ActionState = {
  associate?: { visible: boolean; disabled: boolean };
  linkCrm?: { visible: boolean; disabled: boolean };
  update?: { visible: boolean; disabled: boolean };
  changeStage?: { visible: boolean; disabled: boolean };
  transferOwner?: { visible: boolean; disabled: boolean };
  nextStep?: { visible: boolean; disabled: boolean };
  editCosell?: { visible: boolean; disabled: boolean };
  reset?: { visible: boolean; disabled: boolean };
};

export type ActionBarProps = {
  defaultView: DefaultView;
  isDefautView: boolean;
  actionState: ActionState;
  onRefresh: () => void;
};

const ActionBar = ({ defaultView, actionState, onRefresh }: ActionBarProps) => {
  return (
    <div className="flex justify-content-end gap-1 w-full">
      {actionState.associate?.visible && (
        <PDButton
          label="Associate"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.associate.disabled}
        />
      )}

      {actionState.linkCrm?.visible && (
        <PDButton
          label="Link CRM"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.linkCrm.disabled}
        />
      )}

      {actionState.update?.visible && (
        <PDButton
          label="Update"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.update.disabled}
        />
      )}

      {actionState.changeStage?.visible && (
        <PDButton
          label="Change Stage"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.changeStage.disabled}
        />
      )}

      {actionState.transferOwner?.visible && (
        <PDButton
          label="Transfer Owner"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.transferOwner.disabled}
        />
      )}

      {actionState.nextStep?.visible && (
        <PDButton
          label="Next Step"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.nextStep.disabled}
        />
      )}

      {actionState.editCosell?.visible && (
        <PDButton
          label="Edit Co-sell"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.editCosell.disabled}
        />
      )}

      {actionState.reset?.visible && (
        <PDButton
          className="pi pi-refresh"
          label="Reset"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.reset.disabled}
        />
      )}

      {defaultView !== DefaultView.DASHBOARD && (
        <PDButton
          className="pi pi-refresh"
          label="Refresh"
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          onClick={onRefresh}
        />
      )}
    </div>
  );
};

export default ActionBar;
