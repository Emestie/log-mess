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

function getVariableDisabled() {
    if (variableDisabled === undefined)
        variableDisabled = !!localStorage.getItem("log-mess-variable-disabled");
    return variableDisabled;
}

function getTagDisabled(tag: string) {
    if (tagDisabled === undefined)
        tagDisabled = (localStorage.getItem("log-mess-disabled") || "").split(",");
    return tagDisabled.includes(tag);
}

function getTagEnabled(tag: string) {
    if (tagEnabled === undefined)
        tagEnabled = (localStorage.getItem("log-mess-enabled") || "").split(",");
    return tagEnabled.includes(tag);
}
