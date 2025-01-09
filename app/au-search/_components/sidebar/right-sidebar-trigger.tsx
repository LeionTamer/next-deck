import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelRight } from 'lucide-react'

export function RightSidebarTrigger() {
  const { toggleSidebar } = useSidebar()
  return (
    <Button variant="ghost" size={'icon'} onClick={toggleSidebar}>
      <PanelRight />
    </Button>
  )
}
