import classNames from 'classnames';
import { FilterSection } from '../../entities/FilterSection/FilterSection';

interface FilterProductsProps {
    className?: string;
    onSelectCategory: (data:[]) => void
}

export const FilterProducts = (props: FilterProductsProps) => {
    const { className, onSelectCategory } = props
    const shopFilters = [
        {
            id: 1,
            title: "CATEGORIES",
            filters: [
                { id: 1, title: "All" },
                { id: 2, title: "EarPods", data: 'earpods' },
                { id: 3, title: "Joysticks", data: 'joysticks' },
                { id: 4, title: "Laptops", data: 'laptops' },
                { id: 5, title: "Phones", data: 'phones' },
                { id: 6, title: "PlayStations", data: 'playstations' },
                { id: 7, title: "Digital Watches", data: 'digital-watches' },
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


    return (
        <section className={classNames(className)}>
            <div className="flex flex-col gap-7.5">
                {shopFilters.map(item =>
                    <FilterSection
                        title={item.title}
                        filters={item.filters}
                        key={item.id}
                        onClick={onSelectCategory}
                    />
                )}</div>
        </section>
    );
};