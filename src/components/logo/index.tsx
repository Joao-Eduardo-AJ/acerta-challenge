import { motion } from 'motion/react'
import './logo.css'

export const Logo = () => (
  <span className="logo-wrapper">
    <img src="/logo_a.svg" alt="logo acerta" className="logo-a" />
    <motion.img
      src="/logo_certa.svg"
      alt="logo acerta"
      className="logo-certa"
      initial={{ x: -126, opacity: 0 }}
      whileHover={{ x: -26, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 10 }}
    />
  </span>
)
