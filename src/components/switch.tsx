import styles from "@styles/switch.module.css";

interface SwitchProps {
  isActive: boolean;
  onChange: (extensionName: string) => void;
  name: string;
}

export default function Switch({ isActive, onChange, name }: SwitchProps) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isActive}
        onChange={() => onChange(name)}
      />
      <span className={styles.slider}></span>
      <span className="sr-only">toggle on/off</span>
    </label>
  );
}
