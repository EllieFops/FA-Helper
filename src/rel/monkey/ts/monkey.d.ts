declare function GM_addStyle(css: string): void;
declare function GM_deleteValue(name: string): void;
declare function GM_listValues(): string[];
declare function GM_addValueChangeListener(name: string, func: Function): number;
declare function GM_removeValueChangeListener(id: number): void;
declare function GM_setValue(key: string, value: Object): void;
declare function GM_getValue(key: string, defVal: Object): Object;
declare function GM_log(message: string): void;
declare function GM_getResourceText(name: string): string;
declare function GM_getResourceURL(name: string): string;
declare function GM_registerMenuCommand(name: string, fn: Function, accessKey: {}): number;
declare function GM_unregisterMenuCommand(id: number): void;
declare function GM_openInTab(url: string, o: {active: boolean; insert: boolean;}|boolean): {close: Function; closed: boolean;}
declare function GM_xmlHTTPRequest(details: {}): XMLHttpRequest;
declare function GM_download(a: {url: string; name: string; headers: string; saveAs: boolean; onload: Function; onerror: Function}|string, name?: string);
declare function GM_getTab(cb: any): {};
declare function GM_saveTab(cb: any): void;
declare function GM_getTabs(cb: any): {}[];
declare function GM_notification(a: {}|string, b?: Function|string, c?:any, d?: Function): void;
declare function GM_setClipboard(data: string, info: {type: string; mimetype: string;}|string): void;
declare function GM_installScript(url: string, callback?: Function);
declare var GM_info: {};
