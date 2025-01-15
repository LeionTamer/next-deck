'use client'

import { colorSpectral, getColorFromValue } from '@/app/helpers/colorHelpers'
import BaseMap from '@/components/map/basemap'
import { NCDatasetType, NCDatasetValuesType } from '@/db/au/nc-dataset'
import { PickingInfo, ScatterplotLayer } from 'deck.gl'
import { useState } from 'react'

export default function NCMap({
  data,
  range,
  datasetInfo,
}: {
  data: NCDatasetValuesType[]
  range: { min: number; max: number }
  datasetInfo: NCDatasetType
}) {
  const { min, max } = range
  const [showLayer] = useState<'grid' | 'heatmap' | 'scatterplot'>(
    'scatterplot'
  )

  const scatterPlotLayer = new ScatterplotLayer<NCDatasetValuesType>({
    id: 'scatter-plot-layer',
    visible: showLayer === 'scatterplot',
    data,
    stroked: true,
    getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
    getRadius: 300,
    getFillColor: (d: NCDatasetValuesType) =>
      getColorFromValue(d.value, min, max, colorSpectral) as [
        number,
        number,
        number,
      ],
    getLineColor: [0, 0, 0],
    getLineWidth: 10,
    radiusScale: 6,
    pickable: true,
  })

  return (
    <BaseMap
      height="100vh"
      layers={[scatterPlotLayer]}
      controller
      onClick={(info: PickingInfo<NCDatasetType>) => {
        console.table(info)
      }}
      getTooltip={(obj) =>
        obj &&
        obj.object && {
          text: `Value: ${obj.object.value} ${datasetInfo.units}`,
          style: {
            backgroundColor: '#F0F0F0',
            borderRadius: '10px',
          },
        }
      }
    />
  )
}
