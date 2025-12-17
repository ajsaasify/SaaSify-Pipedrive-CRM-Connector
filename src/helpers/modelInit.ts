import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";

const initSdk = async (width?: number, height?: number) => {
  const sdk = await new AppExtensionsSDK().initialize();
  sdk?.execute(Command.RESIZE, { width, height });
  return sdk;
};

export default initSdk;
