import classNames from 'classnames'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  def?: boolean
}

export const Button = (props: ButtonProps) => {
  const { className, onClick, children, def = true, ...otherProps } = props

  return (
    <button
      className={classNames(className, {
        ['mt-6 rounded-full bg-accent px-8 py-3 text-xs font-medium text-white transition duration-200 hover:opacity-80']:
          def,
      })}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  )
}
