import PDButton from "@template/component/ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
import SaasifyService from "@template/services/saasify.service";
import { useEffect, useState } from "react";
import { ModelType } from "@template/enum/pipedrive.enum";
import AppExtensionsSDK, {
  Command,
  Modal,
} from "@pipedrive/app-extensions-sdk";
import pipeDriveParams, {
  type pipedriveParams,
} from "@template/utils/pipedrive-params";
import { useCoSellContext } from "@template/context/Cosell.context";
import { FormButton } from "@template/enum/button.enum";

const _getCosells = async () => {
  // fetch cosells data
  const service = new SaasifyService();
  const res = await service.getCosellById("auto", "51015859874");
  return res;
};

const CosellsPage = () => {
  const [_params, setParams] = useState<pipedriveParams>();
  const { setCurrentPage } = useCoSellContext();
  const viewCosells = async (model: ModelType) => {
    console.log("current model", model);
    const params = pipeDriveParams(setParams);
    const dealId = params?.selectedIds;
    try {
      // console.log("SDK instance:", sdk);
      const sdk = await new AppExtensionsSDK().initialize();
      await sdk.execute(Command.OPEN_MODAL, {
        type: Modal.CUSTOM_MODAL,
        action_id: "f5458880-50b7-4d74-b4ce-ae8e571d7f54",
        data: { dealId: dealId || "", page: model },
      });
      setCurrentPage({ page: model });
    } catch (err) {
      console.error("Failed to open modal:", err);
    }
  };

  const viewCosells2 = async (model: ModelType) => {
    const params = pipeDriveParams(setParams);
    const dealId = params?.selectedIds;
    try {
      // console.log("SDK instance:", sdk);
      const sdk = await new AppExtensionsSDK().initialize();
      await sdk.execute(Command.OPEN_MODAL, {
        type: Modal.CUSTOM_MODAL,
        action_id: "293cf82b-3d23-4068-a4b5-b5ae03c6ac6d",
        data: { dealId: dealId || "", page: model },
      });
      setCurrentPage({ page: model });
    } catch (err) {
      console.error("Failed to open modal:", err);
    }
  };
  useEffect(() => {
    // getCosells().then((data) => {
    //   console.log("Cosells Data:", data);
    // });
    console.log(pipeDriveParams());
  }, []);
  return (
    <>
      <div className="flex justify-center w-full">
        Arul
        {/* <CosellModelPage type={ModelType.COSELL_LIST} /> */}
        <PDButton
          size={PDButtonSize.SMALL}
          onClick={() => viewCosells(ModelType.COSELL_LIST)}
          label="View Cosells"
        />
        <PDButton
          size={PDButtonSize.SMALL}
          onClick={() => viewCosells(ModelType.COSELL_CLOUD_PROVIDER)}
          label={FormButton.CREATE_COSELL}
        />
      </div>
      <div className="flex justify-center w-full">
        Cherath
        {/* <CosellModelPage type={ModelType.COSELL_LIST} /> */}
        <PDButton
          size={PDButtonSize.SMALL}
          onClick={() => viewCosells2(ModelType.COSELL_LIST)}
          label="View Cosells"
        />
        <PDButton
          size={PDButtonSize.SMALL}
          onClick={() => viewCosells2(ModelType.COSELL_CLOUD_PROVIDER)}
          label={FormButton.CREATE_COSELL}
        />
      </div>
    </>
  );
};

export default CosellsPage;
