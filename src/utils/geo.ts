export async function detectCountryCode(): Promise<string | null> {
  // GDPR-friendly default: do not prompt for geolocation and keep submissions anonymous
  // Country detection can be added server-side via Netlify Geo headers at submission time
  return null;
}

export function buildSignalLink(id: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return `${base}/signal.html?id=${encodeURIComponent(id)}`;
}

export function buildInviteLink(referrerId: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return `${base}/?ref=${encodeURIComponent(referrerId)}`;
}

