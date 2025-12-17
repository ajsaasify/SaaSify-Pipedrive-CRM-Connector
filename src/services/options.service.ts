import { backOff } from "exponential-backoff";
import { OptionTypes } from "../types/dropdown.options";
import { FetchOptions, DropdownOptions } from "../enum/options.enum";
import SaasifyService from "./saasify.service";
import { ResponseStatus } from "../enum/response.enum";
import {
  formatOptions,
  formatOptionsFilter,
  formatPartnerOptions,
  formatProductOptions,
  formatSellerCodeOptions,
  formatSolutionsOptions,
} from "../utils/globalHelper";
import { updateOptionValue } from "../store/options";
import { requestPayload } from "../common/listCosell";

export class EntityService {
  private saasifyService: SaasifyService;

  constructor() {
    this.saasifyService = new SaasifyService();
  }
  public fetchCountry(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptionsCountires(
      setOptionValues,
      cloud == requestPayload.cloud.aws
        ? DropdownOptions.COUNTRY
        : DropdownOptions.COUNTRY_GCP,
      cloud
    );
  }

  public fetchIndustry(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.INDUSTRY,
      setOptionValues,
      cloud == requestPayload.cloud.aws
        ? DropdownOptions.INDUSTRY
        : DropdownOptions.INDUSTRY_GCP,
      cloud
    );
  }

  public fetchSalesActivities(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.SALESACTIVITIES,
      setOptionValues,
      DropdownOptions.SALESACTIVITIES,
      cloud
    );
  }

  public fetchCampaignName(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    const fetchOption = cloud.includes(requestPayload.cloud.aws)
      ? FetchOptions.CAMPAIGN
      : FetchOptions.CAMPAIGN_CODE;

    return this.fetchOptions(
      fetchOption,
      setOptionValues,
      DropdownOptions.CAMPAIGN,
      cloud
    );
  }

  public fetchContractVehicle(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.CONTRACT_VEHICLE,
      setOptionValues,
      DropdownOptions.CONTRACT_VEHICLE,
      cloud
    );
  }

  public fetchDeliveryModel(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.DELIVERYMODAL,
      setOptionValues,
      cloud == requestPayload.cloud.aws
        ? DropdownOptions.DELIVERYMODAL
        : DropdownOptions.DELIVERY_MODAL_GCP,
      cloud
    );
  }

  public fetchMarketingActivityChannel(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.MARKETINGACTIVITY,
      setOptionValues,
      DropdownOptions.MARKETINGACTIVITY,
      cloud
    );
  }

  public fetchMarketingActivityUseCase(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.MARKETINGUSECASE,
      setOptionValues,
      DropdownOptions.MARKETINGUSECASE,
      cloud
    );
  }

  public fetchPartnerPrimaryNeed(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.PRIMARYNEED,
      setOptionValues,
      DropdownOptions.PRIMARYNEED,
      cloud
    );
  }

  public fetchCompetitiveTracking(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.COMPETITIVETRACKING,
      setOptionValues,
      DropdownOptions.COMPETITIVETRACKING,
      cloud
    );
  }

  public fetchUseCase(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.USECASE,
      setOptionValues,
      DropdownOptions.USECASE,
      cloud
    );
  }

  public fetchFilterConfig(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>
  ) {
    return this.fetchOptionsFilter(
      setOptionValues,
      DropdownOptions.FILTER_CONFIG
    );
  }

  public fetchStatus(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.STATUS,
      setOptionValues,
      DropdownOptions.STATUS,
      cloud
    );
  }

  public fetchPartnerEngagement(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud?: string
  ) {
    return this.fetchOptions(
      FetchOptions.PARTNER_ENGAGEMENT,
      setOptionValues,
      DropdownOptions.PARTNER_ENGAGEMENT,
      cloud
    );
  }

  public fetchPartnerConnections(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    sellerCode: string = requestPayload.sellerCode
  ) {
    return this.fetchPartnerConnectionsProps(setOptionValues, sellerCode);
  }

  public fetchRejectionReason(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.REJECTIONREASON,
      setOptionValues,
      DropdownOptions.REJECTIONREASON,
      cloud
    );
  }

  public fetchCustomerMarketplacePurchaseIntent(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.PURCHASE_INTENT,
      setOptionValues,
      DropdownOptions.PURCHASE_INTENT,
      cloud
    );
  }

  public fetchSolutionArea(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.amp
  ) {
    return this.fetchOptions(
      FetchOptions.SOLUTION_AREA,
      setOptionValues,
      DropdownOptions.SOLUTION_AREA,
      cloud
    );
  }

  public fetchSolutionPlay(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.amp
  ) {
    return this.fetchOptions(
      FetchOptions.SOLUTION_PLAY,
      setOptionValues,
      DropdownOptions.SOLUTION_PLAY,
      cloud
    );
  }

  public fetchHelpType(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.HELP_TYPE,
      setOptionValues,
      DropdownOptions.HELP_TYPE,
      cloud
    );
  }

  public fetchPartnerRole(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.PARTNER_ROLE,
      setOptionValues,
      DropdownOptions.PARTNER_ROLE,
      cloud
    );
  }

  public fetchProcurementType(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.PROCUREMENTTYPE,
      setOptionValues,
      DropdownOptions.PROCUREMENTTYPE,
      cloud
    );
  }

  public fetchClosedReason(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.CLOSEDLOSTREASON,
      setOptionValues,
      DropdownOptions.CLOSEDLOSTREASON,
      cloud
    );
  }

  public fetchState(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    const isGcp = cloud?.includes(requestPayload.cloud.gcp);
    return this.fetchOptions(
      isGcp ? FetchOptions.STATES : FetchOptions.STATE,
      setOptionValues,
      isGcp ? DropdownOptions.COUNTRY_STATE_GCP : DropdownOptions.STATE,
      cloud
    );
  }

  public fetchStage(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.STAGE,
      setOptionValues,
      DropdownOptions.STAGE,
      cloud
    );
  }

  public fetchCurrencyValue(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    const isAws = cloud.includes(requestPayload.cloud.aws)
      ;
    return this.fetchOptions(
      isAws ? FetchOptions.CURRENCYVALUE : FetchOptions.CURRENCY,
      setOptionValues,
      isAws ? DropdownOptions.CURRENCYVALUE : DropdownOptions.CURRENCY,
      cloud
    );
  }

  public fetchRegion(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.REGION,
      setOptionValues,
      DropdownOptions.REGION,
      cloud
    );
  }

  public fetchProductFamily(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.PRODUCT_FAMILY,
      setOptionValues,
      DropdownOptions.PRODUCT_FAMILY,
      cloud
    );
  }

  public fetchSupportLevel(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    cloud: string = requestPayload.cloud.aws
  ) {
    return this.fetchOptions(
      FetchOptions.SUPPORT_LEVEL,
      setOptionValues,
      DropdownOptions.SUPPORT_LEVEL,
      cloud
    );
  }

  public async fetchProducts(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>
  ) {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getProducts();
        if (responseData?.Data?.length) {
          const data = formatProductOptions(responseData?.Data);
          updateOptionValue(data, setOptionValues, "AWSProducts");

          return { result: ResponseStatus.SUCCESS };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  }
  public async fetchProviders(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>
  ) {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getProvider();
        if (responseData?.Data?.length) {
          const data = formatSolutionsOptions(responseData?.Data);
          updateOptionValue(data, setOptionValues, DropdownOptions.PROVIDER);

          return { result: ResponseStatus.SUCCESS };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
        startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  }
  public async fetchCrmList(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>
  ) {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getCrmList();
        if (responseData?.Data?.length) {
          const data = formatOptions(responseData.Data);
          updateOptionValue(data, setOptionValues, "crmList");
          return { result: ResponseStatus.SUCCESS };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  }

  public async fetchSellerCode(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>
  ) {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getSellerCodeEntity();
        if (responseData?.Data?.length) {
          const data = formatSellerCodeOptions(responseData.Data);
          updateOptionValue(data, setOptionValues, "sellerCode");

          return { result: ResponseStatus.SUCCESS };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  }

  public async fetchSolutions(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    sellerCode: string
  ) {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getSolutions(sellerCode);
        if (responseData?.Data?.length) {
          const data = formatSolutionsOptions(responseData.Data);
          updateOptionValue(data, setOptionValues, "solutions");
          return { result: ResponseStatus.SUCCESS };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  }

  public async fetchPartnerConnectionsProps(
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    sellerCode: string
  ) {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getPartnerConnect(
          sellerCode
        );
        if (responseData?.Data?.length) {
          const data = formatPartnerOptions(responseData.Data);
          updateOptionValue(
            data,
            setOptionValues,
            DropdownOptions.PARTNER_CONNECT
          );
          return { result: ResponseStatus.SUCCESS };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  }

  private fetchOptions = async (
    url: string,
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    key: keyof OptionTypes,
    cloud: string = requestPayload.cloud.aws
  ) => {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getEntity(url, cloud);
        if (responseData?.Data?.length) {
          const data = formatOptions(
            responseData.Data,
            cloud == requestPayload.cloud.gcp
          );
          updateOptionValue(data, setOptionValues, key);
          return { result: ResponseStatus.SUCCESS, key };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  };

  private fetchOptionsCountires = async (
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    key: keyof OptionTypes,
    cloud: string
  ) => {
    try {
      const executeWithRetry = async () => {
        const responseData =
          cloud?.includes(requestPayload.cloud.gcp) ||
          cloud?.includes(requestPayload.cloud.amp)
            ? await this.saasifyService.getEntity(
                FetchOptions.COUNTRY_GCP,
                cloud
              )
            : await this.saasifyService.getCountires(cloud);
        if (responseData?.Data?.length) {
          const data = formatOptions(responseData.Data);
          updateOptionValue(data, setOptionValues, key);
          return { result: ResponseStatus.SUCCESS, key };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  };

  private fetchOptionsFilter = async (
    setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
    key: keyof OptionTypes
  ) => {
    try {
      const executeWithRetry = async () => {
        const responseData = await this.saasifyService.getFilterConfig();
        if (responseData?.Data?.length) {
          const data = formatOptionsFilter(responseData.Data);
          updateOptionValue(data, setOptionValues, key);
          return { result: ResponseStatus.SUCCESS, key };
        }
        if (responseData?.Status === ResponseStatus.ERROR) {
          const errorMessages = responseData?.ErrorDetail;
          throw new Error(errorMessages);
        }
      };

      await backOff(executeWithRetry, {
        retry: (error, attemptNumber) => attemptNumber < 2,
       startingDelay: 50,
      });
    } catch (error: any) {
      return {
        result: ResponseStatus.ERROR,
        value: error?.message,
      };
    }
  };
}
