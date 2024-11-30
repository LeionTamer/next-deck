import {
  getStatisticalArea,
  StatisticalAreaType,
} from '@/db/au/statistical-area'
import AUMapComponent from './_components/au-map'
import { Suspense } from 'react'

export default async function AUPage() {
  const areas = (await getStatisticalArea()) as StatisticalAreaType[]
  return (
    <>
      <Suspense>
        <AUMapComponent areas={areas} />
      </Suspense>
    </>
  )
}
