import { labelMapper } from "./helper";
import { Tile } from "../ui-components/detailview-components";
import Input from "../ui-components/PipedriveInput";
import PDText from "../ui-components/pipedrive-text";
import { PDTextSize } from "@template/enum/pipedrive.enum";

type PartnerSalesContactFormProps = {
  formValue: any;
  errorValue: any;
  readOnlyField: (name: string) => boolean;
  onChangeValue: (name: string, value: any) => void;
  displayErrorMessage: (error: any, message: string) => string;
};

const PartnerSalesContactForm = ({
  formValue,
  errorValue,
  readOnlyField,
  onChangeValue,
  displayErrorMessage,
}: PartnerSalesContactFormProps) => {
 return ( <Tile>
    <PDText size={PDTextSize.SM}>{labelMapper.partnerDescription}</PDText>
    <div className="column-2 mt-4">
      <Input
        label={labelMapper.primaryContactFirstName.label}
        placeholder={labelMapper.primaryContactFirstName.placeHolder}
        name={labelMapper.primaryContactFirstName.name}
        tooltip={labelMapper.primaryContactFirstName.label}
        readOnly={readOnlyField(labelMapper.primaryContactFirstName.name)}
        value={formValue?.primaryContactFirstName}
        onChange={(value) => {
          onChangeValue(labelMapper.primaryContactFirstName.name, value);
        }}
      />
      <Input
        label={labelMapper.primaryContactLastName.label}
        placeholder={labelMapper.primaryContactLastName.placeHolder}
        name={labelMapper.primaryContactLastName.name}
        tooltip={labelMapper.primaryContactLastName.label}
        readOnly={readOnlyField(labelMapper.primaryContactLastName.name)}
        value={formValue?.primaryContactLastName}
        onChange={(value) => {
          onChangeValue(labelMapper.primaryContactLastName.name, value);
        }}
      />
      <Input
        label={labelMapper.primaryContactEmail.label}
        placeholder={labelMapper.primaryContactEmail.placeHolder}
        name={labelMapper.primaryContactEmail.name}
        readOnly={readOnlyField(labelMapper.primaryContactEmail.name)}
        tooltip={labelMapper.primaryContactEmail.label}
        error={errorValue?.primaryContactEmail}
        validationMessage={displayErrorMessage(
          errorValue?.primaryContactEmail,
          labelMapper.contactEmail.value
        )}
        value={formValue?.primaryContactEmail}
        onChange={(value) => {
          onChangeValue(labelMapper.primaryContactEmail.name, value);
        }}
      />
    </div>
  </Tile>);
};

export default PartnerSalesContactForm;
