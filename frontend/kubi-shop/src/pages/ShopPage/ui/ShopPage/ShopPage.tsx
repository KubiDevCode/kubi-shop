import { ProductsPagination } from '@/features/ProductsPagination'
import { Path, RouterPath } from '@/shared/config/router/routerPath'
import { Container } from '@/shared/ui'
import { Header } from '@/widgets/Header'
import { PageHero } from '@/widgets/PageHero'
import { ShopProductList } from '@/widgets/ShopProductList'
import { Footer } from '@/widgets/Footer'
import { useGetPageProductsByFiltersQuery } from '@/entities/Product'
import { ShopPageSidebar } from '../ShopPageSidebar/ShopPageSidebar'
import { useShopPageParams } from '../../lib/hooks/useShopPageParams'

export const ShopPage = () => {
  const limit = 16

  const {
    changePrice,
    toggleFilter,
    setPage,
    setSearch,
    toggleSort,
    params: { page, tags, categories, sort, brands, minprice, maxprice, search },
  } = useShopPageParams(limit)

  const { data, isLoading } = useGetPageProductsByFiltersQuery({
    page,
    tags,
    categories,
    limit,
    sort,
    brands,
    minprice,
    maxprice,
    search,
  })

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
            onChangeSort={toggleSort}
          />
          <ShopPageSidebar
            className="w-77.5 shrink-0"
            setSearch={setSearch}
            changePriceFilter={changePrice}
            filterProducts={toggleFilter}
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
