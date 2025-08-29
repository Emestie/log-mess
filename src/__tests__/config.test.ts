import { beforeEach, describe, expect, it } from "vitest";
import { disableTags, disableVariable, enableTags } from "../config";
import { store } from "../persistent";

describe("config", () => {
    beforeEach(() => {
        // Reset store state
        store.config.value = { t0: [], t1: [], v0: false };
    });

    describe("disableTags", () => {
        it("should add tags to disabled list", () => {
            disableTags(["DEBUG", "ERROR"]);

            expect(store.config.value.t0).toEqual(["DEBUG", "ERROR"]);
        });

        it("should append to existing disabled tags", () => {
            store.config.value.t0 = ["EXISTING"];

            disableTags(["NEW1", "NEW2"]);

            expect(store.config.value.t0).toEqual(["EXISTING", "NEW1", "NEW2"]);
        });

        it("should handle empty array", () => {
            disableTags([]);

            expect(store.config.value.t0).toEqual([]);
        });
    });

    describe("enableTags", () => {
        it("should add tags to enabled list", () => {
            enableTags(["INFO", "WARN"]);

            expect(store.config.value.t1).toEqual(["INFO", "WARN"]);
        });

        it("should append to existing enabled tags", () => {
            store.config.value.t1 = ["EXISTING"];

            enableTags(["NEW1", "NEW2"]);

            expect(store.config.value.t1).toEqual(["EXISTING", "NEW1", "NEW2"]);
        });

        it("should handle empty array", () => {
            enableTags([]);

            expect(store.config.value.t1).toEqual([]);
        });
    });

    describe("disableVariable", () => {
        it("should set v0 to true", () => {
            expect(store.config.value.v0).toBe(false);

            disableVariable();

            expect(store.config.value.v0).toBe(true);
        });

        it("should keep v0 true if already disabled", () => {
            store.config.value.v0 = true;

            disableVariable();

            expect(store.config.value.v0).toBe(true);
        });
    });
});

