export function getTag(
    tag: string | undefined,
    decoration?: { bg?: string; fg?: string; border?: string }
): string[] {
    if (!tag) return [];
    if (navigator.userAgent.indexOf("Trident") !== -1) return [`[${tag}]`];

    const tagText = `%c ${tag} `;
    const needDefaultBorder = !decoration?.bg && !decoration?.fg;

    return [
        tagText,
        `background:${decoration?.bg || "white"};` +
            `color:${decoration?.fg || "black"};` +
            (needDefaultBorder || decoration.border
                ? `border:1px solid ${decoration?.border || "black"};`
                : ""),
    ];
}
