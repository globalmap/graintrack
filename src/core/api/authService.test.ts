import { describe, it, expect, beforeEach } from "vitest";
import { firstValueFrom } from "rxjs";
import { AuthService } from "./authService";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
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
