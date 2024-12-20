import pgPool from '@/lib/postgres'

export type NCDatasetType = {
  id: number
  filename: string
  variable: string
  long_name: string
  units: string
}

export async function getAvailableDatasets() {
  try {
    const query = `
            SELECT 
                id,
                filename,
                variable, 
                long_name, 
                units
            FROM nc_dataset
        `
    const { rows } = await pgPool.query(query)

    return rows as NCDatasetType[]
  } catch (e) {
    throw new Error(`failed to get datasets with error: ${e}`)
  }
}

export async function getDatasetInfo(id: number) {
  try {
    const query = `SELECT * FROM nc_dataset WHERE id = ${id};`

    const { rows } = await pgPool.query(query)

    return rows as NCDatasetType[]
  } catch (e) {
    throw new Error(`failed to getDatasetInfo for id: ${id} with error ${e}`)
  }
}
