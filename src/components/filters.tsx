import { filters } from "src/types/extensions";

import styles from "@styles/filters.module.css";

interface FiltersProps {
  active: string;
  onFilter: (f: any) => void;
}
export default function Filters({ active, onFilter }: FiltersProps) {
  return (
    <ul className={`${styles.filterList} flex`}>
      {filters.map((f) => (
        <li key={f}>
          <Filter active={active === f} label={f} onClick={() => onFilter(f)} />
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
