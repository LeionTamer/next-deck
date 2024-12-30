import { getStatisticalAreaById } from '@/db/au/statistical-area'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const areaId = searchParams.get('areaId')
  const data = await getStatisticalAreaById(parseInt(areaId!))

  return Response.json(data)
}
