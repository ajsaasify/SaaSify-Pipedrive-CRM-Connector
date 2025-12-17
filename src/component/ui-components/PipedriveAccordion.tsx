import React, { useState } from "react";
import { Button } from "primereact/button";
export interface AccordionItemProps {
  id: string;
  title: string;
  rightActions?: React.ReactNode;
  children: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  defaultOpenIds?: string[];
  className?: string;
  accordionOpen?: (id: string) => void;
}

const AccordionComponent = ({
  items,
  defaultOpenIds = [],
  className = "",
  accordionOpen,
}: AccordionProps) => {
  const defaultIndexes = defaultOpenIds;

  const [activeIndex, setActiveIndex] = useState<string[]>(defaultIndexes);

  const changeAccordion = (id: string) => {
    setActiveIndex((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else if (accordionOpen) {
        accordionOpen(id);
      }
      return [...prev, id];
    });
  };

  return (
    <>
      {items.map((item) => {
        const isOpen = activeIndex.includes(item.id);
        return (
          <div key={item.id} className={`${className}`}>
            <div className="">
              <Button
                className="pd-btn pd-accordion-btn pd-btn-md hover:bg-gray-200 px-3 py-1 gap-2"
                onClick={() => changeAccordion(item?.id)}
              >
                <span
                  className={`pi ${
                    isOpen
                      ? "pi-angle-up rotate-icon-open"
                      : "pi-angle-down rotate-icon-close"
                  }`}
                ></span>
                {item.title}
              </Button>
            </div>
            <div style={{ display: isOpen ? "block" : "none" }}>
              {item.children}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AccordionComponent;
