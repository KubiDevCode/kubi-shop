import classNames from 'classnames'
import line from '@/assets/image/line.png'
import { Button, Input } from '@/shared/ui'
import { useActiveFilters } from '@/shared/lib'
import type { FilterItemType, InputFilterItemType } from '../types/filterProductsTypes'

interface FilterSectionProps {
  className?: string
  title: string
  filters: Array<FilterItemType | InputFilterItemType>
  type?: 'button' | 'input'
  onClick?: (data: FilterItemType) => void
  onInputChange?: (data: InputFilterItemType, value: string) => void
}

export const FilterSection = (props: FilterSectionProps) => {
  const { className, title, filters, type = 'button', onClick, onInputChange } = props

  const { isActive, toggleFilter } = useActiveFilters()

  return (
    <div className={classNames(className, 'w-77.5')}>
      <p className="text-[36px] font-light uppercase leading-none tracking-[0.08em] text-black">{title}</p>

      <img
        className="my-5 h-6 w-full object-cover"
        src={line}
        alt=""
      />

      <div className="grid grid-cols-2 gap-3">
        {filters.map((item) => {
          if (type === 'input') {
            const inputItem = item as InputFilterItemType

            return (
              <Input
                key={inputItem.id}
                type="number"
                placeholder={inputItem.placeholder || inputItem.title}
                onChange={(value) => onInputChange?.(inputItem, value)}
              />
            )
          }

          const buttonItem = item as FilterItemType

          return (
            <Button
              key={buttonItem.id}
              className={classNames(
                'h-full w-full bg-transparent text-start transition duration-200 hover:text-accent',
                isActive(buttonItem.data) ? 'text-accent' : 'text-black'
              )}
              def={false}
              onClick={() => {
                onClick?.(buttonItem)
                toggleFilter(buttonItem.data)
              }}
            >
              {buttonItem.title}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
