import BaseMap from '@/components/map/basemap'
import { getNeighborhood } from '@/db/nyc/neighborhood'

export default async function TestPage() {
  const neighborhood = await getNeighborhood()

  // console.table(neighborhood)

  return (
    <>
      <BaseMap />
    </>
  )
}
