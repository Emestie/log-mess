import { beforeEach, describe, expect, it } from "vitest";
import { getId } from "../id";
import { store } from "../persistent";

describe("getId", () => {
    beforeEach(() => {
        // Reset store state
        store.id.value = 0;
    });

    it("should return incrementing IDs", () => {
        expect(getId()).toBe(0);
        expect(getId()).toBe(1);
        expect(getId()).toBe(2);
    });

    it("should continue from current store value", () => {
        store.id.value = 100;

        expect(getId()).toBe(100);
        expect(getId()).toBe(101);
    });

    it("should increment store value after each call", () => {
        getId();
        expect(store.id.value).toBe(1);

        getId();
        expect(store.id.value).toBe(2);
    });
});

