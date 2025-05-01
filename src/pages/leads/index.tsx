import { Button, Input, MaskedInput } from '@src/components/common'
import { Form, Formik } from 'formik'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { Table } from '../../components/common/table'

export const ListLeadPage = () => {
  const navigate = useNavigate()

  const handleNavigate = () => navigate('new')

  return (
    <main>
      <div className="title-container">
        <h2>Consulta de Leads</h2>
        <Button variant="outlined" onClick={handleNavigate}>
          Novo Lead <IoMdAdd size={22.5} />
        </Button>
      </div>
      <Formik initialValues={{ cpf: '', name: '' }} onSubmit={() => {}}>
        {({ resetForm, handleChange, values }) => (
          <>
            <Form className="paper container">
              <div className="fields-row">
                <MaskedInput
                  mask="999.999.999-99"
                  label="CPF"
                  name="cpf"
                  placeholder="Digite o CPF do cliente"
                  onChange={handleChange}
                  value={values.cpf}
                />
                <Input
                  label="Nome do cliente"
                  placeholder="Digite o nome do cliente"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
              <div className="actions-row">
                <Button
                  type="button"
                  onClick={() => resetForm()}
                  variant="outlined"
                >
                  Limpar tudo
                </Button>
                {/* We don't necessarily need to click to
                  filter since we are using useDebounce
                <Button type="submit">Filter</Button> */}
              </div>
            </Form>
            <Table />
          </>
        )}
      </Formik>
    </main>
  )
}
