import classNames from 'classnames'
import { Form } from '@/shared/ui'
import SearchIcon from '@/assets/icons/search.svg?react'
import type { FormValues } from '@/shared/ui/Form/ui/Form'

interface ShopPageSearchProps {
  className?: string
  buttonClassName?: string
  setSearch: (value: FormValues) => void
}

export const ShopPageSearch = (props: ShopPageSearchProps) => {
  const { className, buttonClassName, setSearch } = props

  return (
    <Form
      className={classNames('flex mb-8 w-77.5 gap-3', className)}
      onSubmit={setSearch}
      buttonClassName={classNames(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-accent p-0 text-white transition duration-200 hover:opacity-80',
        buttonClassName
      )}
      buttonContent={
        <SearchIcon
          className="h-5 w-5 fill-white"
          fill="white"
        />
      }
    >
      <Form.Input
        name="search"
        placeholder="Search"
        className="h-12 w-full rounded-full border border-black/10 bg-white px-6 text-base font-light uppercase tracking-normal text-black shadow-[0_1px_4px_rgba(0,0,0,0.12)] placeholder:text-black/70 focus:border-accent"
      />
    </Form>
  )
}
