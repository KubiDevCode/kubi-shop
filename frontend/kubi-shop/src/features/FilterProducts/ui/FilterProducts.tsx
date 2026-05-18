import classNames from 'classnames'
import { FilterSection } from './FilterSection'
import type { FilterItemType, InputFilterItemType, ShopFilterType } from '../types/filterProductsTypes'
import { shopFilters, shopPriceFilter } from '../items/filterItems'

interface FilterProductsProps {
  className?: string
  onFilterSelect: (section: ShopFilterType, filter: FilterItemType) => void
  onPriceFilterChange: (filter: InputFilterItemType, value: string) => void
}

export const FilterProducts = (props: FilterProductsProps) => {
  const { className, onFilterSelect, onPriceFilterChange } = props
  return (
    <section className={classNames(className)}>
      <div className="flex flex-col gap-7.5">
        {shopFilters.map((section) => (
          <FilterSection
            key={section.id}
            title={section.title}
            filters={section.filters}
            onClick={(filter) => onFilterSelect(section, filter)}
            type={'button'}
          />
        ))}
        <FilterSection
          title={shopPriceFilter.title}
          filters={shopPriceFilter.filters}
          type="input"
          onInputChange={onPriceFilterChange}
        />
      </div>
    </section>
  )
}
