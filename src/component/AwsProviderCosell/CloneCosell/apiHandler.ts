// import { fetchListCosell } from "@template/component/cosell-list/apiHandler";
// import { requestPayload } from "../../../common/listCosell";
// import {
//   AlertNotification,
//   getErrorAlert,
//   getInfoAlert,
//   getSuccessAlert,
// } from "../../../common/messageAlert";
// import { generateMessage } from "../../../common/messageAlert/generateMessage";
// import SaasifyService from "../../../services/saasify.service";
// import { RC3CosellResponse } from "../../../types/cosellResponse";
// import { getResponseError } from "../../../utils/globalHelper";
// import { cloneCosellPayloadBuilder, editClonedCosellSetter } from "./builder";
// import { ModalId } from "@template/enum/modal.enum";
// import { ResponseStatus } from "@template/enum/response.enum";
// import { createCosell } from "@template/component/cloud-provider/apiHandler";

// const saasifyService = new SaasifyService();

// export const postCloneCosell = async (
//   context: any,
//   setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
//   triggerAlert: (alert: AlertNotification) => void,
//   opportunityList: RC3CosellResponse[],
//   setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
//   cosell: RC3CosellResponse,
//   formValue: Record<string, any>,
//   action: any,
//   payloadFromEdit: Record<string, any>
// ) => {
//   setIsFetching(true);
//   const postSubmit = async (isShowError: boolean = false) => {
//     if (isShowError)
//       triggerAlert(getInfoAlert(generateMessage?.gatewayMessage));
//     else await fetchListCosell(context, () => {}, setOpportunityList);
//     action.closeOverlay(ModalId.CLONE_COSELL);
//     action.closeOverlay(ModalId.VIEW_COSELL);
//     action.closeOverlay(ModalId.ACTION_COSELL);
//   };
//   try {
//     const payload = {
//       provider: cosell?.CloudProvider,
//       sellerCode: cosell?.SellerCode,
//       crmId: formValue?.crmUniqueIdentifier,
//       crmOrigin: cosell?.CRMOrigin,
//     };
//     const response = await createCosell(
//       context,
//       () => {},
//       () => {},
//       triggerAlert,
//       () => {},
//       () => {},
//       [],
//       opportunityList?.length ?? 0,
//       payload,
//       () => {},
//       true
//     );
//     if (response?.Status === ResponseStatus.ERROR) {
//       throw new Error(getResponseError(response?.ErrorDetail));
//     } else {
//       const cosellPayloadSubmiit: any = Object.keys(payloadFromEdit).length
//         ? editClonedCosellSetter(payloadFromEdit, response?.Data ?? {})
//         : cloneCosellPayloadBuilder(cosell, response?.Data ?? {}, formValue);
//       const responseOnSubmit = await saasifyService.postCosellById(
//         cosellPayloadSubmiit?.SellerCode as string,
//         cosellPayloadSubmiit
//       );
//       if (responseOnSubmit?.Status === ResponseStatus.ERROR) {
//         throw new Error(getResponseError(responseOnSubmit?.ErrorDetail));
//       } else {
//         await postSubmit();
//         triggerAlert(getSuccessAlert(generateMessage?.cosellCloneSuccess));
//       }
//     }
//   } catch (e) {
//     if (e.message.includes(ResponseStatus.GATEWAY_ERROR)) {
//       await postSubmit(true);
//     } else triggerAlert(getErrorAlert(e.message));
//   } finally {
//     setIsFetching(false);
//   }
// };

// export const getCosellByCrmId = async (
//   cosell: RC3CosellResponse,
//   setCosellList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
//   setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
//   triggerAlert: (alert: AlertNotification) => void,
//   context: any
// ) => {
//   if (!cosell?.CRMReferenceId || cosell?.CRMOrigin !== requestPayload.crmOrigin)
//     return;
//   try {
//     const opportunityId = cosell?.CRMReferenceId?.split("-")?.[0];

//     setIsFetching(true);
//     const response = await saasifyService.getListCosell(
//       cosell?.SellerCode ?? "",
//       opportunityId ?? "",
//       context.extension.appId,
//       context.portal.id
//     );
//     if (response?.Status === ResponseStatus.ERROR) {
//       throw new Error(getResponseError(response?.ErrorDetail));
//     } else if (response?.Data) {
//       setCosellList(response?.Data);
//     }
//   } catch (e) {
//     triggerAlert(getErrorAlert(e.message));
//   } finally {
//     setIsFetching(false);
//   }
// };
