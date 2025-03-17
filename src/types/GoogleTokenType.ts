export type GoogleTokenType = {
    access_token: string; // Short-lived token for API access
    refresh_token?: string; // Long-lived token for refreshing access
    expiry_date?: number; // Timestamp when the access token expires
    token_type: string; // Usually "Bearer"
    scope: string; // Scopes granted by the user
    id_token?: string; // For OpenID Connect
  };