'use client'

import React from 'react'
import { Map } from 'react-map-gl/maplibre'
import DeckGL from '@deck.gl/react'
import 'maplibre-gl/dist/maplibre-gl.css'

interface IBaseMapProps {
  height?: string
  width?: string
  zoom?: number
}

export default function BaseMap({
  height = '40rem',
  width = '100vw',
  zoom = 10,
}: IBaseMapProps) {
  return (
    <DeckGL
      initialViewState={{
        longitude: 0.45,
        latitude: 51.47,
        zoom,
      }}
      controller
      style={{
        height,
        width,
      }}
    >
      <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  )
}
