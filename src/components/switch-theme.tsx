import { switchTheme, theme } from "src/stores/theme";

import { useStore } from "@nanostores/preact";

export default function SwitchTheme() {
  const $theme = useStore(theme);

  return (
    <button onClick={switchTheme}>
      {$theme === "light" ? (
        <img src="/images/icon-moon.svg" alt="switch to dark" />
      ) : (
        <img src="/images/icon-sun.svg" alt="switch to light" />
      )}
      <span>switch theme</span>
    </button>
  );
}
