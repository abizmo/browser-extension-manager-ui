import { useEffect } from "preact/hooks";
import { theme } from "src/stores/theme";

import { useStore } from "@nanostores/preact";

export default function ThemeEffect() {
  const $theme = useStore(theme);

  useEffect(() => {
    if ($theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [$theme]);

  return null;
}
