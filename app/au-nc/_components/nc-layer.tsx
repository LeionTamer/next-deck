'use client'

import BaseMap from '@/components/map/basemap'
import { NCDatasetType, NCDatasetValuesType } from '@/db/au/nc-dataset'
import { GridLayer, HeatmapLayer, PickingInfo } from 'deck.gl'
import { useState } from 'react'

export default function NCMap({
  data,
  range,
  //   datasetInfo,
}: {
  data: NCDatasetValuesType[]
  range: { min: number; max: number }
  datasetInfo: NCDatasetType
}) {
  const { min, max } = range
  const [showLayer] = useState<'grid' | 'heatmap'>('heatmap')

  const gridLayer = new GridLayer<NCDatasetValuesType>({
    id: 'grid-layer',
    visible: showLayer === 'grid',
    data: data,
    cellSize: 1500,
    getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
    getColorWeight: (d: NCDatasetValuesType) => d.value,
    getElevationWeight: (d: NCDatasetValuesType) => d.value,
    colorDomain: [min, max],
    elevationDomain: [min, max],
    extruded: true,
    elevationScale: 150,
    pickable: true,
  })

  const heatmapLayer = new HeatmapLayer({
    id: 'heatmap-later',
    visible: showLayer === 'heatmap',
    data: data,
    aggregation: 'MEAN',
    getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
    getWeight: (d: NCDatasetValuesType) => d.value,
    radiusPixels: 5,
    pickable: true,
    colorDomain: [min, max],
  })

  return (
    <BaseMap
      height="100vh"
      pitch={15}
      bearing={12}
      layers={[gridLayer, heatmapLayer]}
      controller
      onClick={(info: PickingInfo<NCDatasetType>) => {
        console.table(info)
      }}
    />
  )
}
