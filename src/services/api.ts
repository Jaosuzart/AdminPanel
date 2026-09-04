export const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiLogin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Erro no servidor (Status ${response.status}): ${text.substring(0, 50)}`);
  }

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
