import { Character, getDetails } from '@/api/swapi'
import React, { useEffect, useState } from 'react'

import Modal from 'react-modal'
import styles from './CharacterModal.module.css' // Import CSS module

interface CharacterModalProps {
  isOpen: boolean
  onClose: () => void
  character: Character | null
}

interface Film {
  title: string
  director: string
  release_date: string
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  isOpen,
  onClose,
  character,
}) => {
  const [films, setFilms] = useState<Film[]>([])

  useEffect(() => {
    const fetchFilms = async () => {
      if (!character) return
      const filmData = await Promise.all(
        character.films.map((url) => getDetails<Film>(url))
      )
      setFilms(filmData)
    }

    fetchFilms()
  }, [character])

  if (!character) return null

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Character Details'
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <button
        className={styles.closeButton}
        onClick={onClose}
      >
        ✖
      </button>
      <div>
        <h2 className='text-2xl font-bold mb-4'>{character.name}</h2>
        <div className='mb-6'>
          <p className='text-lg mb-2'>Height: {character.height} cm</p>
          <p className='text-lg mb-2'>Mass: {character.mass} kg</p>
          <p className='text-lg mb-2'>Gender: {character.gender}</p>
          <p className='font-semibold'>Films:</p>
          <ul className='list-disc list-inside'>
            {films.map((film, index) => (
              <li
                key={index}
                className='text-sm'
              >
                {film.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}

export default CharacterModal
