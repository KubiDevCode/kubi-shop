import classNames from "classnames";
import { Container } from "../../shared/Container/Container";
import { Carousel } from "../../shared/Carousel/Carousel";
import goproImage from '../../shared/mockData/hero-mock.jpg'

interface HeroProps {
    className?: string;
}

export const Hero = ({ className }: HeroProps) => {

    const heroSlides = [
        {
            id: 1,
            title: 'GOPRO HERO9 BLACK',
            description: 'Limited stocks available. Grab it now!',
            buttonText: 'SHOP COLLECTION',
            image: goproImage,
            imageAlt: 'GoPro Hero9 Black',
        },
        {
            id: 2,
            title: 'SMART WATCH SERIES',
            description: 'New arrivals with modern design.',
            buttonText: 'SHOP COLLECTION',
            image: goproImage,
            imageAlt: 'Smart Watch Series',
        },
        {
            id: 3,
            title: 'WIRELESS HEADPHONES',
            description: 'Premium sound for everyday life.',
            buttonText: 'SHOP COLLECTION',
            image: goproImage,
            imageAlt: 'Wireless Headphones',
        },
    ]

    return (
        <div className={classNames(className, 'flex h-125 items-center bg-border')}>
            <Container>
                <Carousel
                    className="w-full bg-border"
                    slideClassName="flex justify-center items-center"
                    sliderButton="inside"
                    slidesView={1}
                >
                    {heroSlides.map((slide) => (
                        <div
                            key={slide.id}
                            className="grid min-h-[430px] grid-cols-2 items-center"
                        >
                            <div
                                className="pl-25"
                            >
                                <h1 className="text-5xl font-light tracking-[0.2em]">
                                    {slide.title}
                                </h1>

                                <p className="mt-3 text-sm text-muted">
                                    {slide.description}
                                </p>

                                <button
                                    type="button"
                                    className="mt-6 rounded-full bg-accent px-8 py-3 text-xs font-medium text-white"
                                >
                                    {slide.buttonText}
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <img
                                    src={slide.image}
                                    alt={slide.imageAlt}
                                    className="max-h-[360px] object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </Container >
        </div>

    );
};