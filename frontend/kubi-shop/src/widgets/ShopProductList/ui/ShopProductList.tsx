import { ItemCard } from '@/entities/ItemCard'
import type { ProductPageType } from '@/entities/Product'
import { Skeleton } from '@/shared/ui'
import { Select } from '@/shared/ui/Select/Select'

interface ShopProductListProps {
  limit: number
  data: ProductPageType | undefined
  isLoading: boolean
  sortValue: string
  sort: { label: string; value: string }[]
  onChangeSort: (value: string) => void
}

export const ShopProductList = (props: ShopProductListProps) => {
  const { limit, data, isLoading, sortValue, sort, onChangeSort } = props

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-3.75">
          <Skeleton className="w-70 h-9" />
          <Select
            value={sortValue}
            selectOptions={sort}
            className="text-[24px]"
            onChange={onChangeSort}
          />
        </div>
        <div className="grid min-h-220 w-max grid-cols-4 gap-x-2.5 gap-y-5">
          {Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="flex h-70 w-50 flex-col justify-between rounded-2xl border-2 border-border bg-white px-6.25 py-7.5"
            >
              <Skeleton className="mb-4 h-full rounded-lg" />
              <Skeleton className="mx-auto h-5 w-24" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3.75">
        <h2 className="text-[24px]">
          {data ? `Showing 1–${data?.totalPage} of ${data?.total} results` : 'No results'}
        </h2>
        <Select
          value={sortValue}
          selectOptions={sort}
          className="text-[24px]"
          onChange={onChangeSort}
        />
      </div>
      <div className="grid min-h-220 w-max grid-cols-4 content-start gap-x-2.5 gap-y-5">
        {data?.products.map((item) => (
          <ItemCard
            size="big"
            title={item.name}
            price={item.price}
            key={item.id}
            img={item.img}
          />
        ))}
      </div>
    </section>
  )
}
