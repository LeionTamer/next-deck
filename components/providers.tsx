'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

type IProvidersProps = {
  children: ReactNode
}

function Providers({ children }: IProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  )
}

export default Providers
