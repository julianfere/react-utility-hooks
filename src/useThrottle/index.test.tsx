import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useThrottle from "./index";

type UseThrottleProps = Partial<{ value: number; delay: number }>;

describe("useThrottle", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return the value immediately", () => {
    const { result } = renderHook(
      (props: UseThrottleProps) => useThrottle(props.value),
      {
        initialProps: { value: 0 },
      }
    );

    expect(result.current).toBe(0);
  });

  it("should return the value after the delay", () => {
    const { result, rerender } = renderHook(
      (props: UseThrottleProps) => useThrottle(props.value, props.delay),
      {
        initialProps: { value: 0, delay: 1000 },
      }
    );

    expect(result.current).toBe(0);

    rerender({ value: 1, delay: 1000 });

    rerender({ value: 1, delay: 1000 });
    rerender({ value: 2, delay: 1000 });
    rerender({ value: 3, delay: 1000 });

    act(() => vi.advanceTimersByTime(1000));

    expect(result.current).toBe(3);
  });

  it("should use the default delay", () => {
    const { result, rerender } = renderHook(
      (props: UseThrottleProps) => useThrottle(props.value, props.delay),
      {
        initialProps: { value: 0 },
      }
    );

    expect(result.current).toBe(0);

    rerender({ value: 1 });

    act(() => vi.advanceTimersByTime(500));

    expect(result.current).toBe(1);

    rerender({ value: 1 });
    rerender({ value: 2 });
    rerender({ value: 3 });

    act(() => vi.advanceTimersByTime(1000));

    expect(result.current).toBe(3);
  });
});
