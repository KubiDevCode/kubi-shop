import { useState } from 'react'
import { FilterProducts } from '@/features/FilterProducts'
import type { FilterItemType, InputFilterItemType, ShopFilterType } from '@/features/FilterProducts'
import { ProductsPagination } from '@/features/ProductsPagination'
import { Path, RouterPath } from '@/shared/config/router/routerPath'
import { Container } from '@/shared/ui'
import { Header } from '@/widgets/Header'
import { PageHero } from '@/widgets/PageHero'
import { ShopProductList } from '@/widgets/ShopProductList'
import { useAppDispatch, useAppSelector } from '@/shared/model/store'
import {
  getShopPageBrands,
  getShopPageCategories,
  getShopPageMaxPrice,
  getShopPageMinPrice,
  getShopPageSort,
  getShopPageTags,
} from '../model/selectors/shopPageSelectors'
import { shopPageActions } from '../model/slice/shopPageSlice'
import { Footer } from '@/widgets/Footer'
import { useGetPageProductsByFiltersQuery, type SortProductsType } from '@/entities/Product'

export const ShopPage = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(getShopPageCategories)
  const tags = useAppSelector(getShopPageTags)
  const brands = useAppSelector(getShopPageBrands)
  const minprice = useAppSelector(getShopPageMinPrice)
  const maxprice = useAppSelector(getShopPageMaxPrice)
  const sort = useAppSelector(getShopPageSort)

  const [page, setPage] = useState(1)
  const limit = 12

  const { data, isLoading } = useGetPageProductsByFiltersQuery({
    page,
    tags,
    categories,
    limit,
    sort,
    brands,
    minprice,
    maxprice,
  })

  const filterActions = {
    category: shopPageActions.toggleCategory,
    brand: shopPageActions.toggleBrands,
    tag: shopPageActions.toggleTags,
  }

  const filterProducts = (section: ShopFilterType, filter: FilterItemType) => {
    dispatch(filterActions[section.type](filter.data as never))
  }

  const changePriceFilter = (filter: InputFilterItemType, value: string) => {
    const price = Number(value) || (filter.action === 'minPrice' ? 0 : 99999999)

    if (filter.action === 'minPrice') {
      dispatch(shopPageActions.setMinPrice(price))
    }

    if (filter.action === 'maxPrice') {
      dispatch(shopPageActions.setMaxPrice(price))
    }
  }

  const changeSort = (value: string) => {
    dispatch(shopPageActions.setSort(value as SortProductsType))
  }

  return (
    <>
      <Header />
      <PageHero
        title="Shop"
        path={RouterPath[Path.HOME]}
      />
      <Container className="pt-25 [overflow-anchor:none]">
        <div className="flex justify-between">
          <ShopProductList
            data={data}
            isLoading={isLoading}
            limit={limit}
            sortValue={sort}
            sort={[
              { label: 'Default sorting', value: 'default' },
              { label: 'Price: low to high', value: 'asc' },
              { label: 'Price: high to low', value: 'desc' },
            ]}
            onChangeSort={changeSort}
          />
          <FilterProducts
            onFilterSelect={filterProducts}
            onPriceFilterChange={changePriceFilter}
          />
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
