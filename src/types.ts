import { type ViteSSGContext } from 'vite-ssg'

export interface BlockState {
  x: number
  y: number
  revealed: boolean
  adjacentMines: number
  mine?: boolean
  flagged?: boolean
}
export type UserModule = (ctx: ViteSSGContext) => void
