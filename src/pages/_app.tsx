import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { LanguageProvider } from "@template/context/LanguageContext";
import { ThemeProvider } from "@template/context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import { PrimeReactProvider } from "primereact/api";

import { PipedriveProvider } from "@template/context/PipedriveContext";

import i18n from "@template/lib/i18n";
import AppToast from "@template/component/ui-components/pipedrive-toast";

// styles
import "@template/styles/globals.scss";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-orange/theme.css";
import { CoSellProvider } from "@template/context/Cosell.context";
import { ToastService } from "@template/services/toast.service";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <PipedriveProvider>
      <PrimeReactProvider>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <CoSellProvider>
              <LanguageProvider>
                <AppToast
                  ref={(instance) => {
                    ToastService.setRef(instance);
                  }}
                />
                <Component {...pageProps} />
              </LanguageProvider>
            </CoSellProvider>
          </I18nextProvider>
        </ThemeProvider>
      </PrimeReactProvider>
    </PipedriveProvider>
  );
}
