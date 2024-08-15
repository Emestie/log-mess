export type LogMode = "both" | "console" | "variable" | "none";
export type Decoration = Record<string, { bgColor: string; fgColor: string }>;

export type Configuration = {
    mode?: LogMode;
    overrideMode?: (messageParams: {
        tag: string | undefined;
        value: any[];
    }) => LogMode | undefined;
    decoration: Decoration;
};

export type Message = { id: number; timestamp: number; value: any[]; tag: string | undefined };

