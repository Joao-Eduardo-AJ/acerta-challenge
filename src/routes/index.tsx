import { CreateLeadPage, ListLeadPage } from '@src/pages/leads'
import { createBrowserRouter, Navigate } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/leads" replace />
  },
  {
    path: '/leads',
    element: <ListLeadPage />
  },
  {
    path: '/leads/new',
    element: <CreateLeadPage />
  },
  {
    path: '/leads/:id/edit',
    element: <CreateLeadPage />
  }
])
