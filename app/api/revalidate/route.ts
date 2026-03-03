import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Notion webhook revalidation endpoint.
 *
 * Trigger URL (set in Notion integration / automation):
 *   POST https://yourdomain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET
 *
 * Security: requests without the correct secret token are rejected.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid revalidation token.' }, { status: 401 })
  }

  try {
    // Revalidate all blog pages across all locales
    revalidatePath('/[locale]/blog', 'page')
    revalidatePath('/[locale]/blog/[slug]', 'page')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('[Revalidate] Error:', err)
    return NextResponse.json({ error: 'Revalidation failed.' }, { status: 500 })
  }
}

// Allow GET for easy health-check (no revalidation performed)
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Revalidation endpoint is live.' })
}
