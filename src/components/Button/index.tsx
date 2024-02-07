import { clsx } from "clsx"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { Spinner } from "../Icons"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "primary" | "secondary";
  variant?: "primary" | "gray";
  size?: "small" | "medium" | "large";
  isLoading?: boolean | false;
  disabled?: boolean | false;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { styleType = "primary", variant = "primary", size = "medium", isLoading, disabled, children, ...rest } = props

    const classes = clsx(
        "flex items-center justify-center gap-1 rounded-lg text-white transition hover:cursor-pointer",
        {
            "bg-primary-600": styleType === "primary" && variant === "primary",
            "text-xs px-2 py-1": size === "small",
            "text-sm px-3 py-2": size === "medium",
            "text-xl px-5 py-3": size === "large",
        },
    )

    return (
        <button className={classes} disabled={isLoading || disabled} {...rest}>
            {isLoading ? <Spinner className="inline size-8 animate-spin" /> : <>{children}</>}
        </button>
    )
}

export default Button