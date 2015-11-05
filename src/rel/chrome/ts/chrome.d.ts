declare interface StorageArea {
  get(keys: string|string[]|{}, callback: Function): Object;
  getBytesInUse(keys: string|string[], callback: Function): number;
  set(items: {}, callback?: Function): void;
  remove(keys: string|string[], callback?: Function): void;
  clear(callback?: Function): void;
}

declare interface Tab{}
declare interface ZoomSettings{}

declare var chrome: {
  accessibilityFeatures: {};
  alarms: {};
  bookmarks: {};
  browserAction: {};
  browsingData: {};
  certificateProvider: {};
  commands: {};
  contentSettings: {};
  contextMenus: {};
  cookies: {};
  "debugger": {};
  declarativeContent: {};
  desktopCapture: {};
  devtools: {};
  documentScan: {};
  downloads: {};
  enterprise: {};
  events: {};
  extension: {};
  extensionTypes: {};
  fileBrowserHandler: {};
  fileSystemProvider: {};
  fontSettings: {};
  gcm: {};
  history: {};
  i18n: {};
  identity: {};
  idle: {};
  input: {};
  instanceId: {};
  management: {};
  networking: {};
  notifications: {};
  omnibox: {};
  pageAction: {};
  pageCapture: {};
  permissions: {};
  platformKeys: {};
  power: {};
  printerProvider: {};
  privacy: {};
  proxy: {};
  runtime: {};
  sessions: {};
  storage: {
    sync: StorageArea;
    managed: StorageArea;
    local: StorageArea;
  };
  system: {};
  tabCapture: {};
  tabs: {
    get(tabId: number, callback: Function): Tab;
    getCurrent(callback: Function): Tab;
    connect(tabId: number, connectInfo?: Object): void;
    sendRequest(tabId: number, request: any, responseCallback?: Function): void;
    sendMessage(tabId: number, message: any, options?: Object, responseCallback?: Function): void;
    getSelected(windowId: number, callback: Function): Tab;
    getAllInWindow(windowId: number, callback: Function): Tab[];
    create(createProperties: Object, callback?: Function): Tab;
    duplicate(tabId: number, callback?: Function): void;
    query(queryInfo: Object, callback: Function): void;
    highlight(highlightInfo: Object, callback?: Function): void;
    update(tabId: number, updateProperties: Object, callback?: Function): void;
    move(tabId: number|number[], moveProperties: Object, callback?: Function): void;
    reload(tabId: number, reloadProperties?: Object, callback?: Function): void;
    remove(tabId: number|number[], callback?: Function): void;
    detectLanguage(tabId: number, callback: Function): void;
    captureVisibleTab(window: number, option: Object, callback: Function): void;
    executeScript(tabId: number, details: Object, callback?: Function): void;
    insertCSS(tabId: number, details: Object, callback?: Function): void;
    setZoom(tabId: number, zoomFactor: number, callback?: Function): void;
    getZoom(tabId: number, callback: Function): number;
    setZoomSettings(tabId: number, zoomSettings: ZoomSettings, callback?: Function): void;
    getZoomSettings(tabId: number, callback: Function): ZoomSettings;
  };
  topSites: {};
  tts: {};
  ttsEngine: {};
  types: {};
  vpnProvider: {};
  wallpaper: {};
  webNavigation: {};
  webRequest: {};
  webstore: {};
  windows: {};
};
