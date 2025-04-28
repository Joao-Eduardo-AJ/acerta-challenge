import React from 'react'
import './button.css'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'gray'
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
      className={`button ${color} ${variant} ${className}`.trim()}
    />
  )
}
