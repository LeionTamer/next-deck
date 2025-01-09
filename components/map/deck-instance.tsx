import { FlyToInterpolator, Layer, MapViewState } from 'deck.gl'
import { atom, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export const mapViewStateAtom = atom<MapViewState>({
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  pitch: undefined,
  bearing: undefined,
})

export const layersAtom = atom<Layer[]>([])

export function useMapControl() {
  const setMapViewState = useSetAtom(mapViewStateAtom)

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

  return { flyToCity }
}
