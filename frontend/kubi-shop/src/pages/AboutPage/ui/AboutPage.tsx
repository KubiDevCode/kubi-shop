import { PageHero } from '@/widgets/PageHero'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { Carousel, Container } from '@/shared/ui'

import CartSVG from '@/assets/icons/about/cart.svg?react'
import CupSVG from '@/assets/icons/about/cup.svg?react'
import PriceTagSVG from '@/assets/icons/about/price-tag.svg?react'
import ChatSVG from '@/assets/icons/about/chat.svg?react'
import RewiewStarSVG from '@/assets/icons/rewiew-star.svg?react'

import TechLightSVG from '@/assets/image/about/techlight.svg?react'
import MiniStoreSVG from '@/assets/image/about/MiniStore.svg?react'
import UltrasSVG from '@/assets/image/about/Ultras.svg?react'
import SwankySVG from '@/assets/image/about/Swanky.svg?react'
import EmilySVG from '@/assets/image/about/Emily.svg?react'

import { SectionLabel } from '@/widgets/SectionLabel'

const AboutQualityComponent = ({
  title,
  description,
  SVGComponent,
}: {
  title: string
  description: string
  SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>
}) => {
  return (
    <div className="self-stretch inline-flex justify-start items-start gap-2.5">
      <div className="size-8 relative overflow-hidden">
        <SVGComponent />
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
        <div className="self-stretch justify-start text-neutral-800 text-xl font-extralight font-['Outfit'] uppercase tracking-wider">
          {title}
        </div>
        <div className="self-stretch justify-start text-neutral-800 text-xl font-extralight font-['Outfit'] tracking-tight">
          {description}
        </div>
      </div>
    </div>
  )
}

const RewiewComponent = ({
  authorName,
  contnent,
  amountOfStars = 5,
}: {
  authorName: string
  contnent: string
  amountOfStars?: number
}) => {
  return (
    <div className="self-stretch p-10 bg-white rounded-[10px] outline -outline-offset-1 outline-neutral-200 inline-flex flex-col justify-center items-start gap-7">
      <div className="self-stretch justify-start text-neutral-800 text-xl font-extralight font-['Outfit'] tracking-tight">
        “{contnent}”
      </div>
      <div className="size- flex flex-col justify-start items-start gap-2">
        <div className="size- inline-flex justify-start items-start gap-1.5">
          {Array.from({ length: amountOfStars }).map(() => (
            <RewiewStarSVG key={length} />
          ))}
        </div>
        <div className="justify-start text-neutral-800 text-xl font-normal font-['Outfit'] capitalize tracking-tight">
          {authorName}
        </div>
      </div>
    </div>
  )
}

export const AboutPage = () => {
  return (
    <>
      <Header />
      <PageHero title="About" />
      <main className="grow">
        <section className="section">
          <Container className="grid grid-cols-4 gap-5">
            <AboutQualityComponent
              title="Free delivery"
              description="Consectetur adipi elit lorem ipsum dolor sit amet."
              SVGComponent={CartSVG}
            />
            <AboutQualityComponent
              title="Quality guarantee"
              description="Dolor sit amet orem ipsu mcons ectetur adipi elit."
              SVGComponent={CupSVG}
            />
            <AboutQualityComponent
              title="Daily offers"
              description="Amet consectetur adipi elit loreme ipsum dolor sit."
              SVGComponent={PriceTagSVG}
            />
            <AboutQualityComponent
              title="100% secure payment"
              description="Rem Lopsum dolor sit amet, consectetur adipi elit."
              SVGComponent={ChatSVG}
            />
          </Container>
        </section>

        <section className="section">
          <Container>
            <SectionLabel title="Customers reviews" />
            <Carousel
              slidesView={3}
              gap={20}
              sliderButton="outside"
            >
              <RewiewComponent
                authorName="Emma Chamberlin"
                contnent="
      I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!"
              />
              <RewiewComponent
                authorName="Emma Chamberlin"
                contnent="
      I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!"
              />
              <RewiewComponent
                authorName="Emma Chamberlin"
                contnent="
      I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!"
              />
              <RewiewComponent
                authorName="Emma Chamberlin"
                contnent="
      I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!"
              />
            </Carousel>
          </Container>
        </section>
        <section className="section border-t border-b border-neutral-200">
          <Container className="py-24 flex justify-between items-center">
            <TechLightSVG />
            <MiniStoreSVG />
            <UltrasSVG />
            <SwankySVG />
            <EmilySVG />
          </Container>
        </section>
      </main>
      <Footer />
      {/* <Hero /> */}
      {/* <CategoriesWidget /> */}
      {/* <BestSellerWidget /> */}
    </>
  )
}
