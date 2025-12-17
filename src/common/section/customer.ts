import { labelMapper } from "@template/utils/labelMappers";
import { RC3CosellResponse } from "../../types/cosellResponse";
import {
  getFullName,
  getOpportunityOwner,
  getValue,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const customerSectionData = (data: RC3CosellResponse) => {
  const {
    Customer: { Account = {}, Contacts = [] } = {},
    OpportunityTeam = [],
  } = data?.CoSellEntity || {};
  const team = getOpportunityOwner(OpportunityTeam);

  const render = {
    customerDetails: [
      [
        {
          label: awsConstants.customer.customerDuns,
          value: getValue(Account?.Duns),
        },
        {
          label: awsConstants.customer.customerCompanyName,
          value: getValue(Account?.CompanyName),
        },
        {
          label: awsConstants.customer.website,
          value: getValue(Account?.WebsiteUrl),
        },
      ],
      [
        {
          label: awsConstants.customer.industryVertical,
          value: getValue(Account?.Industry),
        },
      ],
      [
        {
          label: awsConstants.customer.state,
          value: getValue(Account?.Address?.StateOrRegion),
        },
        {
          label: awsConstants.customer.country,
          value: getValue(Account?.Address?.CountryCode),
        },
      ],
      [
        {
          label: awsConstants.customer.opportunityOwner,
          value: getFullName(team),
        },
        {
          label: "",
          value: "",
        },
      ],
    ],
    endUser: [
      [
        {
          label: awsConstants.customer.customerFirstName,
          value: getValue(Contacts?.[0]?.FirstName),
        },
        {
          label: awsConstants.customer.customerLastName,
          value: getValue(Contacts?.[0]?.LastName),
        },
        {
          label: awsConstants.customer.customerTitle,
          value: getValue(Contacts?.[0]?.BusinessTitle),
        },
      ],
      [
        {
          label: awsConstants.customer.customerPhone,
          value: getValue(Contacts?.[0]?.Phone),
        },
        {
          label: awsConstants.customer.customerEmail,
          value: getValue(Contacts?.[0]?.Email),
        },
        {
          label: "",
          value: "",
        },
      ],
    ],
  };

  if (Account?.Industry == labelMapper.industryVertical.value) {
    render.customerDetails[1].push(
      {
        label: awsConstants.customer.otherIndustry,
        value: getValue(Account?.OtherIndustry),
      },
      {
        label: awsConstants.customer.streetAddress,
        value: getValue(Account?.Address?.StreetAddress),
      }
    );
    render.customerDetails[2].unshift({
      label: awsConstants.customer.city,
      value: getValue(Account?.Address?.City),
    });
    render.customerDetails[3].unshift({
      label: awsConstants.customer.postalCode,
      value: getValue(Account?.Address?.PostalCode),
    });
  } else {
    render.customerDetails[1].push(
      {
        label: awsConstants.customer.streetAddress,
        value: getValue(Account?.Address?.StreetAddress),
      },
      {
        label: awsConstants.customer.city,
        value: getValue(Account?.Address?.City),
      }
    );
    render.customerDetails[2].push({
      label: awsConstants.customer.postalCode,
      value: getValue(Account?.Address?.PostalCode),
    });
  }

  return render;
};
