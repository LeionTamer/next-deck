'use client'

import SANCDataLayer from '@/components/map/layers/sa-nc-data-layer'
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
  const data_layers = areaIds.map((areaId) => (
    <SANCDataLayer
      key={`sa-nc-datalayer-${areaId}-${datasetId}`}
      areaId={areaId}
      datasetId={datasetId}
      dataset_table={dataset_table}
    />
  ))

  const geoLayers = areaIds.map(
    (areaId) =>
      new GeoJsonLayer<StatisticalAreaGeometryType>({
        id: `geojson-layer-${areaId}`,
        data: `/api/au-sa?areaId=${areaId}`,
        stroked: true,
        filled: false,
        pickable: false,
        getLineColor: [160, 160, 180, 200],
        getLineWidth: 300,
        getPointRadius: 4,
        getTextSize: 12,
      })
  )
  return { layers: [...geoLayers], data_layers }
}
