import { LoginResponse, Verify2FAResponse, Generate2FAResponse } from '../types/api';

export const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
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

  return data as LoginResponse;
}

export async function apiVerify2FA(code: string, tempToken: string): Promise<Verify2FAResponse> {
  const response = await fetch(`${API_URL}/api/verify-2fa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, tempToken })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao validar codigo.');
  }

  return data as Verify2FAResponse;
}

export async function apiGenerate2FA(email: string): Promise<Generate2FAResponse> {
  const response = await fetch(`${API_URL}/api/generate-2fa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Erro ao gerar QR Code.');
  }
  return data as Generate2FAResponse;
}

export async function apiUpdatePassword(email: string, currentPassword: string, newPassword: string): Promise<{success: boolean; message: string}> {
  const response = await fetch(`${API_URL}/api/update-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, currentPassword, newPassword })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Erro ao atualizar a senha.');
  }
  return data;
}
