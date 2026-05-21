import { useState } from 'react'
import { FormContext } from './context'
import type { FormContextValue } from '../types/types'

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<FormContextValue>({})

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return <FormContext.Provider value={{ values, setValue }}>{children}</FormContext.Provider>
}
