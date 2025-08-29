export function getTag(
    tag: string | undefined,
    decoration?: { bg?: string; fg?: string }
): string[] {
    if (!tag) return [];
    if (navigator.userAgent.indexOf("Trident") !== -1) return [`[${tag}]`];

    const tagText = `%c ${tag} `;

    if (decoration?.bg || decoration?.fg)
        return [
            tagText,
            `background: ${decoration.bg || "white"}; color: ${decoration.fg || "black"};`,
        ];
    return [tagText, "border: 1px solid black;"];
}
