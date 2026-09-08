export interface LoginResponse {
  tempToken: string;
  error?: string;
}

export interface Verify2FAResponse {
  success: boolean;
  error?: string;
}

export interface Generate2FAResponse {
  qrcode: string;
  secret: string;
  error?: string;
}

export interface ErrorResponse {
  error: string;
}
