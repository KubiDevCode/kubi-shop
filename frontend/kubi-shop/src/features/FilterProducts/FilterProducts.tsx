import classNames from 'classnames';
import { FilterSection } from '../../entities/FilterSection/FilterSection';
import type { CategoryNameType } from '../../entities/Category/types/categoryTypes';
import { useAppDispatch } from '../../app/providers/storeProvider/store';
import { shopPageActions } from '../../pages/ShopPage/model/slice/shopPageSlice';
import type { BrandNameType } from '../../entities/Brand/types/brandTypes';
import type { TagNameType } from '../../entities/Tag/types/tagTypes';

interface FilterProductsProps {
    className?: string;
}

type FilterType = 'category' | 'brand' | 'tag';

interface FilterItem {
    id: number;
    title: string;
    data: CategoryNameType | BrandNameType | TagNameType;
}

interface ShopFilter {
    id: number;
    title: string;
    type: FilterType;
    filters: FilterItem[];
}

// ---------- исправленные фильтры ----------
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
    {
        id: 2,
        title: 'BRANDS',
        type: 'brand',
        filters: [
            { id: 1, title: 'All', data: 'all' },
            { id: 2, title: 'Apple', data: 'apple' },
            { id: 3, title: 'Samsung', data: 'samsung' },
            { id: 4, title: 'Sony', data: 'sony' },
            { id: 5, title: 'Xiaomi', data: 'xiaomi' },
            { id: 6, title: 'Asus', data: 'asus' },
            { id: 7, title: 'Lenovo', data: 'lenovo' },
            { id: 8, title: 'JBL', data: 'jbl' }, // исправлен регистр
            { id: 9, title: 'Microsoft', data: 'microsoft' },
            { id: 10, title: 'Dell', data: 'dell' },
            { id: 11, title: 'HP', data: 'hp' },
            { id: 12, title: 'Logitech', data: 'logitech' },
        ],
    },
    {
        id: 3,
        title: 'TAGS',
        type: 'tag',
        filters: [
            { id: 1, title: 'All', data: 'all' },
            { id: 2, title: 'New', data: 'new' },
            { id: 3, title: 'Popular', data: 'popular' },
            { id: 4, title: 'Premium', data: 'premium' },
            { id: 5, title: 'Budget', data: 'budget' },
            { id: 6, title: 'Gaming', data: 'gaming' },
            { id: 7, title: 'Wireless', data: 'wireless' },
        ],
    }
];

export const FilterProducts = ({ className }: FilterProductsProps) => {
    const dispatch = useAppDispatch();

    const filterProducts = (section: ShopFilter, filter: FilterItem) => {
        const filterActions: Record<FilterType, (data: CategoryNameType | BrandNameType | TagNameType) => void> = {
            category: (data) => {
                dispatch(shopPageActions.toggleCategory(data as CategoryNameType));
            },
            brand: (data) => {
                dispatch(shopPageActions.toggleBrands(data as BrandNameType));
            },
            tag: (data) => {
                dispatch(shopPageActions.toggleTags(data as TagNameType));
            },
        };

        if (section.type === 'category') {
            filterActions.category(filter.data as CategoryNameType);
        }

        if (section.type === 'brand') {
            filterActions.brand(filter.data as BrandNameType)
        }

        if (section.type === 'tag') {
            filterActions.tag(filter.data as TagNameType)
        }
    }

    return (
        <section className={classNames(className)}>
            <div className="flex flex-col gap-7.5">
                {shopFilters.map((section) => (
                    <FilterSection
                        key={section.id}
                        title={section.title}
                        filters={section.filters}
                        onClick={(filter) => filterProducts(section, filter)}
                    />
                ))}
            </div>
        </section>
    );
};