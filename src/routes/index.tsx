import { createBrowserRouter, Navigate } from 'react-router'
import { CreateLeadPage } from '@src/pages/leads/create'
import { ListLeadPage } from '@src/pages/leads'

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
