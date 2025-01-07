'use client'

import { Sidebar, SidebarContent } from '@/components/ui/sidebar'

export default function AUSearchSidebar() {
  return (
    <Sidebar side="right" variant="inset">
      <SidebarContent className="border-2 p-2">I am content</SidebarContent>
    </Sidebar>
  )
}
