import React from 'react'
import { AppContext } from './AppContext'

type ProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: ProviderProps) => {
  const [currentStep, setStep] = React.useState(0)
  const [filledFields, setFilledFields] = React.useState(0)

  const goPrev = () => setStep(prev => prev + -1)

  const goNext = () => setStep(prev => prev + 1)

  const handleFilledFields = (newFilledFields: number) =>
    setFilledFields(newFilledFields)

  return (
    <AppContext.Provider
      value={{ currentStep, goPrev, goNext, filledFields, handleFilledFields }}
    >
      {children}
    </AppContext.Provider>
  )
}
