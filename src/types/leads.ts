export interface ILead {
  id: number
  name: string
  email: string
  tel: string
  cpf: string
  maritalStatus: string
  spousesName: string
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
