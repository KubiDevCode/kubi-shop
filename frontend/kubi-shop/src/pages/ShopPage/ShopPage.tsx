import { Path, RouterPath } from "../../shared/config/router/routerPath";
import { Container } from "../../shared/Container/Container";
import { Header } from "../../widgets/Header/Header";
import { PageHero } from "../../widgets/PageHero/PageHero";
import { ShopProductList } from "../../widgets/ShopProductList/ShopProductList";

export const ShopPage = () => {

    return (
        <>
            <Header />
            <PageHero title="Shop" path={RouterPath[Path.HOME]} />
            <Container>
                <ShopProductList />
            </Container>
        </>
    );
};