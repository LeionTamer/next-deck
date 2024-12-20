import { getDatasetInfo } from '@/db/au/nc-dataset'

export default async function NCDataPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const datasets = await getDatasetInfo(parseInt(id))

  if (datasets.length === 0) return <>Dataset not found</>

  return <>Success</>
}
