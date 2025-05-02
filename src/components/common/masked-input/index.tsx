import { useField } from 'formik'
import '@src/styles/input.css'
import React from 'react'

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  mask: string
}

const applyPattern = (value: string, pattern: string) => {
  const cleaned = value.replace(/\D/g, '')
  let formatted = ''
  let patternIndex = 0
  let valueIndex = 0

  while (patternIndex < pattern.length && valueIndex < cleaned.length) {
    if (pattern[patternIndex] === '9') {
      formatted += cleaned[valueIndex]
      valueIndex++
    } else {
      formatted += pattern[patternIndex]
    }
    patternIndex++
  }

  return formatted
}

export const MaskedInput = ({ label, mask, ...props }: MaskedInputProps) => {
  const [field, meta, helpers] = useField(props.name)

  React.useEffect(() => {
    const maskedValue = applyPattern(field.value, mask)
    helpers.setValue(maskedValue)
  }, [field.value])

  return (
    <div className="input-wrapper">
      <label htmlFor={props.name} className="input-label">
        {label}
      </label>
      <input
        {...props}
        value={field.value || ''}
        onBlur={field.onBlur}
        className={`input-field ${meta.touched && meta.error ? 'input-error' : ''}`}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <div className="input-error-message">{meta.error}</div>
      )}
    </div>
  )
}
