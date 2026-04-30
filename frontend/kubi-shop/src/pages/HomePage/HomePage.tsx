import { BestSellerWidget } from "../../widgets/BestSellerWisget'/BestSellerWisget";
import { CategoriesWidget } from "../../widgets/CategoriesWidget/CategoriesWidget";
import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero/Hero";

export const HomePage = () => {

    return (
        <>
            <Header />
            <Hero />
            <CategoriesWidget />
            <BestSellerWidget />
        </>
    );
};