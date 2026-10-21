import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  if (password !== 'admin1234') return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  const response = NextResponse.json({ ok: true })
  response.cookies.set('ruc_admin', 'admin', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 8, path: '/' })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('ruc_admin')
  return response
}
