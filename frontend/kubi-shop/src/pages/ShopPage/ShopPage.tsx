import { useState } from "react";
import { FilterProducts } from "../../features/FilterProducts/FilterProducts";
import { ProductsPagination } from "../../features/ProductsPagination/ProductsPagination";
import { Path, RouterPath } from "../../shared/config/router/routerPath";
import { Container } from "../../shared/Container/Container";
import { Header } from "../../widgets/Header/Header";
import { PageHero } from "../../widgets/PageHero/PageHero";
import { ShopProductList } from "../../widgets/ShopProductList/index";
import { useGetPageProductsByCategoryQuery } from "../../shared/API/api";
import type { CategoryNameType } from "../../widgets/CategoriesWidget/types/categoryTypes";
import { useAppDispatch, useAppSelector } from "../../app/providers/storeProvider/store";
import { getShopPageCategories, getShopPagePagination } from "./model/selectors/shopPageSelectors";
import { shopPageActions } from "./model/slice/shopPageSlice";

export const ShopPage = () => {
    // const page = useAppSelector(getShopPagePagination)
    const categories = useAppSelector(getShopPageCategories)
    const dispatch = useAppDispatch()
    const [page, setPage] = useState(1)
    const limit = 12
    // const [categories, setCategory] = useState<CategoryNameType[]>([]);

    // const setFilter = (category: CategoryNameType) => {
    //     setPage(1);
    //     // dispatch(shopPageActions.setPagination(1))

    //     if (category === 'all') {
    //         dispatch(shopPageActions.resetCategory())
    //         return;
    //     }

    //     setCategory(prev => {
    //         if (prev.includes(category)) {
    //             const next = prev.filter(item => item !== category);
    //             return next.length ? next : [];
    //         }

    //         return [...prev, category];
    //     });
    // };

    // const { data, isLoading } = useGetPageProductsQuery({ page, limit })
    const { data, isLoading } = useGetPageProductsByCategoryQuery({ page, limit, categories })
    return (
        <>
            <Header />
            <PageHero title="Shop" path={RouterPath[Path.HOME]} />
            <Container className="pt-25">
                <div className="flex justify-between">
                    <ShopProductList data={data} isLoading={isLoading} limit={limit} />
                    <FilterProducts />
                </div>
                <ProductsPagination
                    totalPage={data?.totalPage}
                    page={page}
                    setPage={setPage}
                />
            </Container>
        </>
    );
};