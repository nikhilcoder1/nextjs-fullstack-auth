type RateLimitEntry = {
  count: number;
  lastRequest: number;
};

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

const ipStore = new Map<string, RateLimitEntry>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  // first request
  if (!entry) {
    ipStore.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  // reset window
  if (now - entry.lastRequest > RATE_LIMIT_WINDOW) {
    ipStore.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  // limit reached
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}