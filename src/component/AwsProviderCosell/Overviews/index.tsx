import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { useCoSellContext } from "@template/context/Cosell.context";
import {
  alertPopupSegment,
  overviewSectionData as segments,
} from "@template/common/section/overview";
import {
  DisplayField,
  Tile,
} from "@template/component/ui-components/detailview-components";
import { useTranslation } from "react-i18next";

export const OverViewCard: React.FC = () => {
  const { data } = useCoSellContext();
  const segmentData = segments(data || {});

  const _alertSegment = alertPopupSegment(data);
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
                  <h5>{t("awsCosell.inputLabelMapper.accordian.overview")}</h5>
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
          title: "Overview",
        },
      ]}
    ></AccordionComponent>
  );
};
