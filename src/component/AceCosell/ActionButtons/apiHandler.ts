import { AceCosellProps } from "@template/types/aceCosell";
import {
  getSuccessAlert,
  getErrorAlert,
  AlertNotification,
} from "../../../common/messageAlert";
import { RenderCloudProvider } from "../../../enum/renderCloud.enum";
import { ResponseStatus } from "../../../enum/response.enum";
import { cosellActionValidator } from "./actionDisabilityRules";
import { GCPCosellResponse } from "@template/types/gcpCosell";
import { RC3CosellResponse } from "@template/types/cosellResponse";
import { AmpCosellResponse } from "@template/types/ampCosell";
import { requestPayload } from "@template/common/listCosell";
import { getResponseError } from "@template/utils/globalHelper";
import { generateMessage } from "@template/common/messageAlert/generateMessage";
import SaasifyService from "@template/services/saasify.service";

// export const refreshCosell = async (
//   aceCosell: AceCosellProps,
//   context: any,
//   setAceCosell: React.Dispatch<React.SetStateAction<AceCosellProps>>,
//   setLoader: React.Dispatch<React.SetStateAction<boolean>>,
//   notify: (alert: AlertNotification) => void
// ) => {
//   setLoader(true);
//   try {
//     const payload = {
//       referenceid: aceCosell?.ReferenceID,
//       sellercode: aceCosell?.SellerCode,
//     };

//     const clientUrl = (context as any)?.page?.getClientUrl();
//     const entityName = (context as any)?.page?.entityTypeName;
//     const entityId = (context as any)?.page?.entityId;
//     const isEnableInvitation =
//       cosellActionValidator(aceCosell).isInvitationEnabled();
//     const response = await processService(clientUrl).refreshCosell(
//       payload,
//       aceCosell?.CloudProvider ?? RenderCloudProvider.AWS
//     );
//     if (response?.Status === ResponseStatus.ERROR) {
//       throw new Error(getResponseError(response?.ErrorDetail));
//     }
//     if (response?.Data) {
//       setAceCosell(response?.Data);
//       notify(
//         getSuccessAlert(
//           translate(
//             isEnableInvitation
//               ? "generateMessage.refreshInvitation"
//               : "generateMessage.refresh"
//           )
//         )
//       );
//       setLoader(false);
//       const record = await context.webAPI.retrieveRecord(entityName, entityId);
//       const postPayload = recordPayloadBuilder(response);
//       await context.webAPI
//         .updateRecord(entityName, entityId, postPayload)
//         .then((res) => res)
//         .catch((e) => {
//           throw new Error(e.message);
//         });
//       if (response?.Status === ResponseStatus.SUCCESS) {
//         if (
//           postPayload?.saasify_opportunityid !== record?.saasify_opportunityid
//         ) {
//           location.reload();
//         }
//       } else {
//         throw new Error(response?.ErrorMessage);
//       }
//     }
//   } catch (error: any) {
//     notify(getErrorAlert(error.message));
//   } finally {
//     setLoader(false);
//   }
// };

const saasifyService = new SaasifyService();

export const refreshCosell = async (
  triggerAlert: (alert: AlertNotification) => void,
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>,
  data: RC3CosellResponse | GCPCosellResponse | AmpCosellResponse,
  setData:
    | React.Dispatch<React.SetStateAction<RC3CosellResponse>>
    | React.Dispatch<React.SetStateAction<GCPCosellResponse>>
    | React.Dispatch<React.SetStateAction<AmpCosellResponse>>,
  opportunityList?: RC3CosellResponse[],
  setOpportunityList?: React.Dispatch<
    React.SetStateAction<RC3CosellResponse[]>
  >,
  isFromEdit?: boolean
) => {
  setIsSpecificLoading(true);
  try {
    const responseData = await saasifyService.refreshCosell(
      data?.SellerCode as string,
      data?.ReferenceID as string
    );
    if (
      responseData?.Data &&
      data?.CloudProvider?.includes(requestPayload?.cloud?.aws)
    ) {
      const awsResponse: any = {
        ...data,
        CoSellEntity: { ...responseData?.Data?.CoSellEntity },
      };
      setData(awsResponse);
    }
    if (
      responseData?.Data &&
      data?.CloudProvider?.includes(requestPayload?.cloud?.amp)
    ) {
      setData(responseData?.Data || {});
    }
    if (
      responseData?.Data &&
      data?.CloudProvider?.includes(requestPayload?.cloud?.gcp)
    ) {
      setData((prev: any) => ({
        ...prev,
        CoSellEntity: responseData?.Data?.CoSellEntity,
      }));
      const list = opportunityList?.map((value) => {
        if (value.ReferenceID == responseData?.Data?.ReferenceID) {
          const { state = "", stage = "" } =
            responseData?.Data?.CoSellEntity ?? {};
          return {
            ...value,
            ErrorMessage: responseData?.Data?.ErrorMessage ?? [],
            CloudProviderStatus: state ?? value?.CloudProviderStatus,
            CloudProviderStage: stage ?? value?.CloudProviderStage,
          };
        } else {
          return value;
        }
      });
      setOpportunityList && setOpportunityList(list ?? []);
    }
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Status == ResponseStatus.SUCCESS) {
      !isFromEdit && triggerAlert(getSuccessAlert(generateMessage.refresh));
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error.message));
  } finally {
    !isFromEdit && setIsSpecificLoading(false);
  }
};
