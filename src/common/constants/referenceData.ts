import { FetchOptions, DropdownOptions } from "../../enum/options.enum";

export const referenceDataProps = [
  { fetch: FetchOptions.STATE, value: DropdownOptions.STATE },
  {
    fetch: FetchOptions.DELIVERYMODAL,
    value: DropdownOptions.DELIVERYMODAL,
  },
  {
    fetch: FetchOptions.SALESACTIVITIES,
    value: DropdownOptions.SALESACTIVITIES,
  },
  {
    fetch: FetchOptions.MARKETINGACTIVITY,
    value: DropdownOptions.MARKETINGACTIVITY,
  },
  {
    fetch: FetchOptions.MARKETINGUSECASE,
    value: DropdownOptions.MARKETINGUSECASE,
  },
  { fetch: FetchOptions.CAMPAIGN, value: DropdownOptions.CAMPAIGN },
  { fetch: FetchOptions.INDUSTRY, value: DropdownOptions.INDUSTRY },
  { fetch: FetchOptions.USECASE, value: DropdownOptions.USECASE },
  {
    fetch: FetchOptions.CURRENCYVALUE,
    value: DropdownOptions.CURRENCYVALUE,
  },
  { fetch: FetchOptions.PRIMARYNEED, value: DropdownOptions.PRIMARYNEED },
  {
    fetch: FetchOptions.COMPETITIVETRACKING,
    value: DropdownOptions.COMPETITIVETRACKING,
  },
  {
    fetch: FetchOptions.CLOSEDLOSTREASON,
    value: DropdownOptions.CLOSEDLOSTREASON,
  },
  {
    fetch: FetchOptions.PROCUREMENTTYPE,
    value: DropdownOptions.PROCUREMENTTYPE,
  },
  {
    fetch: FetchOptions.STAGE,
    value: DropdownOptions.STAGE,
  },
];

export const referenceDataPropsGcp = [
  {
    fetch: FetchOptions.COUNTRY_GCP,
    value: DropdownOptions.COUNTRY_GCP,
  },
  {
    fetch: FetchOptions.PRODUCT_FAMILY,
    value: DropdownOptions.PRODUCT_FAMILY,
  },
  { fetch: FetchOptions.SOURCE, value: DropdownOptions.SOURCE },
  {
    fetch: FetchOptions.INDUSTRY,
    value: DropdownOptions.INDUSTRY_GCP,
  },
  {
    fetch: FetchOptions.CURRENCY,
    value: DropdownOptions.CURRENCY,
  },
  {
    fetch: FetchOptions.CONTRACT_VEHICLE,
    value: DropdownOptions.CONTRACT_VEHICLE,
  },
  {
    fetch: FetchOptions.DELIVERYMODAL,
    value: DropdownOptions.DELIVERY_MODAL_GCP,
  },
  {
    fetch: FetchOptions.SUPPORT_LEVEL,
    value: DropdownOptions.SUPPORT_LEVEL,
  },
  {
    fetch: FetchOptions.REGION,
    value: DropdownOptions.REGION,
  },
  {
    fetch: FetchOptions.STATES,
    value: DropdownOptions.COUNTRY_STATE_GCP,
  },
  {
    fetch: FetchOptions.STAGE,
    value: DropdownOptions.STATE_GCP,
  },
  {
    fetch: FetchOptions.DECISION_PHASE,
    value: DropdownOptions.DECISION_PHASE,
  },
];

export const referenceDataPropsAmp = [
  {
    fetch: FetchOptions.COUNTRY_GCP,
    value: DropdownOptions.COUNTRY_AMP,
  },
  {
    fetch: FetchOptions.PURCHASE_INTENT,
    value: DropdownOptions.PURCHASE_INTENT,
  },
  {
    fetch: FetchOptions.HELP_TYPE,
    value: DropdownOptions.HELP_TYPE,
  },
  {
    fetch: FetchOptions.STATE,
    value: DropdownOptions.STATE_AMP,
  },
  {
    fetch: FetchOptions.CURRENCY,
    value: DropdownOptions.CURRENCY_AMP,
  },
  {
    fetch: FetchOptions.PARTNER_ROLE,
    value: DropdownOptions.PARTNER_ROLE,
  },
  {
    fetch: FetchOptions.SOLUTION_AREA,
    value: DropdownOptions.SOLUTION_AREA,
  },
  {
    fetch: FetchOptions.SOLUTION_PLAY,
    value: DropdownOptions.SOLUTION_PLAY,
  },
  {
    fetch: FetchOptions.STAGE,
    value: DropdownOptions.STAGE_AMP,
  },
  {
    fetch: FetchOptions.CLOSING_REASON,
    value: DropdownOptions.CLOSE_REASON,
  },
];
