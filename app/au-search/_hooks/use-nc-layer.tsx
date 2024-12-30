'use client'

import { SANCLayer } from '@/components/map/layers/sa-nc-layer'

export type UseNCLayerProps = {
  areaIds: number[]
  datasetId: number
}

export default function useNCLayers({ areaIds, datasetId }: UseNCLayerProps) {
  const layers = areaIds.map(
    (areaId) =>
      new SANCLayer({
        areaId: areaId,
        datasetId: datasetId,
        id: `usenc-${areaId}-${datasetId}`,
      })
  )
  return { layers: layers }
}
