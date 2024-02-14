import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useDelay from "./index";

describe("useDelay", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should delay the execution of a callback function", async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDelay(callback, { manual: true }));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(callback).toHaveBeenCalled();
  });

  it("should delay the execution of a callback function with a custom delay", async () => {
    const callback = vi.fn();
    renderHook(() => useDelay(callback, { delay: 500 }));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(callback).toHaveBeenCalled();
  });

  it("should not execute the callback if unmounted", async () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useDelay(callback));

    unmount();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should return a runner function if manual is true", async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDelay(callback, { manual: true }));

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(callback).toHaveBeenCalled();
  });
});
