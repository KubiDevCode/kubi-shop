import { useState } from 'react'
import { FilterProducts } from '../../features/FilterProducts/FilterProducts'
import { ProductsPagination } from '../../features/ProductsPagination/ProductsPagination'
import { Path, RouterPath } from '../../shared/config/router/routerPath'
import { Container } from '../../shared/Container/Container'
import { Header } from '../../widgets/Header/Header'
import { PageHero } from '../../widgets/PageHero/PageHero'
import { ShopProductList } from '../../widgets/ShopProductList/index'
import { useGetPageProductsByFiltersQuery } from '../../shared/API/api'
import { useAppSelector } from '../../app/providers/storeProvider/store'
import {
  getShopPageBrands,
  getShopPageCategories,
  getShopPageMaxPrice,
  getShopPageMinPrice,
  getShopPageTags,
} from './model/selectors/shopPageSelectors'
import { Footer } from '@/widgets/Footer/Footer'

export const ShopPage = () => {
  const categories = useAppSelector(getShopPageCategories)
  const tags = useAppSelector(getShopPageTags)
  const brands = useAppSelector(getShopPageBrands)
  const minprice = useAppSelector(getShopPageMinPrice)
  const maxprice = useAppSelector(getShopPageMaxPrice)

  const [page, setPage] = useState(1)
  const limit = 12

  const { data, isLoading } = useGetPageProductsByFiltersQuery({
    page,
    tags,
    categories,
    limit,
    brands,
    minprice,
    maxprice,
  })

  return (
    <>
      <Header />
      <PageHero
        title="Shop"
        path={RouterPath[Path.HOME]}
      />
      <Container className="pt-25">
        <div className="flex justify-between">
          <ShopProductList
            data={data}
            isLoading={isLoading}
            limit={limit}
          />
          <FilterProducts />
        </div>
        <ProductsPagination
          totalPage={data?.totalPage}
          page={page}
          setPage={setPage}
        />
      </Container>
      <Footer />
    </>
  )
}
