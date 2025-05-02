import * as SelectRadix from '@radix-ui/react-select'
import '@src/styles/input.css'
import { IOption } from '@src/types/marital'
import { useField } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiArrowDropDownLine } from 'react-icons/ri'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: IOption[]
}

export const Select = ({ label, name, onChange, options }: SelectProps) => {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const [open, setOpen] = React.useState(false)

  const onOpenChange = () => setOpen(prev => !prev)

  function handleChange(value: string) {
    if (onChange) {
      onChange({
        target: { name, value }
      } as React.ChangeEvent<HTMLSelectElement>)
    }
  }

  return (
    <div className="input-wrapper">
      <label htmlFor={name} className="input-label">
        {label}
      </label>

      <SelectRadix.Root
        {...field}
        name={name}
        open={open}
        onOpenChange={onOpenChange}
        onValueChange={handleChange}
      >
        <SelectRadix.Trigger
          aria-label="marital status"
          className={`select input-field ${meta.touched && meta.error ? 'input-error' : ''}`}
          style={{
            color: `var(${field.value ? '--color-gray-base' : '--color-gray-light'})`
          }}
        >
          <SelectRadix.Value placeholder={field.value || t('select.OPTION')} />
          <SelectRadix.Icon className="select-dropdown">
            <RiArrowDropDownLine
              size={32}
              color="var(--color-gray-base)"
              style={{ rotate: open ? '180deg' : '0deg' }}
            />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content position="popper">
            <SelectRadix.Group>
              {options.map(({ id, label }) => (
                <SelectRadix.Item key={id} value={id} className="select-item">
                  <SelectRadix.ItemText>{label}</SelectRadix.ItemText>
                </SelectRadix.Item>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
      {meta.touched && meta.error && (
        <span className="input-error-message">{meta.error}</span>
      )}
    </div>
  )
}
