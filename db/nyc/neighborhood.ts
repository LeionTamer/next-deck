import pgPool from '@/lib/postgres'
import { Feature, Geometry } from 'geojson'
import { json } from 'stream/consumers'

export async function getNeighborhood() {
  try {
    const query = `
            SELECT gid, name, boroname FROM public.nyc_neighborhoods
            ORDER BY gid ASC LIMIT 100
        `
    const { rows } = await pgPool.query(query)

    return rows
  } catch (e) {
    console.error(e)
  }
}

type CrimeGeoJSONSQLResponseType = {
  name: string
  victim_count: number
  geojson: string
}

export type CrimeGeoJsonType = Omit<CrimeGeoJSONSQLResponseType, 'geojson'> & {
  geojson: Feature<
    Geometry,
    {
      name: string
      victims: number
    }
  >
}

export async function getCrimeGeoJSON() {
  try {
    const query = `
    SELECT 
      hoods.name AS name,
      COUNT(victims.num_victim) AS victim_count,
      json_build_object(
        'type','polygon',
        'properties', json_build_object(
          'name', hoods.name,
          'victims', COUNT(victims.num_victim)
        ),
        'geometry', ST_AsGeoJSON(ST_Transform(hoods.geom, 4326))::json
      )::text as geojson
    FROM nyc_homicides AS victims
    JOIN nyc_neighborhoods AS hoods
    ON ST_Within(victims.geom, hoods.geom)
    GROUP BY hoods.name, victims.num_victim, hoods.geom
    ORDER BY COUNT(victims.num_victim)
    `

    const { rows } = await pgPool.query(query)
    const data = rows.map(
      (entry: CrimeGeoJSONSQLResponseType) =>
        ({
          ...entry,
          geojson: JSON.parse(entry.geojson),
        }) as CrimeGeoJsonType
    )

    return data
  } catch (e) {
    console.error(e)
  }
}
