import { store } from "./persistent";
import { Configuration } from "./types";

export function set(configuration: Partial<Configuration>, options?: { lowPriority?: boolean }) {
    const cfgA = options?.lowPriority ? configuration : store.configuration.$value;
    const cfgB = options?.lowPriority ? store.configuration.$value : configuration;

    store.configuration.value = {
        ...cfgA,
        ...cfgB,
        decoration: { ...cfgA.decoration, ...cfgB.decoration },
    };
}

