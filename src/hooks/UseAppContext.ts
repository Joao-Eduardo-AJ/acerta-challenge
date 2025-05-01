import { AppContext } from '@src/context/AppContext'
import { useContext } from 'react'

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um ContextProvider')
  }
  return context
}
