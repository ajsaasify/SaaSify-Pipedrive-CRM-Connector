import PDButton from "@template/component/ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
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

const CosellsPage = () => {
  const { setCurrentPage } = useCoSellContext();
  const [_params, setParams] = useState<pipedriveParams>();

  const viewCosells = async (model: ModelType) => {
    const params = pipeDriveParams(setParams);
    const dealId = params?.selectedIds;
    try {
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
        onClick={() => viewCosells(ModelType.COSELL_LIST)}
        label="View Cosells"
      />
    </div>
  );
};

export default CosellsPage;
