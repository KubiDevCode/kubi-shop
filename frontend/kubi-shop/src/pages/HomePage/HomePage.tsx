import { Footer } from '@/widgets/Footer/Footer'
import { BestSellerWidget } from '../../widgets/BestSellerWisget/BestSellerWisget'
import { CategoriesWidget } from '../../widgets/CategoriesWidget/index'
import { Header } from '../../widgets/Header/Header'
import { Hero } from '../../widgets/Hero/Hero'

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
