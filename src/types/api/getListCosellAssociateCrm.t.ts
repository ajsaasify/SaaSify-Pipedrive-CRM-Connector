
export interface getListCosellAssociatePayloadCrmType {
  ReferralType?: string;
  StartInd?: number;
  EndInd?: number;
  PageSize?: number;
  offset?: number;
  pageCount?: number;
  HasError?: boolean;
  exportData?: boolean;
  appId?: string | number;
  portalId?: string | number;
  CloudProviderStatus?: string;
  CloudProvider?: string;
  OpportunityId?: string;
  Customer?: string;
  CloudProviderStage?: string;
  isAssociatedWithCrm?: boolean;
}
export interface CoSellResponse {
  OperationType: string | null;
  Status: string;
  RequestCorrelationID: string;
  ErrorDetail: string | null;
  Data: CoSellItem[];
  StatusCode: number | null;
  ErrorMessage: string;
}

export interface CoSellItem {
  CloudProviderStatus: string | null;
  CloudProviderStage: string | null;
  CloudProviderIdentifier: string | null;
  Customer: string | null;
  OpportunityName: string | null;
  CreateDate: string; // ISO timestamp
  ModifyDate: string; // ISO timestamp
  RowNum: number;
  TotalRows: number;
  CRMMappingId: string | null;
  HasError: boolean;
  IsDealRegistred: boolean;
  CoSellEntity: string | null;
  SellerCode: string | null;
  ReferenceID: string;
  Status: string;
  CloudProvider: string | null;
  ErrorMessage: string[]; // array of strings
  CRMReferenceId: string | null;
  DealType: string | null;
  Version: string | null;
  CRMOrigin: string | null;
}
