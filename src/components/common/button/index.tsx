import React from 'react'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary'
}

export const Button = ({
  color = 'primary',
  variant = 'contained',
  className = '',
  ...rest
}: IButton) => {
  return (
    <button
      {...rest}
      className={`color-${color} variant-${variant} ${className}`.trim()}
    />
  )
}
