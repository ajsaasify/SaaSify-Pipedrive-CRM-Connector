import type React from "react";

interface InfoItem {
  label: string;
  value: string | number | React.ReactNode;
}

interface InfoGridProps {
  columns?: number; // number of columns
  items: InfoItem[];
}

const InfoGrid: React.FC<InfoGridProps> = ({ columns = 2, items }) => {
  const colSize = 12 / columns; // PrimeReact grid is based on 12

  return (
    <div className="grid">
      {items.map((item, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Index used as key
        <div key={idx} className={`col-${colSize} p-3`}>
          <div className="p-3 border-round surface-100">
            <div className="text-sm text-600">{item.label}</div>
            <div className="text-lg font-medium">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;
