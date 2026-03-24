/**
 * Serviço de Integração com Resend (via Edge Function)
 * 
 * Este serviço é responsável por enviar os dados do formulário de e-book
 * para uma função serveless que fará a ponte com a API do Resend.
 */

export const emailService = {
  /**
   * Dispara o envio do e-book por e-mail
   * @param {string} name - Nome do usuário
   * @param {string} email - E-mail do usuário
   * @param {string} ebookName - Nome do e-book selecionado
   */
  async sendEbook(name, email, ebookName) {
    // URL da sua Vercel Function
    const EDGE_FUNCTION_URL = '/api/send-ebook';

    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          ebookName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const statusMsg = `HTTP ${response.status}`;
        const details = errorData.error || errorData.message || 'Falha ao enviar o e-mail';
        throw new Error(`${statusMsg}: ${details}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no EmailService:', error);
      throw error;
    }
  }
};
