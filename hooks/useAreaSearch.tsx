import { searchAreaByNameAction } from '@/actions/statistical_area'
import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { AreaListItemType } from '@/db/au/statistical-area'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function useAreaSearch() {
  const [text, setText] = useState('')
  const [searchText, setSearchText] = useDebounce(text, 1000)
  const [stateAreas, setStateAreas] = useState<AreaListItemType[]>([])

  const { data, mutate, reset } = useMutation({
    mutationKey: ['search-area'],
    mutationFn: searchAreaByNameAction,
  })

  const filteredData = data?.filter(
    (entry) => !stateAreas.map((area) => area.id).includes(entry.id)
  )

  useEffect(() => {
    if (searchText.length >= 3) {
      mutate(searchText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  const searchField = (
    <Popover open={data && data.length >= 1}>
      <PopoverAnchor>
        <Input
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="w-full"
          placeholder="Search for statistical area 3"
        />
      </PopoverAnchor>
      <PopoverContent>
        <div>
          {filteredData &&
            filteredData.map((entry) => (
              <div
                key={entry.id}
                onClick={() => {
                  setStateAreas((prev) => [...prev, entry])
                  setText('')
                  setSearchText('')
                  reset()
                }}
              >
                {entry.sa3_name}
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
  return { searchField, stateAreas }
}
