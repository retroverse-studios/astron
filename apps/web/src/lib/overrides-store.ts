import {
  countOverrides,
  EMPTY_OVERRIDES,
  parseOverrides,
  type ContentOverrides,
} from "@astron/interpret";
import { useEffect, useState } from "react";

const KEY = "astron.contentOverrides";

type Section = keyof Omit<ContentOverrides, "version">;

function load(): ContentOverrides {
  try {
    return parseOverrides(localStorage.getItem(KEY) ?? '{"version":1}');
  } catch {
    return EMPTY_OVERRIDES;
  }
}

/** The user's personalised text, persisted locally. */
export function useContentOverrides() {
  const [overrides, setOverrides] = useState<ContentOverrides>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(overrides));
  }, [overrides]);

  /**
   * Set one passage. `subKey` addresses a lens inside signs/aspects (or a
   * sign inside the fluent set); value null restores the shipped text.
   */
  function setEntry(section: Section, key: string, subKey: string | null, value: string | null) {
    setOverrides((prev) => {
      const sectionObj: Record<string, unknown> = { ...(prev[section] as object | undefined) };
      if (subKey === null) {
        if (value === null) delete sectionObj[key];
        else sectionObj[key] = value;
      } else {
        const inner: Record<string, string> = { ...(sectionObj[key] as object | undefined) };
        if (value === null) delete inner[subKey];
        else inner[subKey] = value;
        if (Object.keys(inner).length) sectionObj[key] = inner;
        else delete sectionObj[key];
      }
      const next = { ...prev } as unknown as Record<string, unknown>;
      if (Object.keys(sectionObj).length) next[section] = sectionObj;
      else delete next[section];
      return next as unknown as ContentOverrides;
    });
  }

  return {
    overrides,
    count: countOverrides(overrides),
    setEntry,
    clearAll: () => setOverrides(EMPTY_OVERRIDES),
    exportJson: () => JSON.stringify(overrides, null, 2),
    importJson: (text: string) => setOverrides(parseOverrides(text)),
  };
}

export type OverridesApi = ReturnType<typeof useContentOverrides>;
