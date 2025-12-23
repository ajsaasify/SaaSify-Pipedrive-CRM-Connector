import InfoGrid from "@template/component/ui-components/pipdriveInfoGrid";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { useCoSellContext } from "@template/context/Cosell.context";
import { useEffect } from "react";
import { projectSegmentData as segments } from "../../../common/section/project";
import {
  DisplayField,
  Tile,
} from "@template/component/ui-components/detailview-components";
import { labelMapper } from "@template/utils/labelMappers";

export const ProjectCard: React.FC = () => {
  const { data } = useCoSellContext();
  const segmentData = segments(data || {}, {});
  const { LifeCycle } = data?.CoSellEntity || {};
  return (
    <AccordionComponent
      className="card-view"
      items={[
        {
          id: "projects",
          children: (
            <>
              <div className="w-full card-view">
                <Tile>
                  <h5>{labelMapper.accordian.project}</h5>
                  <hr />

                  {segmentData.marketDetail.map((fields, idx) => (
                    <DisplayField
                      key={idx}
                      items={fields.map((item, i) => ({
                        ...item,
                        idx: String(i),
                      }))}
                    />
                  ))}
                </Tile>
              </div>
              <div className="w-full card-view">
                <Tile>
                  <h5>{labelMapper.accordian.marketing}</h5>
                  <hr />
                  {segmentData.projectDetails.map((fields, idx) => (
                    <DisplayField
                      key={idx}
                      items={fields.map((item, i) => ({
                        ...item,
                        idx: String(i),
                      }))}
                    />
                  ))}
                </Tile>
              </div>
            </>
          ),
          title: labelMapper.accordian.project,
        },
      ]}
    ></AccordionComponent>
  );
};
