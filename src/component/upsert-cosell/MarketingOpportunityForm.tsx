import { StatusState } from "@template/enum/status.enum";
import { Tile } from "../ui-components/detailview-components";
import { PDRadioGroup } from "../ui-components/PipedriveRadiobutton";
import Input from "../ui-components/PipedriveInput";
import { MultiSelectField } from "../ui-components/PipedriveMultiselect";
import { labelMapper } from "./helper";
import { t } from "i18next";

type MarketingSourceSectionProps = {
  formValue: any;
  optionValues: any;
  LifeCycle?: any;
  readOnlyField: (name: string) => boolean;
  onChangeValue: (name: string, value: any) => void;
};

export const MarketingSourceSection = ({
  formValue,
  optionValues,
  LifeCycle,
  readOnlyField,
  onChangeValue,
}: MarketingSourceSectionProps) => {
  return (
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
              LifeCycle?.ReviewStatus as StatusState,
            )
          ) {
            onChangeValue(labelMapper.marketingSource.name, value);
          }
        }}
      />
      {formValue?.marketingSource &&
        formValue?.marketingSource !== labelMapper.marketingSource.value.no && (
          <>
            <Input
              value={formValue?.marketingCampaign}
              label={labelMapper.marketingCampaign.label}
              name={labelMapper.marketingCampaign.name}
              tooltip={labelMapper.marketingCampaign.label}
              placeholder={labelMapper.marketingCampaign.placeHolder}
              readOnly={readOnlyField(labelMapper.marketingCampaign.name)}
              onChange={(value) => {
                onChangeValue(labelMapper.marketingCampaign.name, value);
              }}
            />

            <MultiSelectField
              label={labelMapper.marketingUseCase.label}
              placeholder={labelMapper.marketingUseCase.placeHolder}
              value={formValue?.marketingUseCase}
              name={labelMapper.marketingUseCase.name}
              readOnly={readOnlyField(labelMapper.marketingUseCase.name)}
              options={optionValues?.marketingUseCase || []}
              onChange={(value) => {
                onChangeValue(labelMapper.marketingUseCase.name, value);
              }}
            />

            <MultiSelectField
              label={labelMapper.marketingActivityChannel.label}
              placeholder={labelMapper.marketingActivityChannel.placeHolder}
              value={formValue?.marketingActivityChannel}
              name={labelMapper.marketingActivityChannel.name}
              readOnly={readOnlyField(
                labelMapper.marketingActivityChannel.name,
              )}
              options={optionValues?.marketingActivityChannel || []}
              onChange={(value) => {
                onChangeValue(labelMapper.marketingActivityChannel.name, value);
              }}
            />

            <Tile>
              <h5>{labelMapper.isMarketingfunds.label}</h5>
              <PDRadioGroup
                name={labelMapper.isMarketingfunds.name}
                value={formValue?.isMarketingfunds}
                options={[
                  {
                    label: t(
                      "awsCosell.inputLabelMapper.isMarketingfunds.description.yes",
                    ),
                    value: labelMapper.isMarketingfunds.value.yes,
                  },
                  {
                    label: t(
                      "awsCosell.inputLabelMapper.isMarketingfunds.description.no",
                    ),
                    value: labelMapper.isMarketingfunds.value.no,
                  },
                ]}
                onChange={(value) => {
                  if (
                    ![StatusState.ACTION_REQUIRED]?.includes(
                      LifeCycle?.ReviewStatus as StatusState,
                    )
                  ) {
                    onChangeValue(labelMapper.isMarketingfunds.name, value);
                  }
                }}
              />
            </Tile>
          </>
        )}
    </Tile>
  );
};
