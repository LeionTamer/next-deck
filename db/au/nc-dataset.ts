import pgPool from '@/lib/postgres'

export type NCDatasetType = {
  id: number
  filename: string
  variable: string
  name: string
  units: string
  min: number
  max: number
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
        nc_values.id AS id,
        dataset.long_name AS name,
        dataset.filename AS filename,
        dataset.units AS units,
        nc_values.min AS min,
        nc_values.max AS max
      FROM (SELECT 
          dataset_id AS id,
          MIN(value) AS min,
          MAX(value) AS max
        FROM nc_dataset_values
        GROUP BY dataset_id) AS nc_values
      JOIN nc_dataset AS dataset
      ON dataset.id = nc_values.id
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
            WHERE dataset_id = ${id}
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

export async function getAreaFilteredDataset({
  areaId,
  datasetId,
}: {
  areaId: number
  datasetId: number
}) {
  try {
    const query = `
          SELECT 
            nc.id AS id,
            nc.value AS value,
            ST_X(nc.geom) as lon, 
            ST_Y(nc.geom) as lat 
          FROM statistical_areas AS sa
          JOIN nc_dataset_values AS nc
          ON ST_Within(nc.geom, ST_Transform(sa.geometry,4326))
          WHERE sa.id = ${areaId} AND nc.dataset_id = ${datasetId};
        `

    const { rows } = await pgPool.query(query)

    return rows as NCDatasetValuesType[]
  } catch (e) {
    throw new Error(
      `Failed to retrive data with datasetId ${datasetId} with error ${e}`
    )
  }
}
