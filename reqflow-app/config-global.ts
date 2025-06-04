import packageJson from "./package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  isStaticExport: boolean;
  site: {
    name: string;
    serverUrl: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  isStaticExport: false,
  site: {
    name: "Reqflow",
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  },
};
