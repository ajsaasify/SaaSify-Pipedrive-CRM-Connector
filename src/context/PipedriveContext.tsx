"use client";

import { createContext, useContext, useEffect, useState } from "react";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

interface PipedriveContextType {
  sdk: any | null;
}

const PipedriveContext = createContext<PipedriveContextType>({
  sdk: null,
});

export function PipedriveProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<any>(null);

  useEffect(() => {
    async function initSDK() {
      try {
        const instance = await new AppExtensionsSDK().initialize();
        setSdk(instance);
        instance.setWindow(window);
        // Remove "Something went wrong" fallback page
        window.parent.postMessage(
          { event: "initialize", data: { height: "auto" } },
          "*",
        );
        console.log("Successfully Pipedrive initialized");
      } catch (err) {
        console.warn("⚠️ Failed to init Pipedrive SDK, using mock", err);

        const mock = {
          window: {
            openModal: ({ url }: any) =>
              window.open(url, "_blank", "width=1200,height=800"),
          },
          identifier: "mock-ui",
          context: { id: 1234 },
          userSettings: { theme: "light" },
        };

        setSdk(mock);
      }
    }

    initSDK();
  }, []);
  if (!sdk) return null;

  return (
    <PipedriveContext.Provider value={{ sdk }}>
      {children}
    </PipedriveContext.Provider>
  );
}

// export const usePipedrive = () => useContext(PipedriveContext);
export const usePipedrive = () => {
  const context = useContext(PipedriveContext);
  if (!context) {
    throw new Error("Error on Co-sell ContextProvider");
  }
  return context;
};
