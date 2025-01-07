import { getAvailableDatasets, NCDatasetType } from '@/db/au/nc-dataset'
import AUSearchComponent from './_components/au-search-component'
import { SidebarProvider } from '@/components/ui/sidebar'
import { CSSProperties } from 'react'
import AUSearchSidebar from './_components/au-search-sidebar'

export default async function SearchPage() {
  const dataset_info = await getAvailableDatasets()
  const dataset_table = dataset_info.reduce(
    (accumulator, entry) => {
      return { ...accumulator, [entry.id]: entry }
    },
    {} as Record<number, NCDatasetType>
  )

  return (
    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '20rem',
            '--sidebar-width-mobile': '20rem',
          } as CSSProperties
        }
        defaultOpen={false}
      >
        <AUSearchSidebar />
        <AUSearchComponent dataset_table={dataset_table} />
      </SidebarProvider>
    </>
  )
}
