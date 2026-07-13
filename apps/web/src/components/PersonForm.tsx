import { formatCity, type City } from "@astron/atlas";
import { useEffect, useState } from "react";
import { getAtlas } from "../lib/astro";
import type { PersonDraft } from "../lib/compute";
import type { SavedPerson } from "../lib/people";
import { button, buttonGhost, input, label } from "./glyphs";

function PlaceSearch({ city, onPick }: { city?: City; onPick: (c: City) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    let live = true;
    const t = setTimeout(async () => {
      const atlas = await getAtlas();
      if (live) {
        setResults(atlas.search(query, 6));
        setOpen(true);
      }
    }, 120);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        placeholder={city ? formatCity(city) : "city of birth…"}
        className={input}
      />
      {open && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-crt-panel border border-crt-line rounded max-h-56 overflow-auto">
          {results.map((c, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 hover:bg-crt-line/40 text-sm"
                onClick={() => {
                  onPick(c);
                  setQuery("");
                  setOpen(false);
                }}
              >
                {formatCity(c)}
                <span className="text-crt-dim"> · {c.timezone}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PersonForm({
  title,
  value,
  onChange,
  people,
  onSave,
}: {
  title: string;
  value: PersonDraft;
  onChange: (v: PersonDraft) => void;
  people: SavedPerson[];
  onSave: (label: string) => void;
}) {
  const [saveLabel, setSaveLabel] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-xs tracking-widest text-crt-dim">{title}</span>
        {people.length > 0 && (
          <select
            className="bg-crt-bg border border-crt-line rounded px-2 py-1 text-xs text-crt-text"
            value=""
            onChange={(e) => {
              const p = people.find((x) => x.id === e.target.value);
              if (p) onChange({ date: p.date, time: p.time, city: p.city });
            }}
          >
            <option value="">saved charts…</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className={label}>DATE</label>
          <input
            type="date"
            required
            value={value.date}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
            className={input}
          />
        </div>
        <div className="flex-1">
          <label className={label}>TIME (blank = unknown)</label>
          <input
            type="time"
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
            className={input}
          />
        </div>
      </div>
      <div>
        <label className={label}>PLACE</label>
        <PlaceSearch city={value.city} onPick={(city) => onChange({ ...value, city })} />
        {value.city && (
          <p className="text-xs text-crt-dim mt-1">
            {value.city.latitude.toFixed(2)}°, {value.city.longitude.toFixed(2)}° ·{" "}
            {value.city.timezone}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          placeholder="name to save as…"
          value={saveLabel}
          onChange={(e) => setSaveLabel(e.target.value)}
          className={input + " text-sm"}
        />
        <button
          type="button"
          disabled={!saveLabel || !value.city || !value.date}
          className={buttonGhost + " text-sm whitespace-nowrap"}
          onClick={() => {
            onSave(saveLabel);
            setSaveLabel("");
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

export { button };
