import useExtensions from "src/hooks/useExtensions";
import { filters } from "src/types/extensions";

import styles from "@styles/filters.module.css";

export default function Filters() {
  const { filter, filterBy } = useExtensions();
  return (
    <ul className={`${styles.filterList} flex`}>
      {filters.map((f) => (
        <li key={f}>
          <Filter active={filter === f} label={f} onClick={() => filterBy(f)} />
        </li>
      ))}
    </ul>
  );
}

interface FilterProps {
  label: string;
  onClick: () => void;
  active: boolean;
}

function Filter({ label, active, onClick }: FilterProps) {
  return (
    <button
      className={[styles.filter, active && styles.active].join(" ")}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
