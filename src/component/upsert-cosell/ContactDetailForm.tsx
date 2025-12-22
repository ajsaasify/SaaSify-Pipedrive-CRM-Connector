import { labelMapper } from "./helper";
import { Tile } from "../ui-components/detailview-components";
import Input from "../ui-components/PipedriveInput";
import PDText from "../ui-components/pipedrive-text";
import { PDTextSize } from "@template/enum/pipedrive.enum";

type AdditionalDetailsFormProps = {
  formValue: any;
  errorValue: any;
  readOnlyField: (name: string) => boolean;
  onChangeValue: (name: string, value: any) => void;
  displayErrorMessage: (error: any, message: string) => string;
};

const ContactDetailsForm = ({
  formValue,
  errorValue,
  readOnlyField,
  onChangeValue,
  displayErrorMessage,
}: AdditionalDetailsFormProps) => {
  return (
    <Tile>
      <PDText size={PDTextSize.SM}>{labelMapper.contactDescription}</PDText>
      <div className="column-2 mt-4">
        <Input
          label={labelMapper.contactFirstName.label}
          name={labelMapper.contactFirstName.name}
          tooltip={labelMapper.contactFirstName.label}
          readOnly={readOnlyField(labelMapper.contactFirstName.name)}
          value={formValue?.contactFirstName}
          onChange={(value) => {
            onChangeValue(labelMapper.contactFirstName.name, value);
          }}
          placeholder={labelMapper.contactFirstName.placeHolder}
        />
        <Input
          label={labelMapper.contactLastName.label}
          name={labelMapper.contactLastName.name}
          tooltip={labelMapper.contactLastName.label}
          readOnly={readOnlyField(labelMapper.contactLastName.name)}
          value={formValue?.contactLastName}
          onChange={(value) => {
            onChangeValue(labelMapper.contactLastName.name, value);
          }}
          placeholder={labelMapper.contactLastName.placeHolder}

        />
        <Input
          label={labelMapper.contactTitle.label}
          name={labelMapper.contactTitle.name}
          tooltip={labelMapper.contactTitle.label}
          readOnly={readOnlyField(labelMapper.contactTitle.name)}
          value={formValue?.contactTitle}
          onChange={(value) => {
            onChangeValue(labelMapper.contactTitle.name, value);
          }}
          placeholder={labelMapper.contactTitle.placeHolder}
        />
        <Input
          label={labelMapper.contactEmail.label}
          name={labelMapper.contactEmail.name}
          readOnly={readOnlyField(labelMapper.contactEmail.name)}
          tooltip={labelMapper.contactEmail.label}
          error={errorValue?.contactEmail}
          validationMessage={displayErrorMessage(
            errorValue?.contactEmail,
            labelMapper.contactEmail.value
          )}
          placeholder={labelMapper.contactEmail.placeHolder}
          value={formValue?.contactEmail}
          onChange={(value) => {
            onChangeValue(labelMapper.contactEmail.name, value);
          }}
        />
        <Input
          label={labelMapper.contactPhone.label}
          name={labelMapper.contactPhone.label}
          tooltip={labelMapper.contactPhone.label}
          placeholder={labelMapper.contactPhone.placeHolder}
          readOnly={readOnlyField(labelMapper.contactPhone.name)}
          value={formValue?.contactPhone}
          onChange={(value) => {
            onChangeValue(labelMapper.contactPhone.name, value);
          }}
        />
      </div>
    </Tile>
  );
};

export default ContactDetailsForm;