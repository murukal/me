import { NextRequest, NextResponse } from 'next/server'
import { AUTHENTICATION_TOKEN } from './constants/authentication'

/**
 * 中间介
 */
export const middleware = (request: NextRequest) => {
  const isAuthenticated = request.nextUrl.searchParams.has(AUTHENTICATION_TOKEN.authentication)
  if (!isAuthenticated) return

  const _authenticated = request.nextUrl.searchParams.get(AUTHENTICATION_TOKEN.authentication)
  const url = new URL(request.url)
  url.searchParams.delete(AUTHENTICATION_TOKEN.authentication)
  const response = NextResponse.redirect(url)

  if (_authenticated) {
    response.cookies.set({
      httpOnly: true,
      name: AUTHENTICATION_TOKEN.authentication,
      value: _authenticated
    })
  }

  return response
}
