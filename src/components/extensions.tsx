import { useEffect, useState } from "preact/hooks";

import data from "@data/data.json";

export interface Extension {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface ExtensionsProps {}

type ExtensionFilter = "all" | "active" | "inactive";

export default function Extensions({}: ExtensionsProps) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [filter, setFilter] = useState<ExtensionFilter>("all");

  useEffect(() => {
    setExtensions(data as Extension[]);
  }, []);

  const handleRemove = (extensionName: string) => {
    setExtensions((state) => {
      return state.filter(({ name }) => name !== extensionName);
    });
  };

  const handleExtensionState = (extensionName: string) => {
    setExtensions((state) =>
      state.map((ext) =>
        ext.name !== extensionName ? ext : { ...ext, isActive: !ext.isActive },
      ),
    );
  };

  const filteredExtensions = extensions.filter(
    (ext) =>
      filter === "all" || (filter === "active" ? ext.isActive : !ext.isActive),
  );

  return (
    <div>
      <header>
        <h1>Extensions List</h1>
        <ul>
          <li>
            <button onClick={() => setFilter("all")}>All</button>
          </li>
          <li>
            <button onClick={() => setFilter("active")}>Active</button>
          </li>
          <li>
            <button onClick={() => setFilter("inactive")}>Inactive</button>
          </li>
        </ul>
      </header>
      <main>
        {filteredExtensions.length === 0 ? (
          <p>No extensions</p>
        ) : (
          <ul>
            {filteredExtensions.map((extension) => (
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
    <article>
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
