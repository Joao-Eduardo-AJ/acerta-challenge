import { motion } from 'motion/react'
import './logo.css'

export const Logo = () => (
  <span className="logo-wrapper">
    <img src="/logo_a.svg" alt="logo acerta" className="logo-a" />
    <motion.img
      src="/logo_certa.svg"
      alt="logo acerta"
      className="logo-certa"
      initial={{ x: -24, opacity: 1 }}
      whileHover={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
    />
  </span>
)
