import { store } from "./persistent";

let tagDisabled: string[] | undefined;
let tagEnabled: string[] | undefined;
let variableDisabled: boolean | undefined;

export function isLog(tag: string | undefined, silent?: boolean): boolean {
    if (!tag) return true;
    if (getTagDisabled(tag)) return false;
    if (getTagEnabled(tag)) return true;
    if (store.config.value.t0.includes(tag)) return false;
    if (store.config.value.t1.includes(tag)) return true;
    return !silent;
}

export function isVariable(): boolean {
    return !(getVariableDisabled() || store.config.value.v0);
}

function getStorageValue<T>(
    key: string,
    defaultValue: T,
    transform: (value: string | null) => T
): T {
    try {
        return typeof window !== "undefined" ? transform(localStorage.getItem(key)) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function getVariableDisabled() {
    if (variableDisabled === undefined) {
        variableDisabled = getStorageValue("log-mess-variable-disabled", false, (value) => !!value);
    }
    return variableDisabled;
}

function getTagDisabled(tag: string) {
    if (tagDisabled === undefined) {
        tagDisabled = getStorageValue("log-mess-disabled", [], (value) => (value || "").split(","));
    }
    return tagDisabled.includes(tag);
}

function getTagEnabled(tag: string) {
    if (tagEnabled === undefined) {
        tagEnabled = getStorageValue("log-mess-enabled", [], (value) => (value || "").split(","));
    }
    return tagEnabled.includes(tag);
}

