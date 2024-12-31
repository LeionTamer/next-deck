import { getAvailableDatasets, NCDatasetType } from '@/db/au/nc-dataset'
import AUSearchComponent from './_components/au-search-component'

export default async function SearchPage() {
  const dataset_info = await getAvailableDatasets()
  const dataset_table = dataset_info.reduce(
    (accumulator, entry) => {
      return { ...accumulator, [entry.id]: entry }
    },
    {} as Record<number, NCDatasetType>
  )

  return (
    <>
      <AUSearchComponent dataset_table={dataset_table} />
    </>
  )
}
