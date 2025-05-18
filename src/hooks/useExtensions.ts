import { useEffect, useState } from "preact/hooks";

import type { Extension, ExtensionFilter } from "src/types/extensions";

export default function useExtensions() {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [filter, setFilter] = useState<ExtensionFilter>("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchExtensions = async () => {
      try {
        const response = await fetch("/api/extensions");

        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setExtensions(result.data as Extension[]);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Ocurrió un error al obtener los datos");
          setExtensions([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchExtensions();

    return () => {
      isMounted = false;
    };
  }, []);

  const removeExtension = (name: string) => {
    setExtensions((state) => {
      return state.filter(({ name: extName }) => extName !== name);
    });
  };

  const toggleExtensionState = (name: string) => {
    setExtensions((state) =>
      state.map((ext) =>
        ext.name !== name ? ext : { ...ext, isActive: !ext.isActive },
      ),
    );
  };

  const filterBy = (type: ExtensionFilter) => setFilter(type);

  const filteredExtensions = extensions.filter(
    (ext) =>
      filter === "all" || (filter === "active" ? ext.isActive : !ext.isActive),
  );

  return {
    extensions: filteredExtensions,
    removeExtension,
    toggleExtensionState,
    filterBy,
    loading,
    error,
  };
}
