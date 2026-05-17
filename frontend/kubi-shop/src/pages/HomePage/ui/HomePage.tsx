import { Footer } from '@/widgets/Footer'
import { BestSellerWidget } from '@/widgets/BestSellerWisget'
import { CategoriesWidget } from '@/widgets/CategoriesWidget'
import { Header } from '@/widgets/Header'
import { Hero } from '@/widgets/Hero'

export const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <CategoriesWidget />
      <BestSellerWidget />
      <Footer />
    </>
  )
}
