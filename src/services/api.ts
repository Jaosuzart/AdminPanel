export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3333');

export async function apiLogin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao realizar login.');
  }

  return data;
}

export async function apiVerify2FA(code: string, tempToken: string) {
  const response = await fetch(`${API_URL}/api/verify-2fa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, tempToken })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao validar código.');
  }

  return data;
}
