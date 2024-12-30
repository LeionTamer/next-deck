import { getAreaFilteredDataset } from '@/db/au/nc-dataset'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const areaId = searchParams.get('areaId')
  const datasetId = searchParams.get('datasetId')
  const data = await getAreaFilteredDataset({
    areaId: parseInt(areaId!),
    datasetId: parseInt(datasetId!),
  })

  console.table(data[1])

  return Response.json(data)
}
