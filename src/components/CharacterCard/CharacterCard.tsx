import './CharacterCard.module.css'

import type { CharacterCardProps } from './CharacterCard.types'

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`

  return (
    <div
      className='card hover:shadow-lg transition duration-300'
      onClick={() => onClick(character)}
    >
      <img
        src={imageUrl}
        alt={character.name}
        className='card-image'
      />
      <h3>{character.name}</h3>
    </div>
  )
}

export default CharacterCard
