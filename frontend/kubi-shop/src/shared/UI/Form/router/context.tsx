import { createContext } from 'react'
import type { FormContextValue } from '../types/types'

export const FormContext = createContext<{
  values: FormContextValue
  setValue: (name: string, value: string) => void
}>({
  values: {},
  setValue: () => {},
})
