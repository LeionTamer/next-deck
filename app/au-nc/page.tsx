import { getAvailableDatasets, NCDatasetType } from '@/db/au/nc-dataset'

export default async function FDDIPage() {
  const dataset_info = await getAvailableDatasets()

  const dataset_table: Record<number, NCDatasetType> = dataset_info.reduce(
    (accumulator, entry) => {
      return { ...accumulator, [entry.id]: entry }
    },
    {} as Record<number, NCDatasetType>
  )

  return (
    <div className="gap-15 mx-auto my-auto h-screen max-w-5xl bg-slate-300/20 p-5">
      <div className="p-5">Cats</div>

      <div>{JSON.stringify(dataset_table)}</div>
    </div>
  )
}
