import { useAppContext } from '@src/hooks'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router'
import { CreateForm, Stepper } from './components'
import { validationSchema } from './components/form/schema'
import { createUser, updateUser } from '@src/services/leads'
import { ILead } from '@src/types/leads'
import { toast } from 'react-toastify'
import { sanitizeField } from '@src/utils'

const steps = [
  { id: 1, label: 'Dados Pessoais' },
  { id: 2, label: 'Contato' }
]

export const CreateLeadPage = () => {
  const navigate = useNavigate()
  const { filledFields, leads } = useAppContext()

  const { id } = useParams()
  const lead = leads.find(l => l.id === id)

  async function handleSubmit(values: ILead) {
    // I would like to validate the information
    // of previously registered users but this
    // would be the responsibility of the backend

    values.cpf = sanitizeField(values.cpf)
    values.tel = sanitizeField(values.tel)
    try {
      if (id) {
        updateUser(values, id)
        toast.success(`User edited successfully`)
      } else {
        createUser(values)
        toast.success(`User registered successfully`)
      }
      navigate('/leads')
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error. Please try again.'

      toast.error(`API error: ${message}`)
    }
  }

  return (
    <div>
      <div className="title-container">
        <h2>{id ? 'Editando' : 'Cadastrando'}</h2>
      </div>
      <article className="paper">
        <Stepper steps={steps} filledFields={filledFields} totalFields={6} />
        <Formik
          initialValues={{
            name: lead?.name || '',
            cpf: lead?.cpf || '',
            maritalStatus: lead?.maritalStatus || '',
            spousesName: lead?.spousesName || '',
            email: lead?.email || '',
            tel: lead?.tel || ''
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <CreateForm steps={steps} />
        </Formik>
      </article>
    </div>
  )
}
