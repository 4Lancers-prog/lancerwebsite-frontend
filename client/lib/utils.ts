import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const absoluteUrl = (base: string, path: string) => `${base.replace(/\/$/, '')}${path === '/' ? '/' : path}`
