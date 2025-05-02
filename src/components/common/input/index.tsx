import '@src/styles/input.css'
import { useField } from 'formik'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = ({ label, disabled, ...props }: InputProps) => {
  const [field, meta] = useField(props.name)

  return (
    <div className="input-wrapper" aria-disabled={disabled}>
      <label htmlFor={props.name} className="input-label">
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={props.name}
        className={`input-field ${meta.touched && meta.error ? 'input-error' : ''}`}
        disabled={disabled}
      />
      {meta.touched && meta.error && (
        <div className="input-error-message">{meta.error}</div>
      )}
    </div>
  )
}
