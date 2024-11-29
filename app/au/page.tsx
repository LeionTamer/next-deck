import { getStatisticalArea } from '@/db/au/statistical-area'
import AUMapComponent from './_components/au-map'

export default async function AUPage() {
  const areas = await getStatisticalArea()
  return (
    <>
      <AUMapComponent />
    </>
  )
}
