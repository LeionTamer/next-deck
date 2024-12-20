import { getAvailableDatasets } from '@/db/au/nc-dataset'

export default async function FDDIPage() {
  const dataset_info = await getAvailableDatasets()

  return (
    <div className="mx-auto my-auto h-screen max-w-5xl bg-slate-300/20 p-5">
      {dataset_info?.map((entry) => (
        <div key={entry.id}>
          <div>
            {entry.filename}: {entry.variable}
          </div>
          <div>{entry.long_name}</div>
        </div>
      ))}
    </div>
  )
}
