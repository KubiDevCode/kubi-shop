import type { ReactNode } from 'react'

export interface FormInputProps {
  name: string
  placeholder: string
  defValue?: string
  className?: string
  onChange?: (value: string) => void
}

export interface FormContextValue {
  [key: string]: string
}

export interface FormProps {
  className?: string
  onSubmit?: (value: Record<string, string>) => void
  children: ReactNode
  buttonClassName?: string
  buttonContent?: ReactNode
}

export type FormComponent = React.FC<FormProps> & {
  Input: React.FC<FormInputProps>
  Inner: React.FC<FormProps>
}

export type FormValues = Record<string, string>
