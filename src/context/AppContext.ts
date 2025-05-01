import { createContext } from 'react'

type ContextProps = {
  currentStep: number
  goPrev: () => void
  goNext: () => void
  filledFields: number
  handleFilledFields: (newFields: number) => void
}

export const AppContext = createContext({
  currentStep: 0,
  goPrev: () => {},
  goNext: () => {},
  filledFields: 0,
  handleFilledFields: () => {}
} as ContextProps)
