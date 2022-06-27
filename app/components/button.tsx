import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode | React.ReactNode[];
}

function Button({
  children,
  variant = "primary",
  className,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements["button"]) {
  return (
    <button
      {...buttonProps}
      className={clsx("py-2 px-3 leading-4 border-none rounded text-white", {
        "bg-indigo-700 text-white": variant === "primary",
        "bg-gray-100 text-gray-900": variant === "secondary",
        className,
      })}
    >
      {children}
    </button>
  );
}

function CircleButton({
  children,
  className,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements["button"]) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        // "rounded-full p-0 w-10 h-10 leading-4 flex items-center justify-center bg-white text-gray-900 border-gray-500 cursor-pointer",
        "rounded-full p-0 w-10 h-10 leading-4 flex items-center justify-center bg-white text-gray-900 border border-gray-100 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}

export { Button, CircleButton };
