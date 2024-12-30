'use client'

import BaseMap from '@/components/map/basemap'
import useNCLayers from '../_hooks/use-nc-layer'

export default function AUSearchComponent() {
  const { layers } = useNCLayers({ areaIds: [6, 2], datasetId: 1 })

  return (
    <>
      <div>
        <BaseMap height="100vh" layers={[layers]} />
      </div>
      <div className="p-50 absolute right-12 top-12 z-50 min-h-32 bg-cyan-500/40">
        Cats
      </div>
    </>
  )
}
