import { Field, useField } from 'formik'
import './input.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = ({ label, ...props }: InputProps) => {
  const [field, meta] = useField(props.name)

  return (
    <div className="input-wrapper">
      <label htmlFor={props.name} className="input-label">
        {label}
      </label>
      <Field
        {...field}
        {...props}
        id={props.name}
        className={`input-field ${meta.touched && meta.error ? 'input-error' : ''}`}
      />
      {meta.touched && meta.error && (
        <div className="input-error-message">{meta.error}</div>
      )}
    </div>
  )
}

export default Input
