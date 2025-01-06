'use client'

import BaseMap from '@/components/map/basemap'
import useNCLayers from '../_hooks/use-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'
import useAreaSearch from '@/hooks/useAreaSearch'

interface AUSearchComponentProps {
  dataset_table: Record<number, NCDatasetType>
}

export default function AUSearchComponent({
  dataset_table,
}: AUSearchComponentProps) {
  const { searchField, stateAreas } = useAreaSearch()
  const areaIds = stateAreas.map((area) => area.id)

  const { layers } = useNCLayers({
    areaIds,
    datasetId: 1,
    dataset_table,
  })

  return (
    <>
      <div>
        <BaseMap
          height="100vh"
          layers={[layers]}
          // onHover={(info) => console.log(info)}
          onClick={(info) => console.table(info.object)}
        />
      </div>
      {/* <div className="absolute right-12 top-12 z-50 min-w-96 bg-slate-200 p-2"> */}
      <div className="absolute left-1/2 top-10 z-50 mx-auto min-w-[500px] -translate-x-1/2 transform bg-slate-100">
        {searchField}
      </div>
      {/* <Sheet>
        <SheetTrigger>
          <div className="absolute right-12 top-12 z-50 bg-slate-200 p-2">
            Search
          </div>
        </SheetTrigger>
        <SheetContent>
          <div>{searchField}</div>
        </SheetContent>
      </Sheet> */}
      {/* </div> */}
    </>
  )
}
