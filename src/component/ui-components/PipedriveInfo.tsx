import React, { useRef, useState, useEffect } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InfoTooltipProps } from "@template/types/pipedrive-ui-interface";


export default function InfoTooltip({
  message,
  icon = "pi pi-question-circle",
  activeColor="text-gray-600",
  size = 15,
  element
}: InfoTooltipProps<any>) {
  const overlayRef = useRef<OverlayPanel>(null);
  const [open, setOpen] = useState(false);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (overlayRef.current) {
        // overlayRef.current's DOM container isn't typed on the OverlayPanel type,
        // so cast to any and try common element properties safely.
        const container =
          (overlayRef.current as any).container ??
          (overlayRef.current as any).element ??
          null;

        if (!container || !container.contains(e.target)) {
          setOpen(false);
          overlayRef.current.hide();
        }
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const toggle = (event: any) => {
    if (open) {
      overlayRef.current?.hide();
      setOpen(false);
    } else {
      overlayRef.current?.toggle(event);
      setOpen(true);
    }
  };

  return (
    <>
      {/* Info Button */}
      <Button
        type="button"
        onClick={(e) => toggle(e)}
        tooltip={message}
        className={`pd-btn pd-accordion-btn p-1`}
      >
        <i className={`${icon} ${open?activeColor:""}`} style={{ fontSize: size }} />
      </Button>

      {/* Tooltip */}
      <OverlayPanel
        ref={overlayRef}
        dismissable={false}
        showCloseIcon={false}
        className=" w-[240px] shadow-md rounded-md border border-gray-200"
      >
        {message && <div className="text-sm text-gray-700 leading-relaxed">
          {message}
        </div>}
        {!message && element && <div>{element}</div>}
      </OverlayPanel>
    </>
  );
}
