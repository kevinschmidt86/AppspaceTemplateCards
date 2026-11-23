// Types for the parts of Appspace CardAPI v1.9.0 (public/lib/cardapi.js) this template uses.
// CardAPI returns jQuery Deferreds; they are thenable, so `await` works.

export interface ModelInput {
  name: string;
  value?: unknown;
  [key: string]: unknown;
}

export interface CardModel {
  inputs: ModelInput[];
  customData?: unknown;
}

export interface HostMessage {
  message?: string;
  [key: string]: unknown;
}

export interface HttpResponse {
  url: string;
  data: unknown;
  status: number;
  headers: Record<string, string>;
}

export interface CacsTokenInfo {
  token: string;
  serviceUrls: Record<string, string>;
  expireTimestamp: number;
}

export interface RequestSettings {
  method?: string;
  headers?: Record<string, string>;
  data?: unknown;
  contentType?: string | false;
  dataType?: string;
  timeout?: number;
}

export interface CardApi {
  PLAYBACKCONTEXT: Record<
    "EDIT" | "THEME" | "SCREENSHOT" | "THEMESCREENSHOT" | "DEVICE" | "NONE" | "PREVIEW",
    string
  >;
  init(): void;
  isReady(): PromiseLike<unknown>;
  subscribeModelUpdate(cb: (model: CardModel) => void): void;
  subscribeToMessages(cb: (msg: HostMessage) => void): void;
  getModel(): CardModel;
  getModelProperty(name: string): ModelInput | null;
  getPlaybackContext(): string;
  getConfig(): Record<string, unknown>;
  notifyOnLoad(): void;
  notifyOnError(): void;
  notifyOnComplete(): void;
  api: {
    httpRequest(url: string, settings?: RequestSettings): PromiseLike<HttpResponse>;
    getCacsToken(context: string): PromiseLike<CacsTokenInfo>;
    requestCloudService(
      serviceName: string,
      relativeUrl: string,
      settings?: RequestSettings & { sendFullResponse?: boolean },
    ): PromiseLike<unknown>;
    hasConstellationTokens(): boolean;
  };
}

declare global {
  const $cardApi: CardApi;
  const jQuery: { param(obj: Record<string, unknown>): string };
}
