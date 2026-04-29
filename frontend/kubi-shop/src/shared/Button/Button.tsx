import classNames from "classnames";
import type { ReactNode } from "react";

interface ButtonProps {
    className?: string;
    onClick?: () => void
    children: ReactNode
    def?: boolean
}

export const Button = (props: ButtonProps) => {

    const {
        className,
        onClick,
        children,
        def = true,
    } = props

    return (
        <button
            className={classNames(className,
                {
                    ['mt-6 rounded-full bg-accent px-8 py-3 text-xs font-medium text-white transition duration-200 hover:opacity-80']: def
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};