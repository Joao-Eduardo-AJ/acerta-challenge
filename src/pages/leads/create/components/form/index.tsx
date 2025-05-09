import {
  Button,
  Input,
  MaskedInput,
  Paragraph,
  Select
} from '@src/components/common'
import { useAppContext } from '@src/hooks'
import { getOptions } from '@src/services/marital'
import { IOption } from '@src/types/marital'
import { Form, useFormikContext } from 'formik'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsTelephone } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import * as y from 'yup'
import { validationSchema } from './schema'

type CreateFormProps = {
  steps: { id: number; label: string }[]
}

export function CreateForm({ steps }: CreateFormProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { currentStep, goPrev, goNext, handleFilledFields } = useAppContext()
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    isSubmitting,
    setFieldValue
  } = useFormikContext<y.InferType<typeof validationSchema>>()
  const { id } = useParams()
  const [options, setOptions] = React.useState<IOption[]>([])

  const navigateLeads = () => navigate('/leads')

  async function loadMaritalOptions() {
    try {
      const newOptions = await getOptions()
      setOptions(newOptions)
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error retrieving marital options. Please try again.'

      toast.error(`API error: ${message}`)
    }
  }

  function handleMaritalChange(value: string) {
    handleChange({
      target: { name: 'maritalStatus', value }
    } as React.ChangeEvent<HTMLSelectElement>)
    setFieldValue('spousesName', '')
  }

  React.useEffect(() => {
    const newFields = Object.values(values).filter(value => value !== '').length
    handleFilledFields(newFields)
  }, [handleFilledFields, values])

  React.useEffect(() => {
    if (
      (errors.cpf || errors.name || errors.maritalStatus) &&
      currentStep > 0
    ) {
      goPrev()
    }
  }, [isSubmitting])

  React.useEffect(() => {
    loadMaritalOptions()
  }, [])

  return (
    <Form className="container">
      <div className="flex-row">
        {currentStep === 0 && (
          <IoPersonOutline size={20} color="var(--color-secondary)" />
        )}
        {currentStep === 1 && (
          <BsTelephone size={18} color="var(--color-secondary)" />
        )}
        <Paragraph>{steps[currentStep].label}</Paragraph>
      </div>
      <AnimatePresence>
        <>
          {currentStep === 0 ? (
            <motion.div
              key={'step-0'}
              initial={{ opacity: 0, transform: 'translateX(25rem)' }}
              animate={{ opacity: 1, transform: 'translateX(0)' }}
              exit={{ opacity: 0, transform: 'translateX(-25rem)' }}
              className="container flex-1"
            >
              <div className="fields-row">
                <MaskedInput
                  mask="999.999.999-99"
                  label={t('common.CPF_LABEL')}
                  placeholder={t('common.PLACEHOLDER', {
                    field: t('common.CPF_LABEL').toLowerCase()
                  })}
                  name="cpf"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpf}
                />
                <Input
                  label={t('common.NAME_LABEL')}
                  placeholder={t('common.PLACEHOLDER', {
                    field: t('common.NAME_LABEL').toLowerCase()
                  })}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
              <div className="fields-row">
                <Select
                  label={t('common.MARITAL_LABEL')}
                  customOnChange={handleMaritalChange}
                  name="maritalStatus"
                  onBlur={handleBlur}
                  value={values.maritalStatus}
                  options={options.map(({ id, label }) => ({
                    id: id,
                    label: t(`maritalOption.${label}`)
                  }))}
                />
                <Input
                  label={t('common.SPOUSES_LABEL')}
                  placeholder={t('common.PLACEHOLDER', {
                    field: t('common.SPOUSES_LABEL').toLowerCase()
                  })}
                  disabled={values.maritalStatus !== 'MARRIED'}
                  name="spousesName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.spousesName}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={'step-1'}
              initial={{ opacity: 0, transform: 'translateX(25rem)' }}
              animate={{ opacity: 1, transform: 'translateX(0)' }}
              exit={{ opacity: 0, transform: 'translateX(-25rem)' }}
              className="fields-row flex-1"
            >
              <Input
                label={t('common.EMAIL_LABEL')}
                placeholder={t('common.PLACEHOLDER', {
                  field: t('common.EMAIL_LABEL').toLowerCase()
                })}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <MaskedInput
                mask="(99) 9 9999-9999"
                label={t('common.TEL_LABEL')}
                placeholder={t('common.PLACEHOLDER', {
                  field: t('common.TEL_LABEL').toLowerCase()
                })}
                name="tel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tel}
              />
            </motion.div>
          )}
        </>
      </AnimatePresence>

      <div className="actions-row">
        {currentStep === 0 ? (
          <Button type="button" variant="outlined" onClick={navigateLeads}>
            {t('button.CANCEL')}
          </Button>
        ) : (
          <Button type="button" variant="outlined" onClick={goPrev}>
            {t('button.PREVIOUS')}
          </Button>
        )}
        {currentStep === 0 ? (
          <Button type="button" onClick={goNext}>
            {t('button.NEXT')}
          </Button>
        ) : (
          <Button type="button" onClick={() => handleSubmit()}>
            {id ? t('button.UPDATE') : t('button.SUBMIT')}
          </Button>
        )}
      </div>
    </Form>
  )
}
