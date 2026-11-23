import { useEffect } from "react";
import { input, notifyError, notifyLoaded, useCard } from "./appspace/card";
import { pick, type FetchMode } from "./appspace/data";
import { useData } from "./appspace/useData";

type Item = Record<string, unknown>;

export default function App() {
  const { model, context, playing } = useCard();
  const ready = model.inputs.length > 0;
  const headline = input(model, "headline", "");
  const dataUrl = input(model, "dataUrl", "");
  const mode = input<FetchMode>(model, "fetchMode", "proxy");
  const itemsPath = input(model, "itemsPath", "");
  const titleField = input(model, "titleField", "title");
  const subtitleField = input(model, "subtitleField", "subtitle");
  const refresh = Number(input(model, "refreshSeconds", "300")) || 300;

  const { data, error, stale } = useData(ready ? dataUrl : "", mode, refresh);
  const list = pick(data, itemsPath);
  const items: Item[] = Array.isArray(list) ? (list as Item[]) : [];

  // Report to the host once: loaded after the first data (or cached data) renders,
  // error if the very first fetch fails with nothing to show.
  useEffect(() => {
    if (!ready) return;
    if (data !== null) notifyLoaded();
    else if (error) notifyError();
  }, [ready, data, error]);

  const editing = context === $cardApi.PLAYBACKCONTEXT.EDIT;

  return (
    <main className={`card ${playing ? "is-playing" : "is-paused"}`}>
      {headline && <h1 className="headline">{headline}</h1>}
      {data === null && !error && <p className="status">Loading…</p>}
      {data === null && error && <p className="status error">{error}</p>}
      {data !== null && items.length === 0 && (
        <p className="status">No items at “{itemsPath || "(top level)"}”.</p>
      )}
      <ul className="items">
        {items.map((it, i) => (
          <li key={i} className="item" style={{ animationDelay: `${i * 120}ms` }}>
            <span className="title">{String(it[titleField] ?? "")}</span>
            <span className="subtitle">{String(it[subtitleField] ?? "")}</span>
          </li>
        ))}
      </ul>
      {stale && <p className="stale">Showing cached data{editing && error ? `: ${error}` : ""}</p>}
    </main>
  );
}
