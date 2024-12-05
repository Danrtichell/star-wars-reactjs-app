import type { Character } from '@/api/swapi'

export type CharacterCardProps = {
  character: Character
  onClick: (character: Character) => void
}
