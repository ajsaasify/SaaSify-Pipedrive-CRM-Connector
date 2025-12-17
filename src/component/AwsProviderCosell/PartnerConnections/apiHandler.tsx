import {
  AlertNotification,
  getErrorAlert,
} from "@template/common/messageAlert";
import SaasifyService from "@template/services/saasify.service";
import { RC3CosellResponse } from "@template/types/cosellResponse";
import { ResponseStatus } from "@template/enum/response.enum";
import { PartnerConnectionProps } from "@template/types/partner";
import { getResponseError } from "@template/utils/globalHelper";

export const fetchPartnerShared = async (
  setPartnerConnects: React.Dispatch<
    React.SetStateAction<PartnerConnectionProps[]>
  >,
  triggerAlert: (alert: AlertNotification) => void,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  awsCosell: RC3CosellResponse
) => {
  setFetching(true);
  const saasifyService = new SaasifyService();
  try {
    const responseData = await saasifyService.getPartnerSharedpartner(
      awsCosell?.SellerCode ?? "",
      awsCosell?.ReferenceID ?? ""
    );
    if (Array.isArray(responseData?.Data)) {
      setPartnerConnects(responseData?.Data ?? []);
    }
    if (responseData?.Status == ResponseStatus.ERROR) {
      new Error(getResponseError(responseData?.ErrorMessage));
    }
  } catch (e: any) {
    triggerAlert(getErrorAlert(e?.message));
  } finally {
    setFetching(false);
  }
};
