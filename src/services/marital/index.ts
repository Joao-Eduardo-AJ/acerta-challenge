import { api } from '@src/api'

export async function getOptions() {
  const { data } = await api.get<Promise<string[]>>('/marital')

  return data
}
