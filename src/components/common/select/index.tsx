import { useField } from 'formik'
import '@src/styles/input.css'
import { SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Option[]
}

export const Select = ({ label, options, ...props }: SelectProps) => {
  const [field, meta] = useField(props.name)

  return (
    <div className="input-wrapper">
      <label htmlFor={props.name} className="input-label">
        {label}
      </label>
      <select
        {...field}
        {...props}
        id={props.name}
        className={`input-field ${meta.touched && meta.error ? 'input-error' : ''}`}
      >
        <option value="">Select an option</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="input-error-message">{meta.error}</div>
      )}
    </div>
  )
}
