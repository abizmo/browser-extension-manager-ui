import { atom } from "nanostores";

type Theme = "light" | "dark";

export const theme = atom<Theme>("light");

export function switchTheme() {
  theme.set(theme.get() === "light" ? "dark" : "light");
}
