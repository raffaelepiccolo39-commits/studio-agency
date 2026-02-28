import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname

  // Permetti solo la pagina coming-soon
  if (url !== '/coming-soon') {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }
}

export const config = {
  matcher: ['/((?!coming-soon|_next|favicon|logo|public).*)'],
}