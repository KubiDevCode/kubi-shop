import { BestSellerWidget } from '../widgets/BestSellerWisget/BestSellerWisget'
import { CategoriesWidget } from '../widgets/CategoriesWidget/CategoriesWidget'
import { Header } from '../widgets/Header/Header'
import { Hero } from '../widgets/Hero/Hero'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <CategoriesWidget />
      <BestSellerWidget />
    </>
  )
}

export default App
