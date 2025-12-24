import { acceptSegmentData } from "@template/common/section/accept";
import { Tile } from "@template/component/ui-components/detailview-components";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import PDAdvancedTable from "@template/component/ui-components/PipedriveTable";
import { useCoSellContext } from "@template/context/Cosell.context";
import { useTranslation } from "react-i18next";
import { invitationColumns } from "./helper";
import { EmptyState } from "@template/component/ui-components/empty-data";
import { awsConstants } from "@template/common/constants/awsCosellFieldMappings";

export const InviationCard: React.FC = () => {
  const { data } = useCoSellContext();
  const segmentData = acceptSegmentData(data || {});
  const { t } = useTranslation();
  const { Invitation } = data?.CoSellEntity || {};
  const contacts =
    Invitation?.Payload?.OpportunityInvitation?.SenderContacts?.filter(
      (value) => Boolean(value.Email)
    );
  return (
    <AccordionComponent
      className="card-view"
      defaultOpenIds={["overview"]}
      items={[
        {
          id: "overview",
          children: (
            <>
              <div className="w-full">
                <Tile>
                  {segmentData.map((fields) => (
                    <div
                      className="display-field grid-cols-2 pb-2"
                      key={fields.title}
                    >
                      <span className="info-label">{fields.title}</span>
                      <span className="info-value">{fields.value}</span>
                    </div>
                  ))}

                  <div className="pb-2">
                    <h5>{t("awsCosell.detailsAccordions.contact")}</h5>
                    <hr />
                    <PDAdvancedTable
                      enableGlobalFilter={false}
                      data={contacts || []}
                      columns={invitationColumns}
                      totalRecords={contacts?.length || 0}
                      rows={contacts?.length || 0}
                      first={0}
                      emptyMessage={
                        <EmptyState description={awsConstants.noData} />
                      }
                      showPaginator={false}
                    ></PDAdvancedTable>
                  </div>
                </Tile>
              </div>
            </>
          ),
          title: "Invitaion Details",
        },
      ]}
    ></AccordionComponent>
  );
};
