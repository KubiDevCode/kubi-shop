import classNames from "classnames";
import { Button } from "../../shared/Button/Button";

interface ProductsPaginationProps {
    page: number
    setPage: (page: number) => void
}

export const ProductsPagination = (props: ProductsPaginationProps) => {
    const {
        page,
        setPage,
    } = props

    const pages = Array.from({ length: 5 }, (_, index) => {
        if (page <= 3) {
            return index + 1;
        }

        return page - 2 + index;
    });

    return (
        <div className="flex gap-5 py-10 w-[830px] mx-auto items-center justify-center">
            <Button
                onClick={() => setPage(page - 1)}
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
                        onClick={() => setPage(item)}
                        className={classNames(
                            "bg-transparent w-12 h-10 flex items-center justify-center transition-none hover:transition hover:duration-200 hover:text-accent hover:opacity-50",
                            item === page ? "text-accent" : "text-black"
                        )}
                        def={false}
                        data-pagination={item}
                    >
                        {item}
                    </Button>
                )}
            </div>

            <Button
                onClick={() => setPage(page + 1)}
                className="bg-transparent text-black transition duration-200 hover:text-accent"
                def={false}
                data-pagination="next"
            >
                Next
            </Button>
        </div>)
};