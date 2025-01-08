import { getSA4ByCode } from '@/db/au/statistical-area'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params
  const data = await getSA4ByCode(code)

  return Response.json(data)
}
