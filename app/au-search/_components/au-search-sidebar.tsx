'use client'

import { useMapControl } from '@/components/map/deck-instance'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { AreaListItemType } from '@/db/au/statistical-area'
import { selectedAreasAtom, stat4AreasAtom } from '@/hooks/use-area-search'
import { useAtomValue } from 'jotai'

export default function AUSearchSidebar() {
  const selectedAreas = useAtomValue(selectedAreasAtom)
  const stat4Areas = useAtomValue(stat4AreasAtom)

  const { flyToCity } = useMapControl()

  const areaGroup: Record<string, AreaListItemType[]> = Object.keys(
    stat4Areas
  ).reduce(
    (prev, next) => ({
      ...prev,
      [next]: selectedAreas.filter((entry) => entry.sa4_code === next),
    }),
    {}
  )

  return (
    <Sidebar side="right" variant="inset">
      <SidebarContent className="border-2 p-2">
        {Object.keys(areaGroup).map((areaCode) => (
          <SidebarGroup key={areaCode}>
            <SidebarGroupLabel>{stat4Areas[areaCode]}</SidebarGroupLabel>
            <SidebarMenu>
              {areaGroup[areaCode].map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => flyToCity({ lon: entry.lon, lat: entry.lat })}
                >
                  {entry.sa3_name}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
