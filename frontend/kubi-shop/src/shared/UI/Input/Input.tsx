import classNames from 'classnames'
import { useState, type ChangeEvent } from 'react'

interface InputProps {
  className?: string
  placeholder: string
  defValue?: string
  onChange?: (value: string) => void
}

export const Input = (props: InputProps) => {
  const { className, placeholder, defValue = '', onChange } = props

  const [value, setValue] = useState(defValue)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e.target.value)
  }

  return (
    <input
      className={classNames(
        'h-11 w-full rounded-full border border-black/15 bg-transparent px-5 text-sm font-light uppercase tracking-[0.08em] text-black outline-none transition placeholder:text-black/35 focus:border-accent',
        className
      )}
      type="number"
      value={value}
      placeholder={placeholder}
      defaultValue={defValue}
      onChange={onInputChange}
    />
  )
}
