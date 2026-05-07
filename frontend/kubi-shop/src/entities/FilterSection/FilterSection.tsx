import classNames from "classnames";
import line from "../../assets/image/line.png";
import { Button } from "../../shared/Button/Button";

interface FilterItem {
    id: number;
    title: string;
    data?: string
}

interface FilterSectionProps {
    className?: string;
    title: string;
    filters: FilterItem[];
    onClick: (data?: []) => void
}

export const FilterSection = (props: FilterSectionProps) => {
    const { className, title, filters, onClick } = props;

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
                {filters.map(item => (
                    <Button
                        key={item.id}
                        className="bg-transparent p-0 text-[20px] font-light leading-none text-black transition duration-200 hover:text-accent"
                        def={false}
                        onClick={() => onClick(item.data)}
                        data-
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
        </div >
    );
};