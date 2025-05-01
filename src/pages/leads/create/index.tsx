import { useAppContext } from '@src/hooks'
import { Formik } from 'formik'
import { useParams } from 'react-router'
import * as y from 'yup'
import { CreateForm, Stepper } from './components'
import { validationSchema } from './components/form/schema'

const steps = [
  { id: 1, label: 'Dados Pessoais' },
  { id: 2, label: 'Contato' }
]

export const CreateLeadPage = () => {
  const { currentStep, filledFields } = useAppContext()

  const { id } = useParams()

  const isEditMode = Boolean(id)

  function handleSubmit(values: y.InferType<typeof validationSchema>) {
    console.log(values)
    console.log(currentStep)
  }

  return (
    <div>
      <div className="title-container">
        <h2>{isEditMode ? 'Editando' : 'Cadastrando'}</h2>
      </div>
      <article className="paper">
        <Stepper steps={steps} filledFields={filledFields} totalFields={6} />
        <Formik
          initialValues={{
            name: '',
            cpf: '',
            maritalStatus: '',
            spousesName: '',
            email: '',
            tel: ''
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
