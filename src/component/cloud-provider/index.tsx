import { requestPayload } from "@template/common/listCosell";
import { AlertNotification } from "@template/common/messageAlert";
import { useCoSellContext } from "@template/context/Cosell.context";
import { ToastService } from "@template/services/toast.service";
import { optionField } from "@template/types/dropdown.options";
import { useEffect, useState } from "react";
import { labelMapper } from "./helper";
import { createCosell, fetchCreateProps } from "./apiHandler";
import { Tile } from "../ui-components/detailview-components";
import initSdk from "@template/helpers/modelInit";
import { PDRadioGroup } from "../ui-components/PipedriveRadiobutton";
import PDButton from "../ui-components/pipedriveButton";
import { useTranslation } from "react-i18next";
import {
  ModelType,
  PDButtonSize,
  PDButtonType,
} from "@template/enum/pipedrive.enum";
import PDSelectField from "../ui-components/PipedriveDropdown";
import { displayErrorMessage } from "@template/utils/globalHelper";
import { DropdownOptions } from "@template/enum/options.enum";
import { usePipedrive } from "@template/context/PipedriveContext";
import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import { FormButton } from "@template/enum/button.enum";
import pipeDriveParams, {
  pipedriveParams,
} from "@template/utils/pipedrive-params";

const CloudProvider = () => {
  const [isFetching, setIsFetching] = useState(false);
  const {
    setGenerateCosell,
    mappingCrmList,
    setData,
    opportunityList,
    dropdownShow,
    optionValues,
    setOptionValues,
    setMappingCrmList,
  } = useCoSellContext();
  const [sellerCode, setSellerCode] = useState<optionField[]>([]);
  const [isError, setIsError] = useState<any>(false);
  const [loader, setLoader] = useState(true);
  const [formValue, setFormValue] = useState<Record<string, any>>({});
  const [errorState, setErrorState] = useState("");
  const [errorForm, setErrorForm] = useState<Record<string, boolean>>({});
  const params = pipeDriveParams();
  const triggerAlert = ({ type, message, title }: AlertNotification) => {
    (ToastService as any)?.[type]?.(title, message);
  };
  const { setCurrentPage } = useCoSellContext();
  const [sdk, setSdk] = useState<any>();

  const { t } = useTranslation();
  function onChangeValue(name: string, value: any) {
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorForm((prev) => ({ ...prev, [name]: false }));
  }
  const renderDefaultCosell = async () => {
    setErrorState("");
    setErrorForm({});
    let cloud = requestPayload.cloud.aws;
    if (dropdownShow?.includes(requestPayload.defaultView)) {
      cloud = requestPayload.cloud.aws;
    } else {
      cloud = dropdownShow;
    }
    onChangeValue(labelMapper.provider.name, cloud);
  };

  const init = async () => {
    const sdk = await initSdk(500, 300);
    setSdk(sdk);
    renderDefaultCosell();
    await fetchCreateProps(
      optionValues,
      mappingCrmList,
      setOptionValues,
      setMappingCrmList,
      setLoader,
      triggerAlert
    );
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    renderDefaultCosell();
  }, [dropdownShow]);

  useEffect(() => {
    const sellerAccountOpt = (
      optionValues?.[DropdownOptions.SELLER_CODE] ?? []
    )?.filter((option) => option.ProviderName == formValue?.provider);
    setFormValue((prev) => ({
      ...prev,
      [labelMapper.sellerCode.name]:
        sellerAccountOpt?.length == 1 ? sellerAccountOpt?.[0]?.value : "",
    }));
    setSellerCode(sellerAccountOpt);
  }, [formValue?.provider, optionValues]);

  const handleCreateCosell = () => {
    if (!optionValues?.cosellProvider?.length) return;
    if (!formValue[labelMapper.sellerCode.name]) {
      setErrorForm({ [labelMapper.sellerCode.name]: true });
      return;
    }
    if (
      formValue[labelMapper.provider.name]?.includes(requestPayload.cloud.aws)
    ) {
      // createCosell(
      //   // params?.selectedIds || "",
      //   "52024428967",
      //   setIsFetching,
      //   setIsError,
      //   triggerAlert,
      //   setGenerateCosell,
      //   setData,
      //   mappingCrmList,
      //   opportunityList.length,
      //   formValue,
      //   setErrorState
      // );
      setCurrentPage({
        page: ModelType.COSELL_CREATE,
        params: { sellerCode: formValue[labelMapper.sellerCode.name] },
      });
    } else {
      setIsFetching(true);
      setTimeout(() => {
        setIsFetching(false);
      }, 50);
    }
  };
  useEffect(() => {
    console.log(!isError, isFetching);
    // if (!isError && isFetching) {
    //   setCurrentPage({ page: ModelType.COSELL_CREATE });
    // }
  }, [isFetching, isError]);
  if (loader) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-5">
        <h2>{labelMapper.cloudProvider}</h2>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex w-full items-center p-5">
      <Tile className="w-full items-between flex gap-2 flex-col">
        <div className="flex gap-4 flex-col">
          <h5>{labelMapper.cloudProvider}</h5>
          <PDRadioGroup
            name={labelMapper.cloudProvider}
            label=""
            options={
              optionValues.cosellProvider?.map((val) => {
                return { label: val.label, value: val.value };
              }) || []
            }
            onChange={(val) => onChangeValue(labelMapper.provider.name, val)}
            value={formValue?.provider}
          ></PDRadioGroup>
        </div>
        {formValue && (
          <PDSelectField
            name={labelMapper.sellerCode.name}
            label={labelMapper.sellerCode.label}
            onChange={(value) =>
              onChangeValue(labelMapper.sellerCode.name, value)
            }
            readOnly={sellerCode?.length == 1}
            options={sellerCode}
            placeholder={labelMapper.sellerCode.placeHolder}
            value={formValue[labelMapper.sellerCode.name]}
            error={errorForm[labelMapper.sellerCode.name]}
            validationMessage={displayErrorMessage(
              errorForm[labelMapper.sellerCode.name],
              labelMapper.sellerCode.validationMessage
            )}
          />
        )}
        <div className="flex justify-end gap-2">
          <PDButton
            size={PDButtonSize.SMALL}
            type={PDButtonType.SECONDARY}
            label={t("buttonLabel.cancel")}
            onClick={() =>
              (sdk as AppExtensionsSDK).execute(Command.CLOSE_MODAL)
            }
          ></PDButton>
          <PDButton
            size={PDButtonSize.SMALL}
            type={PDButtonType.PRIMARY}
            loading={isFetching}
            disabled={loader || !sellerCode?.length}
            label={
              formValue[labelMapper.provider.name]?.includes(
                requestPayload.cloud.gcp
              )
                ? FormButton.CREATE_OPPORTUNITY
                : FormButton.CREATE_COSELL
            }
            onClick={() => {
              handleCreateCosell();
            }}
          ></PDButton>
        </div>
      </Tile>
    </div>
  );
};
export default CloudProvider;
