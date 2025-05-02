import { useAppContext } from '@src/hooks'
import { Paragraph } from '../../../../../components/common'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import './stepper.css'
import { useTranslation } from 'react-i18next'

type StepperProps = {
  steps: { id: number; label: string }[]
  filledFields: number
  totalFields: number
}

type CurrentCircleProps = {
  label: string
  number: number
  percentage: number
}

export function Stepper({ steps, filledFields, totalFields }: StepperProps) {
  const { t } = useTranslation()
  const { currentStep } = useAppContext()
  const percentage = useMemo(() => {
    return (filledFields / totalFields) * 100
  }, [filledFields, totalFields])

  return (
    <div className="stepper">
      {steps.map(({ id, label }, index) => {
        const isCurrent = currentStep === index
        const hasDivider = index + 1 < steps.length
        return (
          <div
            key={id}
            className={`step-wrapper ${!hasDivider ? 'max-width-140' : ''}`}
          >
            <div className="step">
              {isCurrent && (
                <CurrentCircle
                  label={t(`step.${index}`)}
                  number={id}
                  percentage={percentage}
                />
              )}
              {!isCurrent && (
                <div
                  className={`circle ${currentStep > index ? 'prev' : 'next'}`}
                  key={'step-circle'}
                  aria-current={isCurrent}
                  aria-label={`step ${index}: ${label}`}
                >
                  <span style={{ zIndex: 1 }}>{id}</span>
                </div>
              )}
              <Paragraph variant="p2">{label}</Paragraph>
            </div>
            {hasDivider && <span className="step-divider" />}
          </div>
        )
      })}
    </div>
  )
}

const CurrentCircle = ({ label, number, percentage }: CurrentCircleProps) => (
  <motion.div
    className="circle current"
    key={'step-circle'}
    initial={{
      background: `conic-gradient(var(--color-secondary) 0%, transparent 0)`
    }}
    animate={{
      background: `conic-gradient(var(--color-secondary) ${percentage}%, transparent 0)`
    }}
    transition={{ type: 'spring' }}
    aria-current={true}
    aria-label={label}
  >
    <span style={{ zIndex: 1 }}>{number}</span>
  </motion.div>
)
