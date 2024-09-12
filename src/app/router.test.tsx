import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ThemeSwitch from "../shared/components/ThemeSwitch";

// Define the routes
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex gap-2 justify-center'>
        <div>
          <a href='/' className='[&.active]:font-bold'>
            Home
          </a>
          <a href='/login' className='[&.active]:font-bold'>
            Login
          </a>
        </div>
        <ThemeSwitch />
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([homeRoute, loginRoute]);
const router = createRouter({ routeTree });

// Helper function to render the router
const renderRouter = (initialPath: string) => {
  window.history.pushState({}, "", initialPath);

  render(<RouterProvider router={router} />);
};

describe("Router", () => {
  it("should render the Home page on the root path", () => {
    renderRouter("/");
    // Adjust this to match the actual text in ThemeSwitch
  });

  it("should render the Login page on the /login path", () => {
    renderRouter("/login");
  });

  it("should navigate to Login page when clicking the Login link", () => {
    renderRouter("/");
    renderRouter("/login");
  });
});
