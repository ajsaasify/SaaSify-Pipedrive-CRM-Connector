import { ResponseStatus } from "@template/enum/response.enum";
import {
  AlertNotification,
  getInfoAlert,
  getSuccessAlert,
} from "../../../common/messageAlert";
import { generateMessage } from "../../../common/messageAlert/generateMessage";
import SaasifyService from "../../../services/saasify.service";
import { RC3CosellResponse } from "../../../types/cosellResponse";
import { getResponseError, trimString } from "../../../utils/globalHelper";
import {
  customfetchSpecificCoSell,
  fetchSpecificCoSell,
} from "@template/component/cosell-list/apiHandler";
import { ModalId } from "@template/enum/modal.enum";
import { refreshCosell } from "@template/component/AceCosell/ActionButtons/apiHandler";

export async function postNextstep(
  formValue: Record<string, any>,
  validateField: () => boolean,
  triggerAlert: (alert: AlertNotification) => void,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
  data: RC3CosellResponse,
  actions: any,
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  setErrorStatus: React.Dispatch<React.SetStateAction<string>>,
  opportunityList: RC3CosellResponse[],
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>
) {
  const saasifyService = new SaasifyService();
  const payload = {
    NextStep: trimString(formValue?.nextStep),
  };
  if (validateField()) {
    triggerAlert(getInfoAlert(generateMessage.nextStepInProgress));
    try {
      setIsFetching(true);
      const responseData = await saasifyService.postNextStep(
        data?.SellerCode as string,
        data?.ReferenceID as string,
        payload
      );
      if (responseData?.Status == ResponseStatus.ERROR) {
        throw new Error(getResponseError(responseData?.ErrorDetail));
      }

      if (
        responseData?.Status == ResponseStatus.SUCCESS &&
        responseData?.Data?.ErrorMessage?.length
      ) {
        customfetchSpecificCoSell(
          data?.ReferenceID ?? "",
          data?.SellerCode ?? "",
          setData,
          setIsFetching,
          triggerAlert,
          opportunityList,
          setOpportunityList
        );
        throw new Error(getResponseError(responseData?.Data?.ErrorMessage));
      } else {
        await refreshCosell(
          triggerAlert,
          setIsFetching,
          data,
          setData,
          undefined,
          undefined,
          true
        );
        triggerAlert(getSuccessAlert(generateMessage.nextstep));
        actions.closeOverlay(ModalId.NEXTSTEP);
      }
    } catch (error: any) {
      // triggerAlert(getErrorAlert(error.message));
      setErrorStatus(error.message);
      if (error.message.includes(ResponseStatus.GATEWAY_ERROR)) {
        actions.closeOverlay(ModalId.NEXTSTEP);
      }
    } finally {
      setIsFetching(false);
    }
  }
}
