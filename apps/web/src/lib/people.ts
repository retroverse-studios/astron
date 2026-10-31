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

function isSavedPerson(v: unknown): v is SavedPerson {
  if (!v || typeof v !== "object") return false;
  const p = v as Record<string, unknown>;
  const city = p["city"] as Record<string, unknown> | undefined;
  return (
    typeof p["id"] === "string" &&
    typeof p["label"] === "string" &&
    typeof p["date"] === "string" &&
    typeof p["time"] === "string" &&
    !!city &&
    typeof city === "object" &&
    Number.isFinite(city["latitude"]) &&
    Number.isFinite(city["longitude"]) &&
    typeof city["timezone"] === "string" &&
    typeof city["name"] === "string"
  );
}

function load(): SavedPerson[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter(isSavedPerson) : [];
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
