import type {
  OpportunityTeam,
  RC3CosellResponse,
} from "../../types/cosellResponse";
import {
  getAWSAccountOwner,
  getAWSSalesRep,
  getISVSM,
  getPartnerAccountManager,
  getPartnerDevelopmentManager,
  getPSM,
  getWWPSPDM,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const contactSegmentData = (data: RC3CosellResponse) => {
  const pdmOpportunityTeam =
    data?.CoSellEntity?.AwsSummary?.OpportunityTeam || [];
  const { OpportunityTeam } = data?.CoSellEntity || {};
  const PDM = getPartnerDevelopmentManager(pdmOpportunityTeam);
  const WWPSPDM = getWWPSPDM(pdmOpportunityTeam);
  const PSM = getPSM(pdmOpportunityTeam);
  const AWSSalesRep = getAWSSalesRep(pdmOpportunityTeam);
  const ISVSM = getISVSM(pdmOpportunityTeam);
  const AWSAccountOwner = getAWSAccountOwner(pdmOpportunityTeam);
  const partnerContact = getPartnerAccountManager(OpportunityTeam);

  return [
    {
      title: awsConstants.contact.awsSalesRep,
      name: getFullNameTeam(AWSSalesRep),
      email: getValue(AWSSalesRep?.Email),
      phone: getValue(AWSSalesRep?.Phone),
    },
    {
      title: awsConstants.contact.partnerSalesContact,
      name: getFullNameTeam(partnerContact),
      email: getValue(partnerContact?.Email),
      phone: getValue(partnerContact?.Phone),
    },
    {
      title: awsConstants.contact.awsAccountManager,
      name: getFullNameTeam(AWSAccountOwner),
      email: getValue(AWSAccountOwner?.Email),
      phone: getValue(AWSAccountOwner?.Phone),
    },
    {
      title: awsConstants.contact.partnerDevelopmentManager,
      name: getFullNameTeam(PDM),
      email: getValue(PDM?.Email),
      phone: getValue(PDM?.Phone),
    },
    {
      title: awsConstants.contact.wwpsPartnerDevelopmentManager,
      name: getFullNameTeam(WWPSPDM),
      email: getValue(WWPSPDM?.Email),
      phone: getValue(WWPSPDM?.Phone),
    },
    {
      title: awsConstants.contact.awsPartnerSuccessManager,
      name: getFullNameTeam(PSM),
      email: getValue(PSM?.Email),
      phone: getValue(PSM?.Phone),
    },
    {
      title: awsConstants.contact.awsIsvSuccessManager,
      name: getFullNameTeam(ISVSM),
      email: getValue(ISVSM?.Email),
      phone: getValue(ISVSM?.Phone),
    },
  ]?.filter((list) => list.email !== "N/A");
};

export const getValue = (field?: any, fallback: string = "N/A") =>
  field || fallback;

export const getFullNameTeam = (team: OpportunityTeam): string => {
  return `${team?.FirstName || ""} ${team?.LastName || ""}`.trim() || "";
};
