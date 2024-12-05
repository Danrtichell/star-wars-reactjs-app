import type { Character } from '@/api/swapi'

export type CharacterModalProps = {
  isOpen: boolean
  onClose: () => void
  character: Character | null
}

export type Film = {
  title: string
  director: string
  release_date: string
}
