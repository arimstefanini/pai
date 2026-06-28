/**
 * Quote form data types
 */
export interface QuoteFormData {
  name: string;
  phone: string;
  description: string;
  product?: string;
  email?: string;
}

/**
 * Build a formatted message for WhatsApp
 */
export function buildQuoteMessage(data: QuoteFormData): string {
  const lines: string[] = [
    "Olá! Gostaria de solicitar um orçamento para um projeto em impressão 3D.",
    "",
    `👤 Nome:`,
    data.name,
    "",
    `📱 WhatsApp:`,
    data.phone,
  ];

  // Add email if provided
  if (data.email) {
    lines.push("");
    lines.push(`📧 E-mail:`);
    lines.push(data.email);
  }

  // Add product reference if provided
  if (data.product) {
    lines.push("");
    lines.push(`📦 Produto de referência:`);
    lines.push(data.product);
  }

  // Add description
  lines.push("");
  lines.push(`📝 Descrição do projeto:`);
  lines.push(data.description);

  // Add closing
  lines.push("");
  lines.push(
    "Gostaria de saber a viabilidade, prazo de produção e orçamento."
  );
  lines.push("");
  lines.push("Obrigado!");

  return lines.join("\n");
}
