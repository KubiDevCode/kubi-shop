import { ItemCard } from "../../../entities/ItemCard/ItemCard";
import { useGetPageProductsQuery } from "../../../shared/API/api";
// import { products } from "../../../shared/mockData/products";

interface ShopProductListProps {
    page: number
    limit: number
}

export const ShopProductList = (props: ShopProductListProps) => {
    const { page, limit } = props

    const { data, isLoading } = useGetPageProductsQuery({ page, limit })



    return (
        <section>
            <div className="w-max grid grid-cols-4 gap-x-2.5 gap-y-5 ">
                {data?.products.map(item =>
                    <ItemCard
                        size="big"
                        title={item.name}
                        price={item.price}
                        key={item.id}
                        img={item.img}
                    />
                )}
            </div>

        </section >
    )
};