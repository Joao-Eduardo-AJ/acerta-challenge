import { Modal, TablePagination } from '@src/components/common'
import { useAppContext, useDebounce } from '@src/hooks'
import { deleteUser, listUsers } from '@src/services/leads'
import { sanitizeField } from '@src/utils'
import { useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export function Table() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { values } = useFormikContext<{
    cpf: string
    name: string
  }>()
  const { handleLeads, leads } = useAppContext()
  const [page, setPage] = React.useState(0)
  const [count, setCount] = React.useState(0)
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
        error instanceof Error ? error.message : t('feedback.UNKNOWN')

      toast.error(`${t('feedback.API_ERROR')} ${message}`)
      handleLeads([])
      setCount(0)
    }
  }

  async function deleteLead(id?: string) {
    if (!id) {
      toast.error(
        `${t('feedback.API_ERROR')} ${t('feedback.LEAD_ID_NOT_PROVIDED')}`
      )
      return
    }
    try {
      await deleteUser(id)
      loadLeads()
      toast.success(t('feedback.LEAD_SUCCESSFUL_DELETE'))
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : t('feedback.UNKNOWN')

      toast.error(`${t('feedback.API_ERROR')} ${message}`)
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
            <th>{t('common.NAME_LABEL')}</th>
            <th>{t('common.CPF_LABEL')}</th>
            <th>{t('common.EMAIL_LABEL')}</th>
            <th>{t('common.TEL_LABEL')}</th>
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
                <Modal
                  button={
                    <button className="icon-button small">
                      <MdDeleteOutline size={20} />
                    </button>
                  }
                  title={t('deleteWarning.TITLE')}
                  message={t('deleteWarning.MESSAGE')}
                  onConfirm={() => deleteLead(id)}
                />
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
