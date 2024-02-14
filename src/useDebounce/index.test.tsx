import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useDebounce from ".";

type UseDebounceProps = Partial<{ value: string; delay: number }>;

describe("useDebounce", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return the value imadiatly", () => {
    const { result } = renderHook(() => useDebounce("test"));

    expect(result.current).toBe("test");
  });

  it("should return the value after the delay", () => {
    const { result, rerender } = renderHook(
      (props: UseDebounceProps) => useDebounce(props.value, props.delay),
      {
        initialProps: { value: "test", delay: 1000 },
      }
    );

    expect(result.current).toBe("test");

    rerender({ value: "new value", delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("new value");
  });

  it("should use the default delay", () => {
    const { result, rerender } = renderHook(
      (props: UseDebounceProps) => useDebounce(props.value, props.delay),
      {
        initialProps: { value: "test" },
      }
    );

    expect(result.current).toBe("test");

    rerender({ value: "new value" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("new value");
  });

  it("should use the new delay", () => {
    const { result, rerender } = renderHook(
      (props: UseDebounceProps) => useDebounce(props.value, props.delay),
      {
        initialProps: { value: "test", delay: 2000 },
      }
    );

    expect(result.current).toBe("test");

    rerender({ value: "new value", delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("test");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("new value");

    rerender({ value: "new new value", delay: 5000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).not.toBe("new new value");

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(result.current).toBe("new new value");
  });
});
