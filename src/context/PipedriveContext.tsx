"use client";

import { createContext, useContext, useEffect, useState } from "react";
import AppExtensionsSDK, {
  Command,
  Event,
} from "@pipedrive/app-extensions-sdk";

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
        instance.setWindow(window);

        // Remove fallback page
        window.parent.postMessage(
          { event: "initialize", data: { height: "auto" } },
          "*"
        );

        setSdk(instance);
        console.log("✅ Pipedrive SDK initialized");
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

  /** 🔍 LOG SDK ONCE IT EXISTS */
  useEffect(() => {
    if (sdk) {
      console.group("🧩 Pipedrive SDK");
      console.log("SDK instance:", sdk);
      console.log("Identifier:", sdk?.identifier);
      console.log("Context:", sdk?.context);
      console.log("User Settings:", sdk?.userSettings);
      console.groupEnd();
    }
  }, [sdk]);

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
