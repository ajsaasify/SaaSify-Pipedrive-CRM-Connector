import { validatePureNumber } from "@template/utils/globalHelper";
import { emailRegex } from "@template/utils/regex";
import { labelMapper } from "./helper";

export const isFieldTooLong = (value: string, max: number) =>
  !!(value && value.length >= max);

export const isFieldTooShort = (value: string, min: number) =>
  !!(value && value.length <= min);

export const fieldChecks = (
  formValue: any,
  readOnlyFields: string[],
  isNationalSecurities: boolean,
) => {
  const isReadOnly = (field: string): boolean => readOnlyFields.includes(field);
  const isInvalidField = (field: string): boolean => {
    const value = formValue[field];
    return !value || (Array.isArray(value) && value.length === 0);
  };

  return [
    {
      field: labelMapper.customerDuns.name,
      condition:
        formValue?.customerDuns &&
        !validatePureNumber(formValue?.customerDuns) &&
        !isReadOnly(labelMapper.customerDuns.name),
    },
    {
      field: labelMapper.awsAccountId.name,
      condition:
        formValue?.awsAccountId &&
        formValue?.awsAccountId.length !== 12 &&
        !isReadOnly(labelMapper.awsAccountId.name),
    },
    {
      field: labelMapper.nextStep.name,
      condition:
        formValue?.nextStep?.length > 255 &&
        !isReadOnly(labelMapper.nextStep.name),
    },
    {
      field: labelMapper.customerBusinessProblem.name,
      condition:
        formValue?.customerBusinessProblem?.length < 20 ||
        (formValue?.customerBusinessProblem?.length > 2000 &&
          !isReadOnly(labelMapper.customerBusinessProblem.name)),
    },
    {
      field: labelMapper.additonalComments.name,
      condition:
        formValue?.additonalComments?.length > 255 &&
        !isReadOnly(labelMapper.additonalComments.name),
    },
    {
      field: labelMapper.solutionsOffered.name,
      condition:
        Array.isArray(formValue?.solutionsOffered) &&
        formValue?.solutionsOffered.length > 10 &&
        !isReadOnly(labelMapper.solutionsOffered.name),
    },
    {
      field: labelMapper.awsProducts.name,
      condition:
        Array.isArray(formValue?.awsProducts) &&
        formValue?.awsProducts.length > 20 &&
        !isReadOnly(labelMapper.awsProducts.name),
    },
    {
      field: labelMapper.otherCompetitors.name,
      condition:
        formValue?.competitiveTracking ===
          labelMapper.competitiveTracking.value &&
        isInvalidField(labelMapper.otherCompetitors.name) &&
        !isReadOnly(labelMapper.otherCompetitors.name),
    },
    {
      field: labelMapper.contactEmail.name,
      condition:
        formValue?.contactEmail &&
        !emailRegex.test(formValue.contactEmail) &&
        !isReadOnly(labelMapper.contactEmail.name),
    },
    {
      field: labelMapper.primaryContactEmail.name,
      condition:
        formValue?.primaryContactEmail &&
        !emailRegex.test(formValue.primaryContactEmail) &&
        !isReadOnly(labelMapper.primaryContactEmail.name),
    },
    {
      field: labelMapper.state.name,
      condition:
        !isNationalSecurities &&
        formValue?.country === labelMapper.state.value &&
        !formValue.state &&
        !isReadOnly(labelMapper.state.name),
    },
    {
      field: labelMapper.industryOther.name,
      condition:
        formValue?.industryVertical === labelMapper?.industryVertical?.value &&
        !formValue?.industryOther &&
        !isReadOnly(labelMapper.industryOther.name),
    },
  ];
};
