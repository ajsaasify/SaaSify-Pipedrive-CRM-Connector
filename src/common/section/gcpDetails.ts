import { GCPCosellResponse } from "../../types/gcpCosell";
import {
  displayBoolean,
  formatMoney,
  formatUTCDateOnlyWithString,
  getValue,
  googleRecord,
  parseArray,
  parseObjDateWithFallBack,
  parseSnakeCase,
  snakeCaseToCamelCase,
  trimOpportunitiesFromId,
} from "../../utils/globalHelper";
import { gcpConstants } from "../constants/gcpCosellFieldMappings";
import { requestPayload } from "../listCosell";

export const gcpDetialsOverview = (gcpCosellData: GCPCosellResponse) => {
  const coSellEntity = gcpCosellData?.CoSellEntity;
  const { displayName = "" } = coSellEntity?.opportunityInfo || {};
  const { qualificationInfo = {}, customerInfo = {} } = coSellEntity || {};
  const { dealSize = {} } = qualificationInfo;

  return [
    [
      {
        label: gcpConstants.overview.identifier,
        value: trimOpportunitiesFromId(coSellEntity?.name as string),
      },
      {
        label: gcpConstants.overview.opportunityName,
        value: getValue(displayName),
      },
    ],
    [
      {
        label: gcpConstants.overview.stage,
        value: getValue(coSellEntity?.stage),
      },
      {
        label: gcpConstants.overview.status,
        value: snakeCaseToCamelCase(
          gcpCosellData?.CloudProviderStatus || coSellEntity?.state
        ),
      },
    ],
    [
      {
        label: gcpConstants.overview.customerName,
        value: getValue(customerInfo?.customerDetails?.organizationName),
      },
      {
        label: gcpConstants.overview.source,
        value: snakeCaseToCamelCase(coSellEntity?.source),
      },
    ],
    [
      {
        label: gcpConstants.overview.estimatedCloseDate,
        value: parseObjDateWithFallBack(qualificationInfo?.estimatedCloseDate),
      },
      {
        label: gcpConstants.overview.opportunityAmount,
        value: formatMoney(dealSize),
      },
    ],
    [
      {
        label: gcpConstants.overview.opportunityOwner,
        value: getValue(coSellEntity?.owner),
      },
      {
        label: gcpConstants.overview.opportunityOwnerEmail,
        value: getValue(coSellEntity?.ownerEmail),
      },
    ],
    [
      {
        label: gcpConstants.overview.contractLength,
        value: getValue(qualificationInfo?.contractLengthMonths),
      },
    ],
  ];
};

export const gcpDetialsCustomer = (gcpCosellData: GCPCosellResponse) => {
  const coSellEntity = gcpCosellData?.CoSellEntity;
  const { customerInfo = {} } = coSellEntity || {};
  const { customerDetails = {} } = customerInfo;
  const { domain = "", address = {}, organizationName = "" } = customerDetails;
  const { administrativeArea = "", locality = "", postalCode = "" } = address;

  return [
    [
      {
        label: gcpConstants.customer.customerName,
        value: getValue(organizationName),
      },
      { label: gcpConstants.customer.customerDomain, value: getValue(domain) },
    ],
    [
      {
        label: gcpConstants.customer.industry,
        value: snakeCaseToCamelCase(customerDetails?.industry),
      },
      {
        label: gcpConstants.customer.googleCustomerRecord,
        value: googleRecord(
          organizationName,
          administrativeArea,
          locality,
          postalCode
        ),
      },
    ],
    [
      {
        label: gcpConstants.customer.country,
        value: getValue(address?.regionCode),
      },
      {
        label: gcpConstants.customer.state,
        value: getValue(administrativeArea),
      },
    ],
    [
      { label: gcpConstants.customer.city, value: getValue(locality) },
      { label: gcpConstants.customer.postalCode, value: getValue(postalCode) },
    ],
    [
      {
        label: gcpConstants.customer.address,
        value: parseArray(address?.addressLines),
      },
      {
        label: gcpConstants.customer.employeeCount,
        value: getValue(customerDetails?.employeeCount),
      },
    ],
  ];
};

export const gcpSystemInfo = (gcpCosellData: GCPCosellResponse) => {
  const coSellEntity = gcpCosellData?.CoSellEntity;
  const {
    creatorEmail = "",
    partnerInfo = {},
    updateTime = "",
    createTime = "",
    owner = "",
  } = coSellEntity ?? {};

  return [
    [
      {
        label: gcpConstants.systemInfo.cloudProvider,
        value: requestPayload.clouds.google,
      },
      {
        label: gcpConstants.systemInfo.sellerAccount,
        value: getValue(gcpCosellData?.SellerCode),
      },
    ],
    [
      { label: gcpConstants.systemInfo.owner, value: getValue(owner) },
      {
        label: gcpConstants.systemInfo.saasifyTracking,
        value: getValue(gcpCosellData?.ReferenceID),
      },
    ],
    [
      {
        label: gcpConstants.systemInfo.cloudProviderCreationDate,
        value: formatUTCDateOnlyWithString(createTime),
      },
      {
        label: gcpConstants.systemInfo.cloudProviderLastModified,
        value: formatUTCDateOnlyWithString(updateTime),
      },
    ],
    [
      {
        label: gcpConstants.systemInfo.createdBy,
        value: getValue(creatorEmail),
      },
      {
        label: gcpConstants.systemInfo.creationDate,
        value: formatUTCDateOnlyWithString(createTime),
      },
    ],
    [
      {
        label: gcpConstants.systemInfo.lastModified,
        value: formatUTCDateOnlyWithString(updateTime),
      },
      {
        label: gcpConstants.systemInfo.approvedDate,
        value: formatUTCDateOnlyWithString(partnerInfo?.approveTime ?? ""),
      },
    ],
  ];
};

export const gcpDetialsDealQualify = (gcpCosellData: GCPCosellResponse) => {
  const coSellEntity = gcpCosellData?.CoSellEntity;
  const {
    customerInfo = {},
    opportunityInfo = {},
    qualificationInfo = {},
    salesCycle = {},
    isvSolutionConnectInfo = {},
  } = coSellEntity ?? {};

  const { dealSize = {} } = qualificationInfo;
  const family = parseArray(opportunityInfo?.productFamily) || "";

  return [
    [
      {
        label: gcpConstants.dealQualify.region,
        value: parseSnakeCase(customerInfo?.region),
      },
      {
        label: gcpConstants.dealQualify.productFamily,
        value: parseSnakeCase(family),
      },
    ],
    [
      {
        label: gcpConstants.dealQualify.estimatedTcv,
        value: formatMoney(dealSize),
      },
      {
        label: gcpConstants.dealQualify.contractLength,
        value: getValue(qualificationInfo?.contractLengthMonths),
      },
    ],
    [
      {
        label: gcpConstants.dealQualify.estimatedCloseDate,
        value: parseObjDateWithFallBack(qualificationInfo?.estimatedCloseDate),
      },
      {
        label: gcpConstants.dealQualify.closeDatePushCount,
        value: getValue(salesCycle?.closeDatePushCount),
      },
    ],
    [
      {
        label: gcpConstants.dealQualify.decisionPhase,
        value: parseSnakeCase(qualificationInfo?.decisionPhase),
      },
      {
        label: gcpConstants.dealQualify.campaign,
        value: parseSnakeCase(qualificationInfo?.campaignCode),
      },
    ],
    [
      {
        label: gcpConstants.dealQualify.contractVehicle,
        value: parseSnakeCase(isvSolutionConnectInfo?.contractVehicle),
      },
      {
        label: gcpConstants.dealQualify.deliveryModel,
        value: parseSnakeCase(isvSolutionConnectInfo?.deliveryModel),
      },
    ],
    [
      {
        label: gcpConstants.dealQualify.supportNeeded,
        value: parseSnakeCase(isvSolutionConnectInfo?.supportLevel),
      },
      {
        label: gcpConstants.dealQualify.confidential,
        value: displayBoolean(opportunityInfo?.confidential),
      },
    ],
    [
      {
        label: gcpConstants.dealQualify.description,
        value: getValue(opportunityInfo?.description),
      },
      { label: "", value: "" },
    ],
  ];
};

export const renderProductTableContact = [
  { header: "Product", value: "product" },
  { header: "Product code", value: "productCode" },
  { header: "Sales price", value: "salesPrice" },
  { header: "List price", value: "listPrice" },
  { header: "Total price", value: "totalprice" },
  { header: "Metric", value: "metric" },
  { header: "Description", value: "description" },
];

export const renderProductTableGcpContact = [
  { header: "Product", value: "displayName" },
  { header: "Quantity", value: "quantity" },
  { header: "Product code", value: "displayName" },
  { header: "Sales price", value: "salesPrice" },
  { header: "List price", value: "listPrice" },
  { header: "Total price", value: "totalPrice" },
  { header: "Metric", value: "metric" },
  { header: "Description", value: "description" },
];

export const renderOpportunityTableContact = [
  { header: "Contact", value: "name" },
  { header: "Email", value: "email" },
  { header: "Access level", value: "accessLevel" },
];

export const renderTableContact = [
  { header: "Contact", value: "givenName" },
  { header: "Title", value: "title" },
  { header: "Role", value: "role" },
  { header: "Primary", value: "primary" },
];

export const renderAmpTableSolutions = [
  { header: "Solution Name", value: "firstName" },
  { header: "Solution Id", value: "lastName" },
  { header: "IP Co-sell Eligibility", value: "email" },
  { header: "Publisher Name", value: "phone" },
];
