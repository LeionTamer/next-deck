'use client'

import BaseMap from '@/components/map/basemap'
import useNCLayers from '../_hooks/use-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'
import useAreaSearch, { selectedAreasAtom } from '@/hooks/use-area-search'
import { useAtomValue } from 'jotai'
import { useMapControl } from '@/components/map/deck-instance'
import { RightSidebarTrigger } from './sidebar/right-sidebar-trigger'
import { useCallback, useState } from 'react'
import { PickingInfo } from 'deck.gl'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog'

interface AUSearchComponentProps {
  dataset_table: Record<number, NCDatasetType>
}

export default function AUSearchComponent({
  dataset_table,
}: AUSearchComponentProps) {
  const { searchField } = useAreaSearch()
  const selectedAreas = useAtomValue(selectedAreasAtom)
  const { allLayers } = useMapControl()
  const [text, setText] = useState('')

  const areaIds = selectedAreas.map((area) => area.id)

  const { layers, data_layers } = useNCLayers({
    areaIds,
    datasetId: 1,
    dataset_table,
  })
  const getTooltip = useCallback(({ object }: PickingInfo) => {
    return (
      object && {
        text: `${JSON.stringify(object, null, '\t')}`,
        style: {
          'background-color': '#F8F8F8',
          backgroundColor: '#F0F0F0',
          borderRadius: '10px',
        },
      }
    )
  }, [])

  const getObjectData = useCallback(({ object }: PickingInfo) => {
    if (!!object) setText(JSON.stringify(object, null, '  '))
  }, [])

  return (
    <>
      <div>
        <Dialog open={text.length >= 3}>
          <DialogTrigger />
          <DialogOverlay />
          <DialogContent
            onInteractOutside={() => setText('')}
            onEscapeKeyDown={() => setText('')}
          >
            {text}
          </DialogContent>
        </Dialog>
        {data_layers}
        <BaseMap
          height="100vh"
          width="100%"
          layers={[layers, ...allLayers]}
          onClick={getObjectData}
          getTooltip={getTooltip}
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
