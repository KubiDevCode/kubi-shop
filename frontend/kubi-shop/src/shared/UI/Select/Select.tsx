import classNames from 'classnames'

interface SelectProps {
  className?: string
  value?: string
  selectOptions: { label: string; value: string }[]
  onChange?: (value: string) => void
}

export const Select = (props: SelectProps) => {
  const { className, selectOptions, value, onChange } = props

  return (
    <select
      className={classNames(className)}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {selectOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
