import PDButton from "@template/component/ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
import SaasifyService from "@template/services/saasify.service";
import { useState } from "react";
import { ModelType } from "@template/enum/pipedrive.enum";
import AppExtensionsSDK, {
  Command,
  Modal,
} from "@pipedrive/app-extensions-sdk";
import pipeDriveParams, {
  type pipedriveParams,
} from "@template/utils/pipedrive-params";
import { useCoSellContext } from "@template/context/Cosell.context";

const _getCosells = async () => {
  // fetch cosells data
  const service = new SaasifyService();
  const res = await service.getCosellById("auto", "51015859874");
  return res;
};

const CosellsPage = () => {
  const [_params, setParams] = useState<pipedriveParams>();
  const { setCurrentPage } = useCoSellContext();
  const _viewCosells = async (model: ModelType) => {
    const params = pipeDriveParams(setParams);
    // console.log(params)
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
        action_id: process.env.NEXT_PUBLIC_APP_MODAL_KEY || "",
        data: { dealId: dealId || "", page: model },
      });
      setCurrentPage({ page: model });
    } catch (err) {
      console.error("Failed to open modal:", err);
    }
  };

  return (
    <div className="flex justify-center p-5 w-full">
        <PDButton
          size={PDButtonSize.SMALL}
          onClick={() => viewCosells2(ModelType.COSELL_LIST)}
          label="View Cosells"
        />
      </div>
  );
};

export default CosellsPage;
