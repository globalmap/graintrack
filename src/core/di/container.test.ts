import { describe, it, expect, beforeEach } from "vitest";
import { container } from "tsyringe";
import { AuthService } from "../api/authService"; // Adjust the import path as needed
import { firstValueFrom } from "rxjs";

// Register services in the container for the tests
beforeEach(() => {
  container.registerSingleton(AuthService);
});

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = container.resolve(AuthService);
  });

  it("should initialize with no current user", async () => {
    const currentUser = await firstValueFrom(authService.currentUser$);
    expect(currentUser).toBeNull();
  });

  it("should log in successfully with correct credentials", async () => {
    const loginResult = await firstValueFrom(authService.login("user", "pass"));
    const currentUser = await firstValueFrom(authService.currentUser$);

    expect(loginResult).toBe(true);
    expect(currentUser).toEqual({ username: "user" });
  });

  it("should fail to log in with incorrect credentials", async () => {
    const loginResult = await firstValueFrom(
      authService.login("user", "wrongpass"),
    );

    expect(loginResult).toBe(false);
    const currentUser = await firstValueFrom(authService.currentUser$);
    expect(currentUser).toBeNull();
  });

  it("should log out and clear the current user", async () => {
    await firstValueFrom(authService.login("user", "pass"));
    authService.logout();
    const currentUser = await firstValueFrom(authService.currentUser$);

    expect(currentUser).toBeNull();
  });
});
