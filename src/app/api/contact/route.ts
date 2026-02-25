import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campi mancanti' }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Errore server' }, { status: 500 })
  }
}
