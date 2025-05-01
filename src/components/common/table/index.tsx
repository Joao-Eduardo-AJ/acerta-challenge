import { useAppContext, useDebounce } from '@src/hooks'
import { list } from '@src/services/leads/leads.service'
import { useFormikContext } from 'formik'
import React from 'react'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { toast } from 'react-toastify'
import { TablePagination } from './table-pagination'

export function Table() {
  const [page, setPage] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const { handleLeads, leads } = useAppContext()
  const { values } = useFormikContext<{
    cpf: string
    name: string
  }>()
  const { cpf, name } = values

  const dCpf = useDebounce(cpf)
  const dName = useDebounce(name)

  async function loadLeads() {
    try {
      const newCpf = dCpf.replace(/[.-]/g, '')
      const { data, items } = await list(page + 1, newCpf, name)
      handleLeads(data)
      setCount(items)
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error. Please try again.'

      toast.error(`API error: ${message}`)
      handleLeads([])
      setCount(0)
    }
  }

  const handlePage = (newPage: number) => setPage(newPage)

  React.useEffect(() => {
    loadLeads()
  }, [page, dCpf, dName])

  return (
    <div className="paper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {leads.map(({ cpf, email, name, tel }) => (
            <tr>
              <td>{name}</td>
              <td>{cpf}</td>
              <td>{email}</td>
              <td>{tel}</td>
              <td className="row-action">
                <button className="icon-button small">
                  <MdOutlineEdit size={20} />
                </button>
              </td>
              <td className="row-action">
                <button className="icon-button small">
                  <MdDeleteOutline size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <TablePagination
          colSpan={6}
          count={count}
          page={page}
          onPageChange={handlePage}
        />
      </table>
    </div>
  )
}
