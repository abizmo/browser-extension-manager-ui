export interface Extension {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

export const filters = ["all", "active", "inactive"] as const;

export type ExtensionFilter = (typeof filters)[number];
