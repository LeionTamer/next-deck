import { searchAreaByNameAction } from '@/actions/statistical_area'
import { mapViewStateAtom } from '@/components/map/deck-instance'
import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { AreaListItemType } from '@/db/au/statistical-area'
import { useMutation } from '@tanstack/react-query'
import { FlyToInterpolator } from 'deck.gl'
import { atom, useAtom, useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export const selectedAreasAtom = atom<AreaListItemType[]>([])
export const stat4AreasAtom = atom<Record<string, string>>({})

export default function useAreaSearch() {
  const [text, setText] = useState('')
  const [searchText, setSearchText] = useDebounce(text, 1000)
  const [selectedAreas, setSelectedAreas] = useAtom(selectedAreasAtom)
  const setSA4Areas = useSetAtom(stat4AreasAtom)
  const setMapViewState = useSetAtom(mapViewStateAtom)

  const { data, mutate, reset } = useMutation({
    mutationKey: ['search-area'],
    mutationFn: searchAreaByNameAction,
  })

  const filteredData = data?.filter(
    (entry) => !selectedAreas.map((area) => area.id).includes(entry.id)
  )

  useEffect(() => {
    if (searchText.length >= 3) {
      mutate(searchText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

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

  function getSA4Neighboors(code: string) {
    fetch(`api/au-sa/${code}`)
      .then((res) => res.json())
      .then((data: AreaListItemType[]) => {
        console.table(data)
        setSelectedAreas((prev) => [...prev, ...data])
      })
      .catch((e) => console.error(e))
  }

  const searchField = (
    <Popover open={data && data.length >= 1}>
      <PopoverAnchor>
        <Input
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="w-full bg-slate-300"
          placeholder="Search By Statistical Area"
        />
      </PopoverAnchor>
      <PopoverContent style={{ width: '460px' }}>
        <>
          {filteredData &&
            filteredData.map((entry) => (
              <div
                key={entry.id}
                onClick={() => {
                  getSA4Neighboors(entry.sa4_code)
                  setSA4Areas((prev) => ({
                    ...prev,
                    [entry.sa4_code]: entry.sa4_name,
                  }))
                  setText('')
                  setSearchText('')
                  reset()
                  flyToCity({ lat: entry.lat, lon: entry.lon })
                }}
              >
                {entry.sa4_name}: {entry.sa3_name}
              </div>
            ))}
        </>
      </PopoverContent>
    </Popover>
  )
  return { searchField }
}
