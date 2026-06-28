import { buildQuoteMessage, type QuoteFormData } from "./buildQuoteMessage";

const WHATSAPP_PHONE = "5535999095569"; // +55 35 99909-5569
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=`;

/**
 * Validate form data
 */
function validateFormData(data: QuoteFormData): string | null {
  if (!data.name?.trim()) {
    return "Por favor, preencha seu nome.";
  }

  if (!data.phone?.trim()) {
    return "Por favor, preencha seu WhatsApp.";
  }

  if (!data.description?.trim()) {
    return "Por favor, descreva sua ideia.";
  }

  return null;
}

/**
 * Send quote to WhatsApp
 */
export function sendQuoteToWhatsapp(data: QuoteFormData): { success: boolean; error?: string } {
  // Validate form data
  const error = validateFormData(data);
  if (error) {
    return { success: false, error };
  }

  try {
    // Build message
    const message = buildQuoteMessage(data);

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp
    const whatsappUrl = WHATSAPP_URL + encodedMessage;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Erro ao abrir WhatsApp. Tente novamente.",
    };
  }
}
