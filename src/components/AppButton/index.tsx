import { Button } from '@tarojs/components'
import type { ReactNode } from 'react'
import './index.scss'

interface AppButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function AppButton({ children, variant = 'primary', onClick }: AppButtonProps) {
  return (
    <Button className={`app-button app-button--${variant}`} onClick={onClick}>
      {children}
    </Button>
  )
}
