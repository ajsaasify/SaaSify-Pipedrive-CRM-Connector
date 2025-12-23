import { labelMapper } from "@template/utils/labelMappers";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { useCoSellContext } from "@template/context/Cosell.context";
import { customerSectionData as segments } from "../../../common/section/customer";
import {
  DisplayField,
  Tile,
} from "@template/component/ui-components/detailview-components";

export const CustomerCard: React.FC = () => {
  const { data } = useCoSellContext();
  const segmentData = segments(data || {});

  return (
    <AccordionComponent
      className="card-view"
      items={[
        {
          id: "customers",
          children: (
            <div>
              <div className="w-full card-view">
                <Tile>
                  <h5>{labelMapper.accordian.customer}</h5>
                  <hr />
                  {segmentData.customerDetails.map((fields, idx) => (
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
              <div className="w-full card-view">
                <Tile>
                  <h5>{labelMapper.accordian.endUserContact}</h5>
                  <hr />
                  {segmentData.endUser.map((fields, idx) => (
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
            </div>
          ),
          title: labelMapper.accordian.customer,
        },
      ]}
    ></AccordionComponent>
  );
};
