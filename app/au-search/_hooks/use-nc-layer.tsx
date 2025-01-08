'use client'

import { SANCLayer } from '@/components/map/layers/sa-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'
import { StatisticalAreaGeometryType } from '@/db/au/statistical-area'
import { GeoJsonLayer } from 'deck.gl'

export type UseNCLayerProps = {
  areaIds: number[]
  datasetId: number
  dataset_table: Record<number, NCDatasetType>
}

export default function useNCLayers({
  areaIds,
  datasetId,
  dataset_table,
}: UseNCLayerProps) {
  const layers = areaIds.map(
    (areaId) =>
      new SANCLayer({
        areaId: areaId,
        datasetId: datasetId,
        id: `usenc-${areaId}-${datasetId}`,
        datasetInfo: dataset_table[datasetId],
      })
  )

  const geoLayers = areaIds.map(
    (areaId) =>
      new GeoJsonLayer<StatisticalAreaGeometryType>({
        id: `geojson-layer-${areaId}`,
        data: `/api/au-sa?areaId=${areaId}`,
        stroked: true,
        filled: false,
        pickable: true,
        getLineColor: [160, 160, 180, 200],
        getLineWidth: 300,
        getPointRadius: 4,
        getTextSize: 12,
      })
  )
  return { layers: [...layers, ...geoLayers] }
}
