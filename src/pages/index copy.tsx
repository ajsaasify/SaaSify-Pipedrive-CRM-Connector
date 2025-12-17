import AccordionComponent from "@template/component/ui-components/PipedriveAccordion";
import PDInput from "@template/component/ui-components/PipedriveInput";
import PDSelectField from "@template/component/ui-components/PipedriveDropdown";
import { PDRadioGroup } from "@template/component/ui-components/PipedriveRadiobutton";
import TextAreaFieldBox from "@template/component/ui-components/PipedriveTextarea";
import { useEffect, useState } from "react";
import { MultiSelectField } from "@template/component/ui-components/PipedriveMultiselect";
import InfoTooltip from "@template/component/ui-components/PipedriveInfo";
import PDDatePicker from "@template/component/ui-components/PipedriveCalendar";
import PDButton from "@template/component/ui-components/pipedriveButton";
import {
  PDButtonSize,
  PDButtonType,
  PDTextSize,
  PDTextType,
  PDTextWeight,
} from "@template/enum/pipedrive.enum";
import PDText from "@template/component/ui-components/pipedrive-text";
import PDCheckbox from "@template/component/ui-components/PipedriveCheckbox";
import { DataTablePageEvent } from "primereact/datatable";
import PDAdvancedTable from "@template/component/ui-components/PipedriveTable";
import {
  FilterType,
  PDColumnConfig,
} from "@template/types/pipedrive-table-interface";
import { Checkbox } from "primereact/checkbox";
import React from "react";
export interface UserData {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
  age: number;
  salary: number;
  joinedAt: Date|string;     // If you want, we can make this Date
  lastLogin: Date|string;    // Same here
  tags: string[];
  verified: boolean;
  isSelected?: boolean;
}
const Home:React.FC<{ sdk: any }> = ({ sdk }) =>  {
  const [stage, setStage] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [leadQuality, setLeadQuality] = useState("");
  const [company, setCompany] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [data, setData] = useState<UserData[]>([
    {
      id: 1,
      name: "Arul",
      email: "arul@example.com",
      status: "Active",
      role: "admin",
      age: 27,
      salary: 1300000,
      joinedAt: new Date("2024-01-10").toDateString(),
      lastLogin: new Date("2024-01-15").toDateString(),
      tags: ["developer", "team-lead"],
      verified: true,
      isSelected:false,
    },
    {
      id: 2,
      name: "John",
      email: "john@test.com",
      status: "Pending",
      role: "user",
      age: 32,
      salary: 800000,
      joinedAt: new Date("2024-02-05").toDateString(),
      lastLogin: new Date("2024-02-09").toDateString(),
      tags: ["sales"],
      verified: false,
      isSelected:false,
    },
    {
      id: 3,
      name: "Sara",
      email: "sara@example.com",
      status: "Inactive",
      role: "manager",
      age: 29,
      salary: 100000,
      joinedAt: new Date("2023-12-20").toDateString(),
      lastLogin: new Date("2024-01-03").toDateString(),
      tags: ["marketing", "content"],
      verified: true,
      isSelected:false,
    },
    {
      id: 4,
      name: "Kumar",
      email: "kumar@demo.com",
      status: "Active",
      role: "user",
      age: 41,
      salary: 1000000,
      joinedAt: new Date("2024-03-01").toDateString(),
      lastLogin: new Date("2024-03-05").toDateString(),
      tags: ["developer"],
      verified: false,
      isSelected:false,
    },
  ]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(57);

  const columns: PDColumnConfig[] = [
    {
      field: "isSelect",
      header: "",
      body: (raw:UserData) => (
        <>
          <PDCheckbox
            label={""}
            checked={raw?.isSelected || false}
            onChange={(value)=>{
              const updatedData = data.map(item => {
                if(item.id === raw.id){
                  return {...item, isSelected: value};
                }
                return item;
              });
              console.log("Updated Data:", updatedData);
              setData(updatedData);
            }}
          ></PDCheckbox>
        </>
      ),
    },

    // TEXT FILTER
    { field: "name", header: "Name", filterType: FilterType.TEXT },

    // TEXT FILTER
    { field: "email", header: "Email", filterType: FilterType.TEXT },

    // NUMBER EXACT FILTER
    { field: "age", header: "Age", filterType: FilterType.NUMBER },

    // NUMBER RANGE
    { field: "salary", header: "Salary", filterType: FilterType.NUMBER_RANGE },

    // DATE FILTER (single date)
    {
      field: "joinedAt",
      header: "Joined Date",
      filterType: FilterType.CALENDAR,
    },

    // DATE RANGE
    {
      field: "createdBetween",
      header: "Created Between",
      filterType: FilterType.DATE_RANGE,
    },

    // DROPDOWN SINGLE
    {
      field: "role",
      header: "Role",
      filterType: FilterType.DROPDOWN,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Manager", value: "manager" },
      ],
    },

    // MULTI SELECT DROPDOWN
    {
      field: "country",
      header: "Country",
      filterType: FilterType.MULTISELECT,
      options: [
        { label: "India", value: "IN" },
        { label: "USA", value: "US" },
        { label: "UK", value: "UK" },
      ],
    },

    // BOOLEAN (true / false)
    {
      field: "isActive",
      header: "Active",
      filterType: FilterType.DROPDOWN,
      options: [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
      ],
    },

    // // CUSTOM FILTER (chip, button-group, input-group etc.)
    // {
    //   field: "tags",
    //   header: "Tags",
    //   filterType: "custom",
    //   component: TagFilterComponent, // your custom filter UI
    // },
  ];

  const handlePageChange = (e: DataTablePageEvent) => {
    console.log("Page Event:", e);
    setFirst(e.first);
    setRows(e.rows);
    // loadData((e?.page || 0) + 1, e.rows);
  };

  useEffect(() => {
 console.log("Welcome");  
  }, []);
  return (
    <div>
      <AccordionComponent
        defaultOpenIds={["1"]}
        items={[
          { title: "Acc 1", children: <>hi</>, id: "1" },
          { title: "Acc 1", children: <>hi</>, id: "2" },
        ]}
      ></AccordionComponent>
      <PDAdvancedTable
        data={data}
        columns={columns}
        loading={loading}
        rows={rows}
        first={first}
        totalRecords={total}
        backendPagination={true}
        backendFiltering={true}
        onFilterChange={(filters) => console.log("Filters applied: ", filters)}
        onPageChange={(e) => handlePageChange(e)}
      />
      <PDAdvancedTable
        data={data}
        columns={columns}
        backendPagination={false}
        totalRecords={data.length}
        globalFilterFields={["name", "email"]}
        rows={rows}
        first={first}
      />
      <PDButton
        type={PDButtonType.PRIMARY}
        size={PDButtonSize.TINY}
        label="Add Deal"
        className=""
      />
      <PDText type={PDTextType.LABEL}>Contact person</PDText>

      <PDText
        type={PDTextType.BODY}
        size={PDTextSize.XS}
        weight={PDTextWeight.SEMIBOLD}
      >
        Test User
      </PDText>
      <PDInput
        label="Company Name"
        info="Enter the legal company name"
        value={company}
        placeholder="Ex: Amwhiz Softwares"
        isrequired={true}
        error={company ? "" : "Company name is required"}
        onChange={(v: any) => setCompany(v)}
      />
      <InfoTooltip
        activeColor="text-primary"
        // message="Enter your active mobile number. This will be used for SMS notifications."
        element={<span className="ml-1">Hi Hello</span>}
      />
      <PDCheckbox label="Active" checked={active} onChange={setActive} />
      <PDSelectField
        label="Deal Stage"
        placeholder="Select stage"
        value={stage}
        error={stage ? "" : "Please select a stage"}
        options={[
          { label: "Qualified", value: "qualified" },
          { label: "Proposal", value: "proposal" },
          { label: "Won", value: "won" },
        ]}
        onChange={(v) => setStage(v)}
      />
      <MultiSelectField
        label="Services Needed"
        info="Select one or more services"
        placeholder="Multi select"
        value={services}
        error={services.length > 0 ? "" : "Please select at least one service"}
        options={[
          { label: "Design", value: "design" },
          { label: "Development", value: "dev" },
          { label: "Marketing", value: "marketing" },
        ]}
        maxSelectedLabels={2}
        onChange={(v) => setServices(v)}
      />

      <PDRadioGroup
        label="Lead Quality"
        value={leadQuality}
        onChange={setLeadQuality}
        options={[
          {
            label: "High",
            value: "high",
            info: "Likely to convert soon",
          },
          {
            label: "Medium",
            value: "medium",
            info: "Needs nurturing",
          },
          {
            label: "Low",
            value: "low",
            info: "Unresponsive or cold",
          },
        ]}
      />
      <div className="w-64">
        <PDDatePicker
          label="Due date"
          value={date}
          onChange={(e) => setDate(e as Date)}
          required
          placeholder="Pick date"
          error={date ? "" : "Please select a date"}
        />
      </div>

      <TextAreaFieldBox
        label="Notes"
        placeholder="Add additional notes here..."
        value={notes}
        error={notes ? "" : "Notes cannot be empty"}
        onChange={(v) => setNotes(v)}
      />
    </div>
  );
}
export default Home;