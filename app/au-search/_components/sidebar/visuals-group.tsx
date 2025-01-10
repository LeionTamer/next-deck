import {
  visibleLayers,
  visibleLayersTypeAtom,
} from '@/components/map/deck-instance'
import { Checkbox } from '@/components/ui/checkbox'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { useAtom } from 'jotai'

export default function VisualsGroup() {
  const [showLayers, setShowLayers] = useAtom(visibleLayersTypeAtom)
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Visual Options</SidebarGroupLabel>
      <SidebarContent>
        {visibleLayers.map((entry) => (
          <SidebarMenu key={entry}>
            <div className="mt-2 flex justify-between px-2">
              <div className="flex-grow text-sm">{entry}</div>
              <div>
                <Checkbox
                  checked={showLayers.includes(entry)}
                  onClick={() =>
                    setShowLayers((prev) =>
                      prev.includes(entry)
                        ? prev.filter((current) => current !== entry)
                        : [...prev, entry]
                    )
                  }
                />
              </div>
            </div>
          </SidebarMenu>
        ))}
      </SidebarContent>
    </SidebarGroup>
  )
}
