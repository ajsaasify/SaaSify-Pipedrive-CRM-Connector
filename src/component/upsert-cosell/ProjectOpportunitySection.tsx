import type { OptionTypes } from "@template/types/dropdown.options";
import { Tile } from "../ui-components/detailview-components";
import PDDatePicker from "../ui-components/PipedriveCalendar";
import Input from "../ui-components/PipedriveInput";
import { MultiSelectField } from "../ui-components/PipedriveMultiselect";
import { PDRadioGroup } from "../ui-components/PipedriveRadiobutton";
import { labelMapper } from "./helper";
import PDSelectField from "../ui-components/PipedriveDropdown";
import type { StatusState } from "@template/enum/status.enum";
import TextAreaFieldBox from "../ui-components/PipedriveTextarea";

type ProjectOpportunitySectionProps = {
  formValue: any;
  errorValue: any;
  optionValues: OptionTypes;
  primaryNeedsAWS: string | undefined;
  setPrimaryNeedsAWS: (value: string) => void;
  onChangeValue: (name: string, value: any) => void;
  readOnlyField: (name: string) => boolean;
  displayErrorMessage: (error: any, message: string) => string;
  validationMessage: (name: string) => string;
  validatePureNumber: (...args: any[]) => boolean;
  setErrorValue: React.Dispatch<React.SetStateAction<any>>;
  LifeCycle: any;
  StatusState: any;
  isPendingCosell: (...args: any[]) => boolean;
  slug: string | undefined;
  reviewStatus: any;
  minDateIput: () => Date;
};

const ProjectOpportunitySection = ({
  optionValues,
  formValue,
  errorValue,
  primaryNeedsAWS,
  setPrimaryNeedsAWS,
  onChangeValue,
  readOnlyField,
  displayErrorMessage,
  validationMessage,
  validatePureNumber,
  setErrorValue,
  LifeCycle,
  StatusState,
  isPendingCosell,
  slug,
  reviewStatus,
  minDateIput,
}: ProjectOpportunitySectionProps) => {
  return (
    <Tile>
      <h5>{labelMapper.awsCosell.listItemLabel}</h5>

      <PDRadioGroup
        options={[
          {
            label: labelMapper.projectDetails.cosellWithAws,
            value: labelMapper.awsCosell.value.yes,
            info: labelMapper.awsCosell.description.yes,
          },
          {
            label: labelMapper.projectDetails.doNotSupport,
            value: labelMapper.awsCosell.value.no,
            info: labelMapper.awsCosell.description.no,
          },
        ]}
        value={primaryNeedsAWS}
        required={true}
        onChange={(value: string) => {
          if (
            ![StatusState.ACTION_REQUIRED].includes(LifeCycle?.ReviewStatus)
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
        <MultiSelectField
          info={labelMapper.awsCosell.description.select}
          label={labelMapper.awsCosell.label}
          name={labelMapper.awsCosell.name}
          value={formValue?.awsCosell}
          required={true}
          placeholder={labelMapper.awsCosell.placeholder}
          // display="chip"
          onChange={(value) => onChangeValue(labelMapper.awsCosell.name, value)}
          readOnly={readOnlyField(labelMapper.awsCosell.name)}
          error={errorValue?.awsCosell}
          validationMessage={displayErrorMessage(
            errorValue?.awsCosell,
            labelMapper.awsCosell.validationMessage,
          )}
          options={
            optionValues?.specificAWSCoSellNeeds?.filter(
              (value) => value?.label !== labelMapper.awsCosell.value.no,
            ) || []
          }
        />
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
            info: labelMapper.opportunityType.description.netNewBusiness,
          },
          {
            label: labelMapper.opportunityType.value.expansion,
            value: labelMapper.opportunityType.value.expansion,
            info: labelMapper.opportunityType.description.expansion,
          },
          {
            label: labelMapper.opportunityType.value.flatRenewal,
            value: labelMapper.opportunityType.value.flatRenewal,
            info: labelMapper.opportunityType.description.flatRenewal,
          },
        ]}
        onChange={(value) => {
          if (
            ![StatusState.ACTION_REQUIRED]?.includes(
              LifeCycle?.ReviewStatus as StatusState,
            )
          ) {
            onChangeValue(labelMapper.opportunityType.name, value);
          }
        }}
      />
      {(formValue?.opportunityType ===
        labelMapper.opportunityType.value.flatRenewal ||
        formValue?.opportunityType ===
          labelMapper.opportunityType.value.expansion) && (
        <Input
          label={labelMapper.relatedOpportunityIndentifier.label}
          name={labelMapper.relatedOpportunityIndentifier.name}
          value={formValue?.relatedOpportunityIndentifier}
          placeholder={labelMapper.relatedOpportunityIndentifier.placeHolder}
          onChange={(value) => {
            onChangeValue(
              labelMapper.relatedOpportunityIndentifier.name,
              value,
            );
          }}
          info={labelMapper.relatedOpportunityIndentifier.description}
          tooltip={labelMapper.relatedOpportunityIndentifier.label}
          error={errorValue?.relatedOpportunityIndentifier}
          validationMessage={displayErrorMessage(
            errorValue.relatedOpportunityIndentifier,
            labelMapper.relatedOpportunityIndentifier.validationMessage,
          )}
          readOnly={readOnlyField(
            labelMapper.relatedOpportunityIndentifier.name,
          )}
        />
      )}
      <Input
        label={labelMapper.partnerProjectTitle.label}
        name={labelMapper.partnerProjectTitle.name}
        tooltip={labelMapper.partnerProjectTitle.label}
        readOnly={readOnlyField(labelMapper.partnerProjectTitle.name)}
        isrequired={true}
        value={formValue?.partnerProjectTitle}
        onChange={(value) => {
          onChangeValue(labelMapper.partnerProjectTitle.name, value);
        }}
        placeholder={labelMapper.partnerProjectTitle.placeHolder}
        error={errorValue?.partnerProjectTitle}
        validationMessage={displayErrorMessage(
          errorValue?.partnerProjectTitle,
          labelMapper.partnerProjectTitle.validationMessage,
        )}
      />
      <MultiSelectField
        label={labelMapper.salesActivities.label}
        name={labelMapper.salesActivities.name}
        readOnly={readOnlyField(labelMapper.salesActivities.name)}
        value={formValue?.salesActivities}
        required={
          !formValue?.awsCosell?.includes(labelMapper.awsCosell.value.no)
        }
        placeholder={labelMapper.salesActivities.placeHolder}
        error={errorValue?.salesActivities}
        validationMessage={displayErrorMessage(
          errorValue?.salesActivities,
          labelMapper.salesActivities.validationMessage,
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
        placeholder={labelMapper.customerBusinessProblem.placeHolder}
        rows={3}
        error={errorValue?.customerBusinessProblem}
        validationMessage={validationMessage(
          labelMapper.customerBusinessProblem.name,
        )}
        readOnly={readOnlyField(labelMapper.customerBusinessProblem.name)}
        onChange={(value) => {
          onChangeValue(labelMapper.customerBusinessProblem.name, value);
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
        placeholder={labelMapper.solutionsOffered.placeHolder}
        readOnly={readOnlyField(labelMapper.solutionsOffered.name)}
        error={errorValue?.solutionsOffered}
        validationMessage={validationMessage(labelMapper.solutionsOffered.name)}
        options={optionValues?.solutions || []}
      />
      <MultiSelectField
        label={labelMapper.awsProducts.label}
        name={labelMapper.awsProducts.name}
        info={labelMapper.awsProducts.description}
        value={formValue?.awsProducts}
        required={false}
        placeholder={labelMapper.awsProducts.placeHolder}
        readOnly={readOnlyField(labelMapper.awsProducts.name)}
        onChange={(value) => {
          onChangeValue(labelMapper.awsProducts.name, value);
        }}
        error={errorValue?.awsProducts}
        validationMessage={validationMessage(labelMapper.awsProducts.name)}
        options={optionValues?.AWSProducts || []}
      />

      <TextAreaFieldBox
        label={labelMapper.nextStep.label}
        name={labelMapper.nextStep.name}
        tooltip={labelMapper.nextStep.label}
        info={labelMapper.nextStep.description}
        placeholder={labelMapper.nextStep.placeHolder}
        rows={4}
        maxLength={labelMapper.nextStep.maxLength}
        readOnly={readOnlyField(labelMapper.nextStep.name)}
        validationMessage={validationMessage(labelMapper.nextStep.name)}
        value={formValue?.nextStep}
        error={errorValue?.nextStep}
        onChange={(value: any) => {
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
          labelMapper.useCase.validationMessage,
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
          labelMapper.deliveryModel.validationMessage,
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
        placeholder={labelMapper.estimatedAWSRecurringRevenue.placeHolder}
        error={errorValue?.estimatedAWSRecurringRevenue}
        validationMessage={displayErrorMessage(
          errorValue?.estimatedAWSRecurringRevenue,
          labelMapper.estimatedAWSRecurringRevenue.valid,
        )}
        onInput={(value) => {
          if (value) {
            labelMapper.estimatedAWSRecurringRevenue.valid =
              labelMapper.estimatedAWSRecurringRevenue.validation;
          } else {
            labelMapper.estimatedAWSRecurringRevenue.valid =
              labelMapper.estimatedAWSRecurringRevenue.validationMessage;
          }
          setErrorValue((prev: any) => ({
            ...prev,
            estimatedAWSRecurringRevenue: !validatePureNumber(
              value,
              true,
              false,
            ),
          }));
        }}
        readOnly={readOnlyField(labelMapper.estimatedAWSRecurringRevenue.name)}
        value={formValue?.estimatedAWSRecurringRevenue}
        onChange={(value) => {
          onChangeValue(labelMapper.estimatedAWSRecurringRevenue.name, value);
        }}
      />
      <PDDatePicker
        label={labelMapper.targetCloseDate.label}
        name={labelMapper.targetCloseDate.name}
        required={true}
        error={errorValue?.targetCloseDate}
        validationMessage={displayErrorMessage(
          errorValue?.targetCloseDate,
          labelMapper.targetCloseDate.validation,
        )}
        placeholder={labelMapper.targetCloseDate.placeHolder}
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
        placeholder={labelMapper.apnProgram.placeholder}
        required={false}
        onChange={(value) => {
          onChangeValue(labelMapper.apnProgram.name, value);
        }}
        readOnly={readOnlyField(labelMapper.apnProgram.name)}
        options={optionValues?.apnPrograms || []}
      />
    </Tile>
  );
};

export default ProjectOpportunitySection;
