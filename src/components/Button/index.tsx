import { clsx } from "clsx"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { Spinner } from "../Icons"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  isFull?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { variant = "primary", size = "small", isFull = false, isLoading = false, disabled, children, ...rest } = props

    const sizeClasses = {
        small: "text-sm px-8 py-2 tracking-[-0.02rem]",
        medium: "text-sm px-9 py-[10px]",
        large: "text-xl px-5 py-3",
    }

    const getSpinnerSizeClass = (size: ButtonProps["size"]) => (
        size === "small" ? "size-4" : size === "medium" ? "size-5" : "size-7"
    )

    const classes = clsx(
        "flex cursor-pointer items-center justify-center gap-3 rounded-lg transition",
        {
            "bg-primary-600 text-white": variant === "primary",
            "bg-surface text-black": variant === "secondary",
            "bg-transparent text-gray-700 !p-0": variant === "tertiary",
            "w-full": isFull === true,
            "disabled:opacity-50 disabled:cursor-default": disabled === true,
            [sizeClasses[size]]: sizeClasses[size],
        },
    )

    return (
        <button className={classes} disabled={disabled} {...rest}>
            {isLoading && <Spinner className={`animate-spin fill-none ${getSpinnerSizeClass(size)}`} /> }
            {children}
        </button>
    )
}

export default Button