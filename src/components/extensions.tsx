import useExtensions from "src/hooks/useExtensions";

import styles from "@styles/extensions.module.css";

import type { Extension } from "src/types/extensions";

interface ExtensionsProps {}

export default function Extensions({}: ExtensionsProps) {
  const { extensions, removeExtension, toggleExtensionState, filterBy } =
    useExtensions();

  const handleRemove = (extensionName: string) => {
    removeExtension(extensionName);
  };

  const handleExtensionState = (extensionName: string) => {
    toggleExtensionState(extensionName);
  };

  return (
    <div>
      <header>
        <h1>Extensions List</h1>
        <ul>
          <li>
            <button onClick={() => filterBy("all")}>All</button>
          </li>
          <li>
            <button onClick={() => filterBy("active")}>Active</button>
          </li>
          <li>
            <button onClick={() => filterBy("inactive")}>Inactive</button>
          </li>
        </ul>
      </header>
      <main>
        {extensions.length === 0 ? (
          <p>No extensions</p>
        ) : (
          <ul>
            {extensions.map((extension) => (
              <li>
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
      <main>
        <img src={logo} alt={name} />
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </main>
      <footer>
        <button onClick={() => onRemove(name)}>Remove</button>
        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onChange(name)}
          />
          <span>toggle on/off</span>
        </label>
      </footer>
    </article>
  );
}
