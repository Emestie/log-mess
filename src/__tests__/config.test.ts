import { beforeEach, describe, expect, it } from "vitest";
import { disableTags, disableVariable, enableTags } from "../config";
import { getStore } from "../persistent";

describe("config", () => {
    beforeEach(() => {
        // Reset getStore() state
        getStore().config.value = { t0: [], t1: [], v0: false };
    });

    describe("disableTags", () => {
        it("should add tags to disabled list", () => {
            disableTags(["DEBUG", "ERROR"]);

            expect(getStore().config.value.t0).toEqual(["DEBUG", "ERROR"]);
        });

        it("should append to existing disabled tags", () => {
            getStore().config.value.t0 = ["EXISTING"];

            disableTags(["NEW1", "NEW2"]);

            expect(getStore().config.value.t0).toEqual(["EXISTING", "NEW1", "NEW2"]);
        });

        it("should handle empty array", () => {
            disableTags([]);

            expect(getStore().config.value.t0).toEqual([]);
        });
    });

    describe("enableTags", () => {
        it("should add tags to enabled list", () => {
            enableTags(["INFO", "WARN"]);

            expect(getStore().config.value.t1).toEqual(["INFO", "WARN"]);
        });

        it("should append to existing enabled tags", () => {
            getStore().config.value.t1 = ["EXISTING"];

            enableTags(["NEW1", "NEW2"]);

            expect(getStore().config.value.t1).toEqual(["EXISTING", "NEW1", "NEW2"]);
        });

        it("should handle empty array", () => {
            enableTags([]);

            expect(getStore().config.value.t1).toEqual([]);
        });
    });

    describe("disableVariable", () => {
        it("should set v0 to true", () => {
            expect(getStore().config.value.v0).toBe(false);

            disableVariable();

            expect(getStore().config.value.v0).toBe(true);
        });

        it("should keep v0 true if already disabled", () => {
            getStore().config.value.v0 = true;

            disableVariable();

            expect(getStore().config.value.v0).toBe(true);
        });
    });
});
