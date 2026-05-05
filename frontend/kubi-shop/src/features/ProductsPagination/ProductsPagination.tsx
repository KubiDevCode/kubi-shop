import classNames from "classnames";
import { useState } from "react";
import { Button } from "../../shared/Button/Button";

export const ProductsPagination = () => {
    const [pagination, setPagination] = useState(1)

    const pages = Array.from({ length: 5 }, (_, index) => {
        if (pagination <= 3) {
            return index + 1;
        }

        return pagination - 2 + index;
    });

    const onPagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.dataset.pagination) {
            case 'next':
                setPagination(prev => prev + 1)
                break;
            case 'prev':
                setPagination(prev => Math.max(prev - 1, 1))
                break;

            default:
                setPagination(Number(e.currentTarget.dataset.pagination))
                break;
        }
    }

    return (
        <div className="flex gap-5 py-10 w-[830px] mx-auto items-center justify-center">
            <Button
                onClick={onPagClick}
                className="bg-transparent text-black transition duration-200 hover:text-accent"
                def={false}
                data-pagination="prev"
            >
                Prev
            </Button>

            <div className="flex min-w-[240px] justify-center">
                {pages.map((item) =>
                    <Button
                        key={item}
                        onClick={onPagClick}
                        className={classNames(
                            "bg-transparent w-12 h-10 flex items-center justify-center transition-none hover:transition hover:duration-200 hover:text-accent hover:opacity-50",
                            item === pagination ? "text-accent" : "text-black"
                        )}
                        def={false}
                        data-pagination={item}
                    >
                        {item}
                    </Button>
                )}
            </div>

            <Button
                onClick={onPagClick}
                className="bg-transparent text-black transition duration-200 hover:text-accent"
                def={false}
                data-pagination="next"
            >
                Next
            </Button>
        </div>)
};