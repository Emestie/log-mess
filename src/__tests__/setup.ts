import { beforeEach, vi } from "vitest";

// Mock localStorage for testing
Object.defineProperty(window, "localStorage", {
    value: { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(), clear: vi.fn() },
    writable: true,
});

// Mock navigator for testing
Object.defineProperty(window, "navigator", {
    value: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    writable: true,
});

// Reset mocks before each test
beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage mock
    (localStorage.getItem as any).mockReturnValue(null);
});

