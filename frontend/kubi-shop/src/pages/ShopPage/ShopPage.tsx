import { useState } from "react";
import { FilterProducts } from "../../features/FilterProducts/FilterProducts";
import { ProductsPagination } from "../../features/ProductsPagination/ProductsPagination";
import { Path, RouterPath } from "../../shared/config/router/routerPath";
import { Container } from "../../shared/Container/Container";
import { Header } from "../../widgets/Header/Header";
import { PageHero } from "../../widgets/PageHero/PageHero";
import { ShopProductList } from "../../widgets/ShopProductList/index";
import { useGetPageProductsByCategoryQuery, useGetPageProductsQuery } from "../../shared/API/api";
import type { CategoryNameType } from "../../widgets/CategoriesWidget/types/categoryTypes";

export const ShopPage = () => {
    const [page, setPage] = useState(1)
    const [categories, setCategory] = useState<CategoryNameType[]>(['all'])
    const limit = 12

    const setFilter = (data: []) => {
        const result = data.filter(item => item !== 'all')
        setCategory(prev => ([...prev, ...result]))
    }

    // const { data, isLoading } = useGetPageProductsQuery({ page, limit })
    const {data,isLoading} = useGetPageProductsByCategoryQuery({page,limit,categories})
    return (
        <>
            <Header />
            <PageHero title="Shop" path={RouterPath[Path.HOME]} />
            <Container className="pt-25">
                <div className="flex justify-between">
                    <ShopProductList data={data} isLoading={isLoading} limit={limit} />
                    <FilterProducts onSelectCategory={setFilter} />
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