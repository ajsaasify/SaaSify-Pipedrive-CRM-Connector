export interface OpportunityList {
  CloudProviderStatus?: string;
  CloudProviderStage?: string;
  CloudProviderIdentifier?: string;
  Customer?: string;
  OpportunityName?: string;
  RowNum?: number;
  TotalRows?: number;
  CRMMappingId?: string | null;
  HasError?: boolean;
  SellerCode?: string;
  ReferenceID?: string;
  Status?: string;
  CloudProvider?: string;
  ErrorMessage?: string[];
  CRMReferenceId?: string | null;
  DealType?: string;
  Version?: string | null;
  CRMOrigin?: string;
}
