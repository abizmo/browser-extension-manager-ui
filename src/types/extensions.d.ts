export interface Extension {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type ExtensionFilter = "all" | "active" | "inactive";
