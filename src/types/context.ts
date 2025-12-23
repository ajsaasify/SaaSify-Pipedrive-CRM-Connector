import React from "react";
import { OptionTypes } from "./dropdown.options";
import { Activitylog } from "./activity";
import { AlertNotification } from "../common/messageAlert";
import { PartnerConnectionProps } from "./partner";
import { AceCosellProps } from "./aceCosell";
import { MessageBarProps } from "./messageBar";
import { Mapping } from "./mapping copy";
import { RenderCloudProvider } from "@template/enum/renderCloud.enum";
import { PaginatorProps } from "./paginatorType";
import { OptionField } from "./dropdown.optionsTypes";

export interface CosellContextProps {
  aceCosell: AceCosellProps;
  setAceCosell: React.Dispatch<React.SetStateAction<AceCosellProps>>;
  isPickFromSaaSify: boolean;
  setIsPickFromSaaSify: React.Dispatch<React.SetStateAction<boolean>>;
  aceCosellList: AceCosellProps[];
  setAceCosellList: React.Dispatch<React.SetStateAction<AceCosellProps[]>>;
  partnerType: string[];
  setPartnerType: React.Dispatch<React.SetStateAction<string[]>>;
  message: MessageBarProps;
  setMessage: React.Dispatch<React.SetStateAction<MessageBarProps>>;
  optionField: OptionTypes;
  setOptionField: React.Dispatch<React.SetStateAction<OptionTypes>>;
  referenceData: OptionField[];
  setReferenceData: React.Dispatch<React.SetStateAction<OptionField[]>>;
  partnerConnection: PartnerConnectionProps[];
  setPartnerConnections: React.Dispatch<
    React.SetStateAction<PartnerConnectionProps[]>
  >;
  activityLogs: Activitylog[];
  setActivityLogs: React.Dispatch<React.SetStateAction<Activitylog[]>>;
  paginator: Partial<PaginatorProps>;
  setPaginator: React.Dispatch<React.SetStateAction<Partial<PaginatorProps>>>;
  notify: (alert: AlertNotification) => void;
  inProgressToast: (alert: AlertNotification) => void;
  dismissToasts: () => void;
  setRenderUi: React.Dispatch<React.SetStateAction<RenderCloudProvider>>;
  renderUi: RenderCloudProvider;
  mappingList: Mapping[];
  setMappingList: React.Dispatch<React.SetStateAction<Mapping[]>>;
  stageLoader: boolean;
  setStageLoader: React.Dispatch<React.SetStateAction<boolean>>;
  progressStage: OptionField[];
  setProgressStage: React.Dispatch<React.SetStateAction<OptionField[]>>;
}
