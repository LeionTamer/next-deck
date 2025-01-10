import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SANCLayer } from './sa-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'
import { useMapControl, visibleLayersTypeAtom } from '../deck-instance'
import { useAtomValue } from 'jotai'

export interface ISANCDataLayerProps {
  areaId: number
  datasetId: number
  dataset_table: Record<number, NCDatasetType>
}

export default function SANCDataLayer({
  areaId,
  datasetId,
  dataset_table,
}: ISANCDataLayerProps) {
  const { addLayerById } = useMapControl()
  const showLayers = useAtomValue(visibleLayersTypeAtom)

  const { data } = useQuery({
    queryKey: ['sa-nc-data', 'sa3-areaId', areaId, 'datasetId', datasetId],
    queryFn: async () => {
      const response = await fetch(
        `/api/au-nc?areaId=${areaId}&datasetId=${datasetId}`
      )
      return await response.json()
    },
  })

  const layerId = `usenc-${areaId}-${datasetId}`

  useEffect(() => {
    addLayerById({
      id: layerId,
      layer: new SANCLayer({
        areaId: areaId,
        datasetId: datasetId,
        id: layerId,
        datasetInfo: dataset_table[datasetId],
        data: data,
        showLayers,
      }),
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showLayers])

  return null
}
