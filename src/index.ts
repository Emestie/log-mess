import { logMessage } from "./message";

/**
 * @deprecated don't use this
 */
const logConfig = { set: (..._: any[]) => {} };

export * as LogConfig from "./config";
export { logMessage as lm, logConfig, logMessage };
