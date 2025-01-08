import { getSA3GeoJSONByID } from '@/db/au/statistical-area'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const areaId = searchParams.get('areaId')
  const data = await getSA3GeoJSONByID(parseInt(areaId!))

  return Response.json(data?.map((entry) => entry.geojson))
}
