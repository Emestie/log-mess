import { persistentValue } from "persival";
import { Configuration, Message } from "./types";

const root = "_logMess";

const messages = persistentValue<Message[]>([], { name: "messages", root });
const configuration = persistentValue<Configuration>(
    { mode: "both", decoration: {} },
    { name: "configuration", root }
);

const store = { messages, configuration };

export { store };

