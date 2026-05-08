import classNames from 'classnames';
import { FilterSection } from '../../entities/FilterSection/FilterSection';
import type { CategoryNameType } from '../../widgets/CategoriesWidget/types/categoryTypes';
import { useAppDispatch, useAppSelector } from '../../app/providers/storeProvider/store';
import { getShopPageCategories } from '../../pages/ShopPage/model/selectors/shopPageSelectors';
import { shopPageActions } from '../../pages/ShopPage/model/slice/shopPageSlice';
import { useState } from 'react';

interface FilterProductsProps {
    className?: string;
    onSelectCategory: (data: CategoryNameType) => void
}

export const FilterProducts = (props: FilterProductsProps) => {
    const { className, onSelectCategory } = props
    const [onClick, setOnClick] = useState<(...arg: any) => void>()
    const dispatch = useAppDispatch()

    const shopFilters = [
        {
            id: 1,
            title: "CATEGORIES",
            type: 'category',
            filters: [
                { id: 1, title: "All", data: 'all' },
                { id: 2, title: "EarPods", data: 'earpods' },
                { id: 3, title: "Joysticks", data: 'joysticks' },
                { id: 4, title: "Laptops", data: 'laptops' },
                { id: 5, title: "Phones", data: 'phones' },
                { id: 6, title: "PlayStations", data: 'playstations' },
                { id: 7, title: "Digital Watches", data: 'digital-watches' },
            ],
        },
        // {
        //     id: 2,
        //     title: "TAGS",
        //     filters: [
        //         { id: 1, title: "White" },
        //         { id: 2, title: "Cheap" },
        //         { id: 3, title: "Mobile" },
        //         { id: 4, title: "Modern" },
        //     ],
        // },
        // {
        //     id: 3,
        //     title: "BRANDS",
        //     filters: [
        //         { id: 1, title: "Apple" },
        //         { id: 2, title: "Samsung" },
        //         { id: 3, title: "Green" },
        //     ],
        // },
    ];


    return (
        <section className={classNames(className)}>
            <div className="flex flex-col gap-7.5">
                {shopFilters.map(item => {

                    const onSelectCategory = (data: CategoryNameType) => {
                        const categories = useAppSelector(getShopPageCategories)

                        if (categories.includes(data)) {
                            dispatch(shopPageActions.removeCategory(data))
                        }

                        if (data === 'all') {
                            dispatch(shopPageActions.resetCategory())
                        }

                        dispatch(shopPageActions.addCategory(data))
                    }

                    switch (item.type) {
                        case 'category':
                            setOnClick(onSelectCategory)
                            break;

                        default:
                            break;
                    }

                    // setCategory(prev => {
                    //     if (prev.includes(category)) {
                    //         const next = prev.filter(item => item !== category);
                    //         return next.length ? next : [];
                    //     }

                    //     return [...prev, category];
                    // });


                    return (
                        <FilterSection
                            title={item.title}
                            filters={item.filters}
                            key={item.id}
                            onClick={onClick}
                        />
                    )
                }
                )}</div>
        </section>
    );
};