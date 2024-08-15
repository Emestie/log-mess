import { Decoration } from "./types";

export function getTag(tag: string | undefined, decoration: Decoration): string[] {
    if (!tag) return [];

    if (navigator.userAgent.indexOf("Trident") !== -1) {
        return [`[${tag}]`];
    }

    const tagText = `%c ${tag} `;

    if (decoration[tag])
        return [
            tagText,
            `background: ${decoration[tag].bgColor}; color: ${decoration[tag].fgColor};`,
        ];

    return [tagText, "border: 1px solid black;"];
}

