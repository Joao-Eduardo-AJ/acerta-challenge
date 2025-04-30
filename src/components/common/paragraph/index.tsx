import { HTMLAttributes } from 'react'
import './paragraph.css'

type ParagraphProps = HTMLAttributes<HTMLElement> & {
  variant?: 'p1' | 'p2' | 'caption'
}

export function Paragraph({
  variant = 'p1',
  className,
  children,
  ...props
}: ParagraphProps) {
  return (
    <p className={`${variant} ${className}`} {...props}>
      {children}
    </p>
  )
}
