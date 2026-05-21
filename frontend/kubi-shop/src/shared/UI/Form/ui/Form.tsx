import { useContext } from 'react'
import classNames from 'classnames'
import { FormContext } from '../router/context'
import { FormProvider } from '../router/FormProvider'
import { Button } from '../../Button/Button'
import { FormInput } from './FormInput'
import type { FormProps } from '../types/types'
import type { FormComponent } from '../types/types'

export const Form: FormComponent = (props: FormProps) => {
  return (
    <FormProvider>
      <Form.Inner {...props} />
    </FormProvider>
  )
}

Form.Input = FormInput

Form.Inner = function FormInner(props: FormProps) {
  const { className, onSubmit, children, buttonClassName, buttonContent } = props

  const form = useContext(FormContext)

  return (
    <form
      className={classNames(className)}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(form.values)
      }}
    >
      {children}

      <Button
        className={classNames(
          buttonClassName ??
            'h-11 shrink-0 rounded-full bg-accent px-8 text-xs font-medium text-white transition duration-200 hover:opacity-80'
        )}
        def={false}
      >
        {buttonContent}
      </Button>
    </form>
  )
}
