import { Button, Paragraph } from '@src/components/common'
import { AnimatePresence, motion } from 'motion/react'
import React, { ButtonHTMLAttributes, cloneElement, ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { CiWarning } from 'react-icons/ci'
import './modal.css'

interface ModalProps {
  button: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>, string>
  title: string
  message: string
  severity?: 'warning' | 'info'
  onConfirm: () => void
}

export function Modal({
  button,
  message,
  title,
  severity = 'warning',
  onConfirm
}: ModalProps) {
  const [open, setOpen] = React.useState(false)
  const backdropRef = React.useRef<HTMLDivElement>(null)

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (
      backdropRef.current &&
      !backdropRef.current.contains(event.target as Node)
    ) {
      onClose()
    }
  }

  function handleConfirm() {
    onConfirm()
    onClose()
  }

  return (
    <>
      {cloneElement(button, { onClick: onOpen })}
      {createPortal(
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="backdrop"
              className={`backdrop`}
              onClick={handleBackdropClick}
            >
              <motion.div
                ref={backdropRef}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 10 }}
                transition={{ duration: 0.3 }}
                key="modal"
                className="paper container"
              >
                <Paragraph variant="p1">{title}</Paragraph>
                <CiWarning size={100} className={`modal-icon ${severity}`} />
                <Paragraph variant="p2">{message}</Paragraph>
                <div className="actions-row ">
                  <Button
                    variant="outlined"
                    color="gray"
                    onClick={onClose}
                    className="confirm-cancel"
                  >
                    Cancelar
                  </Button>
                  <Button
                    color={severity === 'warning' ? 'secondary' : 'primary'}
                    onClick={handleConfirm}
                    className="confirm-confirm"
                  >
                    Confirmar
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
