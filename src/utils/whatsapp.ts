/**
 * Utilidades para generar enlaces y mensajes de WhatsApp.
 *
 * El número de WhatsApp proviene de SITE.whatsappNumber (src/data/site.ts).
 * Para activar el servicio basta con reemplazar el PLACEHOLDER del número.
 */

import { SITE } from '@/data/site';

/** Convierte un número a formato internacional de WhatsApp (solo dígitos). */
export function formatWhatsAppNumber(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }
  if (digits.startsWith('0')) {
    digits = `56${digits.slice(1)}`; // Chile: +56
  }
  return digits;
}

/** Datos de una cotización que el visitante puede completar. */
export type WhatsAppQuoteInput = {
  nombre?: string;
  servicio?: string;
  comuna?: string;
  descripcion?: string;
};

/** Construye el texto plano del mensaje de cotización. */
export function buildWhatsAppMessage({
  nombre,
  servicio,
  comuna,
  descripcion,
}: WhatsAppQuoteInput = {}): string {
  const lines: string[] = ['Hola, quisiera solicitar una cotización.', ''];

  if (servicio) {
    lines.push(`Servicio: ${servicio}`);
  }
  if (comuna) {
    lines.push(`Comuna: ${comuna}`);
  }
  if (descripcion) {
    lines.push(`Descripción: ${descripcion}`);
  }
  if (nombre) {
    lines.push(`Nombre: ${nombre}`);
  }

  return lines.join('\n');
}

/**
 * Genera el enlace wa.me con el mensaje pre-cargado.
 * Usa el número de WhatsApp definido en src/data/site.ts (PLACEHOLDER).
 */
export function generateWhatsAppLink(
  message: string = buildWhatsAppMessage(),
  phone: string = SITE.whatsappNumber
): string {
  const number = formatWhatsAppNumber(phone);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
