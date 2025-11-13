import { getStore } from "./persistent";

export function getId() {
    return getStore().id.value++;
}
