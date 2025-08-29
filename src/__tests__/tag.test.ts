import { beforeEach, describe, expect, it } from "vitest";
import { getTag } from "../tag";

describe("getTag", () => {
    beforeEach(() => {
        // Reset navigator mock
        Object.defineProperty(window, "navigator", {
            value: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
            writable: true,
        });
    });

    it("should return empty array for undefined tag", () => {
        const result = getTag(undefined);

        expect(result).toEqual([]);
    });

    it("should return basic tag format for modern browsers", () => {
        const result = getTag("DEBUG");

        expect(result).toEqual(["%c DEBUG ", "border: 1px solid black;"]);
    });

    it("should return custom colors when decoration is provided", () => {
        const decoration = { bg: "red", fg: "white" };
        const result = getTag("ERROR", decoration);

        expect(result).toEqual(["%c ERROR ", "background: red; color: white;"]);
    });

    it("should use default colors when only bg is provided", () => {
        const decoration = { bg: "blue" };
        const result = getTag("INFO", decoration);

        expect(result).toEqual(["%c INFO ", "background: blue; color: black;"]);
    });

    it("should use default colors when only fg is provided", () => {
        const decoration = { fg: "green" };
        const result = getTag("SUCCESS", decoration);

        expect(result).toEqual(["%c SUCCESS ", "background: white; color: green;"]);
    });

    it("should return simple format for Internet Explorer", () => {
        Object.defineProperty(window, "navigator", {
            value: { userAgent: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)" },
            writable: true,
        });

        const result = getTag("DEBUG");

        expect(result).toEqual(["[DEBUG]"]);
    });

    it("should return simple format for IE even with decoration", () => {
        Object.defineProperty(window, "navigator", {
            value: {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
            },
            writable: true,
        });

        const decoration = { bg: "red", fg: "white" };
        const result = getTag("ERROR", decoration);

        expect(result).toEqual(["[ERROR]"]);
    });
});

