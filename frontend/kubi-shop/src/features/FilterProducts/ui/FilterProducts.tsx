import classNames from 'classnames'
import { useAppDispatch } from '@/shared/model/store'
import { shopPageActions } from '../model/slice/shopPageSlice'
import { FilterSection } from './FilterSection'
import type { FilterItem, InputFilterItem, ShopFilter } from '../types/filterProductsTypes'
import { shopFilters, shopPriceFilter } from '../items/filterItems'

interface FilterProductsProps {
  className?: string
}

export const FilterProducts = ({ className }: FilterProductsProps) => {
  const dispatch = useAppDispatch()

  const filterActions = {
    category: shopPageActions.toggleCategory,
    brand: shopPageActions.toggleBrands,
    tag: shopPageActions.toggleTags,
  }
  const filterProducts = (section: ShopFilter, filter: FilterItem) => {
    dispatch(filterActions[section.type](filter.data as never))
  }

  const changePriceFilter = (filter: InputFilterItem, value: string) => {
    const price = Number(value) || (filter.action === 'minPrice' ? 0 : 99999999)

    if (filter.action === 'minPrice') {
      dispatch(shopPageActions.setMinPrice(price))
    }

    if (filter.action === 'maxPrice') {
      dispatch(shopPageActions.setMaxPrice(price))
    }
  }

  return (
    <section className={classNames(className)}>
      <div className="flex flex-col gap-7.5">
        {shopFilters.map((section) => (
          <FilterSection
            key={section.id}
            title={section.title}
            filters={section.filters}
            onClick={(filter) => filterProducts(section, filter)}
            type={'button'}
          />
        ))}
        <FilterSection
          title={shopPriceFilter.title}
          filters={shopPriceFilter.filters}
          type="input"
          onInputChange={changePriceFilter}
        />
      </div>
    </section>
  )
}
