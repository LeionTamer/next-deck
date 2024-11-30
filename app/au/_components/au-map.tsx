'use client'
import BaseMap from '@/components/map/basemap'
import { StatisticalAreaType } from '@/db/au/statistical-area'
import { GeoJsonLayer } from 'deck.gl'

type AUMapComponentPropType = {
  areas: StatisticalAreaType[]
}

export default function AUMapComponent({ areas }: AUMapComponentPropType) {
  const areaLayer = new GeoJsonLayer({
    id: 'statistical_area_3',
    data: areas.map((entry) => entry.geojson),

    stroke: true,
    filled: true,
    getFillColor: (f) => [20, 20, 20, 20],
    stroked: true,

    getLineWidth: 250,
    getLineColor: [255, 30, 255, 160],
  })

  return <BaseMap height="100vh" layers={[areaLayer]} />
}
