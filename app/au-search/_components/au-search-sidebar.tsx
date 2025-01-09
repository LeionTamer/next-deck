'use client'

// import { useMapControl } from '@/components/map/deck-instance'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { AreaListItemType } from '@/db/au/statistical-area'
import { selectedAreasAtom, stat4AreasAtom } from '@/hooks/use-area-search'
import { useAtomValue } from 'jotai'
import AreaGroups from './sidebar/area-groups'

export default function AUSearchSidebar() {
  const selectedAreas = useAtomValue(selectedAreasAtom)
  const stat4Areas = useAtomValue(stat4AreasAtom)

  // const { flyToCity } = useMapControl()

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
        <SidebarGroup>
          <SidebarGroupLabel>Area Information</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* <SidebarMenu> */}
            {Object.keys(areaGroup).map((entry) => (
              // <SidebarMenuItem key={entry}>
              //   {stat4Areas[entry]}
              // </SidebarMenuItem>
              <AreaGroups
                key={entry}
                areaCode={entry}
                areaName={stat4Areas[entry]}
                areaList={areaGroup[entry]}
              />
            ))}
            {/* </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
