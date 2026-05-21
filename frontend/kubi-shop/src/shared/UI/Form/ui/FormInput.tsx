import { useContext } from 'react'
import { Input } from '../../Input/Input'
import { FormContext } from '../router/context'
import type { FormInputProps } from '../types/types'

export const FormInput = function FormInput(props: FormInputProps) {
  const { placeholder, defValue = '', className, name } = props

  const form = useContext(FormContext)

  return (
    <Input
      value={form.values[name] || ''}
      defValue={defValue}
      placeholder={placeholder}
      className={className}
      onChange={(value) => form.setValue(name, value)}
    />
  )
}
