import { Carousel } from "../../shared/Carousel/Carousel";
import line from "../../assets/image/line.png";

import phonesImg from "../../shared/mockData/iphone.jpg";
import playstationsImg from "../../shared/mockData/playstation.jpg";
import watchesImg from "../../shared/mockData/watch.jpg";
import joysticksImg from "../../shared/mockData/gamepad.jpg";
import earpodsImg from "../../shared/mockData/airpods.jpg";

import { ItemCard } from "../../entities/ItemCard/ItemCard";
import { Container } from "../../shared/Container/Container";

export interface BestSellingItem {
    id: string;
    title: string;
    price: string;
    img: string;
}

const bestSellingItems: BestSellingItem[] = [
    {
        id: "1",
        title: "IPad (9th Gen)",
        price: "870$",
        img: phonesImg,
    },
    {
        id: "2",
        title: "Drone With Camera",
        price: "600$",
        img: playstationsImg,
    },
    {
        id: "3",
        title: "Apple Watch (2nd Gen)",
        price: "400$",
        img: watchesImg,
    },
    {
        id: "4",
        title: "Ultra HD TV",
        price: "2000$",
        img: joysticksImg,
    },
    {
        id: "5",
        title: "Bluetooth Speaker",
        price: "75$",
        img: earpodsImg,
    },
];

const repeatedBestSellingItems = Array.from({ length: 4 }, (_, groupIndex) =>
    bestSellingItems.map((item) => ({
        ...item,
        id: `${item.id}-${groupIndex}`,
    }))
).flat();

export const BestSellerWidget = () => {
    return (
        <Container>
            <div className="py-10">
                <div className="mb-10 flex items-center gap-4">
                    <p className="text-lg uppercase tracking-wide text-gray-600">
                        Best selling items
                    </p>

                    <img className="min-w-0 flex-1 object-cover" src={line} alt="" />
                </div>
                <Carousel
                    sliderButton="outside"
                    slidesView={5}
                    gap={40}
                    className="w-300"
                >
                    {repeatedBestSellingItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            title={item.title}
                            price={item.price}
                            img={item.img}
                            size="big"
                        />
                    ))}
                </Carousel>
            </div>
        </Container>
    );
};