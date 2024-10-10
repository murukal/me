import { NextResponse, type NextRequest } from 'next/server'

const AUTHENTICATED = 'authenticated'

const middleware = (request: NextRequest) => {
  const hasAuthenticated = request.nextUrl.searchParams.has(AUTHENTICATED)

  if (hasAuthenticated) {
    const _authenticated = request.nextUrl.searchParams.get(AUTHENTICATED)
    const url = new URL(request.url)
    url.searchParams.delete(AUTHENTICATED)
    const response = NextResponse.redirect(url)

    if (_authenticated) {
      response.cookies.set({
        httpOnly: true,
        name: AUTHENTICATED,
        value: _authenticated
      })
    }

    return response
  }
}

export { middleware }
