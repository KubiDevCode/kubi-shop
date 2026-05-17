import { useState } from 'react'
import { FilterProducts } from '@/features/FilterProducts'
import { ProductsPagination } from '@/features/ProductsPagination'
import { Path, RouterPath } from '@/shared/config/router/routerPath'
import { Container } from '@/shared/ui'
import { Header } from '@/widgets/Header'
import { PageHero } from '@/widgets/PageHero'
import { ShopProductList } from '@/widgets/ShopProductList'
import { useAppSelector } from '@/shared/model/store'
import {
  getShopPageBrands,
  getShopPageCategories,
  getShopPageMaxPrice,
  getShopPageMinPrice,
  getShopPageTags,
} from '@/features/FilterProducts'
import { Footer } from '@/widgets/Footer'
import { useGetPageProductsByFiltersQuery } from '@/entities/Product'

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
