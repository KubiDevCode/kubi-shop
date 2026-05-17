import classNames from 'classnames'
import line from '@/assets/image/line.png'
import { Button, Input } from '@/shared/ui'
import { useActiveFilters } from '@/shared/lib'
import type { BrandNameType } from '@/entities/Brand'
import type { CategoryNameType } from '@/entities/Category'
import type { TagNameType } from '@/entities/Tag'

interface FilterItem {
  id: number
  title: string
  data?: CategoryNameType | BrandNameType | TagNameType
  placeholder?: string
}

interface FilterSectionProps {
  className?: string
  title: string
  filters: FilterItem[]
  type?: 'button' | 'input'
  onClick?: (data: FilterItem) => void
  onInputChange?: (id: number, value: string) => void
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
            return (
              <Input
                key={item.id}
                placeholder={item.placeholder || item.title}
                onChange={(value) => onInputChange?.(item.id, value)}
              />
            )
          }

          return (
            <Button
              key={item.id}
              className={classNames(
                'h-full w-full bg-transparent text-start transition duration-200 hover:text-accent',
                item.data && isActive(item.data) ? 'text-accent' : 'text-black'
              )}
              def={false}
              onClick={() => {
                if (item.data) {
                  onClick?.(item)
                  toggleFilter(item.data)
                }
              }}
            >
              {item.title}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
