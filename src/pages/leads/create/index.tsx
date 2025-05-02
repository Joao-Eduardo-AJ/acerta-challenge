import { useAppContext } from '@src/hooks'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router'
import { CreateForm, Stepper } from './components'
import { validationSchema } from './components/form/schema'
import { createUser, updateUser } from '@src/services/leads'
import { ILead } from '@src/types/leads'
import { toast } from 'react-toastify'
import { sanitizeField } from '@src/utils'
import { useTranslation } from 'react-i18next'

export const CreateLeadPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { filledFields, leads } = useAppContext()
  const { id } = useParams()

  const lead = leads.find(l => l.id === id)
  const steps = [
    { id: 1, label: t('step.0') },
    { id: 2, label: t('step.1') }
  ]

  async function handleSubmit(values: ILead) {
    // I would like to validate the information
    // of previously registered users but this
    // would be the responsibility of the backend

    values.cpf = sanitizeField(values.cpf)
    values.tel = sanitizeField(values.tel)
    try {
      if (id) {
        updateUser(values, id)
        toast.success(t('feedback.LEAD_SUCCESSFUL_UPDATE'))
      } else {
        createUser(values)
        toast.success(t('feedback.LEAD_SUCCESSFUL_CREATE'))
      }
      navigate('/leads')
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : t('feedback.UNKNOWN')

      toast.error(`${t('feedback.API_ERROR')} ${message}`)
    }
  }

  return (
    <main>
      <div className="title-container">
        <h2>{t(id ? 'pageTitle.EDIT' : 'pageTitle.CREATE')}</h2>
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
    </main>
  )
}
