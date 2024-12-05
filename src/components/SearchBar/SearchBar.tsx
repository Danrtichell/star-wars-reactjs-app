import type { SearchBarProps } from './SearchBar.types'

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => (
  <input
    type='text'
    placeholder='Search characters...'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='search-bar'
  />
)

export default SearchBar
