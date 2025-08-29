import { beforeEach, describe, expect, it, vi } from "vitest";
import { store } from "../persistent";

describe("availability", () => {
    let isLog: any;
    let isVariable: any;

    beforeEach(async () => {
        // Reset store state
        store.config.value = { t0: [], t1: [], v0: false };
        (localStorage.getItem as any).mockReturnValue(null);

        // Reset modules to clear internal caching
        vi.resetModules();

        // Re-import the module to get fresh instances
        const availabilityModule = await import("../availability");
        isLog = availabilityModule.isLog;
        isVariable = availabilityModule.isVariable;
    });

    describe("isLog", () => {
        it("should return true for undefined tag", () => {
            expect(isLog(undefined)).toBe(true);
        });

        it("should return false when tag is disabled in localStorage", () => {
            (localStorage.getItem as any).mockImplementation((key: string) => {
                if (key === "log-mess-disabled") return "DEBUG,ERROR";
                return null;
            });

            expect(isLog("DEBUG")).toBe(false);
            expect(isLog("ERROR")).toBe(false);
            expect(isLog("INFO")).toBe(true);
        });

        it("should return true when tag is enabled in localStorage", () => {
            (localStorage.getItem as any).mockImplementation((key: string) => {
                if (key === "log-mess-enabled") return "DEBUG,INFO";
                return null;
            });

            expect(isLog("DEBUG")).toBe(true);
            expect(isLog("INFO")).toBe(true);
            expect(isLog("ERROR")).toBe(true); // Not in enabled list, but not disabled either
        });

        it("should return false when tag is in config t0 (disabled)", () => {
            store.config.value.t0.push("DISABLED");

            expect(isLog("DISABLED")).toBe(false);
            expect(isLog("OTHER")).toBe(true);
        });

        it("should return true when tag is in config t1 (enabled)", () => {
            store.config.value.t1.push("ENABLED");

            expect(isLog("ENABLED")).toBe(true);
        });

        it("should respect silent parameter", () => {
            expect(isLog("UNKNOWN", true)).toBe(false);
            expect(isLog("UNKNOWN", false)).toBe(true);
        });

        it("should prioritize localStorage disabled over config", () => {
            (localStorage.getItem as any).mockImplementation((key: string) => {
                if (key === "log-mess-disabled") return "TEST";
                return null;
            });
            store.config.value.t1.push("TEST"); // Enable in config

            expect(isLog("TEST")).toBe(false); // Should be disabled due to localStorage
        });

        it("should prioritize localStorage enabled over config disabled", () => {
            (localStorage.getItem as any).mockImplementation((key: string) => {
                if (key === "log-mess-enabled") return "TEST";
                return null;
            });
            store.config.value.t0.push("TEST"); // Disable in config

            expect(isLog("TEST")).toBe(true); // Should be enabled due to localStorage
        });
    });

    describe("isVariable", () => {
        it("should return true by default", () => {
            expect(isVariable()).toBe(true);
        });

        it("should return false when disabled in localStorage", () => {
            (localStorage.getItem as any).mockImplementation((key: string) => {
                if (key === "log-mess-variable-disabled") return "true";
                return null;
            });

            expect(isVariable()).toBe(false);
        });

        it("should return false when disabled in config", () => {
            store.config.value.v0 = true;

            expect(isVariable()).toBe(false);
        });

        it("should return false when disabled in both localStorage and config", () => {
            (localStorage.getItem as any).mockImplementation((key: string) => {
                if (key === "log-mess-variable-disabled") return "true";
                return null;
            });
            store.config.value.v0 = true;

            expect(isVariable()).toBe(false);
        });
    });
});

