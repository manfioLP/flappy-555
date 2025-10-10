import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-indigo-600 hover:bg-indigo-500 text-white shadow transition active:translate-y-px disabled:opacity-50 disabled:pointer-events-none",
    secondary:
        "bg-slate-700 hover:bg-slate-600 text-white shadow transition active:translate-y-px disabled:opacity-50 disabled:pointer-events-none",
    danger:
        "bg-rose-600 hover:bg-rose-500 text-white shadow transition active:translate-y-px disabled:opacity-50 disabled:pointer-events-none",
    ghost:
        "bg-transparent hover:bg-white/10 text-white border border-white/20 transition active:translate-y-px disabled:opacity-50 disabled:pointer-events-none",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-5 py-3 text-lg rounded-lg",
};

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           variant = "primary",
                                           size = "md",
                                           disabled = false,
                                           className = "",
                                       }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "uppercase tracking-wide font-semibold",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
