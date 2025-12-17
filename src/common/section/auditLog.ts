import { Activitylog } from "../../types/activity";
import {
  formatToLocalTime,
  getResponseError,
  getValue,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const auditLog = (context: Activitylog) => {
  if (!Object.keys(context).length) return [];

  if (Array.isArray(context?.Context?.CoSellDetails)) {
    const CoSellDetails = context?.Context?.CoSellDetails?.[0];

    return [
      {
        label: awsConstants.audit.eventName,
        value: getValue(context?.Context?.EventName),
      },
      {
        label: awsConstants.audit.crmId,
        value: getValue(CoSellDetails?.CRMID),
      },
      {
        label: awsConstants.audit.crmName,
        value: getValue(CoSellDetails?.CRMName),
      },
      {
        label: awsConstants.audit.crmOpportunityId,
        value: getValue(CoSellDetails?.CRMOpportunityID),
      },
      {
        label: awsConstants.audit.referenceId,
        value: getValue(CoSellDetails?.ReferenceID),
      },
      {
        label: awsConstants.audit.coSellName,
        value: getValue(CoSellDetails?.CoSellName),
      },
      {
        label: awsConstants.audit.cloudCoSellIdentifier,
        value: getValue(CoSellDetails?.CloudCoSellIdentifier),
      },
      {
        label: awsConstants.audit.schedulerAction,
        value: getValue(CoSellDetails?.SchedulerAction),
      },
      {
        label: awsConstants.audit.errorMessage,
        value: getResponseError(CoSellDetails?.ErrorMessage),
      },
    ];
  }

  return [
    {
      label: awsConstants.audit.providerReferenceIdentifier,
      value: getValue(context?.Context?.ProviderReferenceIdentifier),
    },
    {
      label: awsConstants.audit.saasifyReferenceId,
      value: getValue(context?.Context?.SaaSifyReferenceId),
    },
    {
      label: awsConstants.audit.crmReferenceId,
      value: getValue(context?.Context?.CRMReferenceId),
    },
    {
      label: awsConstants.audit.errorMessage,
      value: getResponseError(context?.Context?.ErrorMessage),
    },
    {
      label: awsConstants.audit.eventProccesedTime,
      value: formatToLocalTime(context?.Context?.EventProccesedTime ?? ""),
    },
    {
      label: awsConstants.audit.requestId,
      value: getValue(context?.Context?.RequestId),
    },
    {
      label: awsConstants.audit.originOfError,
      value: getValue(context?.Context?.OriginOfError),
    },
    {
      label: awsConstants.audit.userName,
      value: getValue(context?.Context?.UserName),
    },
  ];
};
