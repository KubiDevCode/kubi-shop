import classNames from 'classnames'
import {
  FilterProducts,
  type FilterItemType,
  type InputFilterItemType,
  type ShopFilterType,
} from '@/features/FilterProducts'
import { ShopPageSearch } from '../ShopPageSearch/ShopPageSearch'
import type { FormValues } from '@/shared/ui'

interface ShopPageSidebarProps {
  className?: string
  filterProducts: (section: ShopFilterType, filter: FilterItemType) => void
  changePriceFilter: (filter: InputFilterItemType, value: string) => void
  setSearch: (value: FormValues) => void
}

export const ShopPageSidebar = (props: ShopPageSidebarProps) => {
  const { className, filterProducts, changePriceFilter, setSearch } = props
  return (
    <aside className={classNames(className)}>
      <ShopPageSearch setSearch={setSearch} />
      <FilterProducts
        onFilterSelect={filterProducts}
        onPriceFilterChange={changePriceFilter}
      />
    </aside>
  )
}
