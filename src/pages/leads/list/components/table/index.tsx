import { TablePagination } from '@src/components/common'
import { useAppContext, useDebounce } from '@src/hooks'
import { listUsers } from '@src/services/leads'
import { sanitizeField } from '@src/utils'
import { useFormikContext } from 'formik'
import React from 'react'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export function Table() {
  const [page, setPage] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const { handleLeads, leads } = useAppContext()
  const navigate = useNavigate()
  const { values } = useFormikContext<{
    cpf: string
    name: string
  }>()
  const { cpf, name } = values

  const dCpf = useDebounce(cpf)
  const dName = useDebounce(name)

  async function loadLeads() {
    try {
      const { data, items } = await listUsers(
        page + 1,
        sanitizeField(dCpf),
        name
      )
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
          {leads.map(({ id, cpf, email, name, tel }) => (
            <tr>
              <td>{name}</td>
              <td>{cpf}</td>
              <td>{email}</td>
              <td>{tel}</td>
              <td className="row-action">
                <button
                  className="icon-button small"
                  onClick={() => navigate(`/leads/${id}/edit`)}
                >
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
