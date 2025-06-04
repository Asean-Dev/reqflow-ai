import packageJson from "./package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  isStaticExport: boolean;
  site: {
    name: string;
    serverUrl: string;
    apiUrl: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  isStaticExport: false,
  site: {
    name: "Reqflow",
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
  },
};
