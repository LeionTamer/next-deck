'use client'

import React from 'react'
import { Map } from 'react-map-gl/maplibre'
import DeckGL, { DeckGLProps } from '@deck.gl/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { bodyHeight } from '@/const/layout-style'
import { useAtomValue } from 'jotai'
import { mapViewStateAtom } from './deck-instance'

interface IBaseMapProps extends DeckGLProps {
  height?: string
  width?: string
}

export default function BaseMap({
  height = bodyHeight,
  width = '100vw',
  ...props
}: IBaseMapProps) {
  const mapViewState = useAtomValue(mapViewStateAtom)

  return (
    <DeckGL
      initialViewState={mapViewState}
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
