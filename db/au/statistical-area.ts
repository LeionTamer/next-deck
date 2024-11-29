import pgPool from '@/lib/postgres'
import { Feature, Geometry } from 'geojson'

type StatisticalAreaResponseType = {
  id: number
  name: string
  code: string
  geojson: string
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
