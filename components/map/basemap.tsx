'use client'

import React from 'react'
import { Map } from 'react-map-gl/maplibre'
import DeckGL, { DeckGLProps } from '@deck.gl/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { bodyHeight } from '@/const/layout-style'

interface IBaseMapProps extends DeckGLProps {
  height?: string
  width?: string
  zoom?: number
  latitude?: number
  longitude?: number
}

export default function BaseMap({
  height = bodyHeight,
  width = '100vw',
  zoom = 4,
  latitude = -27,
  longitude = 135,
  ...props
}: IBaseMapProps) {
  return (
    <DeckGL
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom,
      }}
      controller
      style={{
        height,
        width,
      }}
      {...props}
    >
      <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  )
}
