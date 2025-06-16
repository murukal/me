import { NextResponse, type NextRequest } from 'next/server'
import { ApplicationToken } from './assets/token'

const middleware = (request: NextRequest) => {
  const hasAuthenticated = request.nextUrl.searchParams.has(ApplicationToken.Authenticated)

  if (hasAuthenticated) {
    const _authenticated = request.nextUrl.searchParams.get(ApplicationToken.Authenticated)
    const url = new URL(request.url)
    url.searchParams.delete(ApplicationToken.Authenticated)
    const response = NextResponse.redirect(url)

    if (_authenticated) {
      response.cookies.set({
        httpOnly: true,
        name: ApplicationToken.Authenticated,
        value: _authenticated
      })
    }

    return response
  }
}

export { middleware }
