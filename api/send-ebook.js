/**
 * Vercel Serverless Function para Envio de E-book via Resend
 * 
 * Caminho: api/send-ebook.js
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const SITE_URL = "https://drraffaelslaviero.com.br";
const LOGO_URL = `${SITE_URL}/logo-white.webp`;

// Mapeamento de links dos e-books (Substitua pelos seus links reais)
const EBOOK_LINKS = {
  "Será que é só uma fase?":
    "https://drraffaelslaviero.com.br/ebooks/fevereiro-2026-sera-que-e-so-uma-fase.pdf",
  "Pornografia e Saúde Mental":
    "https://drraffaelslaviero.com.br/ebooks/ebook-pornografia-e-saude-mental.pdf",
  "10 Passos para Fortalecer sua Saúde Mental em 2026":
    "https://drraffaelslaviero.com.br/ebooks/10-passos-para-fortalecer-sua-saude-mental-em-2026.pdf",
};

function buildEbookEmailHtml({ name, ebookName, downloadLink }) {
  return `
    <div style="margin:0;padding:32px 16px;background-color:#f1f2f5;background-image:radial-gradient(circle at 15% 20%, rgba(47, 66, 222, 0.12) 0%, transparent 38%),radial-gradient(circle at 85% 75%, rgba(52, 175, 226, 0.16) 0%, transparent 42%),linear-gradient(180deg, #f7f9ff 0%, #eef3ff 100%);font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;">
        <tr>
          <td style="padding:0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 24px 60px rgba(27, 41, 77, 0.14);">
              <tr>
                <td style="padding:0;background:linear-gradient(90deg, #2f42de 0%, #34afe2 100%);">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="padding:28px 32px 18px 32px;text-align:center;">
                        <img src="${LOGO_URL}" alt="Dr. Raffael Slaviero" width="180" style="display:block;margin:0 auto 18px auto;width:180px;max-width:100%;height:auto;" />
                        <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.22);font-size:12px;line-height:1;color:#ffffff;letter-spacing:0.08em;text-transform:uppercase;">
                          Material gratuito liberado
                        </div>
                        <h1 style="margin:18px 0 8px 0;font-size:30px;line-height:1.15;color:#ffffff;font-weight:800;">
                          Seu e-book está pronto para download
                        </h1>
                        <p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.92);">
                          Conteúdo selecionado para aprofundar seu entendimento com mais clareza, critério e acolhimento.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 32px 18px 32px;color:#2e3650;">
                  <p style="margin:0 0 18px 0;font-size:28px;line-height:1.2;font-weight:800;color:#2637c2;">
                    Olá, ${name}!
                  </p>
                  <p style="margin:0 0 16px 0;font-size:16px;line-height:1.75;color:#4f5b76;">
                    Ficamos felizes com seu interesse em aprofundar seus conhecimentos sobre saúde mental.
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:18px 0 24px 0;">
                    <tr>
                      <td style="padding:20px 22px;border:1px solid #dde5ff;border-radius:20px;background:linear-gradient(180deg, #f8faff 0%, #eef3ff 100%);">
                        <p style="margin:0 0 8px 0;font-size:12px;line-height:1;color:#6c7aa8;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;">
                          E-book selecionado
                        </p>
                        <p style="margin:0;font-size:22px;line-height:1.35;color:#1f2a44;font-weight:800;">
                          ${ebookName}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 26px 0;font-size:16px;line-height:1.75;color:#4f5b76;">
                    Use o botão abaixo para acessar seu material agora. Se preferir, você também pode salvar este e-mail e baixar depois.
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 28px auto;">
                    <tr>
                      <td align="center" style="border-radius:16px;background:linear-gradient(90deg, #2f42de 0%, #34afe2 100%);box-shadow:0 16px 30px rgba(47, 66, 222, 0.28);">
                        <a href="${downloadLink}" style="display:inline-block;padding:16px 28px;font-size:15px;line-height:1.2;font-weight:800;letter-spacing:0.03em;color:#ffffff;text-decoration:none;border-radius:16px;">
                          Baixar e-book gratuitamente
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 20px 0;font-size:15px;line-height:1.75;color:#4f5b76;">
                    Se tiver qualquer dúvida ou quiser agendar acompanhamento profissional, estamos à disposição.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 32px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #e8ecf6;">
                    <tr>
                      <td style="padding-top:24px;text-align:center;">
                        <p style="margin:0 0 6px 0;font-size:16px;line-height:1.4;color:#24314f;font-weight:800;">
                          Dr. Raffael Sehn Slaviero
                        </p>
                        <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#66738f;">
                          Psiquiatria com precisão técnica, escuta qualificada e cuidado humano
                        </p>
                        <p style="margin:0;font-size:13px;line-height:1.6;color:#8c94a5;">
                          Cascavel - PR | CRM 38.831 | <a href="${SITE_URL}" style="color:#2f42de;text-decoration:none;">drraffaelslaviero.com.br</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

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
    if (!RESEND_API_KEY) {
      return res.status(500).json({
        error: "Configuração ausente: defina RESEND_API_KEY na Vercel.",
      });
    }

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
        from: `Dr. Raffael Slaviero <${RESEND_FROM_EMAIL}>`,
        to: [email],
        subject: `Seu e-book chegou: ${ebookName}`,
        html: buildEbookEmailHtml({ name, ebookName, downloadLink }),
      }),
    });

    const responseText = await response.text();
    let data = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      data = { raw: responseText };
    }

    if (!response.ok) {
      const resendMessage = data?.message || data?.error || "Falha ao enviar com Resend";
      return res.status(502).json({
        error: resendMessage,
        provider: "resend",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
