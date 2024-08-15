import { idGenerator } from "./id";
import { store } from "./persistent";
import { getTag } from "./tag";

type LogMessageReturn = { update: (...value: any[]) => void; remove: () => void };
type LogMessageMeta = { tag?: string };

export function logMessage(tag: string | undefined, ...value: any[]): LogMessageReturn;
export function logMessage(meta: LogMessageMeta, ...value: any[]): LogMessageReturn;
export function logMessage(
    tagOrMeta: string | undefined | LogMessageMeta,
    ...value: any[]
): LogMessageReturn {
    const tag = typeof tagOrMeta === "object" ? tagOrMeta.tag : tagOrMeta;

    const overrideMode = store.configuration.$value.overrideMode;
    const logMode = overrideMode?.({ tag, value }) ?? store.configuration.$value.mode ?? "both";

    const id = idGenerator.next().value;

    if (logMode === "both" || logMode === "variable") {
        store.messages.value.push({ id, tag, timestamp: Date.now(), value });
    }

    if (logMode === "both" || logMode === "console") {
        console.log(...getTag(tag, store.configuration.$value.decoration), ...value);
    }

    return {
        update: (...value: any[]) => updateLogMessage(id, ...value),
        remove: () => removeLogMessage(id),
    };
}

function removeLogMessage(id: number) {
    store.messages.value = store.messages.$value.filter((x) => x.id !== id);
}

function updateLogMessage(id: number, ...value: any[]) {
    // to update tag/meta - create separate fn
    const index = store.messages.value.findIndex((x) => x.id === id);

    if (index === -1) return;

    store.messages.value[index].value = value;
}

