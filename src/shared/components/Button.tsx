import { clsx } from "clsx";
import React from "react";

type Props = Omit<React.ComponentProps<"button">, "className">;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
        "text-gray-700 hover:bg-gray-50 bg-gray-800 dark:bg-gray-500 text-white hover:bg-gray-900 dark:hover:bg-gray-600",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        "group",
        "radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900",
        "radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900",
        "radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50",
      )}>
      {children}
    </button>
  ),
);

Button.displayName = "Button";
export default Button;
