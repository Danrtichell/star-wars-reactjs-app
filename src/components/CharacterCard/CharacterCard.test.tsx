import { render, screen } from '@testing-library/react'

import type { Character } from '@/api/swapi'
import CharacterCard from './CharacterCard'

test('renders character name', () => {
  const character: Character = {
    id: 1,
    name: 'Wilhuff Tarkin',
    height: '180',
    mass: 'unknown',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/21/',
    films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
  }

  render(
    <CharacterCard
      character={character}
      onClick={() => {}}
    />
  )
  const nameElement = screen.getByText(/Wilhuff Tarkin/i)
  expect(nameElement).toBeInTheDocument()
})
