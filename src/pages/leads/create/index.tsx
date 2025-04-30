import { Button, Input, MaskedInput, Select } from '@src/components/common'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router'
import * as yup from 'yup'

const validationSchema = yup.object({
  name: yup.string().optional(),
  cpf: yup.string().optional(),
  maritalStatus: yup.string().optional(),
  spousesName: yup.string().optional()
})

export const CreateLeadPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEditMode = Boolean(id)

  const handleNavigate = () => navigate('/leads')

  function handleSubmit(values: yup.InferType<typeof validationSchema>) {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <main>
      <div className="title-container">
        <h2>{isEditMode ? 'Editando' : 'Cadastrando'}</h2>
      </div>
      <Formik
        initialValues={{
          name: '',
          cpf: '',
          maritalStatus: '',
          spousesName: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form className="paper container">
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
                options={[]}
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
            <div className="actions-row">
              <Button onClick={handleNavigate} variant="outlined">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Filtrar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}
