import { Character, getPeople } from '@/api/swapi'
import { useEffect, useState } from 'react'

import CharacterCard from '@/components/CharacterCard/CharacterCard'
import CharacterModal from '@/components/CharacterModal/CharacterModal'
import Filters from '@/components/Filters/Filters'
import SearchBar from '@/components/SearchBar/SearchBar'
import { ThreeDots } from 'react-loader-spinner'

const CharactersList = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [homeworldFilter, setHomeworldFilter] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true)
      const data = await getPeople(page)
      const charactersWithIds = data.results.map((char, index) => ({
        ...char,
        id: index + 1 + (page - 1) * 10, // unique ID for images
      }))
      setCharacters((prev) => [...prev, ...charactersWithIds])

      // check if more pages are available
      setHasMore(data.next !== null)
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters(currentPage)
  }, [currentPage])

  useEffect(() => {
    let result = characters

    if (searchTerm) {
      result = result.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (genderFilter) {
      result = result.filter((char) => char.gender === genderFilter)
    }
    if (homeworldFilter) {
      result = result.filter((char) => char.homeworld === homeworldFilter)
    }
    setFilteredCharacters(result)
  }, [characters, searchTerm, genderFilter, homeworldFilter])

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Filters
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        homeworldFilter={homeworldFilter}
        setHomeworldFilter={setHomeworldFilter}
        homeworlds={[...new Set(characters.map((char) => char.homeworld))]}
      />
      <div>
        {filteredCharacters.map((char, index) => (
          <CharacterCard
            key={`${char.name}-${index}`}
            character={char}
            onClick={(char) => {
              setSelectedCharacter(char)
              setModalOpen(true)
            }}
          />
        ))}
      </div>
      {modalOpen && (
        <CharacterModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          character={selectedCharacter}
        />
      )}
      {hasMore && (
        <button
          className='load-more-button'
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {!loading ? (
            'Load More'
          ) : (
            <ThreeDots
              color='#fff'
              height={30}
              width={30}
            />
          )}
        </button>
      )}
    </div>
  )
}

export default CharactersList
