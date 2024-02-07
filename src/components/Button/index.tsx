import { clsx } from "clsx"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { Spinner } from "../Icons"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  isLoading?: boolean | false;
  disabled?: boolean | false;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { variant = "primary", size = "medium", isLoading, disabled, children, ...rest } = props

    const sizeClasses = {
        small: "text-xs px-2 py-1",
        medium: "text-sm px-8 py-2",
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