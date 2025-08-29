import { persistentValue } from "persival";
import { Config, Message } from "./types";

const root = "_logMess";

const messages = persistentValue<Message[]>([], { name: "messages", root });
const config = persistentValue<Config>({ t0: [], t1: [], v0: false }, { name: "config", root });
const id = persistentValue<number>(0, { name: "id", root });

const store = { messages, config, id };

export { store };
