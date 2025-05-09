import { Paragraph } from '@src/components/common'
import { useRef } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import './table-pagination.css'
import { useTranslation } from 'react-i18next'

interface TablePaginationProps {
  colSpan: number
  count: number
  page: number
  onPageChange: (newPage: number) => void
}

export const TablePagination = ({
  colSpan,
  count,
  page,
  onPageChange
}: TablePaginationProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const rowsPerPage = 10

  if (count <= 10) {
    return <></>
  }

  const start = rowsPerPage * page + 1
  const end = Math.min(rowsPerPage * (page + 1), count)
  const lastPage = Math.ceil(count / rowsPerPage)

  const handlePage = (newPage: number) => {
    onPageChange(newPage)
    if (ref.current) {
      const left = (newPage - 2) * 36
      ref.current.scrollTo({ left, behavior: 'smooth' })
    }
  }

  return (
    <tfoot>
      <tr>
        <td colSpan={colSpan}>
          <div className="table-pagination">
            <Paragraph variant="caption">
              {`${t('tablePagination.SHOWING')} ${start}-${end} ${t('tablePagination.OF')} ${count} ${t('tablePagination.RECORDS')}`}
            </Paragraph>
            <div className="table-pagination-actions">
              <button
                className="nav-button"
                disabled={page === 0}
                onClick={() => handlePage(page - 1)}
              >
                <MdArrowBackIos size={20} />
              </button>

              <button
                className="page-button"
                disabled={page === 0}
                onClick={() => handlePage(0)}
              >
                1
              </button>

              <div ref={ref} className="page-button-wrapper">
                {Array.from({ length: lastPage }, (_, i) => {
                  if (i === 0 || i === lastPage - 1) return
                  return (
                    <button
                      key={i}
                      className="page-button"
                      onClick={() => handlePage(i)}
                      disabled={page === i}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>

              {lastPage > 1 && (
                <button
                  className="page-button"
                  disabled={page + 1 === lastPage}
                  onClick={() => handlePage(lastPage - 1)}
                >
                  {lastPage}
                </button>
              )}

              <button
                className="nav-button"
                disabled={page + 1 === lastPage}
                onClick={() => handlePage(page + 1)}
              >
                <MdArrowForwardIos size={20} />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}
