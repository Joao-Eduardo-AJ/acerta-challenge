import { useNavigate } from 'react-router'
import { Button } from '../components/common/button'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import Input from '../components/common/input'
import Select from '../components/common/select'
import MaskedInput from '../components/common/masked-input'
import { Logo } from '@src/components/logo'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  birthDate: yup.date().default(() => new Date())
})

const LeadListPage = () => {
  const navigate = useNavigate()

  const handleNewLead = () => {
    navigate('/leads/new')
  }

  return (
    <div>
      <h1>Lead List</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '220px',
          margin: 'auto'
        }}
      >
        <Button>contained primary</Button>
        <Button disabled variant="outlined">
          outlined primary
        </Button>
        <Button variant="text">text primary</Button>
        <Button color="gray">contained gray</Button>
        <Button variant="outlined" color="gray">
          outlined gray
        </Button>
        <Button variant="text" color="gray">
          text gray
        </Button>
      </div>
      <Formik
        initialValues={{ name: '', email: '', birthDate: '', status: 'single' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values)
        }}
      >
        {() => (
          <Form>
            <Input name="name" label="Name" placeholder="Enter your name" />
            <Input name="email" label="Email" placeholder="Enter your email" />
            <MaskedInput
              name="birthDate"
              label="Birth Date"
              mask="99/99/9999"
              placeholder="DD/MM/YYYY"
            />
            <Select
              name="status"
              label="Marital Status"
              options={[
                { label: 'Single', value: 'single' },
                { label: 'Married', value: 'married' },
                { label: 'Divorced', value: 'divorced' }
              ]}
            />
            <button type="submit" className="button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <button onClick={handleNewLead}>New Lead</button>
      <Logo />
    </div>
  )
}

export default LeadListPage
