export interface ILead {
  id?: string
  name: string
  email: string
  tel: string
  cpf: string
  maritalStatus?: string
  spousesName?: string
}

export interface ILeadsResponse {
  first: number
  prev: number
  next: number
  last: number
  pages: number
  items: number
  data: ILead[]
}
