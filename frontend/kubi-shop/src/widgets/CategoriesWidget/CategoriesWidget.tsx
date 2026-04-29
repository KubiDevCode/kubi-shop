import { Container } from "../../shared/Container/Container";
import line from "../../assets/image/line.png";

import phonesImg from "../../shared/mockData/iphone.jpg";
import playstationsImg from '../../shared/mockData/playstation.jpg';
import watchesImg from "../../shared/mockData/watch.jpg"
import joysticksImg from "../../shared/mockData/gamepad.jpg";
import earpodsImg from "../../shared/mockData/airpods.jpg";
import laptopsImg from "../../shared/mockData/laptop.jpg";

import { ItemCard } from "../../entities/ItemCard/ItemCard";

export interface Category {
    id: string;
    title: string;
    slug: string;
    img: string;
}

const categories: Category[] = [
    {
        id: "1",
        title: "Phones",
        slug: "phones",
        img: phonesImg,
    },
    {
        id: "2",
        title: "PlayStations",
        slug: "playstations",
        img: playstationsImg,
    },
    {
        id: "3",
        title: "Digital Watches",
        slug: "digital-watches",
        img: watchesImg,
    },
    {
        id: "4",
        title: "Joysticks",
        slug: "joysticks",
        img: joysticksImg,
    },
    {
        id: "5",
        title: "EarPods",
        slug: "earpods",
        img: earpodsImg,
    },
    {
        id: "6",
        title: "Laptops",
        slug: "laptops",
        img: laptopsImg,
    },
];

export const CategoriesWidget = () => {
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
                    {categories.map((item) => (
                        <ItemCard
                            key={item.id}
                            size="small"
                            title={item.title}
                            img={item.img}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};