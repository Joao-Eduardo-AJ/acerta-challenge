import { ILeadsResponse } from '@src/types/leads'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

async function get(page: number) {
  const response = await api.get('/leads', {
    params: {
      _page: page
    }
  })

  return {
    data: response.data,
    total: Number(response.headers['x-total-count'])
  }
}

async function list(page: number, cpf?: string, name?: string) {
  const response = await api.get<Promise<ILeadsResponse>>('/leads', {
    params: {
      _page: page,
      name,
      cpf
    }
  })

  return response.data
}

export { get, list }
