import { useState } from "react";
import { FilterProducts } from "../../features/FilterProducts/FilterProducts";
import { ProductsPagination } from "../../features/ProductsPagination/ProductsPagination";
import { Path, RouterPath } from "../../shared/config/router/routerPath";
import { Container } from "../../shared/Container/Container";
import { Header } from "../../widgets/Header/Header";
import { PageHero } from "../../widgets/PageHero/PageHero";
import { ShopProductList } from "../../widgets/ShopProductList/index";

export const ShopPage = () => {
    const [page, setPage] = useState(1)
    const limit = 12
    return (
        <>
            <Header />
            <PageHero title="Shop" path={RouterPath[Path.HOME]} />
            <Container className="pt-25">
                <div className="flex justify-between">
                    <ShopProductList page={page} limit={limit} />
                    <FilterProducts />
                </div>
                <ProductsPagination
                    page={page}
                    setPage={setPage}
                />
            </Container>
        </>
    );
};