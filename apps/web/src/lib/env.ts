import "server-only";

const legacyApiBaseUrl = process.env.LEGACY_API_BASE_URL;

if (!legacyApiBaseUrl) {
  throw new Error("LEGACY_API_BASE_URL is required.");
}

export const env = {
  legacyApiBaseUrl,
};
