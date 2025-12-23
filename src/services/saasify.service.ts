import { requestPayload } from "../common/listCosell";
import URLBuilder from "../helpers/urlBuilder";
import type { PathParams, QueryParams } from "../types/urlBuilder";
import HttpWrapper from "./http.service";
import type {
  CoSellResponse,
  getListCosellAssociatePayloadCrmType,
} from "@template/types/api/getListCosellAssociateCrm.t";

class SaasifyService {
  private httpWrapper: HttpWrapper;
  private apiUrl: string;
  constructor() {
    this.httpWrapper = new HttpWrapper();
    this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }

  private buildUrl(
    path: string,
    pathParams?: PathParams,
    queryParams?: QueryParams,
  ): string {
    const urlBuilder = new URLBuilder(
      `${this.apiUrl}${path}`,
      pathParams,
      queryParams,
    );
    return urlBuilder.buildURL();
  }

  public async getEntity(
    entity: string,
    cloud: string = requestPayload.cloud.aws,
  ) {
    const version = cloud === requestPayload.cloud.aws ? 3 : undefined;
    const url = this.buildUrl(
      "/cosell/v3/providers/:cloud/referencedata",
      { cloud },
      {
        version,
        entityName: entity,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async getListCosell(
    sellerCode: string,
    // objectId: string | number,
    // appId: string | number,
    // portalId: string | number
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerCode/opportunities/crmid/:objectId",
      { sellerCode },
      // { appId, portalId }
    );
    return this.httpWrapper.get(url);
  }

  public async getListCosellAssociateCrm(
    sellerCode: string,
    payload: getListCosellAssociatePayloadCrmType,
  ): Promise<CoSellResponse> {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerCode/opportunities",
      { sellerCode },
      { ...payload },
    );
    return this.httpWrapper.get(url);
  }

  public async getSellerCodeEntity() {
    const url = this.buildUrl("/cosell/v3/selleraccounts", undefined, {
      provider: "AWS",
    });
    return this.httpWrapper.get(url);
  }

  public async getCrmList() {
    const url = this.buildUrl("/crm/list");
    return this.httpWrapper.get(url);
  }

  public async getMappingCrmList() {
    const url = this.buildUrl("/crm/mapping/list", undefined, {
      CRMName: requestPayload.crmOrigin,
    });
    return this.httpWrapper.get(url);
  }

  public async getPartnerType(sellerCode = requestPayload.sellerCode) {
    const url = this.buildUrl(
      `/cosell/v3/selleraccounts/:sellerCode/partnertypes`,
      { sellerCode },
    );
    return this.httpWrapper.get(url);
  }

  public async getFilterConfig() {
    const url = this.buildUrl(`/crm/filter-config`);
    return this.httpWrapper.get(url);
  }

  public async getDataForLaunch(
    CRMName: string,
    MappingId: any,
    CRMID: number,
  ) {
    const url = this.buildUrl(
      "/crm/Hubspot/Cosell/GetDataForLaunchFromCrm",
      undefined,
      {
        CRMName,
        MappingId,
        CRMID,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async getDealId(IsSearchingById: boolean, DealReferenceID: string) {
    const url = this.buildUrl("/crm/HubSpot/deals", undefined, {
      IsSearchingById,
      DealReferenceID,
    });
    return this.httpWrapper.get(url);
  }

  public async getDealFilterId(IsSearchingById: boolean, FilterId: string) {
    const url = this.buildUrl("/crm/HubSpot/deals", undefined, {
      IsSearchingById,
      FilterId,
    });
    return this.httpWrapper.get(url);
  }

  public async getProducts() {
    const url = this.buildUrl(
      "/cosell/v3/providers/AWS/referencedata/products",
    );
    return this.httpWrapper.get(url);
  }

  public async getSolutions(sellerCode: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerCode/solutions",
      {
        sellerCode,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async getCosellById(sellerId: string, opportunityId: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.get(url);
  }

  public async postUpdateCosellById(
    sellerId: string,
    opportunity: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunity",
      { sellerId, opportunity },
    );
    return this.httpWrapper.post(url, data);
  }

  public async postCosellById(sellerId: string, data: any) {
    const url = this.buildUrl(
      "/cosell/v3/webportal/selleraccounts/:sellerId/opportunities",
      { sellerId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async createCosell(sellerId: string, data: any) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities",
      { sellerId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async createCosellStep1(sellerId: string, data: any) {
    const url = this.buildUrl(
      "/cosell/v3/webportal/selleraccounts/:sellerId/opportunities",
      { sellerId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async postTransferOwner(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/assign",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async postAssociatePartnerOpportunity(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/associatepartneropportunity",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.patch(url, data);
  }

  public async postAssociateOffer(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/associateoffer",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async postChangeStage(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async postNextStep(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/nextstep",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.patch(url, data);
  }

  public async acceptCosell(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/accept",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async rejectCosell(
    sellerId: string,
    opportunityId: string,
    data: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/reject",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.post(url, data);
  }

  public async importDeal(data: any) {
    const url = this.buildUrl("/crm/HubSpot/Cosell/import");
    return this.httpWrapper.post(url, data);
  }

  public async refreshCosell(sellerId: string, opportunityId: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/pullcosell",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.get(url);
  }

  public async resyncCosellError(sellerId: string, opportunityId: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerId/opportunities/:opportunityId/resync",
      { sellerId, opportunityId },
    );
    return this.httpWrapper.post(url);
  }

  public async getActivityLog(
    ReferenceID: string,
    StartInd: number,
    EndInd: number,
    PageSize: number,
    offset: number,
    pageCount: number,
    EntityName: string,
    IsFromWebApp: boolean,
  ) {
    const payload = {
      ReferenceID,
      StartInd,
      EndInd,
      PageSize,
      offset,
      pageCount,
      EntityName,
      IsFromWebApp,
    };
    const url = this.buildUrl("/activity");
    return this.httpWrapper.post(url, payload);
  }

  public async getProvider() {
    const url = this.buildUrl("/provider");
    return this.httpWrapper.get(url);
  }

  public async getProviderCosell() {
    const url = this.buildUrl("/cosell/v3/providers");
    return this.httpWrapper.get(url);
  }

  public async getAmpCosellById(referenceId: string) {
    const url = this.buildUrl("/cosell/:referenceId", { referenceId });
    return this.httpWrapper.get(url);
  }

  public async getCountires(cloud: string) {
    const url = this.buildUrl(
      "/cosell/v3/providers/:cloud/referencedata/countries",
      { cloud },
    );
    return this.httpWrapper.get(url);
  }

  public async syncPushCrm(referenceId: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/opportunities/:referenceId/pushtocrm",
      { referenceId },
    );
    return this.httpWrapper.get(url);
  }

  public async getReferralType(cloudProvider: string) {
    const cloud = cloudProvider?.includes(requestPayload.defaultView)
      ? requestPayload.cloud.aws
      : cloudProvider;
    const url = this.buildUrl("/cosell/v3/providers/:cloud/referraltypes", {
      cloud,
    });
    return this.httpWrapper.get(url);
  }

  public async getPartnerSharedpartner(sellerCode: string, referralId: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerCode/opportunities/:referralId/sharedpartnerrecords",
      {
        sellerCode,
        referralId,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async postPartnerConnections(
    sellerCode: string,
    referralId: string,
    payload: any,
  ) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerCode/opportunities/:referralId/invitepartner",
      {
        sellerCode,
        referralId,
      },
    );
    return this.httpWrapper.post(url, payload);
  }

  public async getPartnerConnect(sellerCode: string) {
    const url = this.buildUrl(
      "/cosell/v3/selleraccounts/:sellerCode/partnerconnections",
      {
        sellerCode,
      },
    );
    return this.httpWrapper.get(url);
  }
  public async getPropertiesReferencedata(
    cloudProvider: string,
    entityName?: string,
    version?: string,
    referralType?: string,
  ) {
    const cloud = cloudProvider?.includes(requestPayload.defaultView)
      ? requestPayload.cloud.aws
      : cloudProvider;

    const url = this.buildUrl(
      "/cosell/v3/providers/:cloud/referencedata",
      {
        cloud,
      },
      {
        referralType,
        version,
        entityName,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async subscriptionscountbyprovider() {
    const url = this.buildUrl("/dashboard/subscriptionscountbyprovider");
    return this.httpWrapper.get(url);
  }

  public async subscriptionscountbyproviderbymonth() {
    const url = this.buildUrl("/dashboard/subscriptionscountbyproviderbymonth");
    return this.httpWrapper.get(url);
  }

  public async invoicerevenuevspaidbymonth() {
    const url = this.buildUrl("/dashboard/invoicerevenuevspaidbymonth");
    return this.httpWrapper.get(url);
  }

  public async invoiceRevenueByMonth() {
    const url = this.buildUrl("/dashboard/invoiceRevenueByMonth");
    return this.httpWrapper.get(url);
  }

  public async subscribeCount() {
    const url = this.buildUrl(
      "/dashboard/subscribedandunsubscirbedcountbymonth",
    );
    return this.httpWrapper.get(url);
  }

  public async getReferenceData(cloud: string = requestPayload.cloud.aws) {
    const version = cloud === requestPayload.cloud.aws ? 3 : undefined;
    const url = this.buildUrl(
      "/cosell/v3/providers/:cloud/referencedata",
      { cloud },
      {
        version,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async ampSolutions(
    SellerCode: string = requestPayload.sellerCode,
    CloudProvider: string = requestPayload.cloud.amp,
  ) {
    const url = this.buildUrl("/cosell/providers/amp/solutions");
    return this.httpWrapper.post(url, {
      SellerCode,
      CloudProvider,
    });
  }

  public async getSellercode(
    SellerConfigurationType: string = requestPayload.sellerConfigurationType,
  ) {
    const url = this.buildUrl(
      "/staticdata/selleraccountsfordropdown",
      undefined,
      {
        SellerConfigurationType,
        // appId: context.extension.appId,
        // portalId: context.portal.id,
        // userEmail: context.user.email,
        // userID: context.user.id,
      },
    );
    return this.httpWrapper.get(url);
  }

  public async upsertAmpCosell(payload: Record<string, any>) {
    const url = this.buildUrl("/cosell/crm/hubspot");
    return this.httpWrapper.post(url, payload);
  }

  public async pullCosellAmp(sellerCode: string, referenceId: string) {
    const url = this.buildUrl(
      "/cosell/selleraccounts/:sellerCode/opportunities/:referenceId/pullcosell",
      { sellerCode, referenceId },
    );
    return this.httpWrapper.get(url);
  }
}

export default SaasifyService;
