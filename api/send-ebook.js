/**
 * Vercel Serverless Function para Envio de E-book via Resend
 * 
 * Caminho: api/send-ebook.js
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Mapeamento de links dos e-books (Substitua pelos seus links reais)
const EBOOK_LINKS = {
  "Será que é só uma fase?": "https://drraffaelslaviero.com.br/ebooks/fevereiro-2026-sera-que-e-so-uma fase.pdf",
  "Pornografia e Saúde Mental": "https://drraffaelslaviero.com.br/ebooks/ebook-pornografia-e-saude-mental.pdf",
  "10 Passos para Fortalecer sua Saúde Mental em 2026": "https://drraffaelslaviero.com.br/ebooks/10-passos-para-fortalecer-sua-saude mental-em-2026.pdf"
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, ebookName } = req.body;
    
    if (!name || !email || !ebookName) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const downloadLink = EBOOK_LINKS[ebookName] || EBOOK_LINKS["10 Passos para Fortalecer sua Saúde Mental em 2026"];

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Dr. Raffael Slaviero <contato@drraffaelslaviero.com.br>',
        to: [email],
        subject: `Seu e-book chegou: ${ebookName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2c5282;">Olá, ${name}!</h2>
            <p>Ficamos felizes com seu interesse em aprofundar seus conhecimentos sobre saúde mental.</p>
            <p>Conforme prometido, aqui está o seu e-book: <strong>${ebookName}</strong></p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${downloadLink}" style="background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">BAIXAR E-BOOK GRATUITAMENTE</a>
            </div>
            <p>Se tiver qualquer dúvida ou precisar de apoio profissional, estamos à disposição.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #718096; text-align: center;">
              Dr. Raffael Sehn Slaviero - Psiquiatra<br>
              Cascavel - PR | CRM 38.831
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
