'use client'

import BaseMap from '@/components/map/basemap'
import useNCLayers from '../_hooks/use-nc-layer'
import { NCDatasetType } from '@/db/au/nc-dataset'

interface AUSearchComponentProps {
  dataset_table: Record<number, NCDatasetType>
}

export default function AUSearchComponent({
  dataset_table,
}: AUSearchComponentProps) {
  const { layers } = useNCLayers({
    areaIds: [3, 77, 33, 200, 179, 180, 181, 182, 333],
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
      <div className="p-50 absolute right-12 top-12 z-50 min-h-32 bg-cyan-500/40">
        {/* {JSON.stringify(dataset_table)} */}
        Cats
      </div>
    </>
  )
}
