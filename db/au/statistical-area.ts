import pgPool from '@/lib/postgres'
import { Feature, Geometry } from 'geojson'
import { ChevronsDownUp } from 'lucide-react'

type StatisticalAreaResponseType = {
  id: number
  name: string
  code: string
  gcc_name: string
  gcc_code: string
  area_sqkm: string
  ste_name: string
  ste_code: string
  geojson: string
}

export type StatisticalAreaSearchEntry = {
  sa3_name: string
  sa4_name: string
}

export type StatisticalAreaType = Omit<
  StatisticalAreaResponseType,
  'geojson'
> & {
  geojson: Feature<
    Geometry,
    {
      sa3_name: string
      sa3_code: string
      sa4_name: string
      sa4_code: string
    }
  >
}

export async function getStatisticalArea() {
  try {
    const query = `
      SELECT 
        id, sa3_code, sa3_name, gcc_name, gcc_code, area_sqkm, ste_name, ste_code,
        json_build_object(
        'type','polygon',
        'properties', json_build_object(
          'sa3_name', sa3_name,
          'sa3_code', sa3_code,
          'sa4_name', sa4_name,
          'sa4_code', sa4_code
          ),
          'geometry', ST_AsGeoJSON(ST_Transform(geom, 4326))::json
        )::text as geojson
      FROM statistical_areas 
      ORDER BY id ASC
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

export type StatisiticalAreaByIdType = {
  coordinates: number[][]
  // other properties
}

export async function getStatisticalAreaById(areaId: number) {
  try {
    const query = `
      SELECT array_agg(ARRAY[ST_X(geom), ST_Y(geom)]) AS coordinates
      FROM (
        SELECT (ST_DumpPoints(ST_Transform(geom, 4326))).geom
        FROM statistical_areas
        WHERE id = ${areaId}
      ) AS points
    `
    const { rows } = await pgPool.query(query)

    return rows as StatisiticalAreaByIdType[]
  } catch (e) {
    console.error(e)
  }
}

export type AreaListItemType = {
  id: number
  sa3_name: string
  sa4_name: string
}
// TODO:
// Add page for search results with dataset and params
export async function getAreaByName(name: string) {
  try {
    const query = `
      SELECT 
        id,
        sa3_name as sa3_name,
        sa4_name as sa4_name
      FROM statistical_areas
      WHERE sa4_name LIKE '${name}%' OR sa3_name LIKE '${name}%'
      ORDER BY id ASC 
      LIMIT 20
    `
    const { rows } = await pgPool.query(query)

    return rows as AreaListItemType[]
  } catch (e) {
    throw new Error('search by SA4 name failed')
  }
}
