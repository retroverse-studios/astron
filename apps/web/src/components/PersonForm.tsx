import { formatCity, type City } from "@astron/atlas";
import { useEffect, useRef, useState } from "react";
import { getAtlas } from "../lib/astro";
import type { PersonDraft } from "../lib/compute";
import type { SavedPerson } from "../lib/people";
import { buttonGhost, input, label } from "./glyphs";

function PlaceSearch({
  city,
  onPick,
}: {
  city?: City;
  onPick: (c: City) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

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
        setActive(-1);
        setOpen(true);
      }
    }, 120);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [query]);

  function pick(c: City) {
    onPick(c);
    setQuery("");
    setOpen(false);
  }

  return (
    <div
      ref={boxRef}
      className="relative"
      onBlur={(e) => {
        if (!boxRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          else if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, -1));
          } else if (e.key === "Enter" && active >= 0 && results[active]) {
            e.preventDefault();
            pick(results[active]);
          }
        }}
        placeholder={city ? formatCity(city) : "city of birth…"}
        className={input}
        role="combobox"
        aria-expanded={open}
        aria-label="City search"
      />
      {open && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-crt-panel border border-crt-line rounded max-h-56 overflow-auto"
        >
          {results.map((c, i) => (
            <li key={i} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={
                  "w-full text-left px-3 py-1.5 text-sm " +
                  (i === active ? "bg-crt-line/60" : "hover:bg-crt-line/40")
                }
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(c)}
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
  onRemove,
}: {
  title: string;
  value: PersonDraft;
  onChange: (v: PersonDraft) => void;
  people: SavedPerson[];
  onSave: (label: string) => void;
  onRemove?: (id: string) => void;
}) {
  const [saveLabel, setSaveLabel] = useState("");
  const [selectedId, setSelectedId] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs tracking-widest text-crt-dim">{title}</span>
        {people.length > 0 && (
          <span className="flex items-baseline gap-2">
            <select
              className="bg-crt-bg border border-crt-line rounded px-2 py-1 text-xs text-crt-text"
              value={selectedId}
              aria-label="Saved charts"
              onChange={(e) => {
                setSelectedId(e.target.value);
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
            {onRemove && selectedId && (
              <button
                type="button"
                className="text-xs text-red-400 underline whitespace-nowrap"
                onClick={() => {
                  onRemove(selectedId);
                  setSelectedId("");
                }}
              >
                delete saved
              </button>
            )}
          </span>
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
        <PlaceSearch
          city={value.city}
          onPick={(city) => onChange({ ...value, city })}
        />
        {value.city && (
          <p className="text-xs text-crt-dim mt-1">
            {value.city.latitude.toFixed(2)}°, {value.city.longitude.toFixed(2)}
            ° · {value.city.timezone}
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
