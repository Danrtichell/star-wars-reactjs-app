export type FiltersProps = {
  genderFilter: string
  setGenderFilter: React.Dispatch<React.SetStateAction<string>>
  homeworldFilter: string
  setHomeworldFilter: React.Dispatch<React.SetStateAction<string>>
  homeworlds: string[]
}
