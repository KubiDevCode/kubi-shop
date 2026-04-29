import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { Children, type ReactNode } from 'react';
import classNames from 'classnames';
import SliderRight from '../../assets/icons/slider-right.svg?react'
import SliderLeft from '../../assets/icons/slider-left.svg?react'

interface CarouselProps {
    className?: string;
    slideClassName?: string;
    children: ReactNode;
    slidesView?: number;
    options?: EmblaOptionsType;
    sliderButton?: 'outside' | 'inside';
}

export const Carousel = (props: CarouselProps) => {
    const {
        className,
        slideClassName,
        children,
        slidesView = 1,
        options,
        sliderButton = 'outside',
    } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        ...options,
    });

    const slideWidth = 100 / slidesView;

    const slides = Children.map(children, (child) => (
        <div
            className={classNames('min-w-0 shrink-0 grow-0', slideClassName)}
            style={{ flexBasis: `${slideWidth}%` }}
        >
            {child}
        </div>
    ));


    if (sliderButton === 'outside') {
        return (
            <section className={classNames('flex items-center gap-4', className)}>
                <button
                    type="button"
                    className="
                        flex items-center justify-center h-13 w-13 shrink-0 border-2 rounded
                         border-border bg-section text-muted
                         "
                    onClick={() => emblaApi?.scrollPrev()}>
                    <SliderLeft />
                </button>

                <div ref={emblaRef} className="overflow-hidden min-w-0 flex-1">
                    <div className="flex">
                        {slides}
                    </div>
                </div>

                <button
                    type="button"
                    className="
                        flex items-center justify-center h-13 w-13 shrink-0 border-2 rounded
                         border-border bg-section text-muted
                         "
                    onClick={() => emblaApi?.scrollNext()}>
                    <SliderRight />
                </button>
            </section>
        );
    }

    return (
        <section className={classNames('relative', className)}>
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {slides}
                </div>
            </div>

            <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2
                 flex items-center justify-center h-13 w-13 shrink-0 border-2 rounded
                         border-border bg-section text-muted"
            >
                <SliderLeft />
            </button>

            <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2
                 flex items-center justify-center h-13 w-13 shrink-0 border-2 rounded
                         border-border bg-section text-muted"
            >
                <SliderRight />
            </button>
        </section>
    );
};