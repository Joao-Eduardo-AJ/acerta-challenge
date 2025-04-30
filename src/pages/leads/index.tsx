import { Button, Input, MaskedInput, Paragraph } from '@src/components/common'
import { Formik, Form } from 'formik'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

const validationSchema = yup.object({
  name: yup.string().optional(),
  cpf: yup.string().optional()
})

export const ListLeadPage = () => {
  const navigate = useNavigate()

  const handleNavigate = () => navigate('new')

  function handleSubmit(values: yup.InferType<typeof validationSchema>) {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <main>
      <div className="title-container">
        <h2>Consulta de Leads</h2>
        <Button variant="outlined" onClick={handleNavigate}>
          Novo Lead <IoMdAdd size={22.5} />
        </Button>
      </div>
      <Formik
        initialValues={{ name: '', cpf: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm, handleChange, handleBlur, values }) => (
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
            <div className="actions-row">
              <Button onClick={() => resetForm()} variant="outlined">
                Limpar tudo
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Filtrar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <table className="paper">
        <Paragraph variant="caption">Nenhum lead cadastrado</Paragraph>
      </table>
    </main>
  )
}
