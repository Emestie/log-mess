import { beforeEach, describe, expect, it } from "vitest";
import { getId } from "../id";
import { getStore } from "../persistent";

describe("getId", () => {
    beforeEach(() => {
        // Reset getStore() state
        getStore().id.value = 0;
    });

    it("should return incrementing IDs", () => {
        expect(getId()).toBe(0);
        expect(getId()).toBe(1);
        expect(getId()).toBe(2);
    });

    it("should continue from current getStore() value", () => {
        getStore().id.value = 100;

        expect(getId()).toBe(100);
        expect(getId()).toBe(101);
    });

    it("should increment getStore() value after each call", () => {
        getId();
        expect(getStore().id.value).toBe(1);

        getId();
        expect(getStore().id.value).toBe(2);
    });
});

