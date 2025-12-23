import { requestPayload } from "@template/common/listCosell";
import {
  type AlertNotification,
  getErrorAlert,
} from "@template/common/messageAlert";
import { generateMessage } from "@template/common/messageAlert/generateMessage";
import SaasifyService from "@template/services/saasify.service";
import type { RC3CosellResponse } from "@template/types/cosellResponse";
import { ResponseStatus } from "@template/enum/response.enum";
import type { PipedriveContext } from "@template/types/pipedriveContext";
import {
  formatOptions,
  getResponseError,
  isValidDealToCreate,
  mapSellerCode,
} from "@template/utils/globalHelper";
// import { GCPCosellResponse } from "@template/types/gcpCosell";
import { createAceCosellTemplate } from "@template/common/createCosellPayload/ace";
import type { MappingList } from "@template/types/mapping";
import type { OptionTypes } from "@template/types/dropdown.options";
import {
  invitationEnable,
  isLaunchedCosell,
} from "@template/component/actions/Buttons/actionDisabilityRules";
import { fetchSolutions } from "@template/component/upsert-cosell/apiHandler";
import { DropdownOptions, FetchOptions } from "@template/enum/options.enum";
import type React from "react";
import { labelMapper } from "./helper";
import { getPartnerType } from "../cosell-list/apiHandler";

const saasifyService = new SaasifyService();

const generateCosellPayload = (
  mappingCrmList: MappingList,
  cloudProvider: string,
  sellerCode: string
) => ({
  ...createAceCosellTemplate,
  SellerCode: sellerCode,
  CRMOrigin: requestPayload.crmOrigin,
  CRMMappingId: mappingCrmList?.Id,
  CloudProvider: cloudProvider,
  IsSubmitOpportunity: requestPayload.isSubmitOpportunity,
});

export const getMappingId = async (
  setMappingCrmList: React.Dispatch<React.SetStateAction<MappingList[]>>,
  triggerAlert: (alert: AlertNotification) => void
) => {
  const saasifyService = new SaasifyService();
  try {
    const responseData = await saasifyService.getMappingCrmList();
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Data?.length) {
      setMappingCrmList(responseData?.Data);
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
};

export const fetchCosellProvider = async (
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  triggerAlert: (alert: AlertNotification) => void
) => {
  try {
    const responseData = await saasifyService.getProviderCosell();
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Data?.length) {
      const data = formatOptions(responseData.Data, true);
      setOptionValues((prev) => ({
        ...prev,
        [DropdownOptions.COSELL_PROVIDER]: data,
      }));
    }
    if (responseData?.Status === ResponseStatus.ERROR) {
      const errorMessages = responseData?.ErrorDetail;
      throw new Error(errorMessages);
    }
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
};

export const fetchSellerAccounts = async (
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>
) => {
  const saasifyService = new SaasifyService();
  try {
    const responseData = await saasifyService.getSellercode();
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    const formattedData = mapSellerCode(responseData.Data);
    setOptionValues((prev) => ({
      ...prev,
      [DropdownOptions.SELLER_CODE]: formattedData,
    }));
  } catch (error: any) {
    return error?.message;
  }
};

export const fetchCreateProps = async (
  optionValue: OptionTypes,
  mappingList: MappingList[],
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  setMappingCrmList: React.Dispatch<React.SetStateAction<MappingList[]>>,
  setloader: React.Dispatch<React.SetStateAction<boolean>>,
  triggerAlert: (alert: AlertNotification) => void,
  _context?: PipedriveContext
) => {
  try {
    setloader(true);
    await Promise.all([
      ...(!optionValue?.[DropdownOptions.COSELL_PROVIDER]?.length
        ? [fetchCosellProvider(setOptionValues, triggerAlert)]
        : []),
      ...(!mappingList?.length
        ? [getMappingId(setMappingCrmList, triggerAlert)]
        : []),
      ...(!optionValue?.[DropdownOptions.SELLER_CODE]?.length
        ? [fetchSellerAccounts(setOptionValues)]
        : []),
    ]);
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  } finally {
    setloader(false);
  }
};

export const createCosell = async (
  dealId: string,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<any>>,
  triggerAlert: (alert: AlertNotification) => void,
  setGenerateCosell: React.Dispatch<React.SetStateAction<any>>,
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  mappingCrm: MappingList[],
  isExisting: number,
  formValue: Record<string, any>,
  setErrorState: React.Dispatch<React.SetStateAction<string>>
) => {
  setGenerateCosell({});
  setData({});
  setErrorState("");
  try {
    setIsFetching(true);
    const mappingCrmList =
      mappingCrm?.find(
        (crmMapping) => crmMapping.ProviderName === requestPayload.cloud.aws
      ) ?? {};
    const payload = generateCosellPayload(
      mappingCrmList,
      formValue.provider,
      formValue[labelMapper.sellerCode.name]
    );
    const responseData = await saasifyService.createCosellStep1(
      formValue[labelMapper.sellerCode.name],
      JSON.stringify(payload)
    );
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData.Data?.ReferenceID) {
      const referenceId = responseData.Data.ReferenceID;
      await linkDeal(
        referenceId,
        dealId,
        setIsError,
        setIsFetching,
        triggerAlert,
        setGenerateCosell,
        mappingCrmList,
        isExisting,
        setErrorState,
        formValue[labelMapper.sellerCode.name]
      );
    }
  } catch (error: any) {
    setIsFetching(false);
    setIsError(true);
    setErrorState(error?.message);
    // triggerAlert(getErrorAlert(error.message));
  }
};

const linkDeal = async (
  referenceId: string,
  dealId: string,
  setIsError: React.Dispatch<React.SetStateAction<any>>,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
  triggerAlert: (alert: AlertNotification) => void,
  setGenerateCosell: React.Dispatch<React.SetStateAction<any>>,
  _mappingCrmList: Record<string, any>,
  isExisting: number,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
  sellerCode: string
) => {
  /**
   * todo
   * fix the payload
   */
  const payload = {
    // MappingId: mappingCrmList?.Id,
    MappingId: 98,
    ReferenceId: !isExisting ? dealId : `${dealId}-${isExisting}`,
    // DealReferenceID: referenceId,
    DealReferenceID: "aebe751d-9199-4c98-af47-530616413ede",
    CRMEntity: requestPayload.crmEntity,
    IsSubmitOpportunity: requestPayload.isSubmitOpportunity,
    IsDuplicateOpportunity: requestPayload.isDuplicateOpportunity,
  };

  try {
    const responseData = await saasifyService.importDeal(
      JSON.stringify(payload)
    );
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (
      !Array.isArray(responseData?.Data) ||
      isValidDealToCreate(responseData?.Data)
    ) {
      setIsError(false);
      await fetchSpecificCoSell(
        referenceId,
        sellerCode,
        setIsError,
        setGenerateCosell,
        triggerAlert,
        setIsFetching
      );
    } else {
      if (responseData?.Data?.length) {
        throw new Error(generateMessage.existingCosell);
      }
      throw new Error(generateMessage.cosellExists);
    }
  } catch (error: any) {
    setIsError(true);
    setIsFetching(false);
    setErrorState(error?.message);
    // triggerAlert(getErrorAlert(error.message));
  }
};

const fetchSpecificCoSell = async (
  referenceId: string,
  sellerCode: string,
  setIsError: React.Dispatch<React.SetStateAction<any>>,
  setGenerateCosell: React.Dispatch<React.SetStateAction<any>>,
  triggerAlert: (alert: AlertNotification) => void,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const responseData = await saasifyService.getCosellById(
      sellerCode,
      referenceId
    );
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    if (responseData?.Data) {
      setIsError(false);
      const data = {
        ...responseData.Data,
        CoSellEntity: JSON.parse(responseData?.Data.CoSellEntity),
      };
      setGenerateCosell(data || {});
    }
  } catch (error: any) {
    setIsError(true);

    triggerAlert(getErrorAlert(error?.message));
  } finally {
    setIsError(null);
    setIsFetching(false);
  }
};

export const fetchAwsSpecificCoSell = async (
  referenceId: string,
  sellerCode: string,
  setCosell: // | React.Dispatch<React.SetStateAction<GCPCosellResponse>>
  React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  triggerAlert: (alert: AlertNotification) => void,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
  optionValues?: OptionTypes,
  setOptionValues?: React.Dispatch<React.SetStateAction<OptionTypes>>,
  partnerType?: string[],
  setPartnerType?: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setIsFetching(true);

  try {
    const responseData = await saasifyService.getCosellById(
      sellerCode,
      referenceId
    );

    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }

    if (!responseData?.Data) return;

    const data = {
      ...responseData.Data,
      CoSellEntity: JSON.parse(responseData.Data.CoSellEntity),
    };

    const isAws = data?.CloudProvider?.includes(requestPayload.cloud.aws);
    const dealType = data?.DealType || requestPayload.dealType.po;
    const reviewStatus = data?.CoSellEntity?.LifeCycle?.ReviewStatus;
    const status = data?.CloudProviderStatus || reviewStatus;
    const statusInvitation = invitationEnable(
      status,
      data?.CloudProviderIdentifier,
      dealType,
      data
    );
    const isLaunched = isLaunchedCosell(data);

    if (
      isAws &&
      optionValues &&
      setOptionValues &&
      setPartnerType &&
      !statusInvitation
    ) {
      if (!(optionValues as any)?.[`${DropdownOptions.STAGE_AWS}`]?.length) {
        await fetchStageReferenceData(
          dealType,
          setOptionValues,
          triggerAlert,
          requestPayload.cloud.aws,
          DropdownOptions.STAGE_AWS
        );
      }

      await fetchSolutions(
        optionValues,
        setOptionValues,
        triggerAlert,
        sellerCode
      );

      if (isLaunched && !partnerType?.length) {
        await getPartnerType?.(setPartnerType, triggerAlert, sellerCode);
      }
    }

    setCosell(data);
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  } finally {
    setIsFetching(false);
  }
};

export const fetchStageReferenceData = async (
  dealType: string,
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  triggerAlert: (alert: AlertNotification) => void,
  cloudProvider: string,
  stage: DropdownOptions
) => {
  try {
    const stageResponse = await saasifyService.getPropertiesReferencedata(
      cloudProvider,
      FetchOptions.STAGE,
      (requestPayload as any)?.version[cloudProvider],
      dealType
    );

    const formattedOptions = formatOptions(stageResponse?.Data, false);
    setOptionValues((prev) => ({
      ...prev,
      [stage]: formattedOptions,
    }));
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
};
