import type { FiltersProps } from './Filters.types'

const Filters = ({
  genderFilter,
  setGenderFilter,
  homeworldFilter,
  setHomeworldFilter,
  homeworlds,
}: FiltersProps) => (
  <div className='filters'>
    <select
      value={genderFilter}
      onChange={(e) => setGenderFilter(e.target.value)}
      className='filter-dropdown'
    >
      <option value=''>All Genders</option>
      <option value='male'>Male</option>
      <option value='female'>Female</option>
      <option value='n/a'>N/A</option>
    </select>
    <select
      value={homeworldFilter}
      onChange={(e) => setHomeworldFilter(e.target.value)}
      className='filter-dropdown'
    >
      <option value=''>All Homeworlds</option>
      {homeworlds.map((world, index) => (
        <option
          key={index}
          value={world}
        >
          {world}
        </option>
      ))}
    </select>
  </div>
)

export default Filters
