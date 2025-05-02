import { Button, Input, MaskedInput } from '@src/components/common'
import { Form, Formik } from 'formik'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { Table } from './components'
import { useTranslation } from 'react-i18next'

export const ListLeadPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleNavigate = () => navigate('new')

  return (
    <main>
      <div className="title-container">
        <h2>{t('pageTitle.LIST')}</h2>
        <Button variant="outlined" onClick={handleNavigate}>
          {t('button.NEW')} <IoMdAdd size={22.5} />
        </Button>
      </div>
      <Formik initialValues={{ cpf: '', name: '' }} onSubmit={() => {}}>
        {({ resetForm, handleChange, values }) => (
          <>
            <Form className="paper container">
              <div className="fields-row">
                <MaskedInput
                  mask="999.999.999-99"
                  label={t('common.CPF_LABEL')}
                  name="cpf"
                  placeholder={t('common.PLACEHOLDER', {
                    field: t('common.CPF_LABEL').toLowerCase()
                  })}
                  onChange={handleChange}
                  value={values.cpf}
                />
                <Input
                  label={t('common.NAME_LABEL')}
                  placeholder={t('common.PLACEHOLDER', {
                    field: t('common.NAME_LABEL').toLowerCase()
                  })}
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
                  {t('button.CLEAN')}
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
