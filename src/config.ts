import { store } from "./persistent";

export function disableTags(tags: string[]) {
    store.config.value.t0.push(...tags);
}

export function enableTags(tags: string[]) {
    store.config.value.t1.push(...tags);
}

export function disableVariable() {
    store.config.value.v0 = true;
}
