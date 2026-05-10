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

interface InputFilterItem {
    id: number
    placeholder: string
    title: string
    defValue?: string
    onChange: (value: string) => void
}

interface InputShopFilter {
    id: number;
    title: string;
    filters: InputFilterItem[];
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
            { id: 8, title: 'JBL', data: 'jbl' },
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

    const filterActions = {
        category: shopPageActions.toggleCategory,
        brand: shopPageActions.toggleBrands,
        tag: shopPageActions.toggleTags,
    };

    const shopPriceFilter: InputShopFilter = {
        id: 4,
        title: 'PRICE',
        filters: [
            {
                id: 1, title: 'Min price', placeholder: 'Min price', onChange: (value: string) => {
                    dispatch(shopPageActions.setMinPrice(Number(value) || 0));
                }
            },
            {
                id: 2, title: 'Max price', placeholder: 'Max price', onChange: (value: string) => {
                    dispatch(shopPageActions.setMaxPrice(Number(value) || 99999999));
                }
            },
        ],
    };

    const filterProducts = (section: ShopFilter, filter: FilterItem) => {
        dispatch(filterActions[section.type](filter.data as never));
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
                        type={'button'}
                    />
                ))}
                <FilterSection
                    title={shopPriceFilter.title}
                    filters={shopPriceFilter.filters}
                    type="input"
                    onInputChange={shopPriceFilter.onChange}
                />
            </div>
        </section>
    );
};
