import {
  getDatasetInfo,
  getDatasetValueRange,
  getDatasetValues,
} from '@/db/au/nc-dataset'
import { Suspense } from 'react'
import NCMap from '../_components/nc-layer'

async function MapData({ id }: { id: number }) {
  const datasetInfo = await getDatasetInfo(id)
  const data = await getDatasetValues(id)
  const { min, max } = await getDatasetValueRange(id)

  return (
    <>
      <NCMap data={data} range={{ min, max }} datasetInfo={datasetInfo[0]} />
    </>
  )
}

export default async function NCDataPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const datasets = await getDatasetInfo(parseInt(id))

  if (datasets.length === 0) return <>Dataset not found</>

  return (
    <Suspense>
      <MapData id={parseInt(id)} />
    </Suspense>
  )
}
