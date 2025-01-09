import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { layersAtom } from '../deck-instance'
import { useEffect } from 'react'
import { SANCLayer } from './sa-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'

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
  const addLayer = useSetAtom(layersAtom)
  const { data } = useQuery({
    queryKey: ['sa-nc-data', 'sa3-areaId', areaId, 'datasetId', datasetId],
    queryFn: async () => {
      const response = await fetch(
        `/api/au-nc?areaId=${areaId}&datasetId=${datasetId}`
      )
      return await response.json()
    },
  })

  useEffect(() => {
    if (!!data) {
      const dataLayer = new SANCLayer({
        areaId: areaId,
        datasetId: datasetId,
        id: `usenc-${areaId}-${datasetId}`,
        datasetInfo: dataset_table[datasetId],
        data: data,
      })

      addLayer((layers) => [...layers, dataLayer])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return null
}
