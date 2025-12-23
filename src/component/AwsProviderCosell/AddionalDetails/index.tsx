// Components
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import {
  DisplayField,
  Tile,
} from "@template/component/ui-components/detailview-components";

// Context
import { useCoSellContext } from "@template/context/Cosell.context";

// Utils
import { labelMapper } from "@template/utils/labelMappers";

// Data
import { additionalSegmentData as segments } from "../../../common/section/additional";

export const AdditionalCard: React.FC = () => {
  const { data } = useCoSellContext();
  const segmentData = segments(data || {});
  return (
    <AccordionComponent
      className="card-view"
      items={[
        {
          id: "additional_details",
          children: (
            <>
              <div className="w-full">
                <Tile>
                  <h5>{labelMapper.accordian.additional}</h5>
                  <hr />

                  {segmentData.map((fields, idx) => (
                    <DisplayField
                      // biome-ignore lint/suspicious/noArrayIndexKey: Index used as key
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
          title: labelMapper.accordian.additional,
        },
      ]}
    ></AccordionComponent>
  );
};
