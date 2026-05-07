import classNames from 'classnames';
import { FilterSection } from '../../entities/FilterSection/FilterSection';

interface FilterProductsProps {
    className?: string;
}

export const FilterProducts = (props: FilterProductsProps) => {
    const shopFilters = [
        {
            id: 1,
            title: "CATEGORIES",
            filters: [
                { id: 1, title: "All" },
                { id: 2, title: "EarPods" },
                { id: 3, title: "Joysticks" },
                { id: 4, title: "Laptops" },
                { id: 5, title: "Phones" },
                { id: 6, title: "PlayStations" },
                { id: 7, title: "Digital Watches" },
            ],
        },
        {
            id: 2,
            title: "TAGS",
            filters: [
                { id: 1, title: "White" },
                { id: 2, title: "Cheap" },
                { id: 3, title: "Mobile" },
                { id: 4, title: "Modern" },
            ],
        },
        {
            id: 3,
            title: "BRANDS",
            filters: [
                { id: 1, title: "Apple" },
                { id: 2, title: "Samsung" },
                { id: 3, title: "Green" },
            ],
        },
    ];

    const { className } = props
    return (
        <section className={classNames(className)}>
            <div className="flex flex-col gap-[30px]">
                {shopFilters.map(item =>
                    <FilterSection
                        title={item.title}
                        filters={item.filters}
                        key={item.id}
                    />
                )}</div>
        </section>
    );
};