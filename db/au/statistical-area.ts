import pgPool from '@/lib/postgres'
import { Feature, Geometry } from 'geojson'

type StatisticalAreaResponseType = {
  id: number
  name: string
  code: string
  gcc_name: string
  gcc_code: string
  ste_name: string
  geojson: string
}

export type StatisticalAreaSearchEntry = {
  sa3_name: string
  sa4_name: string
}

export type StatisticalAreaGeometryType = Feature<
  Geometry,
  {
    sa3_name: string
    sa3_code: string
    sa4_name: string
    sa4_code: string
  }
>

export type StatisticalAreaType = Omit<
  StatisticalAreaResponseType,
  'geojson'
> & {
  geojson: StatisticalAreaGeometryType
}

export async function getSA3GeoJSONByID(areaId: number) {
  try {
    const query = `
      SELECT 
        id, sa3_code, sa3_name, gcc_name, gcc_code, ste_name,
        json_build_object(
        'type','polygon',
        'properties', json_build_object(
          'sa3_name', sa3_name,
          'sa3_code', sa3_code,
          'sa4_name', sa4_name,
          'sa4_code', sa4_code
          ),
          'geometry', ST_AsGeoJSON(ST_Transform(geometry, 4326))::json
        )::text as geojson
      FROM statistical_areas 
      WHERE id = ${areaId}
    `
    const { rows } = await pgPool.query(query)

    const data = rows.map(
      (entry: StatisticalAreaResponseType) =>
        ({
          ...entry,
          geojson: JSON.parse(entry.geojson),
        }) as StatisticalAreaType
    )

    return data
  } catch (e) {
    console.error(e)
  }
}

export type SAByCodeDataType = {
  id: number
  sa3_code: string
  sa3_name: string
  sa4_code: string
  sa4_name: string
}

export type AreaListItemType = {
  id: number
  sa4_code: string
  sa3_name: string
  sa4_name: string
  lon: number
  lat: number
}

export async function getSA4ByCode(code: string) {
  try {
    const query = `
      SELECT 
        id,
        sa4_code,
        sa3_name as sa3_name,
        sa4_name as sa4_name,
        ST_X(ST_Centroid(geometry)) as lon,
        ST_Y(ST_Centroid(geometry)) as lat
      FROM statistical_areas
      WHERE sa4_code = '${code}'
    `
    const { rows } = await pgPool.query(query)

    return rows as AreaListItemType[]
  } catch (e) {
    console.error(e)
  }
}

export async function getAreaByName(name: string) {
  try {
    const query = `
      SELECT 
        id,
        sa4_code,
        sa3_name as sa3_name,
        sa4_name as sa4_name,
        ST_X(ST_Centroid(geometry)) as lon,
        ST_Y(ST_Centroid(geometry)) as lat
      FROM statistical_areas
      WHERE LOWER(sa4_name) LIKE LOWER('${name}%') OR LOWER(sa3_name) LIKE LOWER('${name}%')
      GROUP BY id, sa4_name
      ORDER BY sa4_name ASC 
      LIMIT 20
    `
    const { rows } = await pgPool.query(query)

    return rows as AreaListItemType[]
  } catch (e) {
    throw new Error(`search by SA4 name failed with error ${e}`)
  }
}
