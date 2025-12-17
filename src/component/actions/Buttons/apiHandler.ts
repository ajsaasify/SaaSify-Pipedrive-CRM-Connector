import {
  AlertNotification,
  getErrorAlert,
  getSuccessAlert,
} from "../../../common/messageAlert";
import { generateMessage } from "../../../common/messageAlert/generateMessage";
import SaasifyService from "../../../services/saasify.service";
import { RC3CosellResponse } from "../../../types/cosellResponse";
import { ResponseStatus } from "../../../enum/response.enum";
import { getResponseError } from "../../../utils/globalHelper";

const saasifyService = new SaasifyService();

export const pullCosell = async (
  data: RC3CosellResponse,
  triggerAlert: (alert: AlertNotification) => void,
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
  opportunityList: RC3CosellResponse[],
  alert: boolean = true,
  isPendingFromAoInBound: boolean = false
) => {
  setIsSpecificLoading(true);
  try {
    const responseData = await saasifyService.refreshCosell(
      data?.SellerCode as string,
      data?.ReferenceID as string
    );
    if (responseData?.Status == ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Data) {
      const successMessage = isPendingFromAoInBound
        ? generateMessage.invitationRefresh
        : generateMessage.refresh;
        
      alert && triggerAlert(getSuccessAlert(successMessage));
      const { CoSellEntity } = responseData?.Data;
      const dataRes = {
        ...data,
        Customer: CoSellEntity?.Customer?.Account?.CompanyName,
        ErrorMessage: responseData?.Data?.ErrorMessage ?? [],
        CloudProviderStatus:
          CoSellEntity?.Invitation?.Status ||
          (CoSellEntity?.LifeCycle?.ReviewStatus
            ? CoSellEntity?.LifeCycle?.ReviewStatus
            : data?.CloudProviderStatus),
        ...(CoSellEntity?.Identifier && {
          CloudProviderIdentifier: CoSellEntity?.Identifier,
        }),
        ...(CoSellEntity?.LifeCycle?.Stage && {
          CloudProviderStage: responseData?.Data.CoSellEntity?.LifeCycle?.Stage,
        }),
        ...(CoSellEntity && {
          CoSellEntity: CoSellEntity,
        }),
      };
      setData(dataRes);
      const list = opportunityList?.map((value) => {
        if (value.ReferenceID == responseData?.Data?.ReferenceID) {
          return dataRes;
        } else {
          return value;
        }
      });
      setOpportunityList(list);
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error.message));
  } finally {
    setIsSpecificLoading(false);
  }
};

export const pushCrm = async (
  data: RC3CosellResponse,
  triggerAlert: (alert: AlertNotification) => void,
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsSpecificLoading(true);

  try {
    const responseData = await saasifyService.syncPushCrm(
      data?.ReferenceID as string
    );
    if (responseData?.Status == ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Status == ResponseStatus.SUCCESS) {
      triggerAlert(getSuccessAlert(generateMessage.pushCrm));
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error.message));
  } finally {
    setIsSpecificLoading(false);
  }
};
