import React from 'react'
import { AppContext } from './AppContext'
import { ILead } from '@src/types/leads'

type ProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: ProviderProps) => {
  const [currentStep, setStep] = React.useState(0)
  const [filledFields, setFilledFields] = React.useState(0)
  const [leads, setLeads] = React.useState<ILead[]>([])

  const goPrev = () => setStep(prev => prev + -1)

  const goNext = () => setStep(prev => prev + 1)

  const handleFilledFields = (newFilledFields: number) =>
    setFilledFields(newFilledFields)

  const handleLeads = (newLeads: ILead[]) => setLeads(newLeads)

  return (
    <AppContext.Provider
      value={{
        currentStep,
        goPrev,
        goNext,
        filledFields,
        handleFilledFields,
        leads,
        handleLeads
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
