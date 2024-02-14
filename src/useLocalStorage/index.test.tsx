import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useLocalStoraga from ".";

type LocalStorageType = {
  token: string;
  user: { name: string };
  count: number;
};

const getItemMock = vi.fn();
const setItemMock = vi.fn();
const removeItemMock = vi.fn();
const clearMock = vi.fn();

const mockedValue = {
  getItem: getItemMock,
  setItem: setItemMock,
  removeItem: removeItemMock,
  clear: clearMock,
};

Object.defineProperty(window, "localStorage", {
  value: mockedValue,
});

describe("useLocalStoraga<LocalStorageType>", () => {
  it("should return the value imadiatly", () => {
    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    expect(result.current.getItem).toBeInstanceOf(Function);
    expect(result.current.setItem).toBeInstanceOf(Function);
    expect(result.current.removeItem).toBeInstanceOf(Function);
    expect(result.current.hasItem).toBeInstanceOf(Function);
    expect(result.current.clear).toBeInstanceOf(Function);
  });

  it("should call localStorage.getItem", () => {
    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    act(() => {
      result.current.getItem("token");
    });

    expect(getItemMock).toBeCalledWith("token");
  });

  it("should call localStorage.setItem", () => {
    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    act(() => {
      result.current.setItem("token", "123");
    });

    expect(setItemMock).toBeCalledWith("token", JSON.stringify("123"));
  });

  it("should call localStorage.removeItem", () => {
    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    act(() => {
      result.current.removeItem("token");
    });

    expect(removeItemMock).toBeCalledWith("token");
  });

  it("should call localStorage.hasItem", () => {
    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    act(() => {
      result.current.hasItem("token");
    });

    expect(getItemMock).toBeCalledWith("token");
  });

  it("should call localStorage.clear", () => {
    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    act(() => {
      result.current.clear();
    });

    expect(clearMock).toBeCalled();
  });

  it("should return null if localStorage.getItem returns null", () => {
    getItemMock.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    expect(result.current.getItem("token")).toBeNull();
  });

  it("should return the parsed value if localStorage.getItem returns a string", () => {
    getItemMock.mockReturnValue(JSON.stringify("123"));

    const { result } = renderHook(() => useLocalStoraga<LocalStorageType>());

    expect(result.current.getItem("token")).toBe("123");
  });

  it("should throw an error if localStorage is not available", () => {
    Object.defineProperty(window, "localStorage", { value: null });

    expect(() =>
      renderHook(() => useLocalStoraga<LocalStorageType>())
    ).toThrowError("useLocalStorage is a client only hook");

    Object.defineProperty(window, "localStorage", { value: mockedValue });
  });
});
