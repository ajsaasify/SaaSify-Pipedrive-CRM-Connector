import React, { useEffect } from "react";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { AccordianTitle } from "@template/enum/accordian.enum";
import PDAdvancedTable from "@template/component/ui-components/PipedriveTable";
import { NextStepColumns } from "./herlper";
import { useCoSellContext } from "@template/context/Cosell.context";
import { StepHistory } from "@template/types/cosellResponse";
import { EmptyState } from "@template/component/ui-components/empty-data";
import { awsConstants } from "@template/common/constants/awsCosellFieldMappings";
import PDText from "@template/component/ui-components/pipedrive-text";
import { Tile } from "@template/component/ui-components/detailview-components";

const NextStepTable = ({ data }: { data: StepHistory[] }) => {
  const { title, noItems, add } = awsConstants.nextStep;
  return (
    <div className="w-full">
      <h5>{title}</h5>
      <hr />
      <PDAdvancedTable
        enableGlobalFilter={false}
        data={data || []}
        columns={NextStepColumns}
        totalRecords={data?.length}
        rows={data.length}
        first={0}
        emptyMessage={<EmptyState title={noItems} description={add} />}
        showPaginator={false}
      ></PDAdvancedTable>
    </div>
  );
};
const NextStepCard = () => {
  const { data } = useCoSellContext();
  const { NextStepsHistory } = data?.CoSellEntity?.LifeCycle ?? {};

  return (
    <AccordionComponent
      items={[
        {
          id: "next_steps",
          title: AccordianTitle.NEXT,
          children: (
            <div className="p-3 w-full">
              <NextStepTable data={NextStepsHistory || []} />
            </div>
          ),
        },
      ]}
      className="card-view"
    ></AccordionComponent>
  );
};
export default NextStepCard;
