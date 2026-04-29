import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { Children, type ReactNode } from "react";
import classNames from "classnames";

import SliderRight from "../../assets/icons/slider-right.svg?react";
import SliderLeft from "../../assets/icons/slider-left.svg?react";
import { Button } from "../Button/Button";

interface CarouselProps {
    className?: string;
    slideClassName?: string;
    children: ReactNode;
    slidesView?: number;
    options?: EmblaOptionsType;
    sliderButton?: "outside" | "inside";
    slideType?: "fixed" | "fluid";
}

export const Carousel = (props: CarouselProps) => {
    const {
        className,
        slideClassName,
        children,
        slidesView = 1,
        options,
        sliderButton = "outside",
        slideType = "fluid",
    } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        ...options,
    });


    const slides = Children.map(children, (child) => (
        <div
            className={classNames(
                "min-w-0 shrink-0 grow-0",
                slideType === "fixed" && "basis-auto",
                slideType === "fluid" && "w-full",
                slideClassName
            )}
            style={
                slideType === "fluid"
                    ? { flex: `0 0 ${100 / slidesView}%` }
                    : undefined
            }
        >
            {child}
        </div>
    ));

    const buttonClassName =
        "flex h-13 w-13 items-center justify-center rounded border-2 border-border bg-section text-muted";

    return (
        <section className={classNames("relative mx-auto", className)}>
            {sliderButton === "outside" && (
                <Button
                    onClick={() => emblaApi?.scrollPrev()}
                    def={false}
                    className={classNames(
                        buttonClassName,
                        "absolute -left-20 top-1/2 z-10 -translate-y-1/2"
                    )}
                >
                    <SliderLeft />
                </Button>
            )}

            <div ref={emblaRef} className="w-full overflow-hidden">
                <div className="flex gap-10">
                    {slides}
                </div>
            </div>

            {sliderButton === "outside" && (
                <Button
                    onClick={() => emblaApi?.scrollNext()}
                    def={false}
                    className={classNames(
                        buttonClassName,
                        "absolute -right-20 top-1/2 z-10 -translate-y-1/2"
                    )}
                >
                    <SliderRight />
                </Button>
            )}

            {sliderButton === "inside" && (
                <>
                    <Button
                        onClick={() => emblaApi?.scrollPrev()}
                        def={false}
                        className={classNames(
                            buttonClassName,
                            "absolute left-4 top-1/2 z-10 -translate-y-1/2"
                        )}
                    >
                        <SliderLeft />
                    </Button>

                    <Button
                        onClick={() => emblaApi?.scrollNext()}
                        def={false}
                        className={classNames(
                            buttonClassName,
                            "absolute right-4 top-1/2 z-10 -translate-y-1/2"
                        )}
                    >
                        <SliderRight />
                    </Button>
                </>
            )}
        </section>
    );
};