import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campi mancanti' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Studio <noreply@tuostudio.com>',
      to: ['hello@tuostudio.com'],
      subject: `Nuovo contatto da ${name}`,
      html: `
        <h2>Nuovo messaggio dal sito</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Errore invio email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Errore server' }, { status: 500 })
  }
}
