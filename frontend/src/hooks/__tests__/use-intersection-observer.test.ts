import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { useIntersectionObserver } from "../use-intersection-observer";

describe("useIntersectionObserver", () => {
  let observerCallback:
    | ((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void)
    | null = null;
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeAll(() => {
    global.IntersectionObserver = vi.fn().mockImplementation(function (
      callback: IntersectionObserverCallback
    ) {
      observerCallback = callback as unknown as (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => void;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        root: null,
        rootMargin: "",
        thresholds: [],
        takeRecords: vi.fn(),
      } satisfies IntersectionObserver;
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    observerCallback = null;
  });

  it("should return initial state with all values falsy/null", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useIntersectionObserver(ref);
    });

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.hasIntersected).toBe(false);
    expect(result.current.entry).toBeNull();
  });

  it("should accept options object", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useIntersectionObserver(ref, {
        threshold: 0.5,
        rootMargin: "10px",
        triggerOnce: true,
      });
    });

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.hasIntersected).toBe(false);
    expect(result.current).toBeDefined();
  });

  it("should return correct types", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useIntersectionObserver(ref);
    });

    expect(typeof result.current.isIntersecting).toBe("boolean");
    expect(typeof result.current.hasIntersected).toBe("boolean");
    expect(result.current.entry === null || typeof result.current.entry === "object").toBe(true);
  });

  it("should track intersection updates and call observer methods", () => {
    const element = document.createElement("div");
    const ref = { current: element };

    const { result } = renderHook(() => useIntersectionObserver(ref));

    // When ref.current is defined and useEffect runs, it should observe the element
    expect(mockObserve).toHaveBeenCalledWith(element);

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.hasIntersected).toBe(false);

    const mockEntry = {
      isIntersecting: true,
      target: element,
    } as unknown as IntersectionObserverEntry;

    // Simulate element entering the viewport
    act(() => {
      if (observerCallback) {
        observerCallback([mockEntry], {} as IntersectionObserver);
      }
    });

    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.hasIntersected).toBe(true);
    expect(result.current.entry).toBe(mockEntry);

    const mockLeaveEntry = {
      isIntersecting: false,
      target: element,
    } as unknown as IntersectionObserverEntry;

    // Simulate element leaving the viewport
    act(() => {
      if (observerCallback) {
        observerCallback([mockLeaveEntry], {} as IntersectionObserver);
      }
    });

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.hasIntersected).toBe(true); // Should remain true as it intersected once
    expect(result.current.entry).toBe(mockLeaveEntry);
  });

  it("should unobserve after first intersection when triggerOnce is true", () => {
    const element = document.createElement("div");
    const ref = { current: element };

    const { result } = renderHook(() => useIntersectionObserver(ref, { triggerOnce: true }));

    const mockEntry = {
      isIntersecting: true,
      target: element,
    } as unknown as IntersectionObserverEntry;

    // Simulate intersection
    act(() => {
      if (observerCallback) {
        observerCallback([mockEntry], {} as IntersectionObserver);
      }
    });

    expect(result.current.isIntersecting).toBe(true);
    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });

  it("should disconnect observer on unmount", () => {
    const element = document.createElement("div");
    const ref = { current: element };

    const { unmount } = renderHook(() => useIntersectionObserver(ref));

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
