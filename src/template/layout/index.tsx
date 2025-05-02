import { Logo } from '@src/components/logo'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Logo />
      {children}
    </div>
  )
}

export default Layout
