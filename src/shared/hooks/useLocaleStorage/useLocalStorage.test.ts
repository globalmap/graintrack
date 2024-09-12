import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect } from "vitest";
import { useLocalStorage } from "./useLocaleStorage";

describe("useLocalStorage", () => {
  it("should initialize with the value from localStorage or initial value", () => {
    window.localStorage.setItem("test-key", JSON.stringify("stored value"));
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial value"),
    );

    expect(result.current[0]).toBe("stored value");
  });

  it("should initialize with the initial value if localStorage is empty", () => {
    window.localStorage.removeItem("test-key");
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial value"),
    );

    expect(result.current[0]).toBe("initial value");
  });

  it("should update localStorage when setValue is called", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial value"),
    );

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(window.localStorage.getItem("test-key")).toBe(
      JSON.stringify("new value"),
    );
  });
});
