import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, beforeEach } from "vitest";
import { container } from "tsyringe";
import { AuthService } from "../../../core/api/authService"; // Adjust the import path as needed
import { useAuth } from "./useAuth"; // Adjust the import path as needed
import { MockAuthService } from "./MockAuthService";

// Register the mock service before each test
beforeEach(() => {
  container.registerSingleton(AuthService, MockAuthService);
});

describe("useAuth", () => {
  it("should initialize with no current user", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.currentUser).toBeNull();
  });

  it("should update currentUser on login", () => {
    const { result } = renderHook(() => useAuth());
    const authService = container.resolve(AuthService) as MockAuthService;

    act(() => {
      authService.login("user", "pass");
    });

    expect(result.current.currentUser).toEqual({ username: "user" });
  });

  it("should clear currentUser on logout", () => {
    const { result } = renderHook(() => useAuth());
    const authService = container.resolve(AuthService) as MockAuthService;

    act(() => {
      authService.login("user", "pass");
      authService.logout();
    });

    expect(result.current.currentUser).toBeNull();
  });
});
