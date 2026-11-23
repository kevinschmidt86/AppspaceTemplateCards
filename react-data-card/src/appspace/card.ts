import { useEffect, useState } from "react";
import type { CardModel, HostMessage } from "./cardApi";

export interface CardState {
  model: CardModel;
  context: string;
  playing: boolean;
}

type Listener = (s: CardState) => void;

let state: CardState = { model: { inputs: [] }, context: "none", playing: false };
const listeners = new Set<Listener>();
let started = false;

function emit(patch: Partial<CardState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

// Wire CardAPI exactly once: model updates (initial model.json + console edits)
// and host messages (api.init / play / pause).
export function startCard(): void {
  if (started) return;
  started = true;
  $cardApi.subscribeModelUpdate(() => {
    Promise.resolve($cardApi.isReady()).then(() =>
      emit({ model: $cardApi.getModel(), context: $cardApi.getPlaybackContext() })
    );
  });
  $cardApi.subscribeToMessages((msg: HostMessage) => {
    const m = String(msg?.message ?? "").toLowerCase();
    if (m === "play") emit({ playing: true });
    if (m === "pause") emit({ playing: false });
  });
  $cardApi.init();
  // Outside Appspace (context "none") no host sends 'play': start playing once ready.
  Promise.resolve($cardApi.isReady()).then(() => {
    if ($cardApi.getPlaybackContext() === $cardApi.PLAYBACKCONTEXT.NONE) {
      emit({ playing: true });
    }
  });
}

export function useCard(): CardState {
  const [s, setS] = useState(state);
  useEffect(() => {
    listeners.add(setS);
    setS(state);
    return () => {
      listeners.delete(setS);
    };
  }, []);
  return s;
}

export function input<T = string>(model: CardModel, name: string, fallback: T): T {
  const v = model.inputs.find((i) => i.name.toLowerCase() === name.toLowerCase())?.value;
  return v === undefined || v === null || v === "" ? fallback : (v as T);
}

let loadedSent = false;
// Tell the host the card is ready to show. Call once, after first meaningful render.
export function notifyLoaded(): void {
  if (loadedSent) return;
  loadedSent = true;
  $cardApi.notifyOnLoad();
}

export function notifyError(): void {
  if (loadedSent) return;
  loadedSent = true;
  $cardApi.notifyOnError();
}
