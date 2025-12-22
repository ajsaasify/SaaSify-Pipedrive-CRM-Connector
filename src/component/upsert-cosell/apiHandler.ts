import { requestPayload } from "@template/common/listCosell";
import {
  AlertNotification,
  getErrorAlert,
  getInfoAlert,
  getSuccessAlert,
} from "@template/common/messageAlert";
import { generateMessage } from "@template/common/messageAlert/generateMessage";
import SaasifyService from "@template/services/saasify.service";
import { CosellAction } from "@template/enum/action.enum";
import { ModalId } from "@template/enum/modal.enum";
import { ResponseStatus } from "@template/enum/response.enum";
import { PipedriveContext } from "@template/types/pipedriveContext";
import { formatOptions, getResponseError } from "@template/utils/globalHelper";
// import {
//   fetchListCosell,
//   handleErrors,
// } from "../../OpportunityList/apiHandler";
import { pullCosell } from "@template/component/actions/Buttons/apiHandler";
import { RC3CosellResponse } from "@template/types/cosellResponse";
import { OptionTypes } from "@template/types/dropdown.options";
import { EntityService } from "@template/services/options.service";
import { DropdownOptions, FetchOptions } from "@template/enum/options.enum";
import { referenceDataProps } from "@template/common/constants/referenceData";
import { ReferenceDataProps } from "@template/types/reference";
import { fetchListCosell, handleErrors } from "../cosell-list/apiHandler";

const saasifyService = new SaasifyService();
const entityService = new EntityService();
export async function saveEditCosells(
  slug: string, //
  payload: any, //
  triggerAlert: (alert: AlertNotification) => void, //
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>, //
  actions: any, //
  data: RC3CosellResponse, //
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>, //
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>, //
  opportunityList: RC3CosellResponse[], //
  setErrorStatus: React.Dispatch<React.SetStateAction<string>>
) {
  setErrorStatus("");
  triggerAlert(
    getInfoAlert(
      slug == CosellAction.EDIT
        ? generateMessage.updateCosellInProgress
        : generateMessage.createCosellInProgress
    )
  );
  try {
    setIsFetching(true);
    const responseData = await saasifyService.postCosellById(
      payload?.SellerCode as string,
      payload
    );

    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Data?.ErrorMessage?.length) {
      throw new Error(getResponseError(responseData?.Data?.ErrorMessage));
    }

    if (responseData?.Status === ResponseStatus.SUCCESS) {
      if (slug != CosellAction.ADD) {
        await pullCosell(
          data,
          triggerAlert,
          setIsFetching,
          setData,
          setOpportunityList,
          opportunityList,
          false
        );
      } else {
        await fetchListCosell(setData, setOpportunityList);
      }
      triggerAlert(
        getSuccessAlert(
          slug == CosellAction.EDIT
            ? generateMessage.editCosell
            : generateMessage.createCosell
        )
      );
      actions.closeOverlay(ModalId.ACTION_COSELL);
    }
  } catch (error: any) {
    // triggerAlert(getErrorAlert(error.message));
    if (error.message.includes(ResponseStatus.GATEWAY_ERROR)) {
      triggerAlert(getInfoAlert(generateMessage?.gatewayMessage));
      slug == CosellAction.ADD &&
        (await fetchListCosell(setData, setOpportunityList));
      actions.closeOverlay(ModalId.ACTION_COSELL);
    } else {
      setErrorStatus(error.message);
    }
  } finally {
    setIsFetching(false);
  }
}

export async function fetchDropDowAllOptions(
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  initialError: React.MutableRefObject<boolean>,
  triggerAlert: (alert: AlertNotification) => void,
  optionValues: OptionTypes,
  referencedata: ReferenceDataProps[],
  setReferenceData: React.Dispatch<React.SetStateAction<ReferenceDataProps[]>>,
  sellerCode: string
) {
  try {
    const firstSet = await Promise.all([
      ...(!optionValues[DropdownOptions.COUNTRY]?.length
        ? [
            entityService.fetchCountry(
              setOptionValues,
              requestPayload.cloud.aws
            ),
          ]
        : []),
      ...(!optionValues[DropdownOptions.SOULTIONS]?.length
        ? [
            fetchSolutions(
              optionValues,
              setOptionValues,
              triggerAlert,
              sellerCode
            ),
          ]
        : []),
    ]);
    handleErrors(firstSet, initialError, triggerAlert);

    const secondSet = await Promise.all([
      ...(!optionValues[DropdownOptions.PRODUCTS]?.length
        ? [entityService.fetchProducts(setOptionValues)]
        : []),
    ]);
    handleErrors(secondSet, initialError, triggerAlert);
    await fetchReference(
      setReferenceData,
      setOptionValues,
      triggerAlert,
      referencedata
    );
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
}

export async function fetchSolutions(
  optionValues: OptionTypes,
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  triggerAlert: (alert: AlertNotification) => void,
  sellerCode: string
) {
  try {
    if (!optionValues[DropdownOptions.SOULTIONS]?.length) {
      const response = await entityService.fetchSolutions(
        setOptionValues,
        sellerCode
      );
      if (response?.result === ResponseStatus.ERROR) {
        throw new Error(getResponseError(response?.value));
      }
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
}

export async function fetchReference(
  setReferenceData: React.Dispatch<React.SetStateAction<ReferenceDataProps[]>>,
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  triggerAlert: (alert: AlertNotification) => void,
  referenceData: ReferenceDataProps[],
  referenceDataProp = referenceDataProps,
  cloud = requestPayload.cloud.aws
) {
  try {
    const responseData = referenceData?.length
      ? { Data: referenceData }
      : await saasifyService.getReferenceData(cloud);
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (Array.isArray(responseData?.Data)) {
      const referenceProps = responseData?.Data;
      referenceDataProp.forEach((item) => {
        const { fetch, value } = item;
        const filterData = referenceProps?.filter(
          (data: any) => data?.EntityName == fetch
        );
        setOptionValues((prev) => ({
          ...prev,
          [value]: formatOptions(filterData, true),
        }));
      });
      setReferenceData(referenceProps);
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
}
