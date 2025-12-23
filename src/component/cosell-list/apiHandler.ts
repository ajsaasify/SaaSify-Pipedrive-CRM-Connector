import { requestPayload } from "@template/common/listCosell";
import {
  type AlertNotification,
  getErrorAlert,
  getSuccessAlert,
} from "@template/common/messageAlert";
import { generateMessage } from "@template/common/messageAlert/generateMessage";
import { ResponseStatus } from "@template/enum/response.enum";
import SaasifyService from "@template/services/saasify.service";
import type { Activitylog } from "@template/types/activity";
import type { AmpCosellResponse } from "@template/types/ampCosell";
import type { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import type { RC3CosellResponse } from "@template/types/cosellResponse";
import type { PipedriveContext } from "@template/types/pipedriveContext";
import { getResponseError } from "@template/utils/globalHelper";
import { backOff } from "exponential-backoff";
import type { Dispatch, SetStateAction } from "react";

export const getCosellsAPI = async (
  rows: number,
  first: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCosells: Dispatch<SetStateAction<CoSellItem[]>>,
  setTotalRecords: Dispatch<SetStateAction<number>>
) => {
  const saasify = new SaasifyService();
  setLoading(true);
  saasify
    .getListCosellAssociateCrm("BA03A6C2", {
      CloudProvider: "AWS",
      PageSize: rows,
      StartInd: first,
      offset: 1,
    })
    .then((res) => {
      if (res?.Data) {
        setCosells(res.Data);
        const firstData = res?.Data?.[0];
        setTotalRecords(firstData?.TotalRows);
      }
    })
    .finally(() => {
      setLoading(false);
    });
};
const saasifyService = new SaasifyService();

export async function fetchAllOptions(
  setIsListLoading: React.Dispatch<React.SetStateAction<boolean>>,
  _context: PipedriveContext,
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
  initialError: React.MutableRefObject<boolean>,
  triggerAlert: (alert: AlertNotification) => void,
  isDefaultView: boolean
) {
  try {
    !isDefaultView && setIsListLoading(true);
    const firstSet = await Promise.all([
      ...(isDefaultView ? [] : [fetchListCosell(setData, setOpportunityList)]),
    ]);

    handleErrors(firstSet, initialError, triggerAlert);
  } catch (_error) {
    triggerAlert(getErrorAlert(generateMessage.fetchError));
  } finally {
    !isDefaultView && setIsListLoading(false);
  }
}

export const getPartnerType = async (
  setPartnerType: React.Dispatch<React.SetStateAction<string[]>>,
  triggerAlert: (alert: AlertNotification) => void,
  sellerCode: string
) => {
  const saasifyService = new SaasifyService();
  try {
    const responseData = await saasifyService.getPartnerType(sellerCode);
    if (responseData?.Status === ResponseStatus.ERROR) {
      throw new Error(getResponseError(responseData?.ErrorDetail));
    }
    responseData?.Data?.length && setPartnerType(responseData?.Data);
  } catch (error: any) {
    triggerAlert(getErrorAlert(error?.message));
  }
};

export function handleErrors(
  results: any[],
  initialError: React.MutableRefObject<boolean>,
  triggerAlert: (alert: AlertNotification) => void
) {
  const errorValue = results
    ?.filter((optionError: any) => optionError?.result === ResponseStatus.ERROR)
    ?.map((errors) => errors?.value)
    ?.join(", ");

  if (errorValue && !initialError.current) {
    triggerAlert(getErrorAlert(errorValue));
    initialError.current = true;
  }
}

export const fetchListCosell = async (
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
  setLoader?: React.Dispatch<React.SetStateAction<boolean>>,
  isResetData?: boolean
) => {
  !isResetData && setData({} as RC3CosellResponse);
  setLoader?.(true);
  try {
    const executeWithRetry = async () => {
      const responseData = await saasifyService.getListCosell(
        requestPayload.sellerCode
      );

      if (
        responseData.Status === ResponseStatus.SUCCESS &&
        Array.isArray(responseData.Data) &&
        responseData.Data.length
      ) {
        const opportunities = responseData.Data.map(
          (cosell: RC3CosellResponse) => {
            const CoSellEntity = cosell?.CoSellEntity
              ? JSON.parse(cosell.CoSellEntity as string)
              : {};

            return { ...cosell, CoSellEntity };
          }
        );

        const sortedList = opportunities.sort(
          (a: RC3CosellResponse, b: RC3CosellResponse) => {
            const dateStrA =
              a.CoSellEntity?.CreatedDate ||
              a.CoSellEntity?.createTime ||
              (a as AmpCosellResponse).CoSellEntity?.CloudProviderDetails
                ?.CreatedDate ||
              "";

            const dateStrB =
              b.CoSellEntity?.CreatedDate ||
              b.CoSellEntity?.createTime ||
              (b as AmpCosellResponse).CoSellEntity?.CloudProviderDetails
                ?.CreatedDate ||
              "";

            const dateA = Number.isNaN(new Date(dateStrA).getTime())
              ? 0
              : new Date(dateStrA).getTime();
            const dateB = Number.isNaN(new Date(dateStrB).getTime())
              ? 0
              : new Date(dateStrB).getTime();

            return dateB - dateA;
          }
        );
        setOpportunityList(sortedList);
      } else {
        setOpportunityList([]);
      }

      if (responseData.Status === ResponseStatus.ERROR) {
        throw new Error(getResponseError(responseData?.ErrorDetail));
      }
    };

    await backOff(executeWithRetry, {
      retry: (_error, attemptNumber) => attemptNumber === 1,
      startingDelay: 500,
    });
  } catch (error: any) {
    setOpportunityList([]);
    return {
      result: ResponseStatus.ERROR,
      key: generateMessage.listCosell,
      value: error.message,
    };
  } finally {
    setLoader?.(false);
  }
};

export const fetchSpecificCoSell = async (
  opportunityId: string,
  sellerId: string,
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>,
  triggerAlert: (alert: AlertNotification) => void,
  opportunityList: RC3CosellResponse[],
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
  setAmp: React.Dispatch<React.SetStateAction<any>>,
  // setGcp: React.Dispatch<React.SetStateAction<any>>,
  neededLoader?: boolean
) => {
  setData({});
  // setGcp({});
  setAmp({});
  setIsSpecificLoading(true);
  try {
    const executeWithRetry = async () => {
      const responseData = await saasifyService.getCosellById(
        sellerId,
        opportunityId
      );
      if (responseData?.Data) {
        const data = {
          ...responseData?.Data,
          CoSellEntity: JSON.parse(responseData?.Data?.CoSellEntity),
        };
        setData(data || {});
        const list = opportunityList?.map((value) => {
          if (value.ReferenceID === data?.ReferenceID) {
            return {
              ...value,
              ErrorMessage: responseData?.Data?.ErrorMessage ?? [],
              CloudProviderStatus:
                !data?.DealType?.toLocaleLowerCase()?.includes(
                  requestPayload.dealType.multiPartner
                )
                  ? data?.CoSellEntity?.Invitation?.Status ||
                    (data.CoSellEntity?.LifeCycle?.ReviewStatus
                      ? data.CoSellEntity?.LifeCycle?.ReviewStatus
                      : value?.CloudProviderStatus)
                  : data?.CloudProviderStatus,
              CloudProviderStage: data.CoSellEntity?.LifeCycle?.Stage,
            };
          } else {
            return value;
          }
        });
        setOpportunityList(list);
      }
      if (responseData?.Status === ResponseStatus.ERROR) {
        throw new Error(getResponseError(responseData?.ErrorDetail));
      }
    };

    await backOff(executeWithRetry, {
      retry: (_error, attemptNumber) => attemptNumber === 1,
      startingDelay: 500,
    });
  } catch (error: any) {
    setData({});
    triggerAlert(getErrorAlert(error.message));
  } finally {
    !neededLoader && setIsSpecificLoading(false);
  }
};

export const customfetchSpecificCoSell = async (
  opportunityId: string,
  sellerId: string,
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>,
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>,
  triggerAlert: (alert: AlertNotification) => void,
  opportunityList: RC3CosellResponse[],
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>,
  displayAlert?: boolean
) => {
  setIsSpecificLoading(true);
  try {
    const executeWithRetry = async () => {
      const responseData = await saasifyService.getCosellById(
        sellerId,
        opportunityId
      );
      if (responseData?.Data) {
        displayAlert && triggerAlert(getSuccessAlert(generateMessage.refresh));
        let data = {
          ...responseData?.Data,
          CoSellEntity: JSON.parse(responseData?.Data?.CoSellEntity),
        };
        setData(data || {});
        const list = opportunityList?.map((value) => {
          if (value.ReferenceID == opportunityId) {
            return data;
          } else {
            return value;
          }
        });
        setOpportunityList(list);
      }
      if (responseData?.Status === ResponseStatus.ERROR) {
        throw new Error(getResponseError(responseData?.ErrorDetail));
      }
    };

    await backOff(executeWithRetry, {
      retry: (error, attemptNumber) => attemptNumber == 1,
      startingDelay: 500,
    });
  } catch (error: any) {
    setData({});
    triggerAlert(getErrorAlert(error.message));
  } finally {
    setIsSpecificLoading(false);
  }
};

export const fetchActivityLog = async (
  opportunityId: string,
  triggerAlert: (alert: AlertNotification) => void,
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setActivity: React.Dispatch<React.SetStateAction<Activitylog[]>>,
  startInd: number = 1,
  endInd: number = 10,
  pageCount: number = 0
) => {
  setActivity([]);
  setIsSpecificLoading(true);
  try {
    const executeWithRetry = async () => {
      const responseData = await saasifyService.getActivityLog(
        opportunityId,
        startInd, // StartInd
        endInd, // EndInd;
        10, // PageSize
        0, // offset
        pageCount, // pageCount
        "Cosell", // EntityName
        false // IsFromWebApp
      );
      if (responseData?.Data) {
        const data = responseData?.Data?.map((value: any) => ({
          ...value,
          Context: JSON.parse(value?.Context),
        }));
        setActivity(data ?? []);
      }
      if (responseData?.Status === ResponseStatus.ERROR) {
        throw new Error(getResponseError(responseData?.ErrorDetail));
      }
    };

    await backOff(executeWithRetry, {
      retry: (_error, attemptNumber) => attemptNumber === 1,
      startingDelay: 500,
    });
  } catch (error: any) {
    setActivity([]);
    triggerAlert(getErrorAlert(error.message));
  } finally {
    setIsSpecificLoading(false);
  }
};
