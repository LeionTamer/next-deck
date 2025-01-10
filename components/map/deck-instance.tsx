import { FlyToInterpolator, Layer, MapViewState } from 'deck.gl'
import { atom, useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export const mapViewStateAtom = atom<MapViewState>({
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  pitch: undefined,
  bearing: undefined,
})

export type LayerByIDType = {
  id: string
  layer: Layer
}

export const layersByIDAtom = atom<LayerByIDType[]>([])

export const visibleLayers = ['scatter-plot', 'hex'] as const
export type VisibleLayersType = (typeof visibleLayers)[number]

export const visibleLayersTypeAtom = atom<VisibleLayersType[]>(['scatter-plot'])

export function useMapControl() {
  const setMapViewState = useSetAtom(mapViewStateAtom)
  const [layersById, setLayersByID] = useAtom(layersByIDAtom)

  const allLayers = layersById.map((entry) => entry.layer)

  function addLayerById({ id, layer }: LayerByIDType) {
    setLayersByID((prev) => [
      ...prev.filter((current) => current.id !== id),
      { id, layer },
    ])
  }

  const flyToCity = useCallback(
    ({ lat, lon }: { lat: number; lon: number }) => {
      setMapViewState((view) => ({
        ...view,
        longitude: lon,
        latitude: lat,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: 'auto',
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { flyToCity, addLayerById, allLayers }
}
