import pgPool from '@/lib/postgres'

export type NCDatasetType = {
  id: number
  filename: string
  variable: string
  long_name: string
  units: string
}

export type NCDatasetValuesType = {
  id: number
  lon: number
  lat: number
  value: number
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

export async function getDatasetValues(id: number) {
  try {
    const query = `
            SELECT 
                id,
                value, 
                ST_X(geom) as lon, 
                ST_Y(geom) as lat 
            FROM nc_dataset_values 
            WHERE dataset_id = 1
        `

    const { rows } = await pgPool.query(query)

    return rows as NCDatasetValuesType[]
  } catch (e) {
    throw new Error(
      `Failed to retrive data with datasetId ${id} with error ${e}`
    )
  }
}

export async function getDatasetValueRange(id: number) {
  try {
    const query = `
            SELECT 
                MIN(value) as min,
                MAX(value) as max
            FROM nc_dataset_values 
            WHERE dataset_id = ${id};
            `

    const { rows } = await pgPool.query(query)

    return rows[0] as { min: number; max: number }
  } catch (e) {
    throw new Error(
      `Failed to retrive data with datasetId ${id} with error ${e}`
    )
  }
}
