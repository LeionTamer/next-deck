'use server'

import { getAreaByName } from '@/db/au/statistical-area'

export async function searchAreaByNameAction(name: string) {
  return getAreaByName(name)
}
