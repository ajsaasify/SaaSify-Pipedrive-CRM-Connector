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
import PDText from "../ui-components/pipedrive-text";
import {
  ModelType,
  PDButtonSize,
  PDButtonType,
  PDTextSize,
} from "@template/enum/pipedrive.enum";
import PDButton from "../ui-components/pipedriveButton";
import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import { useTranslation } from "react-i18next";
import CustomerDetailsForm from "./CustomerDetailsForm";
import ProjectOpportunitySection from "./ProjectOpportunitySection";
import { MarketingSourceSection } from "./MarketingOpportunityForm";
import AdditionalDetailsForm from "./AdditionalDetailsForm";
import ContactDetailsForm from "./ContactDetailForm";
import PartnerSalesContactForm from "./PartnerSalesContactForm";

export const CreateCosell: React.FC<{
  actions?: any;
  modalTitle?: string;
  slug?: CosellAction;
  onList?: RC3CosellResponse;
}> = ({ actions, modalTitle, slug, onList }) => {
  const [sdk, setSdk] = useState<AppExtensionsSDK | null>(null);
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
  const { t } = useTranslation();
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
    const sdk = await initSdk(1000, 500);
    setSdk(sdk);
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
              <Tile>
                <CustomerDetailsForm
                  formValue={formValue}
                  errorValue={errorValue}
                  labelMapper={labelMapper}
                  optionValues={optionValues}
                  readOnlyField={readOnlyField}
                  onChangeValue={onChangeValue}
                  setFormValue={setFormValue}
                  setErrorValue={setErrorValue}
                  validatePureNumber={validatePureNumber}
                  validationMessage={validationMessage}
                  displayErrorMessage={displayErrorMessage}
                  isPostalCodeRequired={isPostalCodeRequired}
                  postalCodeRegex={postalCodeRegex}
                />
              </Tile>
            ),
          },
          {
            title: labelMapper.accordian.project,
            id: labelMapper.accordian.project,
            children: (
              <ProjectOpportunitySection
                labelMapper={labelMapper}
                optionValues={optionValues}
                formValue={formValue}
                errorValue={errorValue}
                primaryNeedsAWS={primaryNeedsAWS}
                setPrimaryNeedsAWS={setPrimaryNeedsAWS}
                onChangeValue={onChangeValue}
                readOnlyField={readOnlyField}
                displayErrorMessage={displayErrorMessage}
                validationMessage={validationMessage}
                validatePureNumber={validatePureNumber}
                setErrorValue={setErrorValue}
                LifeCycle={LifeCycle}
                StatusState={StatusState}
                isPendingCosell={isPendingCosell}
                slug={slug}
                reviewStatus={reviewStatus}
                minDateIput={minDateIput}
              />
            ),
          },
          {
            title: labelMapper.accordian.marketing,
            id: labelMapper.accordian.marketing,
            children: (
              <MarketingSourceSection
                labelMapper={labelMapper}
                formValue={formValue}
                optionValues={optionValues}
                LifeCycle={LifeCycle}
                readOnlyField={readOnlyField}
                onChangeValue={onChangeValue}
              />
            ),
          },
          {
            title: labelMapper.accordian.additional,
            id: labelMapper.accordian.additional,
            children: (
              <AdditionalDetailsForm
                displayErrorMessage={displayErrorMessage}
                errorValue={errorValue}
                formValue={formValue}
                labelMapper={labelMapper}
                onChangeValue={onChangeValue}
                optionValues={optionValues}
                readOnlyField={readOnlyField}
                validationMessage={validationMessage}
              />
            ),
          },
          {
            title: labelMapper.accordian.contact,
            id: labelMapper.accordian.contact,
            children: (
              <ContactDetailsForm
                displayErrorMessage={displayErrorMessage}
                errorValue={errorValue}
                formValue={formValue}
                labelMapper={labelMapper}
                onChangeValue={onChangeValue}
                readOnlyField={readOnlyField}
              />
            ),
          },
          {
            title: labelMapper.accordian.partnerSalesContact,
            id: labelMapper.accordian.partnerSalesContact,
            children: (
              <PartnerSalesContactForm
                displayErrorMessage={displayErrorMessage}
                errorValue={errorValue}
                formValue={formValue}
                labelMapper={labelMapper}
                onChangeValue={onChangeValue}
                readOnlyField={readOnlyField}
              />
            ),
          },
        ]}
      ></AccordionComponent>
      <Tile>
        <div className="flex justify-end gap-2">
          <PDButton
            size={PDButtonSize.SMALL}
            type={PDButtonType.SECONDARY}
            label={t("buttonLabel.cancel")}
            onClick={() => {}}
          ></PDButton>
          <PDButton
            size={PDButtonSize.SMALL}
            type={PDButtonType.PRIMARY}
            label={t("buttonLabel.submit")}
            onClick={() => {
              // setCurrentPage({ page: ModelType.COSELL_CREATE });
            }}
          ></PDButton>
        </div>
      </Tile>
    </div>
  );
};
