import { ItemCard } from "../../../entities/ItemCard/ItemCard";
import { Skeleton } from "../../../shared/UI/Skeletons/Skeletons";
import type { ProductPageType } from "../types/productType";

interface ShopProductListProps {
    limit: number
    data: ProductPageType | undefined
    isLoading: boolean
}

export const ShopProductList = (props: ShopProductListProps) => {
    const { limit, data, isLoading } = props

    if (isLoading) {
        return (
            <section>
                <Skeleton className="w-70 h-9 mb-3.75" />
                <div className="w-max grid grid-cols-4 gap-x-2.5 gap-y-5 ">
                    {Array.from({ length: limit }).map((_, index) => (
                        <div key={index} className="flex flex-col justify-between w-50 h-70 rounded-xl border border-gray-200 bg-white p-6.25">
                            <Skeleton className="mb-4 h-full rounded-lg" />
                            <Skeleton className="mx-auto h-5 w-24" />
                        </div>
                    ))}
                </div>

            </section >
        )
    }

    return (
        <section>
            <h2 className="mb-3.75 text-[24px]">{data ? `Showing 1–${data?.totalPage} of ${data?.total} results` : 'No results'}</h2>
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