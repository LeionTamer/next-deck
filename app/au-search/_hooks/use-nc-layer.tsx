'use client'

import { SANCLayer } from '@/components/map/layers/sa-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'

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
  return { layers: layers }
}
