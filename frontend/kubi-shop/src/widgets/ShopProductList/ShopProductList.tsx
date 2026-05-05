import { ItemCard } from "../../entities/ItemCard/ItemCard";
import { products } from "../../shared/mockData/products";


export const ShopProductList = () => {


    return (
        <section>
            <div className="w-max grid grid-cols-4 gap-x-2.5 gap-y-5 ">
                {products.map(item =>
                    <ItemCard
                        size="big"
                        title={item.title}
                        price={item.price}
                        key={item.id}
                        img={item.image}
                    />
                )}
            </div>

        </section >
    )
};