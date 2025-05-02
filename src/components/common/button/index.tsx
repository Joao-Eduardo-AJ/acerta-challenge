import './button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'gray'
}

export const Button = ({
  color = 'primary',
  variant = 'contained',
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`button ${color} ${variant} ${className}`.trim()}
    />
  )
}
