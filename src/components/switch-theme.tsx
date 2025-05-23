import { switchTheme, theme } from "src/stores/theme";

import { useStore } from "@nanostores/preact";
import styles from "@styles/switch-theme.module.css";

export default function SwitchTheme() {
  const $theme = useStore(theme);

  return (
    <button className={styles.button} onClick={switchTheme}>
      {$theme === "light" ? (
        <img src="/images/icon-moon.svg" alt="switch to dark" />
      ) : (
        <img src="/images/icon-sun.svg" alt="switch to light" />
      )}
      <span className="sr-only">switch theme</span>
    </button>
  );
}
