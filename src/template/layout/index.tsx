import { Logo } from '@src/components/logo'
import './layout.css'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Logo />
      <main className="layout-main">{children}</main>
    </div>
  )
}

export default Layout
