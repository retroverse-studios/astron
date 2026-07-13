import type { City } from "@astron/atlas";
import { useEffect, useState } from "react";

export interface SavedPerson {
  id: string;
  label: string;
  date: string;
  /** Empty = unknown birth time (noon chart, no houses). */
  time: string;
  city: City;
}

const KEY = "astron.people";

function load(): SavedPerson[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedPerson[];
  } catch {
    return [];
  }
}

/** Saved birth data, kept in localStorage (works in browser and Tauri). */
export function useSavedPeople() {
  const [people, setPeople] = useState<SavedPerson[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(people));
  }, [people]);

  return {
    people,
    save(person: Omit<SavedPerson, "id">): SavedPerson {
      const saved = { ...person, id: crypto.randomUUID() };
      setPeople((p) => [...p.filter((x) => x.label !== person.label), saved]);
      return saved;
    },
    remove(id: string) {
      setPeople((p) => p.filter((x) => x.id !== id));
    },
  };
}
