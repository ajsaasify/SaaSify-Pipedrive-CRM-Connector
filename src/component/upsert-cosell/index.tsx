import { useEffect, useRef, useState } from "react";
import initSdk from "@template/helpers/modelInit";
import { useCoSellContext } from "@template/context/Cosell.context";
import {
  displayErrorMessage,
  getReadOnlyFields,
  isFutureDate,
  isPendingCosell,
  isPostalCodeRequired,
  minDateIput,
  validatePureNumber,
} from "@template/utils/globalHelper";
import React from "react";
import { CosellAction } from "@template/enum/action.enum";
import { RC3CosellResponse } from "@template/types/cosellResponse";
import { labelMapper } from "./helper";
import { buildDataProperty } from "./builder";
import {
  fetchListCosell,
  fetchSpecificCoSell,
} from "../cosell-list/apiHandler";
import { PipedriveContext } from "@template/types/pipedriveContext";
import { ModalId } from "@template/enum/modal.enum";
import { StatusState } from "@template/enum/status.enum";
import {
  AlertNotification,
  getErrorAlert,
} from "@template/common/messageAlert";
import { fetchDropDowAllOptions } from "../upsert-cosell/apiHandler";
import AccordionComponent from "../ui-components/PipedriveAccordion";
import { ToastService } from "@template/services/toast.service";
import Input from "../ui-components/PipedriveInput";
import InfoGrid from "../ui-components/pipdriveInfoGrid";
import PDSelectField from "../ui-components/PipedriveDropdown";
import { nationSecuritiesFields } from "@template/common/forms/nationalSecurities";
import { actionCosellRequiredFields } from "@template/common/forms/cosellRequiredFields";
import { fieldChecks } from "./validation";
import { Tile } from "../ui-components/detailview-components";
import { PDRadioGroup } from "../ui-components/PipedriveRadiobutton";
import { MultiSelectField } from "../ui-components/PipedriveMultiselect";
import TextAreaFieldBox from "../ui-components/PipedriveTextarea";
import PDDatePicker from "../ui-components/PipedriveCalendar";

export const CreateCosell: React.FC<{
  actions?: any;
  modalTitle?: string;
  slug?: CosellAction;
  context?: PipedriveContext;
  onList?: RC3CosellResponse;
}> = ({ actions, modalTitle, slug, context, onList }) => {
  useEffect(() => {
    initSdk(1000, 500);
  }, []);
  const {
    data,
    optionValues,
    generateCosell,
    dealName,
    setData,
    opportunityList,
    setOpportunityList,
    setAmpCosell,
    // setGcpCosellData,
    setOptionValues,
    referenceData,
    setReferenceData,
  } = useCoSellContext();
  const { LifeCycle } = data?.CoSellEntity || {};
  const initialError = useRef(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [isDataFromList, setIsDataFromList] = useState(true);
  const [errorValue, setErrorValue] = useState<Record<string, boolean>>({});
  const [formValue, setFormValue] = useState<Record<string, any>>({});
  const [isFetching, setIsFetching] = useState(false);
  const reviewStatus =
    data?.CloudProviderStatus ?? data?.CoSellEntity?.LifeCycle?.ReviewStatus;
  const readOnlyFields = getReadOnlyFields(reviewStatus as string);
  const [primaryNeedsAWS, setPrimaryNeedsAWS] = useState<string | undefined>();
  const [sellerCode, setSellerCode] = useState("");
  useEffect(() => {
    const shouldInitialize =
      (data && Object.keys(data).length > 0) ||
      (generateCosell && Object.keys(generateCosell).length > 0);
    let sellerCode = "";
    if (onList?.SellerCode) {
      sellerCode = onList?.SellerCode;
    }
    if (data?.SellerCode) sellerCode = data?.SellerCode;
    if (shouldInitialize) {
      if (generateCosell?.SellerCode) sellerCode = generateCosell?.SellerCode;
      setSellerCode(sellerCode);
      assignValuesEditCosell();
    }
  }, [data, generateCosell, onList]);
  const triggerAlert = ({ type, title, message }: AlertNotification) => {
    (ToastService as any)?.[type]?.(title, message);
  };
  const init = async () => {
    setIsDataFromList(true);
    if (onList?.ReferenceID && onList?.SellerCode) {
      await fetchSpecificCoSell(
        onList.ReferenceID,
        onList.SellerCode,
        setData,
        setIsDataFromList,
        triggerAlert,
        opportunityList,
        setOpportunityList,
        setAmpCosell,
        true
      );
    }
    await fetchDropDowAllOptions(
      setOptionValues,
      initialError,
      triggerAlert,
      optionValues,
      referenceData,
      setReferenceData,
      (sellerCode || onList?.SellerCode) ?? ""
    );
    setErrorStatus("");
    setErrorValue({});
    setIsDataFromList(false);
  };
  useEffect(() => {
    init();
  }, []);
  function assignValuesEditCosell() {
    const dataProperty = buildDataProperty({
      slug: slug as CosellAction,
      data,
      generateCosell,
      dealName,
    });

    setFormValue(dataProperty);

    function closePanel() {
      slug == CosellAction.ADD && fetchListCosell(setData, setOpportunityList);
      actions.closeOverlay(ModalId.ACTION_COSELL);
      setErrorStatus("");
    }

    setPrimaryNeedsAWS(
      dataProperty?.awsCosell?.includes(labelMapper.awsCosell.value.no)
        ? labelMapper.awsCosell.value.no
        : labelMapper.awsCosell.value.yes
    );
  }
  const isReviewStatusValid = [
    StatusState.APPROVED,
    StatusState.ACTION_REQUIRED,
  ].includes(LifeCycle?.ReviewStatus as StatusState);
  function onChangeValue(name: string, value: any) {
    if (errorValue[name] && name !== labelMapper.postalCode.name) {
      setErrorValue((prev) => {
        let isError = false;

        if (name === labelMapper.customerDuns.name) {
          isError = !validatePureNumber(value);
        } else if (name === labelMapper.estimatedAWSRecurringRevenue.name) {
          isError = !validatePureNumber(value, true, false);
        } else {
          isError = !value || (Array.isArray(value) && value.length === 0);
        }

        return {
          ...prev,
          [name]: isError,
        };
      });
    }

    if (
      name == labelMapper.competitiveTracking.name &&
      value !== labelMapper.competitiveTracking.value
    ) {
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
        otherCompetitors: "",
      }));
    } else if (
      name == labelMapper.marketingSource.name &&
      value == labelMapper.marketingSource.value.no
    ) {
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
        marketingCampaign: null,
        marketingUseCase: [],
        marketingActivityChannel: [],
        isMarketingfunds: null,
      }));
    } else {
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (labelMapper.country.name == name) {
      setFormValue((prev) => ({
        ...prev,
        postalCode: "",
        state: null,
      }));
      return;
    }
    return;
  }
  const validationMessage = (field: string) => {
    if (!errorValue?.[field]) return (labelMapper as any)?.[field].validation;
    return (labelMapper as any)?.[field]?.validationMessage;
  };
  function readOnlyField(field: string): boolean {
    return readOnlyFields?.includes(field);
  }
  const postalCodeRegex = (value?: string) => {
    console.log("redex check", value);
    const country = optionValues?.countries?.find(
      (c) => c.value === formValue?.country
    );

    const postalCodePattern = country?.postalCodeRegex;

    labelMapper.postalCode.validationMessage = value
      ? country?.validationMessage || labelMapper.postalCode.validation
      : labelMapper.postalCode.validation;

    if (postalCodePattern && value) {
      const postalCodeRegex = new RegExp(postalCodePattern);
      const isInvalidPostalCode = !postalCodeRegex.test(value);

      setErrorValue((prev) => ({
        ...prev,
        postalCode: isInvalidPostalCode,
      }));
    }
  };
  const isInvalidField = (field: string): boolean => {
    const value = formValue[field];
    return !value || (Array.isArray(value) && value.length === 0);
  };
  const validateFields = () => {
    let valid = true;
    let newErrorValue: Record<string, boolean> = {};

    const checkField = (field: string, condition: boolean) => {
      if (condition) {
        newErrorValue[field] = true;
        valid = false;
      }
    };

    actionCosellRequiredFields.forEach((field) => {
      if (
        labelMapper.nationSecurities.defaultValue.yes ==
          formValue?.nationalSecurity &&
        nationSecuritiesFields.includes(field)
      ) {
        return;
      }
      if (
        !readOnlyFields.includes(field) &&
        field == labelMapper.targetCloseDate.name
      ) {
        if (isPendingCosell(slug as string, reviewStatus)) {
          checkField(field, !isFutureDate(formValue[field]));
        } else {
          checkField(field, isInvalidField(field));
        }
        if (!formValue[field]) {
          labelMapper.targetCloseDate.validation =
            labelMapper.targetCloseDate.validationMessage;
        } else {
          labelMapper.targetCloseDate.validation =
            labelMapper.targetCloseDate.invalidMessage;
        }
        return;
      }
      if (
        !readOnlyFields.includes(field) &&
        field == labelMapper.estimatedAWSRecurringRevenue.name
      ) {
        const amount = Number(formValue?.estimatedAWSRecurringRevenue);
        if (isNaN(amount) || amount < 1) {
          valid = false;
          newErrorValue.estimatedAWSRecurringRevenue = true;
          labelMapper.estimatedAWSRecurringRevenue.valid =
            labelMapper.estimatedAWSRecurringRevenue.validationMessage;
        }
      }
      if (
        field === labelMapper.postalCode.name &&
        !readOnlyFields.includes(field)
      ) {
        const countryData = optionValues?.countries?.find(
          (option) => option.value === formValue?.country
        );

        labelMapper.postalCode.validationMessage = formValue?.postalCode
          ? countryData?.validationMessage || labelMapper.postalCode.validation
          : labelMapper.postalCode.validation;

        if (!countryData?.value) checkField(field, isInvalidField(field));
        if (!countryData?.isPostalCodeRequired) return;

        const postalCodePattern = countryData?.postalCodeRegex;

        if (postalCodePattern) {
          const postalCodeRegex = new RegExp(postalCodePattern);
          const validPostalCode = !postalCodeRegex.test(formValue[field]);

          if (validPostalCode) {
            newErrorValue[field] = validPostalCode;
            valid = false;
          }
        }

        return;
      }

      if (
        formValue?.awsCosell?.includes(labelMapper.awsCosell.value.no) &&
        field == labelMapper.salesActivities?.name &&
        !readOnlyFields.includes(field)
      ) {
        return;
      }
      if (!readOnlyFields.includes(field)) {
        checkField(field, isInvalidField(field));
      }
    });

    fieldChecks(
      formValue,
      readOnlyFields,
      labelMapper.nationSecurities.defaultValue.yes ==
        formValue?.nationalSecurity
    ).forEach(({ field, condition }) => checkField(field, condition));

    if (
      formValue?.marketingSource === labelMapper.marketingSource.value.yes &&
      !formValue?.isMarketingfunds &&
      !readOnlyFields.includes(labelMapper.marketingSource.name)
    ) {
      valid = false;
      newErrorValue.marketingSourceIsMarketingFundsAction = true;
    } else if (
      !formValue?.marketingSource &&
      !readOnlyFields.includes(labelMapper.marketingSource.name)
    ) {
      valid = false;
      newErrorValue.marketingSourceAction = true;
    }
    if (
      !primaryNeedsAWS &&
      !readOnlyFields.includes(labelMapper.awsCosell.name)
    ) {
      newErrorValue.partnerPrimaryNeedAction = true;
    } else if (
      isInvalidField(labelMapper.awsCosell.name) &&
      !readOnlyFields.includes(labelMapper.awsCosell.name)
    ) {
      valid = false;
      newErrorValue.awsCosell = true;
    }
    setErrorValue(newErrorValue);

    if (!valid) {
      const errorsFieldName = Object.entries(newErrorValue).map(
        ([field]) => field
      );
      const errorLabels = errorsFieldName
        .map((field) => (labelMapper as any)?.[field]?.label || field)
        ?.join(", ");
      if (errorLabels) {
        triggerAlert(getErrorAlert(`${errorLabels} is required`));
      }
    }
    return valid;
  };
  return (
    <div className="w-full">
      {/* customer details */}
      <AccordionComponent
        className="card-view"
        defaultOpenIds={[labelMapper.accordian.customer]}
        items={[
          {
            title: labelMapper.accordian.customer,
            id: labelMapper.accordian.customer,
            children: (
              <>
                <Input
                  onInput={(value) => {
                    setErrorValue((prev) => ({
                      ...prev,
                      customerDuns: !validatePureNumber(value),
                    }));
                  }}
                  onChange={(value) => {
                    onChangeValue(labelMapper.customerDuns.name, value);
                  }}
                  error={
                    errorValue?.customerDuns
                      ? validationMessage(labelMapper.customerDuns.name)
                      : ""
                  }
                  value={formValue?.customerDuns}
                  tooltip={labelMapper.customerDuns.toopTip}
                  label={labelMapper.customerDuns.label}
                  name={labelMapper.customerDuns.name}
                  info={labelMapper.customerDuns.discription}
                />
                <div className="grid gap-x-2 md:grid-cols-2 grid-cols-1">
                  <Input
                    label={labelMapper.customerCompanyName.label}
                    name={labelMapper.customerCompanyName.name}
                    tooltip={labelMapper.customerCompanyName.label}
                    readOnly={readOnlyField(
                      labelMapper.customerCompanyName.name
                    )}
                    isrequired={true}
                    value={formValue?.customerCompanyName}
                    error={errorValue?.customerCompanyName}
                    validationMessage={displayErrorMessage(
                      errorValue?.customerCompanyName,
                      labelMapper.customerCompanyName.validationMessage
                    )}
                    onChange={(value) => {
                      onChangeValue(
                        labelMapper.customerCompanyName.name,
                        value
                      );
                    }}
                  />
                  {formValue?.nationalSecurity ==
                    labelMapper.nationSecurities.defaultValue.no && (
                    <Input
                      label={labelMapper.customerWebsite.label}
                      name={labelMapper.customerWebsite.name}
                      tooltip={labelMapper.customerWebsite.label}
                      isrequired={true}
                      value={formValue.customerWebsite}
                      error={errorValue.customerWebsite}
                      placeholder={labelMapper.customerWebsite.placeHolder}
                      validationMessage={displayErrorMessage(
                        errorValue?.customerWebsite,
                        labelMapper.customerWebsite.validationMessage
                      )}
                      readOnly={readOnlyField(labelMapper.customerWebsite.name)}
                      onChange={(value) => {
                        onChangeValue(labelMapper.customerWebsite.name, value);
                      }}
                    />
                  )}
                  {/* country */}
                  <PDSelectField
                    label={labelMapper.country.label}
                    name={labelMapper.country.name}
                    required
                    readOnly={readOnlyField(labelMapper.country.name)}
                    options={optionValues?.countries || []}
                    value={formValue?.country}
                    error={errorValue?.country}
                    validationMessage={displayErrorMessage(
                      errorValue?.country,
                      labelMapper?.country?.validationMessage
                    )}
                    onChange={(value) => {
                      onChangeValue(labelMapper.country.name, value);
                    }}
                  />
                  <PDSelectField
                    label={labelMapper.industryVertical.label}
                    name={labelMapper.industryVertical.name}
                    required
                    readOnly={readOnlyField(labelMapper.industryVertical.name)}
                    value={formValue.industryVertical}
                    error={errorValue.industryVertical}
                    validationMessage={displayErrorMessage(
                      errorValue?.industryVertical,
                      labelMapper.industryVertical.validationMessage
                    )}
                    options={optionValues?.industry || []}
                    onChange={(value: any) => {
                      onChangeValue(labelMapper.industryVertical.name, value);
                      if (value != labelMapper.nationSecurities.value) {
                        setFormValue((prev) => ({
                          ...prev,
                          nationalSecurity:
                            labelMapper.nationSecurities.defaultValue.no,
                        }));
                      }
                    }}
                  />
                  {formValue?.country == labelMapper.state.value &&
                    formValue?.nationalSecurity ==
                      labelMapper.nationSecurities.defaultValue.no && (
                      <PDSelectField
                        label={labelMapper.state.label}
                        name={labelMapper.state.name}
                        required
                        readOnly={readOnlyField(labelMapper.state.name)}
                        value={formValue?.state}
                        error={errorValue.state}
                        validationMessage={displayErrorMessage(
                          errorValue?.state,
                          labelMapper?.state?.validationMessage
                        )}
                        options={optionValues?.state || []}
                        onChange={(value) => {
                          onChangeValue(labelMapper.state.name, value);
                        }}
                      />
                    )}
                  {formValue?.nationalSecurity ===
                    labelMapper.nationSecurities.defaultValue.no && (
                    <>
                      <Input
                        label={labelMapper.city.label}
                        name={labelMapper.city.name}
                        readOnly={readOnlyField(labelMapper.city.name)}
                        value={formValue.city}
                        onChange={(value) => {
                          onChangeValue(labelMapper.city.name, value);
                        }}
                      />
                      {formValue?.industryVertical ==
                        labelMapper.industryVertical.value && (
                        <Input
                          isrequired={true}
                          label={labelMapper.industryOther.label}
                          name={labelMapper.industryOther.name}
                          readOnly={readOnlyField(
                            labelMapper.industryOther.name
                          )}
                          error={errorValue.industryOther}
                          validationMessage={displayErrorMessage(
                            errorValue?.industryOther,
                            labelMapper?.industryOther?.validationMessage
                          )}
                          value={formValue?.industryOther}
                          onChange={(value) => {
                            onChangeValue(
                              labelMapper.industryOther.name,
                              value
                            );
                          }}
                        />
                      )}
                    </>
                  )}
                  {formValue?.nationalSecurity ==
                    labelMapper.nationSecurities.defaultValue.no && (
                    <Input
                      label={labelMapper.streetAddress.label}
                      name={labelMapper.streetAddress.name}
                      readOnly={readOnlyField(labelMapper.streetAddress.name)}
                      value={formValue?.streetAddress}
                      onChange={(value) => {
                        onChangeValue(labelMapper.streetAddress.name, value);
                      }}
                      isrequired={false}
                    />
                  )}
                </div>
                {formValue?.industryVertical ==
                  labelMapper.industryVertical.value && (
                  <Input
                    isrequired={true}
                    label={labelMapper.industryOther.label}
                    name={labelMapper.industryOther.name}
                    readOnly={readOnlyField(labelMapper.industryOther.name)}
                    error={errorValue.industryOther}
                    validationMessage={displayErrorMessage(
                      errorValue?.industryOther,
                      labelMapper?.industryOther?.validationMessage
                    )}
                    value={formValue?.industryOther}
                    onChange={(value) => {
                      onChangeValue(labelMapper.industryOther.name, value);
                    }}
                  />
                )}
                {isPostalCodeRequired(formValue, optionValues) ? (
                  <Input
                    label={labelMapper.postalCode.label}
                    name={labelMapper.postalCode.name}
                    readOnly={readOnlyField(labelMapper.postalCode.name)}
                    value={formValue?.postalCode}
                    isrequired={true}
                    onInput={(value) =>
                      postalCodeRegex((value?.target as any)?.value)
                    }
                    error={errorValue?.postalCode}
                    validationMessage={displayErrorMessage(
                      errorValue?.postalCode,
                      labelMapper.postalCode.validationMessage
                    )}
                    onChange={(value) => {
                      onChangeValue(labelMapper.postalCode.name, value);
                    }}
                  />
                ) : (
                  <></>
                )}
              </>
            ),
          },
          {
            title: labelMapper.accordian.project,
            id: labelMapper.accordian.project,
            children: (
              <>
                <Tile>
                  <h5>{labelMapper.awsCosell.listItemLabel}</h5>

                  <PDRadioGroup
                    options={[
                      {
                        label: labelMapper.projectDetails.cosellWithAws,
                        value: labelMapper.awsCosell.value.yes,
                        info: labelMapper.awsCosell.discription.yes,
                      },
                      {
                        label: labelMapper.projectDetails.doNotSupport,
                        value: labelMapper.awsCosell.value.no,
                        info: labelMapper.awsCosell.discription.no,
                      },
                    ]}
                    value={primaryNeedsAWS}
                    onChange={(value: string) => {
                      if (
                        ![StatusState.ACTION_REQUIRED].includes(
                          LifeCycle?.ReviewStatus as StatusState
                        )
                      ) {
                        setPrimaryNeedsAWS(value);
                        if (value === labelMapper.awsCosell.value.yes) {
                          onChangeValue(labelMapper.awsCosell.name, []);
                        } else {
                          onChangeValue(labelMapper.awsCosell.name, [value]);
                        }
                      }
                    }}
                    name={labelMapper.awsCosell.name}
                  ></PDRadioGroup>
                  {primaryNeedsAWS === labelMapper.awsCosell.value.yes && (
                    <>
                      <MultiSelectField
                        info={labelMapper.awsCosell.discription.select}
                        label={labelMapper.awsCosell.label}
                        name={labelMapper.awsCosell.name}
                        value={formValue?.awsCosell}
                        required={true}
                        // display="chip"
                        onChange={(value) =>
                          onChangeValue(labelMapper.awsCosell.name, value)
                        }
                        readOnly={readOnlyField(labelMapper.awsCosell.name)}
                        error={errorValue?.awsCosell}
                        validationMessage={displayErrorMessage(
                          errorValue?.awsCosell,
                          labelMapper.awsCosell.validationMessage
                        )}
                        options={
                          optionValues?.specificAWSCoSellNeeds?.filter(
                            (value) =>
                              value?.label != labelMapper.awsCosell.value.no
                          ) || []
                        }
                      />
                    </>
                  )}
                  <h5>{labelMapper.opportunityType.listItemLabel}</h5>
                  <PDRadioGroup
                    name={labelMapper.opportunityType.name}
                    value={formValue?.opportunityType}
                    readOnly={readOnlyField(labelMapper.opportunityType.name)}
                    options={[
                      {
                        label: labelMapper.opportunityType.value.netNewBusiness,
                        value: labelMapper.opportunityType.value.netNewBusiness,
                        info: labelMapper.opportunityType.discription
                          .netNewBusiness,
                      },
                      {
                        label: labelMapper.opportunityType.value.expansion,
                        value: labelMapper.opportunityType.value.expansion,
                        info: labelMapper.opportunityType.discription.expansion,
                      },
                      {
                        label: labelMapper.opportunityType.value.flatRenewal,
                        value: labelMapper.opportunityType.value.flatRenewal,
                        info: labelMapper.opportunityType.discription
                          .flatRenewal,
                      },
                    ]}
                    onChange={(value) => {
                      if (
                        ![StatusState.ACTION_REQUIRED]?.includes(
                          LifeCycle?.ReviewStatus as StatusState
                        )
                      ) {
                        onChangeValue(labelMapper.opportunityType.name, value);
                      }
                    }}
                  />
                  {(formValue?.opportunityType ==
                    labelMapper.opportunityType.value.flatRenewal ||
                    formValue?.opportunityType ==
                      labelMapper.opportunityType.value.expansion) && (
                    <Input
                      label={labelMapper.relatedOpportunityIndentifier.label}
                      name={labelMapper.relatedOpportunityIndentifier.name}
                      value={formValue?.relatedOpportunityIndentifier}
                      onChange={(value) => {
                        onChangeValue(
                          labelMapper.relatedOpportunityIndentifier.name,
                          value
                        );
                      }}
                      info={
                        labelMapper.relatedOpportunityIndentifier.description
                      }
                      tooltip={labelMapper.relatedOpportunityIndentifier.label}
                      error={errorValue?.relatedOpportunityIndentifier}
                      validationMessage={displayErrorMessage(
                        errorValue.relatedOpportunityIndentifier,
                        labelMapper.relatedOpportunityIndentifier
                          .validationMessage
                      )}
                      readOnly={readOnlyField(
                        labelMapper.relatedOpportunityIndentifier.name
                      )}
                    />
                  )}
                  <Input
                    label={labelMapper.partnerProjectTitle.label}
                    name={labelMapper.partnerProjectTitle.name}
                    tooltip={labelMapper.partnerProjectTitle.label}
                    readOnly={readOnlyField(
                      labelMapper.partnerProjectTitle.name
                    )}
                    isrequired={true}
                    value={formValue?.partnerProjectTitle}
                    onChange={(value) => {
                      onChangeValue(
                        labelMapper.partnerProjectTitle.name,
                        value
                      );
                    }}
                    error={errorValue?.partnerProjectTitle}
                    validationMessage={displayErrorMessage(
                      errorValue?.partnerProjectTitle,
                      labelMapper.partnerProjectTitle.validationMessage
                    )}
                  />
                  <MultiSelectField
                    label={labelMapper.salesActivities.label}
                    name={labelMapper.salesActivities.name}
                    readOnly={readOnlyField(labelMapper.salesActivities.name)}
                    value={formValue?.salesActivities}
                    required={
                      !formValue?.awsCosell?.includes(
                        labelMapper.awsCosell.value.no
                      )
                    }
                    error={errorValue?.salesActivities}
                    validationMessage={displayErrorMessage(
                      errorValue?.salesActivities,
                      labelMapper.salesActivities.validationMessage
                    )}
                    info={labelMapper.salesActivities.discription}
                    onChange={(value) => {
                      onChangeValue(labelMapper.salesActivities.name, value);
                    }}
                    options={optionValues?.salesActivites || []}
                  />
                  <TextAreaFieldBox
                    label={labelMapper.customerBusinessProblem.label}
                    info={labelMapper.customerBusinessProblem.discription}
                    name={labelMapper.customerBusinessProblem.name}
                    value={formValue?.customerBusinessProblem}
                    isrequired={true}
                    maxLength={2000}
                    rows={3}
                    error={errorValue?.customerBusinessProblem}
                    validationMessage={validationMessage(
                      labelMapper.customerBusinessProblem.name
                    )}
                    readOnly={readOnlyField(
                      labelMapper.customerBusinessProblem.name
                    )}
                    onChange={(value) => {
                      onChangeValue(
                        labelMapper.customerBusinessProblem.name,
                        value
                      );
                    }}
                  />
                  <MultiSelectField
                    info={labelMapper.solutionsOffered.description}
                    label={labelMapper.solutionsOffered.label}
                    name={labelMapper.solutionsOffered.name}
                    value={formValue?.solutionsOffered}
                    required={true}
                    onChange={(value) => {
                      onChangeValue(labelMapper.solutionsOffered.name, value);
                    }}
                    readOnly={readOnlyField(labelMapper.solutionsOffered.name)}
                    error={errorValue?.solutionsOffered}
                    validationMessage={validationMessage(
                      labelMapper.solutionsOffered.name
                    )}
                    options={optionValues?.solutions || []}
                  />
                  <MultiSelectField
                    label={labelMapper.awsProducts.label}
                    name={labelMapper.awsProducts.name}
                    info={labelMapper.awsProducts.description}
                    value={formValue?.awsProducts}
                    required={false}
                    readOnly={readOnlyField(labelMapper.awsProducts.name)}
                    onChange={(value) => {
                      onChangeValue(labelMapper.awsProducts.name, value);
                    }}
                    error={errorValue?.awsProducts}
                    validationMessage={validationMessage(
                      labelMapper.awsProducts.name
                    )}
                    options={optionValues?.AWSProducts || []}
                  />

                  <TextAreaFieldBox
                    label={labelMapper.nextStep.label}
                    name={labelMapper.nextStep.name}
                    tooltip={labelMapper.nextStep.label}
                    info={labelMapper.nextStep.description}
                    rows={4}
                    maxLength={labelMapper.nextStep.maxLength}
                    readOnly={readOnlyField(labelMapper.nextStep.name)}
                    validationMessage={validationMessage(
                      labelMapper.nextStep.name
                    )}
                    value={formValue?.nextStep}
                    error={errorValue?.nextStep}
                    onChange={(value) => {
                      onChangeValue(labelMapper.nextStep.name, value);
                    }}
                  />
                  <PDSelectField
                    label={labelMapper.useCase.label}
                    name={labelMapper.useCase.name}
                    tooltip={{ message: labelMapper.useCase.label }}
                    readOnly={readOnlyField(labelMapper.useCase.name)}
                    value={formValue?.useCase}
                    error={errorValue?.useCase}
                    validationMessage={displayErrorMessage(
                      errorValue?.useCase,
                      labelMapper.useCase.validationMessage
                    )}
                    required={true}
                    options={optionValues?.useCase || []}
                    onChange={(value) => {
                      onChangeValue(labelMapper.useCase.name, value);
                    }}
                  />
                  <MultiSelectField
                    label={labelMapper.deliveryModel.label}
                    info={labelMapper.deliveryModel.description}
                    value={formValue?.deliveryModel}
                    name={labelMapper.deliveryModel.name}
                    required={true}
                    error={errorValue?.deliveryModel}
                    validationMessage={displayErrorMessage(
                      errorValue?.deliveryModel,
                      labelMapper.deliveryModel.validationMessage
                    )}
                    readOnly={readOnlyField(labelMapper.deliveryModel.name)}
                    options={optionValues?.deliveryModel || []}
                    onChange={(value) => {
                      onChangeValue(labelMapper.deliveryModel.name, value);
                    }}
                  />
                  <Input
                    label={labelMapper.estimatedAWSRecurringRevenue.label}
                    name={labelMapper.estimatedAWSRecurringRevenue.name}
                    isrequired={true}
                    error={errorValue?.estimatedAWSRecurringRevenue}
                    validationMessage={displayErrorMessage(
                      errorValue?.estimatedAWSRecurringRevenue,
                      labelMapper.estimatedAWSRecurringRevenue.valid
                    )}
                    onInput={(value) => {
                      value
                        ? (labelMapper.estimatedAWSRecurringRevenue.valid =
                            labelMapper.estimatedAWSRecurringRevenue.validation)
                        : (labelMapper.estimatedAWSRecurringRevenue.valid =
                            labelMapper.estimatedAWSRecurringRevenue.validationMessage);
                      setErrorValue((prev) => ({
                        ...prev,
                        estimatedAWSRecurringRevenue: !validatePureNumber(
                          value,
                          true,
                          false
                        ),
                      }));
                    }}
                    readOnly={readOnlyField(
                      labelMapper.estimatedAWSRecurringRevenue.name
                    )}
                    value={formValue?.estimatedAWSRecurringRevenue}
                    onChange={(value) => {
                      onChangeValue(
                        labelMapper.estimatedAWSRecurringRevenue.name,
                        value
                      );
                    }}
                  />
                  <PDDatePicker
                    label={labelMapper.targetCloseDate.label}
                    name={labelMapper.targetCloseDate.name}
                    required={true}
                    error={errorValue?.targetCloseDate}
                    validationMessage={displayErrorMessage(
                      errorValue?.targetCloseDate,
                      labelMapper.targetCloseDate.validation
                    )}
                    minDate={
                      isPendingCosell(slug as string, reviewStatus)
                        ? minDateIput()
                        : undefined
                    }
                    readOnly={readOnlyField(labelMapper.targetCloseDate.name)}
                    value={formValue?.targetCloseDate}
                    onChange={(value) => {
                      onChangeValue(labelMapper.targetCloseDate.name, value);
                    }}
                  />
                  <MultiSelectField
                    label={labelMapper.apnProgram.label}
                    name={labelMapper.apnProgram.name}
                    value={formValue?.apnProgram}
                    required={false}
                    onChange={(value) => {
                      onChangeValue(labelMapper.apnProgram.name, value);
                    }}
                    readOnly={readOnlyField(labelMapper.apnProgram.name)}
                    options={optionValues?.apnPrograms || []}
                  />
                </Tile>
              </>
            ),
          },
          {
            title: labelMapper.accordian.marketing,
            id: labelMapper.accordian.marketing,
            children: (
              <Tile>
                <h5>{labelMapper.marketingSource.discription}</h5>
                <PDRadioGroup
                  name={labelMapper.marketingSource.name}
                  value={formValue?.marketingSource}
                  readOnly={readOnlyField(labelMapper.marketingSource.name)}
                  options={[
                    {
                      label: "Yes: Sourced from Marketing Activity",
                      value: labelMapper.marketingSource.value.yes,
                    },
                    {
                      label: "No: Sourced from Marketing Activity",
                      value: labelMapper.marketingSource.value.no,
                    },
                  ]}
                  onChange={(value) => {
                    if (
                      ![StatusState.ACTION_REQUIRED]?.includes(
                        LifeCycle?.ReviewStatus as StatusState
                      )
                    ) {
                      onChangeValue(labelMapper.marketingSource.name, value);
                    }
                  }}
                />
                {formValue?.marketingSource &&
                  formValue?.marketingSource !==
                    labelMapper.marketingSource.value.no && (
                    <>
                      <Input
                        value={formValue?.marketingCampaign}
                        label={labelMapper.marketingCampaign.label}
                        name={labelMapper.marketingCampaign.name}
                        tooltip={labelMapper.marketingCampaign.label}
                        readOnly={readOnlyField(
                          labelMapper.marketingCampaign.name
                        )}
                        onChange={(value) => {
                          onChangeValue(
                            labelMapper.marketingCampaign.name,
                            value
                          );
                        }}
                      />

                      <MultiSelectField
                        label={labelMapper.marketingUseCase.label}
                        value={formValue?.marketingUseCase}
                        name={labelMapper.marketingUseCase.name}
                        readOnly={readOnlyField(
                          labelMapper.marketingUseCase.name
                        )}
                        options={optionValues?.marketingUseCase || []}
                        onChange={(value) => {
                          onChangeValue(
                            labelMapper.marketingUseCase.name,
                            value
                          );
                        }}
                      />

                      <MultiSelectField
                        label={labelMapper.marketingActivityChannel.label}
                        value={formValue?.marketingActivityChannel}
                        name={labelMapper.marketingActivityChannel.name}
                        readOnly={readOnlyField(
                          labelMapper.marketingActivityChannel.name
                        )}
                        options={optionValues?.marketingActivityChannel || []}
                        onChange={(value) => {
                          onChangeValue(
                            labelMapper.marketingActivityChannel.name,
                            value
                          );
                        }}
                      />

                      <Tile>
                        <h5>{labelMapper.isMarketingfunds.label}</h5>
                        <PDRadioGroup
                          name={labelMapper.isMarketingfunds.name}
                          value={formValue?.isMarketingfunds}
                          options={[
                            {
                              label:
                                "Yes: Marketing development funds were used for this opportunity",
                              value: labelMapper.isMarketingfunds.value.yes,
                            },
                            {
                              label:
                                "No: Marketing development funds were not used for this opportunity.",
                              value: labelMapper.isMarketingfunds.value.no,
                            },
                          ]}
                          onChange={(value) => {
                            if (
                              ![StatusState.ACTION_REQUIRED]?.includes(
                                LifeCycle?.ReviewStatus as StatusState
                              )
                            ) {
                              onChangeValue(
                                labelMapper.isMarketingfunds.name,
                                value
                              );
                            }
                          }}
                        />
                      </Tile>
                    </>
                  )}
              </Tile>
            ),
          },
          {
            title: labelMapper.accordian.additional,
            id: labelMapper.accordian.additional,
            children: (
              <Tile>
                <Input
                  label={labelMapper.crmUniqueIdentifier.label}
                  name={labelMapper.crmUniqueIdentifier.name}
                  validationMessage={
                    labelMapper.crmUniqueIdentifier.validationMessage
                  }
                  tooltip={labelMapper.crmUniqueIdentifier.label}
                  isrequired={false}
                  readOnly={readOnlyField(labelMapper.crmUniqueIdentifier.name)}
                  value={formValue?.crmUniqueIdentifier}
                  onChange={(value) => {
                    onChangeValue(labelMapper.crmUniqueIdentifier.name, value);
                  }}
                />
                <PDSelectField
                  label={labelMapper.competitiveTracking.label}
                  name={labelMapper.competitiveTracking.name}
                  tooltip={{ message: labelMapper.competitiveTracking.label }}
                  readOnly={readOnlyField(labelMapper.competitiveTracking.name)}
                  required={false}
                  value={formValue?.competitiveTracking}
                  options={optionValues?.competitiveTracking || []}
                  onChange={(value) => {
                    onChangeValue(labelMapper.competitiveTracking.name, value);
                  }}
                />
                {formValue?.competitiveTracking ==
                  labelMapper.competitiveTracking.value && (
                  <Input
                    label={labelMapper.otherCompetitors.label}
                    name={labelMapper.otherCompetitors.name}
                    tooltip={labelMapper.otherCompetitors.label}
                    readOnly={readOnlyField(labelMapper.otherCompetitors.name)}
                    isrequired={true}
                    error={errorValue?.otherCompetitors}
                    validationMessage={displayErrorMessage(
                      errorValue?.otherCompetitors,
                      labelMapper.otherCompetitors.validationMessage
                    )}
                    value={formValue?.otherCompetitors}
                    onChange={(value) => {
                      onChangeValue(labelMapper.otherCompetitors.name, value);
                    }}
                  />
                )}
                <Input
                  label={labelMapper.awsAccountId.label}
                  name={labelMapper.awsAccountId.name}
                  info={labelMapper.awsAccountId.description}
                  validationMessage={
                    !errorValue?.awsAccountId
                      ? labelMapper.awsAccountId.validationMessage
                      : labelMapper.awsAccountId.validationErrorMessage
                  }
                  tooltip={labelMapper.awsAccountId.label}
                  isrequired={false}
                  readOnly={readOnlyField(labelMapper.awsAccountId.name)}
                  error={errorValue?.awsAccountId}
                  value={formValue?.awsAccountId}
                  onChange={(value) => {
                    onChangeValue(labelMapper.awsAccountId.name, value);
                  }}
                />
                <TextAreaFieldBox
                  label={labelMapper.additonalComments.label}
                  name={labelMapper.additonalComments.name}
                  rows={4}
                  maxLength={255}
                  info={labelMapper.additonalComments.description}
                  tooltip={labelMapper.additonalComments.label}
                  readOnly={readOnlyField(labelMapper.additonalComments.name)}
                  value={formValue?.additonalComments}
                  onChange={(value) => {
                    onChangeValue(labelMapper.additonalComments.name, value);
                  }}
                  validationMessage={validationMessage(
                    labelMapper.additonalComments.name
                  )}
                  error={errorValue?.additonalComments}
                />
              </Tile>
            ),
          },
          {
            title: labelMapper.accordian.contact,
            id: labelMapper.accordian.contact,
            children: <></>,
          },
        ]}
      ></AccordionComponent>
    </div>
  );
};
