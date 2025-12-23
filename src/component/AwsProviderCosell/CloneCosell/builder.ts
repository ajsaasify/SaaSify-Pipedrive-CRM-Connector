// import { RC3CosellResponse } from "../../../types/cosellResponse";
// // import { HubspotContext } from "../../../types/hubspotContext";
// // import moment from "moment-timezone";
// import { requestPayload } from "../../../common/listCosell";
// import { trimString } from "../../../utils/globalHelper";
// import moment from "moment";

// export const cloneCosellPayloadBuilder = (
//   cosell: RC3CosellResponse,
//   response: RC3CosellResponse,
//   formValue: Record<string, any>
// ) => {
//   const {
//     CRMReferenceId,
//     ReferenceID,
//     CreateDate,
//     CloudProviderStage,
//     CloudProviderIdentifier,
//     CloudProviderStatus,
//     HasError,
//     OpportunityName,
//     ErrorMessage,
//     Customer,
//     DealType,
//     ...restCosell
//   } = cosell;

//   return {
//     ...restCosell,
//     ...response,
//     IsSubmitOpportunity: true,
//     CRMReferenceId: formValue?.crmUniqueIdentifier,
//     CoSellEntity: {
//       ...restCosell.CoSellEntity,
//       Identifier: null,
//       AwsSummary: response?.CoSellEntity?.AwsSummary,
//       Invitation: response?.CoSellEntity?.Invitation,
//       PartnerOpportunityIdentifier: formValue?.crmUniqueIdentifier,
//       LifeCycle: {
//         ...restCosell.CoSellEntity?.LifeCycle,
//         NextSteps: null,
//         NextStepsHistory: [],
//         ReviewStatus: response?.CoSellEntity?.LifeCycle?.ReviewStatus,
//         Stage: response?.CoSellEntity?.LifeCycle?.Stage,
//         TargetCloseDate: formValue?.targetCloseDate,
//       },
//       Project: {
//         ...restCosell.CoSellEntity?.Project,
//         Title: trimString(formValue?.partnerProjectTitle),
//       },
//     },
//   };
// };

// export const cloneCosellGetterBuilder = (
//   cosell: RC3CosellResponse,
//   opportunityList: RC3CosellResponse[]
// ) => {
//   const objectId = cosell?.CRMReferenceId?.split("-")?.[0];
//   const crmUniqueIdentifier =
//     (opportunityList?.length
//       ? `${objectId}-${opportunityList.length}`
//       : objectId) ?? null;
//   const currentTargetDate = cosell.CoSellEntity?.LifeCycle?.TargetCloseDate;
//   const isDateInPast =
//     currentTargetDate && new Date(currentTargetDate) < new Date();
//   const targetCloseDate = isDateInPast
//     ? moment(currentTargetDate).add(1, "months").toISOString()
//     : currentTargetDate;
//   return {
//     partnerProjectTitle: cosell?.CoSellEntity?.Project?.Title,
//     crmUniqueIdentifier:
//       cosell?.CRMOrigin == requestPayload.crmOrigin
//         ? crmUniqueIdentifier
//         : null,
//     targetCloseDate,
//   };
// };

// export const editClonedCosellGetter = (
//   formValue: Record<string, any>,
//   cosell: RC3CosellResponse
// ) => {
//   const {
//     ReferenceID,
//     CreateDate,
//     CloudProviderStage,
//     CloudProviderIdentifier,
//     CloudProviderStatus,
//     HasError,
//     OpportunityName,
//     ErrorMessage,
//     Customer,
//     ...restCosell
//   } = cosell;

//   return {
//     ...restCosell,
//     CRMReferenceId: formValue?.crmUniqueIdentifier,
//     CoSellEntity: {
//       ...cosell?.CoSellEntity,
//       PartnerOpportunityIdentifier: formValue?.crmUniqueIdentifier,
//       LifeCycle: {
//         ...restCosell.CoSellEntity?.LifeCycle,
//         NextSteps: null,
//         NextStepsHistory: [],
//         ReviewStatus: null,
//         Stage: null,
//         TargetCloseDate: formValue?.targetCloseDate,
//       },
//       Project: {
//         ...restCosell.CoSellEntity?.Project,
//         Title: trimString(formValue?.partnerProjectTitle),
//       },
//     },
//   };
// };

// export const editClonedCosellSetter = (
//   cosell: Record<string, any>,
//   response: RC3CosellResponse
// ) => ({
//   ...response,
//   ...cosell,
//   CoSellEntity: {
//     ...cosell.CoSellEntity,
//     Identifier: null,
//     AwsSummary: response?.CoSellEntity?.AwsSummary,
//     Invitation: response?.CoSellEntity?.Invitation,
//     LifeCycle: {
//       ...cosell.CoSellEntity?.LifeCycle,
//       NextStepsHistory: [],
//       ReviewStatus: response?.CoSellEntity?.LifeCycle?.ReviewStatus,
//       Stage: response?.CoSellEntity?.LifeCycle?.Stage,
//     },
//   },
// });
