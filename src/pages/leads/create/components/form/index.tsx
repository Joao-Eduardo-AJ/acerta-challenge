import {
  Button,
  Input,
  MaskedInput,
  Paragraph,
  Select
} from '@src/components/common'
import { useAppContext } from '@src/hooks'
import { Form, useFormikContext } from 'formik'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import * as y from 'yup'
import { validationSchema } from './schema'
import { getOptions } from '@src/services/marital'
import { toast } from 'react-toastify'

type CreateFormProps = {
  steps: { id: number; label: string }[]
}

export function CreateForm({ steps }: CreateFormProps) {
  const navigate = useNavigate()
  const { currentStep, goPrev, goNext, handleFilledFields } = useAppContext()
  const { values, handleChange, handleBlur, handleSubmit, errors } =
    useFormikContext<y.InferType<typeof validationSchema>>()
  const [options, setOptions] = React.useState<string[]>([])
  const { id } = useParams()

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

  React.useEffect(() => {
    const newFields = Object.values(values).filter(value => value !== '').length
    handleFilledFields(newFields)
  }, [handleFilledFields, values])

  React.useEffect(() => {
    if ((errors.cpf || errors.name) && currentStep > 0) {
      goPrev()
    }
  }, [errors.cpf, errors.name])

  React.useEffect(() => {
    loadMaritalOptions()
  }, [])

  return (
    <Form className="container">
      <Paragraph>{steps[currentStep].label}</Paragraph>
      <AnimatePresence>
        <>
          {currentStep === 0 ? (
            <motion.div
              key={'step-0'}
              initial={{ opacity: 0, transform: 'translateX(400px)' }}
              animate={{ opacity: 1, transform: 'translateX(0)' }}
              exit={{ opacity: 0, transform: 'translateX(-400px)' }}
              className="container flex-1"
            >
              <div className="fields-row">
                <MaskedInput
                  mask="999.999.999-99"
                  label="CPF"
                  name="cpf"
                  placeholder="Digite o CPF do cliente"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpf}
                />
                <Input
                  label="Nome do cliente"
                  placeholder="Digite o nome do cliente"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
              <div className="fields-row">
                <Select
                  label="Estado civil"
                  name="maritalStatus"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.maritalStatus}
                  options={options.map(opt => ({ label: opt, value: opt }))}
                />
                <Input
                  label="Nome do cônjugue"
                  placeholder="Digite o nome do cônjugue"
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
              initial={{ opacity: 0, transform: 'translateX(400px)' }}
              animate={{ opacity: 1, transform: 'translateX(0)' }}
              exit={{ opacity: 0, transform: 'translateX(-400px)' }}
              className="fields-row flex-1"
            >
              <Input
                label="E-mail"
                placeholder="Digite o e-mail do cliente"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <MaskedInput
                mask="(99) 9 9999-9999"
                label="Telefone"
                name="tel"
                placeholder="Digite o telefone do cliente"
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
            Cancelar
          </Button>
        ) : (
          <Button type="button" variant="outlined" onClick={goPrev}>
            Voltar
          </Button>
        )}
        {currentStep === 0 ? (
          <Button type="button" onClick={goNext}>
            Avançar
          </Button>
        ) : (
          <Button type="button" onClick={() => handleSubmit()}>
            {id ? 'Editar' : 'Cadastrar'}
          </Button>
        )}
      </div>
    </Form>
  )
}
