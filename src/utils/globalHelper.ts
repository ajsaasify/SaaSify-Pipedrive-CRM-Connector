import { dateFormat } from "../types/cosell.forms";
import { StatusState } from "../enum/status.enum";
import {
  MarketplaceTransaction,
  OpportunityTeam,
  RC3CosellResponse,
} from "../types/cosellResponse";
import { cosellReadonlyField } from "../common/listCosell/cosellReadonly";
import { OpportunityTeam as Team } from "../enum/opportunityTeam.enum";
import { dealPropertyName } from "../common/forms/dealName";
import { requestPayload } from "../common/listCosell";
import { parseISO, format, isValid, parse, addYears, addDays } from "date-fns";
import { ModalTitle } from "../enum/modal.enum";
import { DefaultCurrency } from "../enum/currency.enum";
import moment from "moment";
import { fallBackKey } from "../common/section/accept";
// import { GCPCosellResponse } from "../types/gcpCosell";
import { AmpCosellResponse } from "../types/ampCosell";
// import { PartnerConnectionProps } from "../types/partner";
import { optionField } from "../types/dropdown.options";
// import {
//   BaseDate,
//   ChartColor,
//   DateInputEventsPayload,
// } from "@hubspot/ui-extensions";
import { CosellAction } from "../enum/action.enum";
import { FetchOptions } from "../enum/options.enum";
import { labelMapper } from "./labelMappers";
import { PartnerConnectionProps } from "@template/types/partner";

export interface BaseDate{
  year:number,month:number,date:number
}

export const parseDateISO = (dateFormat?: string): dateFormat | null => {
  if (!dateFormat) return null;
  const [year, month, date] = dateFormat?.split("T")[0]?.split("-");
  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10) - 1,
    date: parseInt(date, 10),
  };
};

export const displayDateInvitations = (dateFormat?: string): string => {
  if (!dateFormat) return fallBackKey;
  const date = parseISO(dateFormat);

  return format(date, "MM/dd/yyyy h:mm a");
};

export const displayDate = (dateFormat?: string | null): string => {
  if (!dateFormat) return fallBackKey;

  const date = parseISO(dateFormat);

  if (!isValid(date)) return fallBackKey;

  return format(date, "MM/dd/yyyy");
};
export const displayEntireDate = (dateFormat?: string | null): string => {
  if (!dateFormat) return fallBackKey;

  const date = parseISO(dateFormat);

  if (!isValid(date)) return fallBackKey;

  return format(date, "MMMM dd',' yyyy");
};

export const parseDate = (dateFormat: string): dateFormat | null => {
  if (!dateFormat) return null;
  const [year, month, date] = dateFormat?.split("-");
  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10) - 1,
    date: parseInt(date, 10),
  };
};

export const parseBaseDate = (formatDate: {
  year: number;
  month: number;
  date: number;
}): string => {
  if (!formatDate || !Object.keys(formatDate).length) return "";
  const { year, month, date } = formatDate;
  const dateObj = new Date(year, month, date + 1);
  return dateObj.toISOString();
};

export const getReadOnlyFields = (status: string | undefined): string[] => {
  switch (status) {
    case StatusState.ACTION_REQUIRED:
      return cosellReadonlyField.actionRequired;
    case StatusState.APPROVED:
      return cosellReadonlyField.approved;
    default:
      return [];
  }
};

export const parseArray = (fields: string[] | undefined | null): string => {
  if (!fields) return fallBackKey;
  return fields?.join(", ") || fallBackKey;
};

export const extactArray = (fields: string): string[] => {
  if (!fields) return [];
  return fields?.split(",") || [fields];
};

export const parseSemiColon = (fields: string[] | undefined): string => {
  if (!fields) return fallBackKey;
  return fields?.join("; ") || fallBackKey;
};

export const fallbackAsNa = (value: any = "N/A") => {
  if (typeof value === "number") {
    return value;
  }
  return value === null ||
    value === undefined ||
    value === "" ||
    value?.includes("null")
    ? "N/A"
    : value;
};

interface Money {
  currencyCode?: string;
  units?: string | number;
  nanos?: number;
}

export const formatMoney = (money: Money): string => {
  const { currencyCode = DefaultCurrency.USD, units = 0, nanos = 0 } = money;
  const totalAmount = Number(units) + nanos / 1e9;

  return convertCurrency(currencyCode, totalAmount);
};

export const formatPrice = (price: any) => {
  if (!price || typeof price !== "object") return "N/A";

  const { currencyCode = DefaultCurrency.USD, units = 0, nanos = 0 } = price;

  const unitsNumber = Number(units) || 0;
  const nanosPart = nanos ? nanos / 1_000_000_000 : 0;
  const totalValue = unitsNumber + nanosPart;
  const formattedPrice = totalValue
    .toFixed(9)
    .replace(/(\.\d*?[1-9])0+$/, "$1")
    .replace(/\.0+$/, "");

  return convertCurrency(currencyCode, formattedPrice);
};

export const convertCurrency = (
  symbol: string | undefined,
  price: number | undefined | string
): string => {
  if (typeof price !== "number" && !price) return fallBackKey;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: symbol || "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(Number(price) || 0);
};

export const combineUnitsAndNanos = (units: number, nanos: number): number => {
  return units + nanos / 1e9;
};

export const currencyNotConvertedFormat = (
  symbol: string | undefined,
  price: number | undefined | string
): string => {
  return price ? `${price} ${symbol}` : fallBackKey;
};

export const trimString = (value: any): string | null => {
  if (typeof value == "undefined") return null;
  if (typeof value == "string" && !value) return null;
  if (typeof value !== "string" || !value) return value;
  return value.trim() ?? "";
};

export function convertLowerString(string: string): string {
  return string?.trim()?.toLocaleLowerCase();
}

export function getOpportunityOwner(team?: OpportunityTeam[]): OpportunityTeam {
  return getTeamMember(team, Team.OWNER);
}

export function getPartnerAccountManager(
  team?: OpportunityTeam[]
): OpportunityTeam {
  return getTeamMember(team, Team.PARTNER_MANAGER);
}

export function getPartnerDevelopmentManager(
  team?: OpportunityTeam[]
): OpportunityTeam {
  return getTeamMember(team, Team.PDM);
}

export function getAWSSalesRep(team?: OpportunityTeam[]): OpportunityTeam {
  return getTeamMember(team, Team.SALES_REP);
}

export function getWWPSPDM(team?: OpportunityTeam[]): OpportunityTeam {
  return getTeamMember(team, Team.WWPSPDM);
}
export function getISVSM(team?: OpportunityTeam[]): OpportunityTeam {
  return getTeamMember(team, Team.ISVSM);
}

export function getAWSAccountOwner(team?: OpportunityTeam[]): OpportunityTeam {
  return getTeamMember(team, Team.AWS_OWNER);
}

export function getPSM(team?: OpportunityTeam[]): OpportunityTeam {
  return getTeamMember(team, Team.PSM);
}

function getTeamMember(
  team?: OpportunityTeam[],
  businessTitle?: string
): OpportunityTeam {
  return (
    team?.find(
      (opportunity: OpportunityTeam) =>
        opportunity?.BusinessTitle == businessTitle
    ) || {}
  );
}

export const getValue = (field?: any, fallback: string = fallBackKey) => {
  if (typeof field === "boolean") {
    return field ? "Reseller" : "Direct";
  }
  if (typeof field === "number") {
    return field;
  }
  return field || fallback;
};

export const getFullName = (team: OpportunityTeam): string => {
  return (
    `${team?.FirstName || ""} ${team?.LastName || ""}`.trim() || fallBackKey
  );
};

export const getResponseError = (error?: string | string[]): string => {
  let parsedError: string | string[];
  if (!error) return "--";
  if (typeof error === "string") {
    try {
      parsedError = JSON.parse(error);
    } catch {
      parsedError = error;
    }
  } else {
    parsedError = error;
  }
  const errorMessage = Array.isArray(parsedError)
    ? parsedError.join(", ")
    : parsedError;

  return errorMessage ?? "--";
};

export const formatProductOptions = (
  options: { ProductName: string; AWSProductCode: string }[]
): { label: string; value: string }[] => {
  return options.map((options) => ({
    label: options.ProductName,
    value: options.AWSProductCode,
  }));
};

export const mapOptions = (
  options: any[],
  valueKey: string,
  labelKey?: string
) => {
  return options?.map((option: any) => ({
    ...option,
    label: option[labelKey ?? "Name"],
    value: option[valueKey],
  }));
};

// mapoptions([{Name:"dd",Id:"ddd"}],"Id")
interface OptionFind {
  Name: string;
  Description?: string;
  EntityName?: string;
  IsPostalCodeRequired?: boolean;
  ValidationMessage?: string;
  PostalCode?: string;
  ISOCode?: string;
  AdditionalAttributes?: { Key: string; Value: boolean | string }[];
}

export const someOptionsPossiblity = (
  optionField: OptionFind[],
  condition: (e: OptionFind) => boolean
) => {
  return optionField?.some((option) => {
    return condition(option);
  });
};

export const formatOptions = (options: OptionFind[], cloud?: boolean): any => {
  const isCountryEntity = someOptionsPossiblity(
    options,
    (option) => option.EntityName === "Country"
  );
  const formattedOptions = options.map((option) => {
    const { Name, Description, EntityName, AdditionalAttributes = [] } = option;

    const baseOption = {
      ...option,
      value: Name,
      label: cloud ? Description || Name : Name,
    };

    if (!isCountryEntity) return baseOption;

    const attrMap = Object.fromEntries(
      AdditionalAttributes.map((attr) => [attr.Key, attr.Value])
    );

    return {
      ...baseOption,
      isPostalCodeRequired:
        option.IsPostalCodeRequired ??
        attrMap["IsPostalCodeRequired"] === "true",
      postalCodeRegex: option.PostalCode ?? (attrMap["PostalCode"] as string),
      validationMessage: option.ValidationMessage ?? "",
      countryCode: option.ISOCode ?? attrMap["ISO2"],
      isStateRequired: attrMap["IsStateRequired"] === "true",
    };
  });

  const shouldSort = someOptionsPossiblity(formattedOptions, (option) =>
    [FetchOptions.PARTNER_ROLE, FetchOptions.CURRENCY].includes(
      (option.EntityName ?? "") as FetchOptions
    )
  );
  let sortedOptions = shouldSort
    ? sortByKey(formattedOptions, "label")
    : formattedOptions;

  if (
    someOptionsPossiblity(
      formattedOptions,
      (o) => o.EntityName === FetchOptions.CURRENCY
    )
  ) {
    const usd = sortedOptions.find((o) => o.Name === DefaultCurrency.USD);
    const others = sortedOptions.filter((o) => o.Name !== DefaultCurrency.USD);
    sortedOptions = usd ? [usd, ...others] : others;
  }

  return removeDuplicates(sortedOptions as optionField[]);
};

export const formatOptionsFilter = (
  options: {
    RecordId?: string;
    FilterConfigName?: string;
    CRMName?: string;
  }[]
): {
  label?: string;
  value?: string;
}[] => {
  const optionsList = options
    ?.filter((list) => list.CRMName == "HubSpot")
    ?.map((option) => {
      return { label: option?.FilterConfigName, value: option?.RecordId };
    });
  return removeDuplicates(optionsList as optionField[]);
};

// Validation for isPostalCodeRequired
export const isPostalCodeRequired = (
  formValue: any,
  optionValues: any
): boolean => {
  const countryOption = optionValues?.countries?.find(
    (option:any) => option.value === formValue?.country
  );

  const isNationalSecurityConditionMet =
    formValue?.country === labelMapper.nationSecurities.country &&
    formValue?.nationalSecurity ===
      labelMapper.nationSecurities.defaultValue.yes &&
    formValue?.industryVertical === labelMapper.nationSecurities.value;

  if (isNationalSecurityConditionMet) {
    return false;
  }

  return countryOption?.isPostalCodeRequired ?? true;
};

export const formatPartnerOptions = (
  options: { PartnerName: string; PartnerAWSAccountId: string }[]
): { label: string; value: string }[] => {
  const optionList = options.map((options) => ({
    label: options.PartnerName,
    value: options.PartnerAWSAccountId,
  }));
  return removeDuplicates(optionList as optionField[]);
};

export const formatSolutionsOptions = (
  options: { Name: string; Id: string }[]
): any[] => {
  const optionList = options?.map(
    (options: { Name: string; Id: string; ID?: string }) => ({
      ...options,
      label: options.Name,
      value: options.Id ?? options.ID,
    })
  );
  return removeDuplicates(optionList as optionField[]);
};

export const formatSellerCodeOptions = (
  options: { Name: string; SellerCode: string }[]
): { label: string; value: string }[] => {
  const optionList = options.map(
    (options: { Name: string; SellerCode: string }) => ({
      label: options.Name,
      value: options.SellerCode,
    })
  );
  return removeDuplicates(optionList as optionField[]);
};

export const formatCosellOptions = (
  options: {
    MappingName: string;
    Id: number;
    CRMName: string;
  }[]
) => {
  const optionList = options.map((option) => ({
    value: option.Id,
    label: option.MappingName,
    crmName: option.CRMName,
  }));
  return removeDuplicates(optionList as any[]);
};

export const getDealType = (dealName: string): string => {
  const normalizedDealName = convertLowerString(dealName);

  if (normalizedDealName === convertLowerString(dealPropertyName.po)) {
    return requestPayload.dealType.po;
  } else if (normalizedDealName === convertLowerString(dealPropertyName.ao)) {
    return requestPayload.dealType.ao;
  } else if (
    normalizedDealName === convertLowerString(dealPropertyName.default)
  ) {
    return "";
  } else {
    return "";
  }
};
export const getStatus = (dealName: string): string => {
  const normalizedDealName = convertLowerString(dealName);

  if (normalizedDealName === convertLowerString(dealPropertyName.po)) {
    return requestPayload.cloudProviderStatus.po;
  } else if (normalizedDealName === convertLowerString(dealPropertyName.ao)) {
    return requestPayload.cloudProviderStatus.ao;
  } else if (
    normalizedDealName === convertLowerString(dealPropertyName.default)
  ) {
    return "";
  } else {
    return "";
  }
};

export const displayErrorMessage = (
  condition: boolean,
  message: string
): string => {
  return condition ? message : "";
};

export const isValidDealToCreate = (list: RC3CosellResponse[]): boolean => {
  return Array.isArray(list) && !!list?.length;
};

export const displayBoolean = (value: any) => (value ? "Yes" : "No");

export const totalCount = (property: string, data: any[]) => {
  return data?.reduce((accumulator, value) => {
    return accumulator + (Number(value[property]) || 0);
  }, 0);
};

// export const formatUTCDate = (isoString: any) => {
//   if (!isoString) return "N/A";
//   const date = parseISO(isoString);
//   if (isNaN(date.getTime())) return "N/A";
//   const formattedDate = format(date, "MMMM d, yyyy, H:mm 'UTC'");
//   return formattedDate;
// };

export const formatCustomDate = (dateObj: {
  year: number;
  month: number;
  date: number;
}): string => {
  if (!dateObj || typeof dateObj !== "object") return "";
  const { year, month, date } = dateObj;

  const paddedMonth = String(month + 1).padStart(2, "0"); // Assumes 1-based month
  const paddedDate = String(date).padStart(2, "0");

  return `${year}-${paddedMonth}-${paddedDate}`;
};

export const getTodayDateBase = (): BaseDate => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  };
};

export const getTomorrowDateBase = (): BaseDate => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  };
};

export const getMinStartDate = (
  offerExpired: dateFormat
): dateFormat | undefined => {
  if (!offerExpired?.year) return undefined;

  const date = new Date(
    offerExpired.year,
    offerExpired.month,
    offerExpired.date
  );
  const nextDay = addDays(date, 1);

  return {
    year: nextDay.getFullYear(),
    month: nextDay.getMonth(),
    date: nextDay.getDate(),
  };
};

export const getMaxStartDateThree = (): {
  year: number;
  month: number;
  date: number;
} => {
  const max = addYears(new Date(), 3);
  return {
    year: max.getFullYear(),
    month: max.getMonth(),
    date: max.getDate(),
  };
};

export const getMaxStartDateFive = (
  offerStartDate: dateFormat
): dateFormat | undefined => {
  if (!offerStartDate?.year) return undefined;

  const date = new Date(
    offerStartDate.year,
    offerStartDate.month,
    offerStartDate.date
  );
  const fiveYearsLater = addYears(date, 5);

  return {
    year: fiveYearsLater.getFullYear(),
    month: fiveYearsLater.getMonth(),
    date: fiveYearsLater.getDate(),
  };
};

export const formatUTCDate = (isoString: any) => {
  if (!isoString) return "N/A";
  const date = moment(isoString);
  if (!date.isValid()) return "N/A";
  const hours = date.hour();
  const minutes = date.minute();
  if (hours === 0 && minutes === 0) {
    return date.format("MMMM D, YYYY");
  }
  return date.format("MMMM D, YYYY, H:mm [UTC]");
};

export function convertToEndOfDayISOFromParts({
  year,
  month,
  date,
}: {
  year: number;
  month: number; // 1-based (e.g., 8 for August)
  date: number;
}): string {
  // JavaScript Date uses 0-based months, so subtract 1
  const endOfDayUTC = new Date(
    Date.UTC(year, month - 1, date, 23, 59, 59, 999)
  );
  return endOfDayUTC.toISOString();
}

export const formatUTCDateOnlyWithString = (isoString: string) => {
  if (!isoString) return fallBackKey;
  const date = new Date(isoString);

  return format(date.toISOString(), "MM/dd/yyyy hh:mm:ss a");
};

export const formatUTCDateOnly = (isoString?: string) => {
  if (!isoString) return "--";
  const date = parseISO(isoString);
  if (isNaN(date.getTime())) return "--";
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;
};

export const formatUTCDateInstallment = (dateString?: string) => {
  if (!dateString) return "N/A";

  let date;

  // Check if the format is MM/DD/YYYY (Type 1)
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    date = parse(dateString, "MM/dd/yyyy", new Date());
  }
  // Check if the format is YYYY-MM-DD (Type 2)
  else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    date = parseISO(dateString);
  } else {
    return "N/A"; // Invalid format
  }

  if (isNaN(date.getTime())) return "N/A"; // Invalid date check

  return format(date, "yyyy-MM-dd");
};

export const validateDealName = (dealName: string, value: string) => {
  const returnText = convertLowerString(value);
  const deal = convertLowerString(dealName);
  return deal?.includes(returnText);
};

export const switchPrivateView = (dealName: string) => {
  const deal = convertLowerString(dealName);
  if (deal?.includes("gcp")) return requestPayload.cloud.gcp;
  if (deal?.includes("aws")) return requestPayload.cloud.aws;
  if (deal?.includes("azure")) return requestPayload.cloud.amp;
  return requestPayload.cloud.aws;
};

export const parseSnakeCase = (value?: any) => {
  if (!value || typeof value !== "string") {
    return "N/A";
  }
  return value?.split("_")?.join(" ") || value;
};

export const parseObjDate = (formatDate?: any): string => {
  const { year = "", month = "", day = "" } = formatDate || {};
  if (!year || !month || !day) return "N/A";
  const dateObj = new Date(year, month, day);
  return format(dateObj.toISOString(), "MMM d yyyy 'GMT+5'");
};

export const parseObjDateWithFallBack = (formatDate?: any): string => {
  const { year = "", month = "", day = "" } = formatDate || {};
  if (!year || !month || !day) return fallBackKey;
  const dateObj = new Date(year, month - 1, day);
  return format(dateObj.toISOString(), "MMM d yyyy");
};

export const googleRecord = (
  compName: string,
  street: string,
  city: string,
  zipcode: string
) => {
  const value: string[] = [];
  if (compName) value.push(compName);
  if (street) value.push(street);
  if (city) value.push(city);
  if (zipcode) value.push(zipcode);
  return value?.join(", ") || "N/A";
};
export const camelCasetoReadView = (text: string) => {
  if (!text) return "N/A";
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const fallbackForNull = (value?: any) => {
  if (value == null || typeof value == "undefined" || value == "") return "--";
  return value;
};

export const showLink = (value: any) => {
  return !value || value == "N/A" || value == fallBackKey;
};

export const getOfferDuration = (
  offerCreatedDate: string,
  offerExpiredDate: string
): number => {
  const createdDate = new Date(offerCreatedDate);
  const expiredDate = new Date(offerExpiredDate);

  // Calculate the difference in milliseconds
  const diffInMs = expiredDate.getTime() - createdDate.getTime();

  // Convert milliseconds to days
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export const logModalTitle = (ActivityLogID: any = "") => {
  return ActivityLogID
    ? `${ModalTitle.ACTIVITY_LOG} - ${ActivityLogID}`
    : ModalTitle.ACTIVITY_LOG;
};

export const parseStringToOptions = (options: string[]) => {
  return options?.map((value) => ({ label: value, value }));
};

export const parseIsoString = (dateFormat?: string): string | null => {
  if (!dateFormat) return null;

  return dateFormat?.split("T")?.[0];
};

export const parseDateInput = (
  data: dateFormat = { year: 1000, date: 1, month: 0 }
) => {
  return { day: data.date, month: data.month + 1, year: data.year };
};

export const minDateIput = () => {
  const today = new Date();
  return today;
  // return {
  //   year: today.getFullYear(),
  //   month: today.getMonth(),
  //   date: today.getDate(),
  // };
};

export const parseDateInputFromGcp = (data?: any) => {
  if (!data) return {};
  return {
    year: parseInt(data.year, 10),
    month: parseInt(data.month, 10) - 1,
    date: parseInt(data.day, 10),
  };
};

export const showFilters = (data: Record<string, any>) => {
  return Object.keys(data)?.some((value: string) => data[value]);
};

export const displayOpportunityName = (
  // cosell: RC3CosellResponse | GCPCosellResponse | AmpCosellResponse,
  cosell: RC3CosellResponse | AmpCosellResponse,

  fallback: string = "N/A"
): string => {
  if (!cosell || !cosell.CloudProvider) return fallback;

  const parseEntity = (entity: unknown) => {
    if (typeof entity === "object") return entity;
    try {
      return JSON.parse(entity as string);
    } catch (error) {
      console.error("Error parsing CoSellEntity:", error);
      return null;
    }
  };

  let cosellEntity;

  if (cosell.CloudProvider === requestPayload?.cloud?.aws) {
    cosellEntity = parseEntity((cosell as RC3CosellResponse)?.CoSellEntity);
    return (
      cosellEntity?.Project?.Title ||
      cosellEntity?.Invitation?.Payload?.OpportunityInvitation?.Project
        ?.Title ||
      fallback
    );
  }

  // if (cosell.CloudProvider === requestPayload?.cloud?.gcp) {
  //   cosellEntity = parseEntity((cosell as GCPCosellResponse)?.CoSellEntity);
  //   return cosellEntity?.opportunityInfo?.displayName ?? fallback;
  // }

  return fallback;
};

export const convertToLocalTime = (isoDateString?: string): string => {
  if (!isoDateString) return "--";
  const correctedDateString = isoDateString?.includes("z")
    ? isoDateString
    : isoDateString + "z";

  const date = new Date(correctedDateString);

  return format(date.toISOString(), "MM/dd/yyyy hh:mm:ss a");
};

export const formatToLocalTime = (utcTimestamp: string): string => {
  if (!utcTimestamp) return "--";
  const cleanedTimestamp = utcTimestamp.replace(/(\.\d{3})\d+Z$/, "$1Z");

  const date = new Date(cleanedTimestamp);

  if (isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleString();
};

export const validatePureNumber = (
  value: any,
  isDecimal: boolean = false,
  withZero: boolean = true
) => {
  if (!value) return false;
  const valueString = value.toString().trim();
  const regex = isDecimal ? /^\d+(\.\d+)?$/ : /^\d+$/;
  if (!regex.test(valueString)) return false;
  const numericValue = Number(value);
  if (!withZero && numericValue === 0) return false;
  return true;
};

export const validateDecimal = (value: any) => {
  const strValue = value?.toString()?.trim() || "0";
  const regex = /^\d+$/; // only digits, no decimals
  const test = regex.test(strValue);
  if (!test) return test;

  // Must be digits only AND not just zero(s)
  return !!parseInt(strValue, 10);
};

export const partnerModalTitle = (partner: PartnerConnectionProps) => {
  return partner?.PartnerName;
};

export const removeDuplicates = (data: optionField[]) => {
  const uniqueNames = new Set();
  const filteredOptions = data.filter((item) => {
    if (!uniqueNames.has(item.label)) {
      uniqueNames.add(item.label);
      return true;
    }
    return false;
  });

  return filteredOptions;
};

export const ignoreUnspecified = (optionField: optionField[]) => {
  return (
    optionField?.filter((option) => !option.value?.includes("UNSPECIFIED")) ??
    []
  );
};

export const snakeCaseToCamelCase = (text: string = "", fallback = "N/A") => {
  if (!text) return text ?? fallback;
  if (typeof text != "string") return text;
  let result = text?.replace(/_/g, " ");
  result = result
    ?.toLowerCase()
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");

  return result;
};

export const trimOpportunitiesFromId = (id?: string): string => {
  if (!id) return "N/A";
  return id?.replace("opportunities/", "");
};

export const sortByKey = (arr: any[], key: string): any[] => {
  return [...arr].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (typeof valA === "string" && typeof valB === "string") {
      return valA.localeCompare(valB);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return valA - valB;
    }

    return 0;
  });
};

export const assignColor = (
  arr: any[],
  key: string
): Record<string, any> => {
  const setData = new Set<string>();
  const sortedArray = sortByKey(arr, key);

  sortedArray.forEach((element) => {
    const value = element[key];
    if (!setData.has(value)) {
      setData.add(value);
    }
  });

  const colorMap: Record<string, any> = {};
  let colorIndex = 3;
  // Array.from(setData).forEach((keys) => {
  //   if (requestPayload.preDefinedProviderColor[keys]) {
  //     colorMap[keys] = requestPayload.preDefinedProviderColor[keys];
  //   } else if (requestPayload.subcriberColor[keys]) {
  //     colorMap[keys] = requestPayload.subcriberColor[keys];
  //   } else {
  //     colorMap[keys] =
  //       (requestPayload.color[colorIndex] as ChartColor) ||
  //       requestPayload.color[0];
  //     colorIndex++;
  //   }
  // });

  return colorMap;
};

export const displayTag = (status: string) => {
  const create = [
    "STATE_UNSPECIFIED",
    "STATE UNSPECIFIED",
    "DRAFT",
    "Pending",
    "Pending Submission",
  ];
  const submit = ["SUBMITTED", "Received", "In review"];
  const approved = ["ACCEPTED", "Approved", "Accepted"];
  const warn = ["Action Required", "Won"];
  const expired = ["Rejected", "Declined", "Lost", "NOT_ACCEPTED", "Expired"];

  const normalizedStatus = status?.toLowerCase();

  if (create.some((value) => value.toLowerCase().includes(normalizedStatus))) {
    return "default";
  }
  if (submit.some((value) => value.toLowerCase().includes(normalizedStatus))) {
    return "info";
  }
  if (
    approved.some((value) => value.toLowerCase().includes(normalizedStatus))
  ) {
    return "success";
  }
  if (warn.some((value) => value.toLowerCase().includes(normalizedStatus))) {
    return "warning";
  }
  if (expired.some((value) => value.toLowerCase().includes(normalizedStatus))) {
    return "danger";
  }

  return "default"; // fallback
};

export const displayActivityTag = (dealStatus: string) => {
  const done = ["Done"];
  const notStarted = ["NotStarted"];
  const expired = ["Expired"];

  const normalizedStatus = dealStatus?.toLowerCase();

  if (done.some((value) => value.toLowerCase().includes(normalizedStatus))) {
    return "success";
  }
  if (
    notStarted.some((value) => value.toLowerCase().includes(normalizedStatus))
  ) {
    return "warning";
  }
  if (expired.some((value) => value.toLowerCase().includes(normalizedStatus))) {
    return "danger";
  }

  return "default"; // fallback
};

export const isFutureDate = (baseDate: BaseDate): boolean => {
  if (!baseDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date((baseDate as unknown as  string));
  return targetDate > today;
};

export const isPendingCosell = (slug: string, status: string = ""): boolean =>
  slug == CosellAction.ADD || status?.includes(StatusState.PENDING_SUBMISSION);

export const setValidation = (
  labelMapper: Record<string, any>,
  field: string,
  isValid: boolean
) => {
  labelMapper[field].validation = isValid
    ? labelMapper[field].validationInvalid
    : labelMapper[field].validationMessage;
};

export const getOfferIdwithOutAggrementId = (
  marketplaceTransactions?: MarketplaceTransaction[]
) => {
  const offerId = marketplaceTransactions?.[0]?.MarketplaceOffer?.OfferID;
  return offerId;
};

export const mapSellerCode = (options: { [key: string]: string }[]) => {
  return options?.map((option) => {
    return {
      ...option,
      label: option?.SellerAccountName,
      value: option?.SellerCode,
    };
  });
};
export const getPrivateOfferStep = (
  step: string,
  currentStep?: number
): string => {
  switch (step) {
    case "BasicInformation":
      return "basicinfo";
    case "PurchaserDetails":
      return "basicinfo";
    case "OfferTerm":
      return "purchaserdetail";
    case "OfferPricing": {
      if (currentStep === 2) {
        return "offerterm";
      }
      return "offerpricing";
    }
    default:
      return "basicinfo";
  }
};

export const parseBaseDateTodate = (
  formatDate:
    | {
        year: number;
        month: number;
        date: number;
      }
    | null
    | undefined
): string | null => {
  if (!formatDate) return null;
  const { year, month, date } = formatDate;
  if (!year || !month || !date) return null;
  const dateObj = new Date(year, month, date);

  return format(dateObj, "MM/dd/yyyy");
};

// type BaseDate = {
//   year: number;
//   month: number; // 1-based
//   day: number;
// };

export const toBaseDate = (
  value: string | BaseDate | null | undefined
): any | null => {
  if (!value) return null;

  // If already in BaseDate format, return as is
  if (
    typeof value === "object" &&
    "year" in value &&
    "month" in value &&
    "date" in value
  ) {
    return value;
  }

  // If input is a string
  if (typeof value === "string") {
    const dateOnly = value.includes("T") ? value.split("T")[0] : value;

    const [yearStr, monthStr, dayStr] = dateOnly.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1; // Keep as 1-based (don't subtract 1)
    const date = parseInt(dayStr, 10);

    if (!year || !month || !date) return null;

    return {
      year,
      month,
      date,
      formattedDate: `${year}-${String(month).padStart(2, "0")}-${String(
        date
      ).padStart(2, "0")}`,
    };
  }

  return null;
};

export const baseDateToString = (date: BaseDate): string => {
  const month = String(date.month).padStart(2, "0");
  const day = String(date.date).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
};

export const extractEndDate = (
  formValue: Record<string, any>,
  labelMapper: any
): string | null => {
  const { year, month, date } = formValue?.offerExpired;
  if (!year || !month || !date) return null;
  const dateObj = new Date(year, month, date);
  const durationUnit = formValue?.[labelMapper.durationUnit.name];
  const duration = formValue?.duration ?? 0;
  if (durationUnit === "years") {
    dateObj.setFullYear(dateObj.getFullYear() + duration);
  } else {
    dateObj.setMonth(dateObj.getMonth() + duration);
  }
  return format(dateObj, "MM/dd/yyyy");
};

export const formatContractDuration = (
  formValue: Record<string, any>,
  labelMapper: any
): string => {
  const durationUnit = formValue?.[labelMapper.durationUnit.name];
  const duration = formValue?.duration ?? 0;

  if (durationUnit) {
    if (durationUnit === "years") {
      return `${duration} years`;
    } else {
      return `${duration * 12} months`;
    }
  } else {
    return `${duration} months`;
  }
};

export const parseAndCalculateSchedulePrice = (schedulePrice: any[]) => {
  if (!schedulePrice) return { parsedList: [], totalAmount: 0 };

  const parsedList = schedulePrice?.map((item: any) => ({
    ...item,
    Price: parseFloat(item.Price),
  }));

  const totalAmount = parsedList.reduce(
    (acc: number, curr: any) => acc + parseFloat(curr.Price),
    0
  );

  return {
    parsedList,
    totalAmount: totalAmount,
  };
};

export const validateDimensionFields = (formValue: Record<string, string>) => {
  const errors: Record<string, string> = {};

  const trimmedDimensionName = formValue.dimensionName?.trimStart();
  if (
    !formValue.dimensionName ||
    trimmedDimensionName.length === 0 ||
    trimmedDimensionName.length > 80
  ) {
    errors.dimensionName =
      "Dimension name must be 1 to 80 characters, and can’t start with a space.";
  }

  if (
    !formValue.apiName ||
    formValue.apiName.length > 36 ||
    !/^[a-zA-Z0-9_]+$/.test(formValue.apiName)
  ) {
    errors.apiName =
      "API name must be 1 to 36 characters. Valid characters are a-z, A-Z, 0-9, and underscore (_).";
  }

  const trimmedDescription = formValue.dimensionDescription?.trimStart();
  if (
    !formValue.dimensionDescription ||
    trimmedDescription.length === 0 ||
    trimmedDescription.length > 1000
  ) {
    errors.dimensionDescription =
      "Dimension description must be 1 to 1000 characters, and can’t start with a space.";
  }

  return errors;
};

export const isEmpty = (obj: any) =>
  obj == null || (typeof obj === "object" && Object.keys(obj).length === 0);

export const hasErrors = (obj: Record<string, any>): boolean => {
  return Object.values(obj).some((val) => {
    if (!val) return false;
    if (typeof val === "string") return true;
    if (typeof val === "boolean") return val;
    if (Array.isArray(val)) return val.some((v) => hasErrors(v));
    if (typeof val === "object") return hasErrors(val);
    return false;
  });
};

export const toISODate = (dateString: string): string => {
  if (!dateString) return "";
  return dateString.includes("T")
    ? dateString
    : new Date(`${dateString}T00:00:00.000Z`).toISOString();
};
