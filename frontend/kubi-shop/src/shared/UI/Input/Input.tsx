import classNames from 'classnames'
import { useState, type ChangeEvent } from 'react'

export interface InputProps {
  className?: string
  placeholder: string
  defValue?: string
  onChange?: (value: string) => void
  value?: string
}
export const Input = (props: InputProps) => {
  const { className, placeholder, defValue = '', onChange, value, ...otherProps } = props

  const [innerValue, setInnerValue] = useState(defValue)

  const currentValue = value ?? innerValue

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInnerValue(e.target.value)
    }

    onChange?.(e.target.value)
  }

  return (
    <input
      className={classNames(
        'h-11 w-full rounded-full border border-black/15 bg-transparent px-5 text-sm font-light uppercase tracking-[0.08em] text-black outline-none transition placeholder:text-black/35 focus:border-accent',
        className
      )}
      value={currentValue}
      placeholder={placeholder}
      onChange={onInputChange}
      {...otherProps}
    />
  )
}
