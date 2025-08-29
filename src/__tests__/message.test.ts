import { beforeEach, describe, expect, it, vi } from "vitest";
import { logMessage } from "../message";
import { store } from "../persistent";

// Mock console.log
const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("logMessage", () => {
    beforeEach(() => {
        // Reset store state
        store.messages.value = [];
        store.config.value = { t0: [], t1: [], v0: false };
        store.id.value = 0;
        mockConsoleLog.mockClear();
        (localStorage.getItem as any).mockReturnValue(null);
    });

    it("should log a simple message without tag", () => {
        const result = logMessage(undefined, "Hello", "World");

        expect(mockConsoleLog).toHaveBeenCalledWith("Hello", "World");
        expect(store.messages.value).toHaveLength(1);
        expect(store.messages.value[0]).toMatchObject({
            id: 0,
            tag: undefined,
            value: ["Hello", "World"],
        });
        expect(result).toHaveProperty("update");
        expect(result).toHaveProperty("remove");
    });

    it("should log a message with tag", () => {
        const result = logMessage("DEBUG", "Test message");

        expect(mockConsoleLog).toHaveBeenCalled();
        expect(store.messages.value).toHaveLength(1);
        expect(store.messages.value[0]).toMatchObject({
            id: 0,
            tag: "DEBUG",
            value: ["Test message"],
        });
    });

    it("should log a message with meta object", () => {
        const meta = { tag: "INFO", bg: "blue", fg: "white" };
        const result = logMessage(meta, "Info message");

        expect(mockConsoleLog).toHaveBeenCalled();
        expect(store.messages.value).toHaveLength(1);
        expect(store.messages.value[0]).toMatchObject({
            id: 0,
            tag: "INFO",
            value: ["Info message"],
        });
    });

    it("should not log when tag is disabled in config", () => {
        store.config.value.t0.push("DISABLED");

        logMessage("DISABLED", "This should not log");

        expect(mockConsoleLog).not.toHaveBeenCalled();
        expect(store.messages.value).toHaveLength(1); // Still stored in messages
    });

    it("should log when tag is enabled in config", () => {
        store.config.value.t1.push("ENABLED");

        logMessage("ENABLED", "This should log");

        expect(mockConsoleLog).toHaveBeenCalled();
        expect(store.messages.value).toHaveLength(1);
    });

    it("should not log when silent is true", () => {
        const meta = { tag: "SILENT", silent: true };

        logMessage(meta, "Silent message");

        expect(mockConsoleLog).not.toHaveBeenCalled();
        expect(store.messages.value).toHaveLength(1); // Still stored
    });

    it("should update message value", () => {
        const result = logMessage("TEST", "Original");

        result.update("Updated", "Value");

        expect(store.messages.value[0].value).toEqual(["Updated", "Value"]);
    });

    it("should remove message", () => {
        const result = logMessage("TEST", "To be removed");

        expect(store.messages.value).toHaveLength(1);

        result.remove();

        expect(store.messages.value).toHaveLength(0);
    });

    it("should handle multiple messages with different IDs", () => {
        const msg1 = logMessage("TAG1", "Message 1");
        const msg2 = logMessage("TAG2", "Message 2");

        expect(store.messages.value).toHaveLength(2);
        expect(store.messages.value[0].id).toBe(0);
        expect(store.messages.value[1].id).toBe(1);

        msg1.remove();

        expect(store.messages.value).toHaveLength(1);
        expect(store.messages.value[0].id).toBe(1);
    });

    it("should not update non-existent message", () => {
        const result = logMessage("TEST", "Original");
        result.remove(); // Remove the message first

        // Try to update after removal - should not throw
        expect(() => result.update("Should not work")).not.toThrow();
    });
});

