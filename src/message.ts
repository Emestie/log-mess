import { isLog, isVariable } from "./availability";
import { getId } from "./id";
import { getStore } from "./persistent";
import { getTag } from "./tag";

type LogMessageReturn = { update: (...value: any[]) => void; remove: () => void };
type LogMessageMeta = { tag?: string; bg?: string; fg?: string; border?: string; silent?: boolean };

export function logMessage(tag: string | undefined, ...value: any[]): LogMessageReturn;
export function logMessage(meta: LogMessageMeta, ...value: any[]): LogMessageReturn;
export function logMessage(
    tagOrMeta: string | undefined | LogMessageMeta,
    ...value: any[]
): LogMessageReturn {
    const omode = typeof tagOrMeta === "object";
    const tag = omode ? tagOrMeta.tag : tagOrMeta;
    const meta = omode ? tagOrMeta : undefined;
    const id = getId();
    const store = getStore();

    if (isVariable()) store.messages.value.push({ id, tag, timestamp: Date.now(), value });
    if (isLog(tag, meta?.silent)) console.log(...getTag(tag, meta), ...value);

    return {
        update: (...value: any[]) => {
            const index = store.messages.value.findIndex((x) => x.id === id);
            if (index === -1) return;
            store.messages.value[index].value = value;
        },
        remove: () => {
            store.messages.value = store.messages.$value.filter((x) => x.id !== id);
        },
    };
}
