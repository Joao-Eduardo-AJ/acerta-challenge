import { api } from '@src/api'
import { ILead, ILeadsResponse } from '@src/types/leads'

async function listUsers(page: number, cpf?: string, name?: string) {
  const { data } = await api.get<Promise<ILeadsResponse>>('/leads', {
    params: {
      _page: page,
      name,
      cpf
    }
  })

  return data
}

const createUser = async (data: ILead) => await api.post('/leads', data)

const updateUser = async (data: ILead, id: string) =>
  await api.put(`/leads/${id}`, data)

const deleteUser = async (id: string) => await api.delete(`/leads/${id}`)

export { createUser, listUsers, updateUser, deleteUser }
