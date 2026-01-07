/**
 * Valida uma senha com critérios mínimos de segurança.
 * @param {string} password - A senha a ser validada.
 * @returns {{valid: boolean, error?: string, suggestion?: string}}
 */
function validatePassword(password) {
  if (!password) {
    return {
      valid: false,
      error: "A senha não pode ser vazia.",
      suggestion: "Digite uma senha com pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.",
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      error: "A senha deve ter no mínimo 8 caracteres.",
      suggestion: "Use pelo menos 8 caracteres para aumentar a segurança.",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: "A senha deve conter ao menos uma letra maiúscula.",
      suggestion: "Inclua pelo menos uma letra maiúscula (A-Z).",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      error: "A senha deve conter ao menos uma letra minúscula.",
      suggestion: "Inclua pelo menos uma letra minúscula (a-z).",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      error: "A senha deve conter ao menos um número.",
      suggestion: "Inclua pelo menos um número (0-9).",
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      error: "A senha deve conter ao menos um caractere especial.",
      suggestion: "Inclua símbolos especiais, como !, @, #, $, etc.",
    };
  }

  // Se passou por todas as validações
  return { valid: true };
}

module.exports = validatePassword;
