import classNames from 'classnames';
import { FilterSection } from '../../entities/FilterSection/FilterSection';
import type { CategoryNameType } from '../../widgets/CategoriesWidget/types/categoryTypes';
import { useAppDispatch } from '../../app/providers/storeProvider/store';
import { shopPageActions } from '../../pages/ShopPage/model/slice/shopPageSlice';

interface FilterProductsProps {
    className?: string;
}

type FilterType = 'category';

interface FilterItem {
    id: number;
    title: string;
    data: CategoryNameType;
}

interface ShopFilter {
    id: number;
    title: string;
    type: FilterType;
    filters: FilterItem[];
}

const shopFilters: ShopFilter[] = [
    {
        id: 1,
        title: 'CATEGORIES',
        type: 'category',
        filters: [
            { id: 1, title: 'All', data: 'all' },
            { id: 2, title: 'EarPods', data: 'earpods' },
            { id: 3, title: 'Joysticks', data: 'joysticks' },
            { id: 4, title: 'Laptops', data: 'laptops' },
            { id: 5, title: 'Phones', data: 'phones' },
            { id: 6, title: 'PlayStations', data: 'playstations' },
            { id: 7, title: 'Digital Watches', data: 'digital-watches' },
        ],
    },
];

export const FilterProducts = ({ className }: FilterProductsProps) => {
    const dispatch = useAppDispatch();

    const filterActions: Record<FilterType, (data: CategoryNameType) => void> = {
        category: (data) => {
            dispatch(shopPageActions.toggleCategory(data));
        },
    };

    return (
        <section className={classNames(className)}>
            <div className="flex flex-col gap-7.5">
                {shopFilters.map((section) => (
                    <FilterSection
                        key={section.id}
                        title={section.title}
                        filters={section.filters}
                        onClick={(filter) => {
                            filterActions[section.type](filter.data as CategoryNameType);
                        }}
                    />
                ))}
            </div>
        </section>
    );
};