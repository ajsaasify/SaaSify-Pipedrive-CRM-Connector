import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import { AccordianTitle } from "@template/enum/accordian.enum";
import PDAdvancedTable from "@template/component/ui-components/PipedriveTable";
import { ContactTableColumns } from "./helper";
import { useCoSellContext } from "@template/context/Cosell.context";
import { ContactLocal } from "@template/types/cosellResponse";
import { EmptyState } from "@template/component/ui-components/empty-data";
import { awsConstants } from "@template/common/constants/awsCosellFieldMappings";
import { contactSegmentData as segment } from "@template/common/section/contact";

const ContactTable = ({ data }: { data: ContactLocal[] }) => {
  return (
    <div className="w-full">
      <PDAdvancedTable
        enableGlobalFilter={false}
        data={data}
        columns={ContactTableColumns}
        totalRecords={data?.length}
        rows={data?.length}
        first={0}
        emptyMessage={<EmptyState description={awsConstants.noData} />}
        showPaginator={false}
      ></PDAdvancedTable>
    </div>
  );
};
const ContactCard = () => {
  const { data } = useCoSellContext();
  const contacts = segment(data);
  return (
    <AccordionComponent
      items={[
        {
          id: "contacts",
          title: AccordianTitle.CONTACT,
          children: (
            <div className="p-3 w-full">
              <ContactTable data={contacts} />
            </div>
          ),
        },
      ]}
      className="card-view"
    ></AccordionComponent>
  );
};
export default ContactCard;
