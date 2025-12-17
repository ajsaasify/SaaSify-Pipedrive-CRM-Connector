import InfoGrid from "@template/component/ui-components/pipdriveInfoGrid";
import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { useCoSellContext } from "@template/context/Cosell.context";
import { useEffect } from "react";
import {
  alertPopupSegment,
  overviewSectionData as segments,
} from "../../../common/section/overview";
import {
  DisplayField,
  Tile,
} from "@template/component/ui-components/detailview-components";
import { labelMapper } from "@template/utils/labelMappers";
import { useTranslation } from "react-i18next";

export const OverViewCard: React.FC = () => {
  const { data } = useCoSellContext();
  const segmentData = segments(data || {});
  const { LifeCycle } = data?.CoSellEntity || {};
  const alertSegment = alertPopupSegment(data);
  const { t } = useTranslation();
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
                  <h5>
                    {t("awsCosell.inputLabelMapper.accordian.overview")}
                  </h5>
                  <hr />

                  {segmentData.map((fields, idx) => (
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
          title: "Overview",
        },
      ]}
    ></AccordionComponent>
  );
};
