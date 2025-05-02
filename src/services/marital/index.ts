import { api } from '@src/api'
import { IOption } from '@src/types/marital'

export async function getOptions() {
  const { data } = await api.get<Promise<IOption[]>>('/marital')

  return data
}
