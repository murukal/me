import { NextResponse, type NextRequest } from 'next/server'

const middleware = (request: NextRequest) => {
  const _authenticated = request.nextUrl.searchParams.get('authenticated')
  if (_authenticated) {
    const response = NextResponse.next()

    const url = new URL(request.url)
    url.searchParams.delete('authenticated')
    return Response.redirect(url)
  }
}

export { middleware }
