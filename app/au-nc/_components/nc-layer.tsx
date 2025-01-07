'use client'

import { valueToRgba } from '@/app/helpers/colorHelpers'
import BaseMap from '@/components/map/basemap'
import { NCDatasetType, NCDatasetValuesType } from '@/db/au/nc-dataset'
import { GridLayer, HeatmapLayer, PickingInfo, ScatterplotLayer } from 'deck.gl'
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
  const [showLayer] = useState<'grid' | 'heatmap' | 'scatterplot'>(
    'scatterplot'
  )

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
    id: 'heatmap-layer',
    visible: showLayer === 'heatmap',
    data: data,
    aggregation: 'MEAN',
    getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
    getWeight: (d: NCDatasetValuesType) => d.value,
    radiusPixels: 5,
    pickable: true,
    colorDomain: [min, max],
  })

  const scatterPlotLayer = new ScatterplotLayer<NCDatasetValuesType>({
    id: 'scatter-plot-layer',
    visible: showLayer === 'scatterplot',
    data,
    stroked: true,
    getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
    getRadius: 300,
    getFillColor: (d: NCDatasetValuesType) => valueToRgba(d.value, min, max),
    getLineColor: [0, 0, 0],
    getLineWidth: 10,
    radiusScale: 6,
    pickable: true,
  })

  return (
    <BaseMap
      height="100vh"
      layers={[gridLayer, heatmapLayer, scatterPlotLayer]}
      controller
      onClick={(info: PickingInfo<NCDatasetType>) => {
        console.table(info)
      }}
    />
  )
}
