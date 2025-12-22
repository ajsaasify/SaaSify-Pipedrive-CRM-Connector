import { OptionTypes } from "@template/types/dropdown.options";
import { labelMapper } from "./helper";
import { Tile } from "../ui-components/detailview-components";
import Input from "../ui-components/PipedriveInput";
import PDSelectField from "../ui-components/PipedriveDropdown";
import TextAreaFieldBox from "../ui-components/PipedriveTextarea";

type AdditionalDetailsFormProps = {
  formValue: any;
  errorValue: any;
  optionValues: OptionTypes;
  readOnlyField: (name: string) => boolean;
  onChangeValue: (name: string, value: any) => void;
  validationMessage: (name: string) => string;
  displayErrorMessage: (error: any, message: string) => string;
};

const AdditionalDetailsForm = ({
  formValue,
  errorValue,
  optionValues,
  readOnlyField,
  onChangeValue,
  validationMessage,
  displayErrorMessage,
}: AdditionalDetailsFormProps) => {
  return (<Tile>
    <Input
      label={labelMapper.crmUniqueIdentifier.label}
      name={labelMapper.crmUniqueIdentifier.name}
      validationMessage={labelMapper.crmUniqueIdentifier.validationMessage}
      tooltip={labelMapper.crmUniqueIdentifier.label}
      isrequired={false}
      placeholder={labelMapper.crmUniqueIdentifier.placeHolder}
      readOnly={readOnlyField(labelMapper.crmUniqueIdentifier.name)}
      value={formValue?.crmUniqueIdentifier}
      onChange={(value) => {
        onChangeValue(labelMapper.crmUniqueIdentifier.name, value);
      }}
    />
    <PDSelectField
      label={labelMapper.competitiveTracking.label}
      placeholder={labelMapper.competitiveTracking.placeHolder}
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
        placeholder={labelMapper.otherCompetitors.placeHolder}
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
      placeholder={labelMapper.awsAccountId.placeHolder}
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
      placeholder={labelMapper.additonalComments.placeHolder}
      maxLength={255}
      info={labelMapper.additonalComments.description}
      tooltip={labelMapper.additonalComments.label}
      readOnly={readOnlyField(labelMapper.additonalComments.name)}
      value={formValue?.additonalComments}
      onChange={(value) => {
        onChangeValue(labelMapper.additonalComments.name, value);
      }}
      validationMessage={validationMessage(labelMapper.additonalComments.name)}
      error={errorValue?.additonalComments}
    />
  </Tile>);
};

export default AdditionalDetailsForm;
