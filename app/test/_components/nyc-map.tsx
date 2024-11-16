'use client'

import BaseMap from '@/components/map/basemap'
import { CrimeGeoJsonType } from '@/db/nyc/neighborhood'
import { GeoJsonLayer } from 'deck.gl'
import { Feature, Geometry } from 'geojson'

interface INYCMap {
  crimes: CrimeGeoJsonType[]
}

export default function NYCMap({ crimes }: INYCMap) {
  const geoLayer = new GeoJsonLayer({
    id: 'new_york_crimes',
    data: crimes.map((entry) => entry.geojson),

    stroked: false,
    filled: true,
    pointType: 'circle+text',
    pickable: true,
    getFillColor: (f) => [100, 50, 50, f.properties.victims],
    getText: (
      f: Feature<
        Geometry,
        {
          name: string
          victims: number
        }
      >
    ) => f.properties.name,

    getLineWidth: 20,
    getPointRadius: 4,
    getTextSize: 12,
  })
  return (
    <>
      <BaseMap
        latitude={40.73061}
        longitude={-73.935242}
        layers={[geoLayer]}
        getTooltip={({ object }) =>
          object && `${object.properties.name}: ${object.properties.victims}`
        }
      />
    </>
  )
}
