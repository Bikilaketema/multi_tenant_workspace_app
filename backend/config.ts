export const frontend_url = process.env.FRONTEND_URL

const trustedOriginsEnv = process.env.TRUSTED_ORIGINS || "";
export const trustedOrigins = trustedOriginsEnv.split(",").map(u => u.trim());
