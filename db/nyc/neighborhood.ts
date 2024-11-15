import pgPool from '@/lib/postgres'

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
