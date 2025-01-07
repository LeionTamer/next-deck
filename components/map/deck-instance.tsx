import { MapViewState } from 'deck.gl'
import { atom } from 'jotai'

export const mapViewStateAtom = atom<MapViewState>({
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  pitch: undefined,
  bearing: undefined,
})
