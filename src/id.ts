import { store } from "./persistent";

export function getId() {
    return store.id.value++;
}
