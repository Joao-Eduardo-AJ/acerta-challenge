import * as y from 'yup'

function verifyCpf(cpf?: string) {
  if (!cpf) return false
  let sum = 0
  let rest = 0
  if (cpf === '00000000000') return false

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(cpf.substring(10, 11))) return false
  return true
}

export const validationSchema = y.object({
  id: y.number(),
  name: y.string().required(),
  cpf: y
    .string()
    .transform(value => value?.replace(/[.-]/g, '') || '')
    .required('CPF é obrigatório')
    .test('cpf-valid', 'CPF inválido', value => verifyCpf(value)),
  maritalStatus: y.string().required(),
  spousesName: y.string(),
  email: y.string().email().required(),
  tel: y
    .string()
    .transform(value => value?.replace(/[()\s-]/g, '') || '')
    .required()
})
