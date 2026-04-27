import type { ReactNode } from 'react';
import classNames from 'classnames';

interface ContainerProps {
    className?: string;
    children: ReactNode
}

export const Container = ({ className, children }: ContainerProps) => {

    return (
        <div className={classNames("mx-auto w-full max-w-[1200px] px-4", className)}>
            {children}
        </div>
    );
};