// import BaseMap from '@/components/map/basemap'
import { getCrimeGeoJSON } from '@/db/nyc/neighborhood'
import NYCMap from './_components/nyc-map'

export default async function TestPage() {
  const crimes = await getCrimeGeoJSON()

  return (
    <>
      <NYCMap crimes={crimes!} />
    </>
  )
}
