import pgPool from '@/lib/postgres'
import { Feature, Geometry } from 'geojson'
import { ChevronsDownUp } from 'lucide-react'

type StatisticalAreaResponseType = {
  id: number
  name: string
  code: string
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
      name: string
      code: string
    }
  >
}

export async function getStatisticalArea() {
  try {
    const query = `
        SELECT 
            id, sa3_code21 AS code, sa3_name21 as name,
            json_build_object(
            'type','polygon',
            'properties', json_build_object(
                'name', sa3_name21,
                'code', sa3_code21
                ),
                'geometry', ST_AsGeoJSON(ST_Transform(geom, 4326))::json
             )::text as geojson
        FROM public."SA3_2021_AUST_GDA2020" 
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

// TODO:
// Add page for search results with dataset and params
export async function getAreaByName(name: string) {
  try {
    const query = `
    SELECT 
      sa4_name21 as sa4_name, 
      sa3_name21 as sa3_name
    FROM public."SA3_2021_AUST_GDA2020"
    WHERE sa4_name21 LIKE 'Adel%' OR sa3_name21 LIKE 'Adel%'
    ORDER BY id ASC 
    LIMIT 20
    `

    const { rows } = await pgPool.query(query)
  } catch (e) {
    throw new Error('search by SA4 name failed')
  }
}
