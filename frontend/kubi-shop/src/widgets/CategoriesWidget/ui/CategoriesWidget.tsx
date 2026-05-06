import { Container } from "../../../shared/Container/Container";
import line from "../../../assets/image/line.png";

import { ItemCard } from "../../../entities/ItemCard/ItemCard";
import { useGetAllCategoryQuery } from "../../../shared/API/api";
import { Skeleton } from "../../../shared/Skeletons/Skeletons";


export const CategoriesWidget = () => {
    const { data, isLoading } = useGetAllCategoryQuery();

    return (
        <section className="py-10">
            <Container>
                <div className="mb-10 flex items-center gap-4">
                    <p className="text-lg uppercase tracking-wide text-gray-600">
                        Categories
                    </p>

                    <img className="min-w-0 flex-1 object-cover" src={line} alt="" />
                </div>

                <div className="grid grid-cols-6 gap-4">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex flex-col justify-between w-45 h-56.25 rounded-xl border border-gray-200 bg-white p-6.25">
                                <Skeleton className="mb-4 h-full rounded-lg" />
                                <Skeleton className="mx-auto h-5 w-24" />
                            </div>
                        ))
                        : data?.map((item) => (
                            <ItemCard
                                key={item.id}
                                size="small"
                                title={item.name}
                                img={item.img}
                            />
                        ))}
                </div>
            </Container>
        </section>
    )
};