# Guia Rápido: Ebook Hotmart + GTM

Este documento resume como manter a página de materiais com 1 e-book e como medir cliques para campanhas pagas.

## 1) Estado atual implementado

- Página: `materiais.html`
- Produto ativo: **Ebook Educar Sem Gritar**
- Link do botão:
  - `https://pay.hotmart.com/O104751903B?bid=1774533623723`
- Evento enviado no clique:
  - `event: "hotmart_click"` via `dataLayer.push`
- Evento Meta (se pixel carregado):
  - `fbq("trackCustom", "HotmartClick", {...})`

## 2) Onde editar no futuro

- Conteúdo do card e link do botão:
  - `materiais.html`
- Evento de clique (GTM/Meta):
  - `materiais.html` (script no fim da página)
- Layout do card único:
  - `src/style.css` classe `.premium-grid--single`

## 3) Como trocar para outro produto Hotmart

1. Abra `materiais.html`.
2. Encontre o botão com classe `js-hotmart-ebook`.
3. Troque:
   - `href` para o novo checkout da Hotmart.
   - `data-ebook-name` para o nome correto do novo produto.
4. Salve e publique.

## 4) Configuração no Google Tag Manager

Pré-requisito: container GTM já instalado (ID `GTM-KLK9P94V`).

### 4.1 Criar gatilho de evento customizado

1. GTM -> **Triggers** -> **New**.
2. Tipo: **Custom Event**.
3. Event name: `hotmart_click`.
4. Salve como: `CE - hotmart_click`.

### 4.2 Criar tag GA4 para clique Hotmart

1. GTM -> **Tags** -> **New**.
2. Tipo: **Google Analytics: GA4 Event**.
3. Event name: `hotmart_click`.
4. Event parameters sugeridos:
   - `event_category` = `{{DLV - event_category}}`
   - `event_action` = `{{DLV - event_action}}`
   - `event_label` = `{{DLV - event_label}}`
   - `destination` = `{{DLV - destination}}`
   - `page_path` = `{{DLV - page_path}}`
   - `page_url` = `{{DLV - page_url}}`
5. Trigger: `CE - hotmart_click`.
6. Salve.

### 4.3 Variáveis de Data Layer (se ainda não existirem)

Crie variáveis do tipo **Data Layer Variable**:

- `DLV - event_category` -> `event_category`
- `DLV - event_action` -> `event_action`
- `DLV - event_label` -> `event_label`
- `DLV - destination` -> `destination`
- `DLV - page_path` -> `page_path`
- `DLV - page_url` -> `page_url`

### 4.4 Tag do Meta Pixel no GTM (opcional/recomendado)

Use o mesmo gatilho `CE - hotmart_click` para disparar:

- `Lead` ou `InitiateCheckout` (recomendado para mídia paga)
- ou mantenha `HotmartClick` custom se já usa esse padrão

## 5) Como validar antes de publicar

1. Abra GTM Preview (Tag Assistant).
2. Acesse `materiais.html`.
3. Clique em **Comprar na Hotmart**.
4. Confira se o evento `hotmart_click` apareceu.
5. Confira se as tags GA4/Meta dispararam.
6. Use extensão **Meta Pixel Helper** para validar envio no navegador.

## 6) Boas práticas para tráfego pago

- Use UTMs nas campanhas:
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
- Exemplo:
  - `https://seusite.com/materiais.html?utm_source=facebook&utm_medium=cpc&utm_campaign=ebook_educar_sem_gritar`
- No GA4, cruze:
  - origem/mídia/campanha x evento `hotmart_click`

## 7) Troubleshooting rápido

- **Clique não aparece no GTM Preview**
  - Verifique se o script GTM está no `<head>` e se há bloqueio de consentimento.
- **Tag não dispara**
  - Confirme nome exato do evento: `hotmart_click`.
- **Meta não recebe evento**
  - Verifique se `fbq` está carregado na página.
- **Link abre errado**
  - Teste o `href` diretamente no navegador.

## 8) Checklist de publicação

1. Link Hotmart atualizado.
2. `data-ebook-name` atualizado.
3. Evento `hotmart_click` validado no GTM Preview.
4. Evento validado no GA4 Realtime.
5. Evento validado no Meta Pixel Helper.
6. Publicar container GTM e deploy do site.

