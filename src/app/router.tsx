import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ThemeSwitch from "../shared/components/ThemeSwitch";

// Define the root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex gap-2 justify-center'>
        <div>
          <Link to='/' className='[&.active]:font-bold'>
            Home
          </Link>{" "}
          <Link to='/login' className='[&.active]:font-bold'>
            Login
          </Link>
        </div>
        <ThemeSwitch/>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// Define the individual routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute, // Home is part of the root layout
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute, // Login is also part of the root layout
  path: "/login",
  component: Login,
});

// Add the routes to the route tree
const routeTree = rootRoute.addChildren([homeRoute, loginRoute]);

// Create the router using the route tree
const router = createRouter({ routeTree });

export default router;
