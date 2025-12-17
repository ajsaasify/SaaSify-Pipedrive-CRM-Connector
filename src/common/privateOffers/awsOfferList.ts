import { MeterDataType } from "../../types/private-offers/dynamicColumn";
import { formatUTCDate } from "../../utils/globalHelper";

export const privateOffersList = [
  {
    TotalRows: 1,
    RowNum: 1,
    ID: 16283,
    DealReferenceID: "efd6c687-0ea7-49b1-ae5f-46f0db45f5bb",
    SubscriptionResourceID: "b83e9f70-f95c-42b1-ac72-e3e10e08d4ad",
    DealCode: "",
    SalesAgent: "Niharika",
    ProviderName: "AWS",
    DealName: "Globex Corporation-1 year contract",
    DealStatus: "Published",
    CustomerName: "Globex Corporation",
    ProductName: "QA-SaaS-NEP-Contract with Consumption",
    CreateDate: "2024-07-01T09:32:06.883",
    ProgressName: "Purchased from Marketplace",
    IsDealFromCRM: false,
    ActivityPercentage: 100.0,
    DealStartDate: "2025-02-18T10:43:00",
    DealEndDate: "2025-02-19T00:00:00",
    IsReseller: false,
    ResellerType: null,
    IsDealCreatedFromAPI: false,
    ActivityName: "DealPurchasedFromMarketplace",
    StartDateType: "",
    IsExpired: false,
    CanWithdraw: false,
    PrivateOfferLink:
      "https://aws.amazon.com/marketplace/saas/ordering?productId=prod-7bjbtfoggrbha&offerId=offer-vlr3gkgtpcway",
    CustomerAccountId: "204191651930",
    CRMMappingId: 0,
    CRMName: null,
    StepInformation: "OfferPricing",
    IsAmendApprovalRequired: false,
    BillingAccountID: "204191651930",
    PrivateOfferIdentifier: "offer-vlr3gkgtpcway",
    SellerAccountName: null,
  },
];

export const usageDimenstionColumn = [
  { value: "Description", header: "Name" },
  { value: "MarketplaceDescription", header: "Description" },
  { value: "APIName", header: "API Name" },
  { value: "Price", header: "Usage price(USD)" },
];

export const cppoUsageDimenstionColumn = [
  { value: "Description", header: "Name" },
  { value: "MarketplaceDescription", header: "Description" },
  { value: "Price", header: "Rate (USD)" },
];


export const ampUsageDimenstionColumn: { value: string; header: string; checked: string | null }[] = [
  { value: "Description", header: "Enabled", checked: null },
  { value: "MeterName", header: "ID", checked: null },
  { value: "MeterDescription", header: "Display Name", checked: null },
  { value: "UnitOfMeasure", header: "Unit of Measure", checked: null },
  { value: "Price", header: "Price per unit in USD", checked: null },
];

export const getUpdatedColumns = (pricingJson: any): { value: string; header: string; checked: any }[] => {
  const columns = ampUsageDimenstionColumn.map((col) => ({
    ...col,
    checked: null,
  }));

  const meterData = pricingJson?.MeterData ? JSON.parse(pricingJson.MeterData) : [];;
  const addedColumns = new Set(columns.map((col) => col.value));

  const dynamicColumns = [
    { key: "IsMonthlyEnabled", value: "MonthlyQuantityIncludedInBase", header: "1-Month Quantity Included in Base", checked: "IsMonthlyUnlimitedQuantity" },
    { key: "IsAnnualEnabled", value: "AnnualQuantityIncludedInBase", header: "1-Year Quantity Included in Base", checked: "IsAnnuallyUnlimitedQuantity" },
    { key: "IsTwoyearEnabled", value: "TwoYearQuantityIncludedInBase", header: "2-Year Quantity Included in Base", checked: "IsTwoYearUnlimitedQuantity" },
    { key: "IsThreeyearEnabled", value: "ThreeYearQuantityIncludedInBase", header: "3-Year Quantity Included in Base", checked: "IsThreeYearUnlimitedQuantity" },
  ];

  dynamicColumns.forEach(({ key, value, header, checked }) => {
    if (pricingJson?.[key] && !addedColumns.has(value)) {
      const isChecked = meterData.some((item: any) => item[checked] === true);
      columns.push({ value, header, checked: isChecked });
      addedColumns.add(value);
    }
  });
  return columns;
};



export const schedulePriceColumn = [
  { value: "Date", header: "Invoice Date" },
  { value: "Price", header: "Payment amount (USD)" },
];

export const billingType = [
  { value: "title", header: "Billing Term" },
  { value: "option", header: "Payment Option" },
  { value: "Price", header: "Pricing" },
];

export const productDimenstionColumn = [
  { value: "Description", header: "Name" },
  { value: "MarketplaceDescription", header: "Description" },
  { value: "APIName", header: "API Name" },
  { value: "Units", header: "Contract Usage (qty.)" },
];

export const cppoProductDimenstionColumn = [
  { value: "APIName", header: "Dimension" },
  { value: "Units", header: "Units" },
];

export const cppoWholeSalePriceColumn = [
  { value: "Description", header: "Name" },
  { value: "MarketplaceDescription", header: "Description" },
  { value: "Price", header: "Rate (USD)" }
]


export const featureListColumn = [
  {
    value: "Feature", header: "Feature",
  },
  {
    value: "Value", header: "Value", body: (value: any) => value.IsAddDetailsAvailable ? value.DatesAndQuantitiesText : value.Value,
  },
];

export const installmentsColumn = [
  { value: "InstallmentDate", header: "Installment Date" },
  { value: "Flatfee", header: "Flat Fee" },
  { value: "DiscountOnUsage", header: "Discount on usage (%)", body: (value: any) => value.DiscountOnUsage || value.DiscountOnCommitment },
];

export const tagsColumn = [
  { value: "Name", header: "Name" },
  { value: "Value", header: "Value" },
];

export const productDimentions = [{ name: "api_nestal1", quantity: 2 }];
