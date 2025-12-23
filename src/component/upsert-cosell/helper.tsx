import { TFunction } from "i18next";
import { t } from "i18next";
const labels = (t: TFunction) => {
  return {
    titles: {
      cosellDetail: t("modalTitle.viewCosell"),
      editCosell: t("modalTitle.editCosell"),
      createCosell: t("modalTitle.addCosell"),
    },
    accordian: {
      customer: t("awsCosell.inputLabelMapper.accordian.customer"),
      project: t("awsCosell.inputLabelMapper.accordian.project"),
      marketing: t("awsCosell.inputLabelMapper.accordian.marketing"),
      additional: t("awsCosell.inputLabelMapper.accordian.additional"),
      contact: t("awsCosell.inputLabelMapper.accordian.contact"),
      partnerSalesContact: t(
        "awsCosell.inputLabelMapper.accordian.partnerSalesContact"
      ),
    },
    customerDuns: {
      label: t("awsCosell.inputLabelMapper.customerDuns.label"),
      name: "customerDuns",
      discription: t("awsCosell.inputLabelMapper.customerDuns.description"),
      validation: t("awsCosell.inputLabelMapper.customerDuns.validation"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.customerDuns.validationMessage"
      ),
      toopTip: t("awsCosell.inputLabelMapper.customerDuns.toopTip"),
      placeHolder: t("awsCosell.inputLabelMapper.customerDuns.placeHolder"),
    },
    customerCompanyName: {
      label: t("awsCosell.inputLabelMapper.customerCompanyName.label"),
      name: "customerCompanyName",
      validationMessage: t(
        "awsCosell.inputLabelMapper.customerCompanyName.validationMessage"
      ),
      validation: t(
        "awsCosell.inputLabelMapper.customerCompanyName.validation"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.customerCompanyName.placeHolder"
      ),
    },
    customerWebsite: {
      label: t("awsCosell.inputLabelMapper.customerWebsite.label"),
      name: "customerWebsite",
      placeHolder: t("awsCosell.inputLabelMapper.customerWebsite.placeHolder"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.customerWebsite.validationMessage"
      ),
    },
    industryVertical: {
      label: t("awsCosell.inputLabelMapper.industryVertical.label"),
      name: "industryVertical",
      value: "Other",
      validationMessage: t(
        "awsCosell.inputLabelMapper.industryVertical.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.industryVertical.placeHolder"),
    },
    nationSecurities: {
      label: t("awsCosell.inputLabelMapper.nationSecurities.label"),
      name: "nationSecurities",
      value: "Government",
      country: "United States",
      defaultValue: { yes: "Yes", no: "No" },
      discription: { yes: "", no: "" },
    },
    industryOther: {
      label: t("awsCosell.inputLabelMapper.industryOther.label"),
      name: "industryOther",
      validationMessage: t(
        "awsCosell.inputLabelMapper.industryOther.validationMessage"
      ),
    },
    streetAddress: {
      label: t("awsCosell.inputLabelMapper.streetAddress.label"),
      name: "streetAddress",
      validationMessage: t(
        "awsCosell.inputLabelMapper.streetAddress.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.streetAddress.placeHolder"),
    },
    state: {
      label: t("awsCosell.inputLabelMapper.state.label"),
      name: "state",
      validationMessage: t(
        "awsCosell.inputLabelMapper.state.validationMessage"
      ),
      placeholder: t("awsCosell.inputLabelMapper.state.placeHolder"),
      value: "United States",
    },
    country: {
      label: t("awsCosell.inputLabelMapper.country.label"),
      name: "country",
      validationMessage: t(
        "awsCosell.inputLabelMapper.country.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.country.placeHolder"),
    },
    city: {
      label: t("awsCosell.inputLabelMapper.city.label"),
      name: "city",
      validationMessage: t("awsCosell.inputLabelMapper.city.validationMessage"),
      validation: t("awsCosell.inputLabelMapper.city.validation"),
      placeHolder: t("awsCosell.inputLabelMapper.city.placeHolder"),
    },
    postalCode: {
      label: t("awsCosell.inputLabelMapper.postalCode.label"),
      name: "postalCode",
      validation: t("awsCosell.inputLabelMapper.postalCode.validation"),
      validationMessage: t("awsCosell.inputLabelMapper.postalCode.label"),
      placeHolder: t("awsCosell.inputLabelMapper.postalCode.placeHolder"),
    },
    awsCosell: {
      listItemLabel: t("awsCosell.inputLabelMapper.awsCosell.listItemLabel"),
      description: {
        yes: t("awsCosell.inputLabelMapper.awsCosell.description.yes"),
        no: t("awsCosell.inputLabelMapper.awsCosell.description.no"),
        select: t("awsCosell.inputLabelMapper.awsCosell.description.select"),
      },
      label: t("awsCosell.inputLabelMapper.awsCosell.label"),
      value: { yes: "None", no: "Do Not Need Support from AWS Sales Rep" },
      name: "awsCosell",
      placeholder: t("awsCosell.inputLabelMapper.awsCosell.placeholder"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.awsCosell.validationMessage"
      ),
    },
    opportunityType: {
      listItemLabel: t(
        "awsCosell.inputLabelMapper.opportunityType.listItemLabel"
      ),
      name: "opportunityType",
      value: {
        expansion: t("Expansion"),
        netNewBusiness: t("Net New Business"),
        flatRenewal: "Flat Renewal",
      },
      description: {
        expansion: t(
          "awsCosell.inputLabelMapper.opportunityType.description.expansion"
        ),
        netNewBusiness: t(
          "awsCosell.inputLabelMapper.opportunityType.description.netNewBusiness"
        ),
        flatRenewal: t(
          "awsCosell.inputLabelMapper.opportunityType.description.flatRenewal"
        ),
      },
    },
    partnerPrimaryNeedAction: {
      label: t("awsCosell.inputLabelMapper.partnerPrimaryNeedAction.label"),
      discription: {
        awsSupport: t(
          "awsCosell.inputLabelMapper.partnerPrimaryNeedAction.discription.awsSupport"
        ),
        awsNotSupport: t(
          "awsCosell.inputLabelMapper.partnerPrimaryNeedAction.discription.awsNotSupport"
        ),
      },
      value: {
        awsNotSupport: "Do Not Need Support from AWS Sales Rep",
        awsSupport: "None",
      },
    },
    relatedOpportunityIndentifier: {
      label: t(
        "awsCosell.inputLabelMapper.relatedOpportunityIndentifier.label"
      ),
      name: "relatedOpportunityIndentifier",
      description: t(
        "awsCosell.inputLabelMapper.relatedOpportunityIndentifier.description"
      ),
      validationMessage: t(
        "awsCosell.inputLabelMapper.relatedOpportunityIndentifier.validationMessage"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.relatedOpportunityIndentifier.placeHolder"
      ),
    },
    partnerProjectTitle: {
      label: t("awsCosell.inputLabelMapper.partnerProjectTitle.label"),
      name: "partnerProjectTitle",
      validationMessage: t(
        "awsCosell.inputLabelMapper.partnerProjectTitle.validationMessage"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.partnerProjectTitle.placeHolder"
      ),
    },
    salesActivities: {
      label: t("awsCosell.inputLabelMapper.salesActivities.label"),
      name: "salesActivities",
      validationMessage: t(
        "awsCosell.inputLabelMapper.salesActivities.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.salesActivities.placeHolder"),
      discription: t("awsCosell.inputLabelMapper.salesActivities.description"),
    },
    customerBusinessProblem: {
      label: t("awsCosell.inputLabelMapper.customerBusinessProblem.label"),
      name: "customerBusinessProblem",
      discription: t(
        "awsCosell.inputLabelMapper.customerBusinessProblem.description"
      ),
      validation: t(
        "awsCosell.inputLabelMapper.customerBusinessProblem.validation"
      ),
      validationMessage: t(
        "awsCosell.inputLabelMapper.customerBusinessProblem.validationMessage"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.customerBusinessProblem.placeHolder"
      ),
    },
    solutionsOffered: {
      description: t("awsCosell.inputLabelMapper.solutionsOffered.description"),
      label: t("awsCosell.inputLabelMapper.solutionsOffered.label"),
      name: "solutionsOffered",
      validation: t("awsCosell.inputLabelMapper.solutionsOffered.validation"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.solutionsOffered.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.solutionsOffered.placeHolder"),
    },
    awsProducts: {
      label: t("awsCosell.inputLabelMapper.awsProducts.label"),
      name: "awsProducts",
      description: t("awsCosell.inputLabelMapper.awsProducts.description"),
      validation: t("awsCosell.inputLabelMapper.awsProducts.validation"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.awsProducts.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.awsProducts.placeHolder"),
    },
    nextStep: {
      label: t("awsCosell.inputLabelMapper.nextStep.label"),
      name: "nextStep",
      description: t("awsCosell.inputLabelMapper.nextStep.description"),
      validation: t("awsCosell.inputLabelMapper.nextStep.validation"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.nextStep.validationMessage"
      ),
      maxLength: 255,
      placeHolder: t("awsCosell.inputLabelMapper.nextStep.placeHolder"),
    },
    useCase: {
      label: t("awsCosell.inputLabelMapper.useCase.label"),
      name: "useCase",
      validationMessage: t(
        "awsCosell.inputLabelMapper.useCase.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.useCase.placeHolder"),
    },
    deliveryModel: {
      label: t("awsCosell.inputLabelMapper.deliveryModel.label"),
      description: t("awsCosell.inputLabelMapper.deliveryModel.description"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.deliveryModel.validationMessage"
      ),
      name: "deliveryModel",
    },
    estimatedAWSRecurringRevenue: {
      name: "estimatedAWSRecurringRevenue",
      label: t("awsCosell.inputLabelMapper.estimatedAWSRecurringRevenue.label"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.estimatedAWSRecurringRevenue.validationMessage"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.estimatedAWSRecurringRevenue.placeHolder"
      ),
      validation: t(
        "awsCosell.inputLabelMapper.estimatedAWSRecurringRevenue.validation"
      ),
      valid: t("awsCosell.inputLabelMapper.estimatedAWSRecurringRevenue.valid"),
    },
    targetCloseDate: {
      name: "targetCloseDate",
      label: t("awsCosell.inputLabelMapper.targetCloseDate.label"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.targetCloseDate.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.targetCloseDate.placeHolder"),
      validation: t("awsCosell.inputLabelMapper.targetCloseDate.validation"),
      invalidMessage: t(
        "awsCosell.inputLabelMapper.targetCloseDate.invalidMessage"
      ),
    },
    apnProgram: {
      placeholder: t("awsCosell.inputLabelMapper.apnProgram.placeholder"),
      label: t("awsCosell.inputLabelMapper.apnProgram.label"),
      name: "apnProgram",
    },
    marketingSource: {
      discription: t("awsCosell.inputLabelMapper.marketingSource.description"),
      name: "marketingSource",
      value: { yes: "Marketing Activity", no: "None" },
    },
    marketingCampaign: {
      label: t("awsCosell.inputLabelMapper.marketingCampaign.label"),
      name: "marketingCampaign",
      placeHolder: t(
        "awsCosell.inputLabelMapper.marketingCampaign.placeHolder"
      ),
    },
    marketingUseCase: {
      label: t("awsCosell.inputLabelMapper.marketingUseCase.label"),
      name: "marketingUseCase",
      placeHolder: t("awsCosell.inputLabelMapper.marketingUseCase.placeHolder"),
    },
    marketingActivityChannel: {
      label: t("awsCosell.inputLabelMapper.marketingActivityChannel.label"),
      name: "marketingActivityChannel",
      placeHolder: t(
        "awsCosell.inputLabelMapper.marketingActivityChannel.placeHolder"
      ),
    },
    isMarketingfunds: {
      label: t("awsCosell.inputLabelMapper.isMarketingfunds.label"),
      name: "isMarketingfunds",
      value: { yes: "Yes", no: "No" },
    },
    crmUniqueIdentifier: {
      label: t("awsCosell.inputLabelMapper.crmUniqueIdentifier.label"),
      name: "crmUniqueIdentifier",
      validationMessage: t(
        "awsCosell.inputLabelMapper.crmUniqueIdentifier.validationMessage"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.crmUniqueIdentifier.placeHolder"
      ),
    },
    competitiveTracking: {
      name: "competitiveTracking",
      value: "*Other",
      label: t("awsCosell.inputLabelMapper.competitiveTracking.label"),
      placeHolder: t(
        "awsCosell.inputLabelMapper.competitiveTracking.placeHolder"
      ),
    },
    otherCompetitors: {
      label: t("awsCosell.inputLabelMapper.otherCompetitors.label"),
      name: "otherCompetitors",
      value: "*Other",
      validationMessage: t(
        "awsCosell.inputLabelMapper.otherCompetitors.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.otherCompetitors.placeHolder"),
    },
    awsAccountId: {
      label: t("awsCosell.inputLabelMapper.awsAccountId.label"),
      name: "awsAccountId",
      description: t("awsCosell.inputLabelMapper.awsAccountId.description"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.awsAccountId.validationMessage"
      ),
      validationErrorMessage: t(
        "awsCosell.inputLabelMapper.awsAccountId.validationMessage"
      ),
      placeHolder: t("awsCosell.inputLabelMapper.awsAccountId.placeHolder"),
    },
    additonalComments: {
      label: t("awsCosell.inputLabelMapper.additonalComments.label"),
      name: "additonalComments",
      description: t(
        "awsCosell.inputLabelMapper.additonalComments.description"
      ),
      placeHolder: t(
        "awsCosell.inputLabelMapper.additonalComments.placeHolder"
      ),
      validation: t("awsCosell.inputLabelMapper.additonalComments.validation"),
      validationMessage: t(
        "awsCosell.inputLabelMapper.additonalComments.validationMessage"
      ),
    },
    contactFirstName: {
      label: t("awsCosell.inputLabelMapper.contactFirstName.label"),
      name: "contactFirstName",
      placeHolder: t("awsCosell.inputLabelMapper.contactFirstName.placeHolder"),
    },
    contactLastName: {
      label: t("awsCosell.inputLabelMapper.contactLastName.label"),
      name: "contactLastName",
      placeHolder: t("awsCosell.inputLabelMapper.contactLastName.placeHolder"),
    },
    contactEmail: {
      label: t("awsCosell.inputLabelMapper.contactEmail.label"),
      name: "contactEmail",
      value: "Contact E-mail is not valid",
      placeHolder: t("awsCosell.inputLabelMapper.contactEmail.placeHolder"),
    },
    contactPhone: {
      label: t("awsCosell.inputLabelMapper.contactPhone.label"),
      name: "contactPhone",
      placeHolder: t("awsCosell.inputLabelMapper.contactPhone.placeHolder"),
    },
    contactTitle: {
      label: t("awsCosell.inputLabelMapper.contactTitle.label"),
      name: "contactTitle",
      placeHolder: t("awsCosell.inputLabelMapper.contactTitle.placeHolder"),
    },
    primaryContactFirstName: {
      label: t("awsCosell.inputLabelMapper.primaryContactFirstName.label"),
      name: "primaryContactFirstName",
      placeHolder: t(
        "awsCosell.inputLabelMapper.primaryContactFirstName.placeHolder"
      ),
    },
    primaryContactLastName: {
      label: t("awsCosell.inputLabelMapper.primaryContactLastName.label"),
      name: "primaryContactLastName",
      placeHolder: t(
        "awsCosell.inputLabelMapper.primaryContactLastName.placeHolder"
      ),
    },
    primaryContactEmail: {
      label: t("awsCosell.inputLabelMapper.primaryContactEmail.label"),
      name: "primaryContactEmail",
      value: "Contact E-mail is not valid",
      placeHolder: t(
        "awsCosell.inputLabelMapper.primaryContactEmail.placeHolder"
      ),
    },
    primaryContactPhone: {
      label: t("awsCosell.inputLabelMapper.primaryContactPhone.label"),
      name: "primaryContactPhone",
      placeHolder: t(
        "awsCosell.inputLabelMapper.primaryContactPhone.placeHolder"
      ),
    },
    primaryContactTitle: {
      label: t("awsCosell.inputLabelMapper.primaryContactTitle.label"),
      name: "primaryContactTitle",
      placeHolder: t(
        "awsCosell.inputLabelMapper.primaryContactTitle.placeHolder"
      ),
    },
    contactDescription: t("awsCosell.inputLabelMapper.contactDescription"),
    partnerDescription: t("awsCosell.inputLabelMapper.partnerDescription"),
    marketingSourceAction: {
      label: t("awsCosell.inputLabelMapper.marketingSourceAction.label"),
    },
    marketingSourceIsMarketingFundsAction: {
      label: t(
        "awsCosell.inputLabelMapper.marketingSourceIsMarketingFundsAction.label"
      ),
    },
    projectDetails: {
      cosellWithAws: "Co-sell with AWS",
      doNotSupport: "Do Not Support",
    },
  };
};
export const labelMapper = labels(t);
