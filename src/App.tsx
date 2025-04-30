import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './routes'
import Layout from './template/layout'

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

export default App
