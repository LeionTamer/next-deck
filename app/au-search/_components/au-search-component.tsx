'use client'

import BaseMap from '@/components/map/basemap'
import useNCLayers from '../_hooks/use-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'
import useAreaSearch, { selectedAreasAtom } from '@/hooks/use-area-search'
import { useAtomValue } from 'jotai'
import { layersAtom } from '@/components/map/deck-instance'
import { RightSidebarTrigger } from './sidebar/right-sidebar-trigger'

interface AUSearchComponentProps {
  dataset_table: Record<number, NCDatasetType>
}

export default function AUSearchComponent({
  dataset_table,
}: AUSearchComponentProps) {
  const { searchField } = useAreaSearch()
  const selectedAreas = useAtomValue(selectedAreasAtom)
  const dataLayers = useAtomValue(layersAtom)
  const areaIds = selectedAreas.map((area) => area.id)

  const { layers, data_layers } = useNCLayers({
    areaIds,
    datasetId: 1,
    dataset_table,
  })

  return (
    <>
      <div>
        {data_layers}
        <BaseMap
          height="100vh"
          width="100%"
          layers={[layers, ...dataLayers]}
          onClick={(info) => console.table(info.object)}
        />
      </div>
      <div className="absolute left-1/2 top-5 z-50 mx-auto flex min-w-[500px] -translate-x-1/2 transform gap-1">
        <div className="grow">{searchField}</div>
        <div className="my-auto h-full rounded-full border-2 bg-slate-100">
          <RightSidebarTrigger />
        </div>
      </div>
    </>
  )
}
