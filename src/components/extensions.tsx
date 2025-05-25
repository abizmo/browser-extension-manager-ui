import { useState } from "preact/hooks";
import useExtensions from "src/hooks/useExtensions";

import styles from "@styles/extensions.module.css";

import Filters from "./filters";
import Switch from "./switch";

import type { Extension, ExtensionFilter } from "src/types/extensions";
interface ExtensionsProps {}

export default function Extensions({}: ExtensionsProps) {
  const [filter, setFilter] = useState<ExtensionFilter>("all");
  const { extensions, removeExtension, toggleExtensionState } = useExtensions();

  const handleRemove = (extensionName: string) => {
    removeExtension(extensionName);
  };

  const handleExtensionState = (extensionName: string) => {
    toggleExtensionState(extensionName);
  };

  const filteredExtensions = extensions.filter(
    (ext) =>
      filter === "all" || (filter === "active" ? ext.isActive : !ext.isActive),
  );

  return (
    <div>
      <header className={`${styles.extensionsHeader} flex`}>
        <h1 className={styles.extensionsTitle}>Extensions List</h1>
        <Filters active={filter} onFilter={setFilter} />
      </header>
      <main>
        {extensions.length === 0 ? (
          <p>No extensions</p>
        ) : (
          <ul className={styles.extensions}>
            {filteredExtensions.map((extension) => (
              <li key={extension.name}>
                <Extension
                  {...extension}
                  onRemove={handleRemove}
                  onChange={handleExtensionState}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

interface ExtensionProps extends Extension {
  onRemove: (extensionName: string) => void;
  onChange: (extensionName: string) => void;
}

function Extension({
  logo,
  name,
  description,
  isActive,
  onRemove,
  onChange,
}: ExtensionProps) {
  return (
    <article class={styles.extension}>
      <main className={`${styles.extensionBody} flex`}>
        <img src={logo} alt={name} />
        <div>
          <h2 className={styles.extensionName}>{name}</h2>
          <p>{description}</p>
        </div>
      </main>
      <footer className={`${styles.extensionFooter} flex`}>
        <button
          className={styles.extensionButton}
          onClick={() => onRemove(name)}
        >
          Remove
        </button>
        <Switch isActive={isActive} onChange={onChange} name={name} />
      </footer>
    </article>
  );
}
