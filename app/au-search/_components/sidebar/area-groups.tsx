import { useMapControl } from '@/components/map/deck-instance'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { AreaListItemType } from '@/db/au/statistical-area'

interface IAreaGroups {
  areaCode: string
  areaName: string
  areaList: AreaListItemType[]
}

export default function AreaGroups({
  //   areaCode,
  areaList,
  areaName,
}: IAreaGroups) {
  return (
    <>
      <SidebarMenu>
        <Collapsible defaultOpen>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild className="group/collapsible">
              <SidebarMenuButton>{areaName}</SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {areaList.map((entry) => (
                <StatisticalAreaInfo key={entry.id} areaInfo={entry} />
              ))}
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </>
  )
}

interface StatisticalAreaInfo {
  areaInfo: AreaListItemType
}

export function StatisticalAreaInfo({ areaInfo }: StatisticalAreaInfo) {
  const { flyToCity } = useMapControl()
  return (
    <>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            onClick={() =>
              flyToCity({
                lat: areaInfo.lat,
                lon: areaInfo.lon,
              })
            }
          >
            <span className="text-ellipsis">{areaInfo.sa3_name}</span>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </>
  )
}
