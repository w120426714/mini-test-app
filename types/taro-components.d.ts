import type { ComponentType, CSSProperties, PropsWithChildren } from 'react'

export interface TaroComponentProps {
  className?: string
  style?: CSSProperties
  onClick?: (event: unknown) => void
}

type TaroComponent = ComponentType<PropsWithChildren<TaroComponentProps>>

export const Button: TaroComponent
export const Text: TaroComponent
export const View: TaroComponent
