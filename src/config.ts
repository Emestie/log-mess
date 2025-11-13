import { getStore } from "./persistent";

export function disableTags(tags: string[]) {
    getStore().config.value.t0.push(...tags);
}

export function enableTags(tags: string[]) {
    getStore().config.value.t1.push(...tags);
}

export function disableVariable() {
    getStore().config.value.v0 = true;
}
