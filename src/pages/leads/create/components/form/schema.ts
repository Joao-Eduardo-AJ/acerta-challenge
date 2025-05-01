import * as y from 'yup'

export const validationSchema = y.object({
  name: y.string().required(),
  cpf: y.string().required(),
  maritalStatus: y.string(),
  spousesName: y.string(),
  email: y.string().email().required(),
  tel: y.string().required()
})
