import classNames from "classnames";
import line from "../../assets/image/line.png";
import { Button } from "../../shared/Button/Button";
import { useActiveFilters } from "../../shared/hooks/useActiveFilters";

interface FilterItem {
    id: number;
    title: string;
    data: string;
}

interface FilterSectionProps {
    className?: string;
    title: string;
    filters: FilterItem[];
    onClick: (data: FilterItem) => void;
}

export const FilterSection = (props: FilterSectionProps) => {
    const { className, title, filters, onClick } = props;

    const { isActive, toggleFilter } = useActiveFilters()

    return (
        <div className={classNames(className, "w-77.5")}>
            <p className="text-[36px] font-light uppercase leading-none tracking-[0.08em] text-black">
                {title}
            </p>

            <img
                className="my-5 h-6 w-full object-cover"
                src={line}
                alt=""
            />

            <div className="flex flex-col items-start gap-3.75">
                {filters.map(item => {
                    // const isActive = activeFilters.includes(item.data);

                    return (
                        <Button
                            key={item.id}
                            className={classNames(
                                "bg-transparent p-0 text-[20px] font-light leading-none transition duration-200 hover:text-accent",
                                isActive(item.data) ? "text-accent" : "text-black"
                            )}
                            def={false}
                            onClick={() => {
                                onClick(item);
                                toggleFilter(item.data)
                                // setActiveFilters(prev => {
                                //     if (item.data === 'all') {
                                //         return ['all'];
                                //     }

                                //     if (prev.includes(item.data)) {
                                //         const result = prev.filter(filter => filter !== item.data);
                                //         if (result.length === 0) {
                                //             return ['all']
                                //         }

                                //         return result
                                //     }

                                //     const result = prev.filter(filter => filter !== 'all')

                                //     return [...result, item.data]
                                // });
                            }}
                        >
                            {item.title}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};