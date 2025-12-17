import { RC3CosellResponse } from "../../types/cosellResponse";
import {
  convertCurrency,
  displayDate,
  getValue,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const saasDocumentationSegments = (data: RC3CosellResponse) => {
  const { SoftwareRevenue } = data?.CoSellEntity || {};
  return [
    [
      {
        label: awsConstants.saasDocumentation.procurementType,
        value: getValue(SoftwareRevenue?.DeliveryModel),
      },
      {
        label: awsConstants.saasDocumentation.softwareValue,
        value: convertCurrency(
          SoftwareRevenue?.Value?.CurrencyCode,
          SoftwareRevenue?.Value?.Amount
        ),
      },
    ],
    [
      {
        label: awsConstants.saasDocumentation.softwareCurrency,
        value: getValue(SoftwareRevenue?.Value?.CurrencyCode),
      },
      {
        label: awsConstants.saasDocumentation.contractStartDate,
        value: displayDate(SoftwareRevenue?.EffectiveDate),
      },
    ],
    [
      {
        label: awsConstants.saasDocumentation.contractEndDate,
        value: displayDate(SoftwareRevenue?.ExpirationDate),
      },
    ],
  ];
};
