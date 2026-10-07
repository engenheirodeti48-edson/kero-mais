// ALTERE AQUI PARA O SEU NÚMERO REAL (Formato Internacional sem + ou espaços)
export const STORE_PHONE = "244954309236"; 

export const generateWhatsAppLink = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_PHONE}?text=${encodedMessage}`;
};