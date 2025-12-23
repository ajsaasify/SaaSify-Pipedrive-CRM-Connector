import { isAddMultipartner } from "@template/component/actions/Buttons/actionDisabilityRules";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { useCoSellContext } from "@template/context/Cosell.context";
import { ModalTitle } from "@template/enum/modal.enum";
import { useState } from "react";
import { fetchPartnerShared } from "./apiHandler";
import { Tile } from "@template/component/ui-components/detailview-components";
import PDButton from "@template/component/ui-components/pipedriveButton";
import { ActionButton } from "@template/enum/button.enum";
import { PDButtonSize } from "@template/enum/pipedrive.enum";

export const PartnerConnection = () => {
  const [_fetching, setFetching] = useState(false);

  const { setPartnerConnects, data } = useCoSellContext();

  const _isInvite = isAddMultipartner(data ?? {});
  const triggerAlert = (_alert: {
    type: string;
    message: string;
    title: string;
  }) => {
    // actions.addAlert(alert);
  };
  return (
    <AccordionComponent
      className="card-view"
      accordionOpen={(_e) => {
        fetchPartnerShared(
          setPartnerConnects,
          triggerAlert,
          setFetching,
          data ?? {},
        );
      }}
      items={[
        {
          title: ModalTitle.PARTNER_CONNECTION,
          id: "partner_connection",
          children: (
            <>
              <Tile>
                <div className="flex justify-between items-cente mb-3">
                  <h5>{ModalTitle.SHARED_PARTNER_DETAIL}</h5>
                  <div className="flex gap-2">
                    <PDButton
                      size={PDButtonSize.TINY}
                      label={ActionButton.Add}
                    />
                    <PDButton
                      size={PDButtonSize.TINY}
                      icon="pi pi-refresh"
                      label={ActionButton.REFRESH}
                    />
                  </div>
                </div>
                <hr />
              </Tile>
            </>
          ),
        },
      ]}
    />
  );
};
