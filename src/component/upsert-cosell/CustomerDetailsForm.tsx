import { OptionTypes } from "@template/types/dropdown.options";
import PDSelectField from "../ui-components/PipedriveDropdown";
import Input from "../ui-components/PipedriveInput";
import { labelMapper } from "./helper";

type CustomerDetailsFormProps = {
  formValue: any;
  errorValue: any;
  optionValues: OptionTypes;
  readOnlyField: (name: string) => boolean;
  onChangeValue: (name: string, value: any) => void;
  setFormValue: React.Dispatch<React.SetStateAction<any>>;
  setErrorValue: React.Dispatch<React.SetStateAction<any>>;
  validatePureNumber: (value: any) => boolean;
  validationMessage: (name: string) => string;
  displayErrorMessage: (error: any, message: string) => string;
  isPostalCodeRequired: (formValue: any, optionValues: any) => boolean;
  postalCodeRegex: (value: string) => void;
};
const CustomerDetailsForm = ({
  formValue,
  errorValue,
  optionValues,
  readOnlyField,
  onChangeValue,
  setFormValue,
  setErrorValue,
  validatePureNumber,
  validationMessage,
  displayErrorMessage,
  isPostalCodeRequired,
  postalCodeRegex,
}: CustomerDetailsFormProps) => {
  return (
    <>
      <Input
        onInput={(value) => {
          setErrorValue((prev: any) => ({
            ...prev,
            customerDuns: !validatePureNumber((value.target as any).value),
          }));
        }}
        onChange={(value) => {
          onChangeValue(labelMapper.customerDuns.name, value);
        }}
        value={formValue?.customerDuns}
        placeholder={labelMapper.customerDuns.placeHolder}
        error={errorValue?.customerDuns}
        validationMessage={validationMessage(labelMapper.customerDuns.name)}
        tooltip={labelMapper.customerDuns.toopTip}
        label={labelMapper.customerDuns.label}
        name={labelMapper.customerDuns.name}
        info={labelMapper.customerDuns.discription}
      />
      <div className="column-2">
        <Input
          label={labelMapper.customerCompanyName.label}
          name={labelMapper.customerCompanyName.name}
          tooltip={labelMapper.customerCompanyName.label}
          readOnly={readOnlyField(labelMapper.customerCompanyName.name)}
          isrequired={true}
          value={formValue?.customerCompanyName}
          error={errorValue?.customerCompanyName}
          validationMessage={displayErrorMessage(
            errorValue?.customerCompanyName,
            labelMapper.customerCompanyName.validationMessage
          )}
          placeholder={labelMapper.customerCompanyName.placeHolder}
          onChange={(value) => {
            onChangeValue(labelMapper.customerCompanyName.name, value);
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
          placeholder={labelMapper.country.placeHolder}
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
          placeholder={labelMapper.industryVertical.placeHolder}
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
              setFormValue((prev: any) => ({
                ...prev,
                nationalSecurity: labelMapper.nationSecurities.defaultValue.no,
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
              placeholder={labelMapper.state.placeholder}
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
            placeholder={labelMapper.city.placeHolder}
              label={labelMapper.city.label}
              name={labelMapper.city.name}
              readOnly={readOnlyField(labelMapper.city.name)}
              value={formValue.city}
              onChange={(value) => {
                onChangeValue(labelMapper.city.name, value);
              }}
            />
          </>
        )}
        {formValue?.nationalSecurity ==
          labelMapper.nationSecurities.defaultValue.no && (
          <Input
            label={labelMapper.streetAddress.label}
            name={labelMapper.streetAddress.name}
            readOnly={readOnlyField(labelMapper.streetAddress.name)}
            value={formValue?.streetAddress}
            placeholder={labelMapper.streetAddress.placeHolder}
            onChange={(value) => {
              onChangeValue(labelMapper.streetAddress.name, value);
            }}
            isrequired={false}
          />
        )}
      </div>
      {formValue?.industryVertical == labelMapper.industryVertical.value && (
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
          placeholder={labelMapper.postalCode.placeHolder}
          onInput={(value) => postalCodeRegex((value?.target as any)?.value)}
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
  );
};
export default CustomerDetailsForm;
